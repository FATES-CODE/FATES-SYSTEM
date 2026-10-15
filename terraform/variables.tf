variable "project_id" {
  description = "GCP Project ID"
  type        = string
}

variable "region" {
  description = "GCP Region (e.g. asia-northeast3 for Seoul, us-central1 for US)"
  type        = string
  default     = "asia-northeast3"
}

variable "zone" {
  description = "GCP Zone"
  type        = string
  default     = "asia-northeast3-a"
}

variable "instance_name" {
  description = "Compute Engine VM Name"
  type        = string
  default     = "fates-server"
}

variable "machine_type" {
  description = "VM machine type (e.g. e2-micro, e2-small, e2-medium)"
  type        = string
  default     = "e2-micro"
}

variable "boot_disk_size_gb" {
  description = "Boot disk size in GB"
  type        = number
  default     = 20
}

variable "ssh_user" {
  description = "SSH username for VM (e.g. fates or your gcp user)"
  type        = string
  default     = "fates"
}

variable "ssh_pub_key_path" {
  description = "Path to SSH public key (e.g. ~/.ssh/id_rsa.pub)"
  type        = string
  default     = "~/.ssh/id_rsa.pub"
}
