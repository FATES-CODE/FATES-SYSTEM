package com.example.fates_system.service;

import com.example.fates_system.config.AppProperties;
import com.example.fates_system.dto.HolidayNoticeResult;
import com.example.fates_system.dto.SignaturePreviewResponse;
import com.example.fates_system.dto.SyncAccountResult;
import com.example.fates_system.dto.SyncExecutionReport;
import com.example.fates_system.dto.VacationSettingsDto;
import com.google.api.services.gmail.model.SendAs;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class SignatureSyncService {

    private final GoogleCalendarService googleCalendarService;
    private final HtmlSignatureBuilder signatureBuilder;
    private final GmailSettingService gmailSettingService;
    private final GoogleSheetLogService sheetLogService;
    private final AppProperties appProperties;

    /**
     * 전체 대상 계정에 대해 공휴일 조회 및 서명/휴가 동기화 실행
     */
    public SyncExecutionReport syncAllAccounts() {
        LocalDateTime startedAt = LocalDateTime.now();
        List<String> targetEmails = appProperties.getTargetEmails();
        List<SyncAccountResult> results = new ArrayList<>();
        int successCount = 0;
        int failureCount = 0;

        log.info("========== 서명 및 부재중 자동응답 전체 동기화 시작 (총 {}개 계정) ==========", targetEmails.size());

        // 1. 일본 공휴일 데이터 조회 (필요 시 한국 설정 가능)
        HolidayNoticeResult holidayResult = googleCalendarService.getUpcomingHolidays(false);
        String holidayText = holidayResult.isHasHolidays() ? holidayResult.getFinalNoticeText() : "";
        VacationSettingsDto vacationSettings = prepareVacationSettings(holidayResult);

        // 2. 각 계정별 순차 처리
        for (int i = 0; i < targetEmails.size(); i++) {
            String email = targetEmails.get(i);
            log.info("[{}/{}] 계정 처리 시작: {}", i + 1, targetEmails.size(), email);

            SyncAccountResult result = processSingleAccount(email, holidayText, vacationSettings);
            results.add(result);

            if ("success".equals(result.getSignatureStatus()) || "success".equals(result.getVacationStatus())) {
                successCount++;
            } else {
                failureCount++;
            }

            // 계정 간 Rate Limit 방어 딜레이 (기본 3초)
            if (i < targetEmails.size() - 1) {
                try {
                    Thread.sleep(3000);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    break;
                }
            }
        }

        LocalDateTime finishedAt = LocalDateTime.now();
        log.info("========== 전체 동기화 완료: 성공 {}, 실패 {} ==========", successCount, failureCount);

        return SyncExecutionReport.builder()
                .totalAccounts(targetEmails.size())
                .successCount(successCount)
                .failureCount(failureCount)
                .startedAt(startedAt)
                .finishedAt(finishedAt)
                .results(results)
                .build();
    }

    /**
     * 특정 단일 계정에 대해 동기화 실행
     */
    public SyncAccountResult syncSingleAccount(String email) {
        HolidayNoticeResult holidayResult = googleCalendarService.getUpcomingHolidays(false);
        String holidayText = holidayResult.isHasHolidays() ? holidayResult.getFinalNoticeText() : "";
        VacationSettingsDto vacationSettings = prepareVacationSettings(holidayResult);
        return processSingleAccount(email, holidayText, vacationSettings);
    }

    public SyncAccountResult processSingleAccount(String email, String holidayText, VacationSettingsDto vacationSettings) {
        SyncAccountResult result = SyncAccountResult.builder()
                .email(email)
                .timestamp(LocalDateTime.now())
                .build();

        try {
            // 1. 현재 서명 목록 조회
            List<SendAs> sendAsList = gmailSettingService.getSendAsList(email);
            boolean vacationDone = false;

            for (SendAs sendAsItem : sendAsList) {
                String sendAsEmail = sendAsItem.getSendAsEmail();
                if (!email.equalsIgnoreCase(sendAsEmail)) {
                    log.info("[{}] 별칭/그룹 계정 건너뜀: {}", email, sendAsEmail);
                    continue;
                }

                // 2. 새 서명 생성 및 PATCH
                String currentSignature = sendAsItem.getSignature() != null ? sendAsItem.getSignature() : "";
                String newSignature = signatureBuilder.generateSignatureForEmail(email, currentSignature, holidayText);

                try {
                    gmailSettingService.updateSignature(email, sendAsEmail, newSignature);
                    result.setNewSignature(newSignature);
                    result.setSignatureStatus("success");
                } catch (Exception e) {
                    log.error("[{}] 서명 갱신 실패: {}", email, e.getMessage());
                    result.setSignatureStatus("fail");
                    result.setSignatureError(e.getMessage());
                }

                // 3. 부재중(Vacation) 설정 PUT
                if (!vacationDone && vacationSettings != null) {
                    try {
                        gmailSettingService.updateVacation(email, vacationSettings);
                        result.setVacationStatus("success");
                        result.setVacationSettings(vacationSettings);
                        vacationDone = true;
                    } catch (Exception e) {
                        log.error("[{}] 부재중 설정 갱신 실패: {}", email, e.getMessage());
                        result.setVacationStatus("fail");
                        result.setVacationError(e.getMessage());
                    }
                }
            }

        } catch (Exception e) {
            log.error("[{}] 계정 처리 중 오류 발생: {}", email, e.getMessage(), e);
            result.setError(e.getMessage());
            result.setSignatureStatus("fail");
        }

        // 4. 로그 시트 업데이트
        sheetLogService.updateLogSheet(email, result);

        return result;
    }

    /**
     * 서명 미리보기 생성 (실제 API 호출 없이 변환 결과 확인)
     */
    public SignaturePreviewResponse previewSignature(String email, String originalSignature) {
        HolidayNoticeResult holidayResult = googleCalendarService.getUpcomingHolidays(false);
        String holidayText = holidayResult.isHasHolidays() ? holidayResult.getFinalNoticeText() : "";
        String group = signatureBuilder.determineGroup(email);
        String previewSig = signatureBuilder.generateSignatureForEmail(email, originalSignature, holidayText);

        String vacationHtml = null;
        LocalDate resumeDate = null;
        if (holidayResult.isHasHolidays()) {
            resumeDate = holidayResult.getResumeDate();
            vacationHtml = signatureBuilder.buildVacationHtml(holidayResult.getNearestNoticeText(), resumeDate);
        }

        return SignaturePreviewResponse.builder()
                .email(email)
                .groupType(group)
                .holidayNotice(holidayText)
                .originalSignature(originalSignature)
                .previewSignature(previewSig)
                .vacationHtml(vacationHtml)
                .resumeDate(resumeDate)
                .build();
    }

    private VacationSettingsDto prepareVacationSettings(HolidayNoticeResult holidayResult) {
        if (!holidayResult.isHasHolidays() || holidayResult.getNearestStart() == null) {
            return null;
        }

        LocalDate resumeDate = holidayResult.getResumeDate();
        String vacationHtml = signatureBuilder.buildVacationHtml(holidayResult.getNearestNoticeText(), resumeDate);

        return VacationSettingsDto.builder()
                .enableAutoReply(true)
                .startTime(String.valueOf(holidayResult.getNearestStart().toInstant().toEpochMilli()))
                .endTime(String.valueOf(holidayResult.getNearestEnd().toInstant().toEpochMilli()))
                .responseSubject("Holiday Notice")
                .responseBodyHtml(vacationHtml)
                .restrictToDomain(false)
                .restrictToContacts(false)
                .build();
    }
}
