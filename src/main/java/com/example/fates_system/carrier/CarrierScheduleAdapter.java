package com.example.fates_system.carrier;

import com.example.fates_system.dto.VesselScheduleDto;

import java.time.LocalDate;
import java.util.List;

/**
 * DCSA 표준 기반 선사 스케줄 어댑터 인터페이스.
 * 각 선사별 구현체는 이 인터페이스를 구현하며, 공식 API 또는 크롤링 방식 모두 동일 인터페이스로 통합됩니다.
 */
public interface CarrierScheduleAdapter {

    /**
     * 이 어댑터가 처리하는 선사 코드 (예: "ONE", "HMM", "MAERSK")
     */
    String getCarrierCode();

    /**
     * 어댑터가 사용 가능한 상태인지 여부 (API Key 설정 여부 등)
     */
    boolean isAvailable();

    /**
     * 지정 날짜 기준으로 한국행 선박 스케줄을 조회합니다.
     *
     * @param targetDate 조회 기준일 (JST)
     * @return VesselScheduleDto 목록 (비어 있을 수 있음, null 반환 불가)
     */
    List<VesselScheduleDto> fetchSchedules(LocalDate targetDate);
}
