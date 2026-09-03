package com.example.fates_system.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SyncAccountResult {
    private String email;
    private String signatureStatus;
    private String signatureError;
    private String newSignature;
    private String vacationStatus;
    private String vacationError;
    private VacationSettingsDto vacationSettings;
    private LocalDateTime timestamp;
    private String error;
}
