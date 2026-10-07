#!/bin/bash
set -e

echo "=========================================="
echo "  FATES System GCP VM 자동 설정 시작"
echo "=========================================="

# 1. 2GB Swap 메모리 생성 (1GB RAM 보호)
if [ ! -f /swapfile ]; then
    echo "[1/5] Swap 2GB 생성 중..."
    sudo fallocate -l 2G /swapfile
    sudo chmod 600 /swapfile
    sudo mkswap /swapfile
    sudo swapon /swapfile
    echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
    echo "Swap 생성 완료!"
else
    echo "[1/5] Swap 이미 존재함. 건너뜁니다."
fi

# 2. 타임존 한국 시간(Asia/Seoul)으로 설정
echo "[2/5] 타임존을 Asia/Seoul 로 변경 중..."
sudo timedatectl set-timezone Asia/Seoul

# 3. Java 17 JRE 설치
echo "[3/5] OpenJDK 17 설치 중..."
sudo apt update -y
sudo apt install -y openjdk-17-jre-headless

# 4. 앱 디렉토리 생성
echo "[4/5] 앱 디렉토리 생성 (~/app)..."
CURRENT_USER=$(whoami)
mkdir -p /home/$CURRENT_USER/app/credentials
mkdir -p /home/$CURRENT_USER/app/logs

# 5. Systemd 서비스 등록
echo "[5/5] Systemd 서비스(fates.service) 등록 중..."
SERVICE_FILE="/etc/systemd/system/fates.service"
sudo tee $SERVICE_FILE > /dev/null <<EOF
[Unit]
Description=FATES System Application
After=network.target

[Service]
User=$CURRENT_USER
WorkingDirectory=/home/$CURRENT_USER/app
ExecStart=/usr/bin/java -Xms128m -Xmx384m -Duser.timezone=Asia/Seoul -jar /home/$CURRENT_USER/app/fates-system-0.0.1-SNAPSHOT.jar
Restart=always
RestartSec=10
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable fates.service

echo "=========================================="
echo "  초기 설정이 완료되었습니다!"
echo "  1) ~/app/ 에 fates-system-0.0.1-SNAPSHOT.jar 업로드"
echo "  2) ~/app/credentials/ 에 인증키 파일들 업로드"
echo "  3) sudo systemctl start fates 명령어로 실행"
echo "=========================================="
