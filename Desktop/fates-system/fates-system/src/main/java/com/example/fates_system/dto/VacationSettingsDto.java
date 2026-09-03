package com.example.fates_system.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VacationSettingsDto {
    private boolean enableAutoReply;
    private String responseSubject;
    private String responseBodyHtml;
    private String startTime;
    private String endTime;
    private boolean restrictToDomain;
    private boolean restrictToContacts;
}
