# 1. GCP 서버 접속 정보 (필요시 수정)
$GCP_IP = "35.206.97.135"         # 예: 104.197.191.219
$GCP_USER = "cloud"       # 예: ubuntu 또는 GCP 계정명

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  FATES System GCP 서버 원클릭 배포 시작" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# 1. 로컬 프로젝트 빌드
Write-Host "[1/3] Gradle 프로젝트 빌드 중..." -ForegroundColor Yellow
.\gradlew.bat bootJar --no-daemon

if ($LASTEXITCODE -ne 0) {
    Write-Host "[오류] 빌드에 실패하였습니다. 배포를 중단합니다." -ForegroundColor Red
    exit $LASTEXITCODE
}

# 2. 빌드된 JAR 파일 GCP 서버로 전송 (SCP)
Write-Host "[2/3] 빌드된 파일 GCP 서버로 전송 중..." -ForegroundColor Yellow
scp build/libs/fates-system-0.0.1-SNAPSHOT.jar "${GCP_USER}@${GCP_IP}:~/app/"

if ($LASTEXITCODE -ne 0) {
    Write-Host "[오류] 파일 전송 실패. IP 및 SSH 설정을 확인해 주세요." -ForegroundColor Red
    exit $LASTEXITCODE
}

# 3. GCP 서비스 재시작 (SSH)
Write-Host "[3/3] GCP fates 시스템 서비스 재시작 중..." -ForegroundColor Yellow
ssh "${GCP_USER}@${GCP_IP}" "sudo systemctl restart fates.service"

Write-Host "==========================================" -ForegroundColor Green
Write-Host "  GCP 서버 배포가 성공적으로 완료되었습니다!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
