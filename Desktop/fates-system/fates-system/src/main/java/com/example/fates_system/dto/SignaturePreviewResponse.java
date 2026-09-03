package com.example.fates_system.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SignaturePreviewResponse {
    private String email;
    private String groupType;
    private String holidayNotice;
    private String originalSignature;
    private String previewSignature;
    private String vacationHtml;
    private LocalDate resumeDate;
}
