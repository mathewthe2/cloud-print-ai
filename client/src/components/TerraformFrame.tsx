import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { duotoneSea } from "react-syntax-highlighter/dist/esm/styles/prism";

const TerraformFrame = () => {
  const codeString = `
provider "google" {
  project = "<your-project-id>"
  region  = "us-central1"  # Replace with your desired region
}

resource "google_compute_instance_template" "default" {
  name          = "content-server-template"
  machine_type  = "e2-medium"
  can_ip_forward = false

  tags = ["http-server"]

  disk {
    auto_delete  = true
    boot         = true
    source_image = "projects/debian-cloud/global/images/family/debian-11"
  }

  network_interface {
    network = "default"

    access_config {
      # Ephemeral IP
    }
  }

  metadata_startup_script = <<-EOT
    #!/bin/bash
    apt-get update && apt-get install -y nginx
    systemctl start nginx
  EOT
}
  `;
  return (
    <>
      <SyntaxHighlighter language="hcl" style={duotoneSea}>
        {codeString}
      </SyntaxHighlighter>
    </>
  );
};
export default TerraformFrame;
