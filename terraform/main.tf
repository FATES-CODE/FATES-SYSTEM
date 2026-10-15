terraform {
  required_version = ">= 1.0"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
  zone    = var.zone
}

resource "google_compute_address" "fates_static_ip" {
  name        = "${var.instance_name}-ip"
  description = "Static IP for FATES system server"
}

resource "google_compute_firewall" "allow_ssh" {
  name        = "allow-ssh-${var.instance_name}"
  network     = "default"
  description = "Allow inbound SSH traffic for deployment"

  allow {
    protocol = "tcp"
    ports    = ["22"]
  }

  source_ranges = ["0.0.0.0/0"]
  target_tags   = ["fates-server"]
}

resource "google_compute_instance" "fates_server" {
  name         = var.instance_name
  machine_type = var.machine_type
  zone         = var.zone
  tags         = ["fates-server"]

  boot_disk {
    initialize_params {
      image = "ubuntu-os-cloud/ubuntu-2204-lts"
      size  = var.boot_disk_size_gb
      type  = "pd-standard"
    }
  }

  network_interface {
    network = "default"
    access_config {
      nat_ip = google_compute_address.fates_static_ip.address
    }
  }

  metadata_startup_script = templatefile("${path.module}/startup.sh.tftpl", {
    app_user = var.ssh_user
  })

  metadata = {
    ssh-keys = "${var.ssh_user}:${file(var.ssh_pub_key_path)}"
  }

  service_account {
    scopes = ["cloud-platform"]
  }
}
