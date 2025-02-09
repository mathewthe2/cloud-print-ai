const example = [
  {
    description:
      "このアーキテクチャは、Cloud Runを使用してサーバーレスでアプリケーションをホストし、Firestoreを使用してデータを保存します。Cloud Load Balancingを使用してトラフィックを分散し、Cloud DNSを使用してドメイン名を管理します。App Engine は、スケーラビリティに優れたバックエンドを提供します。",
    diagram:
      "```mermaid\ngraph LR\n    subgraph Google Cloud Platform\n        loadbalanc[Cloud Load Balancing] --> clouddns(Cloud DNS)\n        clouddns --> appen(App Engine)\n        appen --> cloudrun[Cloud Run]\n        cloudrun --> firest[Firestore]\n    end\n```",
    runningCost: "月額費用は約$50〜$100と見積もられます。",
    terraform:
      '```terraform\nresource "google_cloud_run_service" "default" {\n  name     = "my-cloud-run-service"\n  location = "us-central1"\n\n  template {\n    spec {\n      containers {\n        image = "us-docker.pkg.dev/cloudrun/container/hello"\n      }\n    }\n  }\n\n  traffic {\n    percent         = 100\n    latest_revision = true\n  }\n}\n\nresource "google_firestore_database" "default" {\n  name     = "(default)"\n  location = "us-central1"\n  type     = "firestore-native"\n}\n\nresource "google_app_engine_application" "default" {\n  location_id = "us-central"\n  database_type = "CLOUD_FIRESTORE"\n}\n```',
    title: "サーバーレスアーキテクチャ",
  },
  {
    description:
      "このアーキテクチャは、Compute Engineを使用して仮想マシンをプロビジョニングし、Cloud Load Balancingを使用してトラフィックを分散します。Cloud SQLを使用してリレーショナルデータベースを管理し、Cloud DNSを使用してドメイン名を管理します。Cloud Storageは静的コンテンツをホストするために使用されます。",
    diagram:
      "```mermaid\ngraph LR\n    subgraph Google Cloud Platform\n        loadbalanc[Cloud Load Balancing] --> clouddns(Cloud DNS)\n        clouddns --> computeengine[Compute Engine]\n        computeengine --> cloudsql[Cloud SQL]\n        computeengine --> cloudstorage[Cloud Storage]\n    end\n```",
    runningCost: "月額費用は約$100〜$200と見積もられます。",
    terraform:
      '```terraform\nresource "google_compute_instance" "default" {\n  name         = "my-compute-instance"\n  machine_type = "e2-medium"\n  zone         = "us-central1-a"\n\n  boot_disk {\n    initialize_params {\n      image = "debian-cloud/debian-11"\n    }\n  }\n\n  network_interface {\n    network = "default"\n    access_config {\n    }\n  }\n}\n\nresource "google_sql_database_instance" "default" {\n  name             = "my-cloud-sql-instance"\n  region           = "us-central1"\n  database_version = "MYSQL_8_0"\n  settings {\n    tier = "db-f1-micro"\n  }\n}\n\nresource "google_storage_bucket" "default" {\n  name          = "unique-bucket-name"\n  location      = "US"\n  force_destroy = true\n}\n```',
    title: "仮想マシンベースのアーキテクチャ",
  },
  {
    description:
      "このアーキテクチャは、Cloud Functionsを使用してイベントドリブンなアプリケーションを構築し、Firestoreを使用してデータを保存します。Cloud Load Balancingを使用してトラフィックを分散し、Cloud DNSを使用してドメイン名を管理します。Cloud Pub/Subを使用してメッセージキューを実装します。",
    diagram:
      "```mermaid\ngraph LR\n    subgraph Google Cloud Platform\n        loadbalanc[Cloud Load Balancing] --> clouddns(Cloud DNS)\n        clouddns --> Cloudfun[Cloud Functions]\n        Cloudfun --> firest[Firestore]\n        Cloudfun --> pubsub[Cloud Pub/Sub]\n    end\n```",
    runningCost: "月額費用は約$30〜$80と見積もられます。",
    terraform:
      '```terraform\nresource "google_cloudfunctions2_function" "default" {\n  name        = "my-cloud-function"\n  location    = "us-central1"\n  description = "A function that triggers from pubsub"\n\n  build_config {\n    runtime     = "nodejs16"\n    entry_point = "helloGET"\n    source {\n      storage_source {\n        bucket = "your-bucket-name"\n        object = "archive.zip"\n      }\n    }\n  }\n\n  service_config {\n    max_instance_count = 3\n    min_instance_count = 1\n    available_memory   = "256M"\n    timeout_seconds    = 60\n  }\n}\n\nresource "google_pubsub_topic" "default" {\n  name = "my-topic"\n}\n```',
    title: "イベントドリブンアーキテクチャ",
  },
];
export default example;
