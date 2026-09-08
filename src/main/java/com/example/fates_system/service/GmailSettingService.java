package com.example.fates_system.service;

import com.example.fates_system.dto.VacationSettingsDto;
import com.google.api.services.gmail.Gmail;
import com.google.api.services.gmail.model.ListSendAsResponse;
import com.google.api.services.gmail.model.SendAs;
import com.google.api.services.gmail.model.VacationSettings;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class GmailSettingService {

    private final GoogleAuthService googleAuthService;

    /**
     * 사용자의 SendAs 설정 목록 조회
     */
    public List<SendAs> getSendAsList(String userEmail) throws IOException {
        Gmail gmail = googleAuthService.getGmailClientForUser(userEmail);
        ListSendAsResponse response = gmail.users().settings().sendAs().list(userEmail).execute();
        return response.getSendAs() != null ? response.getSendAs() : Collections.emptyList();
    }

    /**
     * 메일 서명 갱신 (PATCH)
     */
    public void updateSignature(String userEmail, String sendAsEmail, String newSignature) throws IOException {
        Gmail gmail = googleAuthService.getGmailClientForUser(userEmail);
        SendAs content = new SendAs().setSignature(newSignature);
        gmail.users().settings().sendAs()
                .patch(userEmail, sendAsEmail, content)
                .execute();
        log.info("[{}] Gmail 서명 갱신 완료: {}", userEmail, sendAsEmail);
    }

    /**
     * 부재중(Vacation Responder) 자동응답 설정 갱신
     */
    public void updateVacation(String userEmail, VacationSettingsDto settingsDto) throws IOException {
        if (settingsDto == null) return;

        Gmail gmail = googleAuthService.getGmailClientForUser(userEmail);
        VacationSettings vacation = new VacationSettings()
                .setEnableAutoReply(settingsDto.isEnableAutoReply())
                .setResponseSubject(settingsDto.getResponseSubject())
                .setResponseBodyHtml(settingsDto.getResponseBodyHtml())
                .setRestrictToDomain(settingsDto.isRestrictToDomain())
                .setRestrictToContacts(settingsDto.isRestrictToContacts());

        if (settingsDto.getStartTime() != null) {
            vacation.setStartTime(Long.parseLong(settingsDto.getStartTime()));
        }
        if (settingsDto.getEndTime() != null) {
            vacation.setEndTime(Long.parseLong(settingsDto.getEndTime()));
        }

        gmail.users().settings().updateVacation(userEmail, vacation).execute();
        log.info("[{}] Gmail 자동응답(Vacation) 갱신 완료", userEmail);
    }

    /**
     * 현재 부재중 설정 조회
     */
    public VacationSettings getVacation(String userEmail) throws IOException {
        Gmail gmail = googleAuthService.getGmailClientForUser(userEmail);
        return gmail.users().settings().getVacation(userEmail).execute();
    }
}
