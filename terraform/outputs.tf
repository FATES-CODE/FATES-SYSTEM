output "instance_name" {
  description = "VM 인스턴스 이름"
  value       = google_compute_instance.fates_server.name
}

output "instance_external_ip" {
  description = "VM 외부 고정 IP (GitHub Secrets의 GCP_HOST 값)"
  value       = google_compute_address.fates_static_ip.address
}

output "ssh_command" {
  description = "SSH 접속 명령어"
  value       = "ssh ${var.ssh_user}@${google_compute_address.fates_static_ip.address}"
}

output "next_steps" {
  description = "배포 완료 후 해야 할 작업 안내"
  value       = <<-EOT
  ==============================================================
  1) 새 서버 IP: ${google_compute_address.fates_static_ip.address}
  2) GitHub Repository > Settings > Secrets and variables > Actions:
     - GCP_HOST: ${google_compute_address.fates_static_ip.address}
     - GCP_USERNAME: ${var.ssh_user}
     - GCP_SSH_KEY: [해당 SSH Private Key]
  3) credentials 파일 업로드:
     scp credentials/* ${var.ssh_user}@${google_compute_address.fates_static_ip.address}:~/app/credentials/
  4) GitHub main/master 브랜치에 push 하면 자동 배포 완료!
  ==============================================================
  EOT
}
