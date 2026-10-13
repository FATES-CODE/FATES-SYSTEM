package com.example.fates_system.domain.profitreport.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AgentStats {
    private String agent;
    private double seCase = 0;
    private double seProfit = 0;
    private double siCase = 0;
    private double siProfit = 0;
    private double aeCase = 0;
    private double aeProfit = 0;
    private double aiCase = 0;
    private double aiProfit = 0;

    public AgentStats(String agent) {
        this.agent = agent;
    }

    public double getTotalCase() {
        return seCase + siCase + aeCase + aiCase;
    }

    public double getTotalProfit() {
        return seProfit + siProfit + aeProfit + aiProfit;
    }
}
