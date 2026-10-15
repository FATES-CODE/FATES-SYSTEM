# FATES System - GCP Terraform 인프라 이전 가이드

이 디렉토리의 Terraform 코드는 FATES System 서버(Compute Engine VM, 방화벽, 고정 IP, Java 17 및 Swap/Systemd 자동 설정)를 **새로운 GCP 계정/프로젝트로 1분 만에 동일하게 이전 및 구축**할 수 있도록 작성되었습니다.

---

## 사전 준비

1. **Terraform 설치**
   - Windows: `choco install terraform` 또는 [공식 다운로드](https://developer.hashicorp.com/terraform/install)
2. **Google Cloud SDK (gcloud CLI) 설치**
   - [gcloud CLI 설치 페이지](https://cloud.google.com/sdk/docs/install)

---

## 새 계정으로 이전하는 5단계

### 1단계: 새 GCP 계정 로그인 및 API 활성화

```powershell
# 1. 새 GCP 계정으로 인증 로그인
gcloud auth login
gcloud auth application-default login

# 2. 사용할 새 프로젝트 설정
gcloud config set project [새_프로젝트_ID]

# 3. Compute Engine API 활성화
gcloud services enable compute.googleapis.com
```

---

### 2단계: terraform.tfvars 설정

`terraform/terraform.tfvars.example` 파일을 복사하여 `terraform/terraform.tfvars` 파일을 생성합니다.

```powershell
cp terraform.tfvars.example terraform.tfvars
```

`terraform.tfvars` 파일 열고 본인 환경에 맞게 값을 수정합니다:

```hcl
project_id       = "새-gcp-프로젝트-ID"
region           = "asia-northeast3"      
zone             = "asia-northeast3-a"
machine_type     = "e2-micro"             
ssh_user         = "fates"                
ssh_pub_key_path = "~/.ssh/id_rsa.pub"    
```

---

### 3단계: 테라폼으로 새 서버 프로비저닝

```powershell
# 테라폼 초기화 (최초 1회)
terraform init

# 생성될 인프라 미리보기
terraform plan

# 인프라 생성 적용
terraform apply
```

> **자동 설정 내용:**
> - 고정 외부 IP 할당
> - SSH 22번 포트 방화벽 오픈
> - Ubuntu 22.04 LTS VM 생성
> - `startup.sh.tftpl`이 자동 실행되어 **Swap 2GB, Asia/Seoul 타임존, Java 17 JRE, Systemd(fates.service)** 설정이 자동으로 완료됩니다.

배포 완료 시 화면에 **새 서버 IP**가 출력됩니다.

---

### 4단계: 인증키 파일 복사 (credentials)

로컬 `fates-system/credentials/` 폴더 내의 토큰 파일들을 새 서버로 전송합니다:

```powershell
# 터미널에서 실행 (새_서버_IP 부분 변경)
scp -r ../credentials/* fates@[새_서버_IP]:~/app/credentials/
```

> **주의:** 새 GCP 프로젝트의 Google Sheets/Drive 접근이 필요하다면 새 프로젝트에서 발급받은 `service-account.json`으로 교체해 주세요.

---

### 5단계: GitHub Secrets 갱신

GitHub 저장소의 **Settings > Secrets and variables > Actions** 에서 값을 새 서버 정보로 업데이트합니다:

- `GCP_HOST`: 테라폼 출력값에 표시된 **새 고정 IP**
- `GCP_USERNAME`: `fates` (또는 지정한 ssh_user)
- `GCP_SSH_KEY`: 등록한 SSH 공개키와 쌍을 이루는 **Private Key (`id_rsa` 내용 전체)**

이후 코드를 `main` 브랜치에 Push하면 GitHub Actions가 새 VM으로 자동 빌드 및 배포를 완료합니다!

---

## 인프라 삭제 (필요 시)

새 계정에서 테스트 후 서버를 완전히 내리고 싶다면:

```powershell
terraform destroy
```
