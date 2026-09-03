package com.example.fates_system.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SyncExecutionReport {
    private int totalAccounts;
    private int successCount;
    private int failureCount;
    private LocalDateTime startedAt;
    private LocalDateTime finishedAt;
    @Builder.Default
    private List<SyncAccountResult> results = new ArrayList<>();
}
