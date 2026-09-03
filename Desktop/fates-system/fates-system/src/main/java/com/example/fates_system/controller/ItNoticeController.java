package com.example.fates_system.controller;

import com.example.fates_system.service.ItNoticeEmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/it-notice")
@RequiredArgsConstructor
public class ItNoticeController {

    private final ItNoticeEmailService itNoticeEmailService;

    /**
     * 사내 IT 정기 보안 안내 메일 드래프트 생성
     */
    @PostMapping("/draft")
    public ResponseEntity<Map<String, String>> createDraft() {
        String draftId = itNoticeEmailService.createItNoticeDraft();
        if (draftId != null) {
            return ResponseEntity.ok(Map.of(
                    "status", "SUCCESS",
                    "draftId", draftId,
                    "message", "IT notice draft created successfully in Gmail"
            ));
        } else {
            return ResponseEntity.internalServerError().body(Map.of(
                    "status", "ERROR",
                    "message", "Failed to create IT notice draft"
            ));
        }
    }

    /**
     * IT 보안 안내 메일 본문 HTML 미리보기
     */
    @GetMapping(value = "/preview", produces = MediaType.TEXT_HTML_VALUE + ";charset=UTF-8")
    public ResponseEntity<String> previewHtml() {
        return ResponseEntity.ok(itNoticeEmailService.buildHtmlBody());
    }
}
