package com.example.fates_system.config;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

@Slf4j
@Aspect
@Component
public class PerformanceLogAspect {

    /**
     * Service, Scheduler, Controller 패키지의 모든 메서드 조인포인트 지정
     */
    @Pointcut("execution(* com.example.fates_system.service..*(..)) || " +
              "execution(* com.example.fates_system.scheduler..*(..)) || " +
              "execution(* com.example.fates_system.controller..*(..))")
    public void performanceTargets() {}

    @Around("performanceTargets()")
    public Object logPerformance(ProceedingJoinPoint joinPoint) throws Throwable {
        String className = joinPoint.getSignature().getDeclaringType().getSimpleName();
        String methodName = joinPoint.getSignature().getName();

        long start = System.currentTimeMillis();
        try {
            Object result = joinPoint.proceed();
            long duration = System.currentTimeMillis() - start;

            if (duration >= 1000) {
                log.warn("[PERF-SLOW] {}.{}() 소요 시간: {} ms", className, methodName, duration);
            } else {
                log.info("[PERF] {}.{}() 소요 시간: {} ms", className, methodName, duration);
            }
            return result;
        } catch (Throwable t) {
            long duration = System.currentTimeMillis() - start;
            log.error("[PERF-ERROR] {}.{}() 예외 발생 (소요 시간: {} ms): {}", className, methodName, duration, t.getMessage());
            throw t;
        }
    }
}
