// const example = [
//   {
//     description:
//       "このアーキテクチャは、Cloud Runを使用してサーバーレスでアプリケーションをホストし、Firestoreを使用してデータを保存します。Cloud Load Balancingを使用してトラフィックを分散し、Cloud DNSを使用してドメイン名を管理します。App Engine は、スケーラビリティに優れたバックエンドを提供します。",
//     diagram:
//       "```mermaid\ngraph LR\n    subgraph Google Cloud Platform\n        loadbalanc[Cloud Load Balancing] --> clouddns(Cloud DNS)\n        clouddns --> appen(App Engine)\n        appen --> cloudrun[Cloud Run]\n        cloudrun --> firest[Firestore]\n    end\n```",
//     runningCost: "月額費用は約$50〜$100と見積もられます。",
//     terraform:
//       '```terraform\nresource "google_cloud_run_service" "default" {\n  name     = "my-cloud-run-service"\n  location = "us-central1"\n\n  template {\n    spec {\n      containers {\n        image = "us-docker.pkg.dev/cloudrun/container/hello"\n      }\n    }\n  }\n\n  traffic {\n    percent         = 100\n    latest_revision = true\n  }\n}\n\nresource "google_firestore_database" "default" {\n  name     = "(default)"\n  location = "us-central1"\n  type     = "firestore-native"\n}\n\nresource "google_app_engine_application" "default" {\n  location_id = "us-central"\n  database_type = "CLOUD_FIRESTORE"\n}\n```',
//     title: "サーバーレスアーキテクチャ",
//   },
//   {
//     description:
//       "このアーキテクチャは、Compute Engineを使用して仮想マシンをプロビジョニングし、Cloud Load Balancingを使用してトラフィックを分散します。Cloud SQLを使用してリレーショナルデータベースを管理し、Cloud DNSを使用してドメイン名を管理します。Cloud Storageは静的コンテンツをホストするために使用されます。",
//     diagram:
//       "```mermaid\ngraph LR\n    subgraph Google Cloud Platform\n        loadbalanc[Cloud Load Balancing] --> clouddns(Cloud DNS)\n        clouddns --> computeengine[Compute Engine]\n        computeengine --> cloudsql[Cloud SQL]\n        computeengine --> cloudstorage[Cloud Storage]\n    end\n```",
//     runningCost: "月額費用は約$100〜$200と見積もられます。",
//     terraform:
//       '```terraform\nresource "google_compute_instance" "default" {\n  name         = "my-compute-instance"\n  machine_type = "e2-medium"\n  zone         = "us-central1-a"\n\n  boot_disk {\n    initialize_params {\n      image = "debian-cloud/debian-11"\n    }\n  }\n\n  network_interface {\n    network = "default"\n    access_config {\n    }\n  }\n}\n\nresource "google_sql_database_instance" "default" {\n  name             = "my-cloud-sql-instance"\n  region           = "us-central1"\n  database_version = "MYSQL_8_0"\n  settings {\n    tier = "db-f1-micro"\n  }\n}\n\nresource "google_storage_bucket" "default" {\n  name          = "unique-bucket-name"\n  location      = "US"\n  force_destroy = true\n}\n```',
//     title: "仮想マシンベースのアーキテクチャ",
//   },
//   {
//     description:
//       "このアーキテクチャは、Cloud Functionsを使用してイベントドリブンなアプリケーションを構築し、Firestoreを使用してデータを保存します。Cloud Load Balancingを使用してトラフィックを分散し、Cloud DNSを使用してドメイン名を管理します。Cloud Pub/Subを使用してメッセージキューを実装します。",
//     diagram:
//       "```mermaid\ngraph LR\n    subgraph Google Cloud Platform\n        loadbalanc[Cloud Load Balancing] --> clouddns(Cloud DNS)\n        clouddns --> Cloudfun[Cloud Functions]\n        Cloudfun --> firest[Firestore]\n        Cloudfun --> pubsub[Cloud Pub/Sub]\n    end\n```",
//     runningCost: "月額費用は約$30〜$80と見積もられます。",
//     terraform:
//       '```terraform\nresource "google_cloudfunctions2_function" "default" {\n  name        = "my-cloud-function"\n  location    = "us-central1"\n  description = "A function that triggers from pubsub"\n\n  build_config {\n    runtime     = "nodejs16"\n    entry_point = "helloGET"\n    source {\n      storage_source {\n        bucket = "your-bucket-name"\n        object = "archive.zip"\n      }\n    }\n  }\n\n  service_config {\n    max_instance_count = 3\n    min_instance_count = 1\n    available_memory   = "256M"\n    timeout_seconds    = 60\n  }\n}\n\nresource "google_pubsub_topic" "default" {\n  name = "my-topic"\n}\n```',
//     title: "イベントドリブンアーキテクチャ",
//   },
// ];

// const example = [
//   {
//     description:
//       "このアーキテクチャは、App Engineを使用してアプリケーションをホストし、Cloud Firestoreを使用してデータを保存し、Cloud Functionsを使用してバックエンド処理を実行します。App Engineは自動的にスケーリングされるため、トラフィックの増加に対応できます。Cloud FirestoreはNoSQLデータベースであり、高速でスケーラブルです。Cloud Functionsは、イベント駆動型のバックエンド処理を実行するために使用できます。",
//     diagram:
//       "```mermaid\nflowchart TD\n    subgraph Google Cloud Platform\n        A[Mobile App] --> B(Cloud Load Balancing)\n        B --> C{App Engine}\n        C --> D[Cloud Firestore]\n        C --> E[Cloud Functions]\n    end\n    style A fill:#f9f,stroke:#333,stroke-width:2px\n```",
//     runningCost:
//       "月額費用は、App Engineの使用量、Cloud Firestoreのストレージと読み書きの量、Cloud Functionsの実行回数によって異なりますが、およそ$50 - $200と見積もられます。",
//     terraform:
//       '```terraform\nresource "google_app_engine_application" "app" {\n  project     = "your-project-id"\n  location_id = "us-central"\n}\n\nresource "google_firestore_database" "default" {\n  project     = "your-project-id"\n  name     = "(default)"\n  location_id = "us-central"\n  type = "NATIVE"\n}\n\n\nresource "google_cloudfunctions2_function" "function" {\n  project     = "your-project-id"\n  name        = "function-example"\n  location    = "us-central1"\n  build_config {\n    runtime     = "nodejs16"\n    entry_point = "helloHttp"\n    source {\n      storage_source {\n        bucket = "your-bucket-name"\n        object = "function-source.zip"\n      }\n    }\n  }\n  service_config {\n    max_instance_count = 5\n    min_instance_count = 1\n    available_memory   = "256M"\n    timeout_seconds    = 60\n  }\n}\n```',
//     title:
//       "App Engine、Cloud Firestore、Cloud Functionsを使用したサーバーレスアーキテクチャ",
//   },
//   {
//     description:
//       "このアーキテクチャは、Compute Engineを使用してアプリケーションをホストし、Cloud SQLを使用してデータを保存します。Compute Engineは、仮想マシンを提供し、アプリケーションを柔軟に構成できます。Cloud SQLは、マネージドなリレーショナルデータベースサービスであり、MySQL、PostgreSQL、SQL Serverをサポートしています。",
//     diagram:
//       "```mermaid\nflowchart TD\n    subgraph Google Cloud Platform\n        A[Mobile App] --> B(Cloud Load Balancing)\n        B --> C(Compute Engine)\n        C --> D[Cloud SQL]\n    end\n    style A fill:#f9f,stroke:#333,stroke-width:2px\n```",
//     runningCost:
//       "月額費用は、Compute Engineのインスタンスサイズ、Cloud SQLのデータベースサイズ、およびネットワークトラフィックによって異なりますが、およそ$100 - $500と見積もられます。",
//     terraform:
//       '```terraform\nresource "google_compute_instance" "default" {\n  project      = "your-project-id"\n  name         = "vm-instance"\n  machine_type = "e2-medium"\n  zone         = "us-central1-a"\n\n  boot_disk {\n    initialize_params {\n      image = "debian-cloud/debian-11"\n    }\n  }\n\n  network_interface {\n    network = "default"\n\n    access_config {\n    }\n  }\n}\n\nresource "google_sql_database_instance" "default" {\n  project             = "your-project-id"\n  name                = "sql-instance"\n  region              = "us-central1"\n  database_version  = "MYSQL_8_0"\n  settings {\n    tier = "db-f1-micro"\n  }\n  deletion_protection  = false\n}\n```',
//     title: "Compute EngineとCloud SQLを使用した仮想マシンアーキテクチャ",
//   },
//   {
//     description:
//       "このアーキテクチャは、Kubernetes Engine (GKE) を使用してアプリケーションをホストし、Cloud Spannerを使用してデータを保存します。GKEは、コンテナ化されたアプリケーションをデプロイ、スケーリング、および管理するためのマネージドなKubernetesサービスです。Cloud Spannerは、グローバルに分散された、スケーラブルな、一貫性のあるデータベースサービスです。",
//     diagram:
//       "```mermaid\nflowchart TD\n    subgraph Google Cloud Platform\n        A[Mobile App] --> B(Cloud Load Balancing)\n        B --> C(Kubernetes Engine)\n        C --> D[Cloud Spanner]\n    end\n    style A fill:#f9f,stroke:#333,stroke-width:2px\n```",
//     runningCost:
//       "月額費用は、GKEのノード数、Cloud Spannerのストレージとコンピューティングユニット、およびネットワークトラフィックによって大きく異なりますが、およそ$500 - $2000と見積もられます。",
//     terraform:
//       '```terraform\nresource "google_container_cluster" "primary" {\n  project = "your-project-id"\n  name     = "gke-cluster"\n  location = "us-central1-a"\n  initial_node_count = 1\n}\n\nresource "google_spanner_instance" "default" {\n  project = "your-project-id"\n  name             = "spanner-instance"\n  config           = "regional-us-central1"\n  display_name     = "Test Spanner Instance"\n  num_nodes        = 1\n}\n```',
//     title:
//       "Kubernetes Engine (GKE) と Cloud Spanner を使用したコンテナオーケストレーションアーキテクチャ",
//   },
// ];

const checkInSystem = [
  {
    description:
      "このアーキテクチャは、Cloud Functions、Firestore、およびCloud Schedulerを使用して、スケーラブルで費用対効果の高い勤怠システムを構築します。Cloud Functionsは、ユーザー認証、勤怠記録の作成、レポート生成などのバックエンドロジックを実行します。Firestoreは、勤怠データ、ユーザーデータ、およびその他のシステムデータを格納します。Cloud Schedulerは、定期的なタスク（レポート生成など）をスケジュールします。",
    diagram:
      "graph LR\n    subgraph Google Cloud Platform\n        A[Cloud Functions] --> B(Firestore)\n        C[Cloud Scheduler] --> A\n        D[Identity Platform] --> A\n        E[Cloud Storage] --> A\n        F[BigQuery] --> A\n        style A fill:#fff,stroke:#bbb,stroke-width:2px\n        style B fill:#fff,stroke:#bbb,stroke-width:2px\n        style C fill:#fff,stroke:#bbb,stroke-width:2px\n        style D fill:#fff,stroke:#bbb,stroke-width:2px\n        style E fill:#fff,stroke:#bbb,stroke-width:2px\n        style F fill:#fff,stroke:#bbb,stroke-width:2px\n    end\n    subgraph Users\n        U[Users] --> D\n        U --> G[Web/Mobile App]\n        G --> A\n    end",
    runningCost: "月額費用：約$150",
    terraform:
      'resource "google_cloudfunctions_function" "attendance_function" {\n  name        = "attendance-function"\n  description = "Cloud Function for attendance management"\n  runtime     = "nodejs16"\n\n  available_memory_mb = 256\n  source_archive_bucket = "your-bucket-name"\n  source_archive_object = "function-source.zip"\n  trigger_http = true\n\n  ingress_settings = "ALLOW_ALL"\n}\n\nresource "google_firestore_database" "default" {\n  name     = "(default)"\n  project  = "your-project-id"\n  location = "us-central"\n  type     = "firestore-native"\n}\n\nresource "google_cloudscheduler_job" "attendance_report" {\n  name             = "attendance-report-job"\n  description      = "Generates daily attendance report"\n  schedule         = "0 9 * * *"\n  time_zone        = "America/Los_Angeles"\n  project          = "your-project-id"\n\n  http_target {\n    http_method = "POST"\n    uri         = "${google_cloudfunctions_function.attendance_function.https_trigger_url}"\n  }\n}',
    title: "Cloud FunctionsとFirestoreを使用した勤怠システム",
  },
  {
    description:
      "このアーキテクチャは、App Engine、Cloud SQL、およびCloud Storageを使用して、より従来の勤怠システムを構築します。App Engineは、フロントエンドとバックエンドのロジックを実行します。Cloud SQLは、勤怠データ、ユーザーデータ、およびその他のシステムデータを格納します。Cloud Storageは、レポートやその他のファイルを格納します。",
    diagram:
      "graph LR\n    subgraph Google Cloud Platform\n        A[App Engine] --> B(Cloud SQL)\n        A --> C(Cloud Storage)\n        D[Identity Platform] --> A\n        E[Cloud Logging] --> A\n        style A fill:#fff,stroke:#bbb,stroke-width:2px\n        style B fill:#fff,stroke:#bbb,stroke-width:2px\n        style C fill:#fff,stroke:#bbb,stroke-width:2px\n        style D fill:#fff,stroke:#bbb,stroke-width:2px\n        style E fill:#fff,stroke:#bbb,stroke-width:2px\n    end\n    subgraph Users\n        U[Users] --> D\n        U --> F[Web/Mobile App]\n        F --> A\n    end",
    runningCost: "月額費用：約$250",
    terraform:
      'resource "google_app_engine_application" "app" {\n  project  = "your-project-id"\n  location = "us-central"\n}\n\nresource "google_sql_database_instance" "default" {\n  name             = "attendance-db"\n  region           = "us-central1"\n  database_version = "MYSQL_8_0"\n  settings {\n    tier = "db-f1-micro"\n  }\n  project = "your-project-id"\n  deletion_protection  = false\n}\n\nresource "google_storage_bucket" "bucket" {\n  name          = "your-unique-bucket-name"\n  location      = "US"\n  force_destroy = true\n}',
    title: "App EngineとCloud SQLを使用した勤怠システム",
  },
  {
    description:
      "このアーキテクチャは、Compute Engine、Cloud Load Balancing、およびCloud SQLを使用して、より高度な勤怠システムを構築します。Compute Engineは、フロントエンドとバックエンドのロジックを実行します。Cloud Load Balancingは、トラフィックをCompute Engineインスタンスに分散します。Cloud SQLは、勤怠データ、ユーザーデータ、およびその他のシステムデータを格納します。",
    diagram:
      "graph LR\n    subgraph Google Cloud Platform\n        A[Compute Engine] --> B(Cloud SQL)\n        C[Cloud Load Balancing] --> A\n        D[Identity Platform] --> A\n        E[Cloud Monitoring] --> A\n        style A fill:#fff,stroke:#bbb,stroke-width:2px\n        style B fill:#fff,stroke:#bbb,stroke-width:2px\n        style C fill:#fff,stroke:#bbb,stroke-width:2px\n        style D fill:#fff,stroke:#bbb,stroke-width:2px\n        style E fill:#fff,stroke:#bbb,stroke-width:2px\n    end\n    subgraph Users\n        U[Users] --> D\n        U --> F[Web/Mobile App]\n        F --> C\n    end",
    runningCost: "月額費用：約$400",
    terraform:
      'resource "google_compute_network" "vpc_network" {\n  name                    = "attendance-vpc"\n  auto_create_subnetworks = false\n  project                 = "your-project-id"\n}\n\nresource "google_compute_firewall" "firewall" {\n  name    = "attendance-firewall"\n  network = google_compute_network.vpc_network.name\n  allow {\n    protocol = "tcp"\n    ports    = ["80", "443", "22"]\n  }\n  project = "your-project-id"\n}\n\nresource "google_compute_instance" "default" {\n  name         = "attendance-vm"\n  machine_type = "e2-medium"\n  zone         = "us-central1-a"\n  project      = "your-project-id"\n  boot_disk {\n    initialize_params {\n      image = "debian-cloud/debian-11"\n    }\n  }\n  network_interface {\n    network = google_compute_network.vpc_network.name\n    access_config {\n    }\n  }\n}',
    title: "Compute EngineとCloud Load Balancingを使用した勤怠システム",
  },
];

const example = [
  {
    description:
      "このアーキテクチャは、Cloud Runを使用してゲームサーバーをホストし、Cloud SQLを使用してゲームデータを保存します。Cloud MonitoringとCloud Loggingは、サーバーの監視とログ記録に使用されます。Cloud Load Balancingは、トラフィックを複数のCloud Runインスタンスに分散します。",
    diagram:
      "```mermaid\ngraph LR\n    A[ユーザー] --> B(Cloud Load Balancing)\n    B --> C{Cloud Run}\n    C --> D[(Cloud SQL)]\n    E[Cloud Monitoring] -- モニタリング --> C\n    F[Cloud Logging] -- ログ --> C\n    style A fill:#f9f,stroke:#333,stroke-width:2px\n```",
    runningCost: "月額約500 USD",
    terraform:
      '```terraform\nresource "google_cloud_run_v2_service" "default" {\n  name     = "game-server"\n  location = "us-central1"\n\n  template {\n    containers {\n      image = "us-docker.pkg.dev/cloudrun/container/hello"\n    }\n  }\n\n  traffic {\n    type    = "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST"\n    percent = 100\n  }\n}\n\nresource "google_sql_database_instance" "default" {\n  name             = "game-db"\n  region           = "us-central1"\n  database_version = "MYSQL_8_0"\n  settings {\n    tier = "db-f1-micro"\n  }\n}\n\nresource "google_monitoring_uptime_check_config" "default" {\n  display_name = "Game Server Uptime Check"\n  host_name    = "game-server.example.com" # Replace with your Cloud Run service URL\n  period       = "300s"\n  timeout      = "60s"\n  http_check {\n    path = "/health"\n    port = 80\n  }\n  monitored_resource {\n    type = "uptime_url"\n  }\n}\n\nresource "google_logging_metric" "error_count" {\n  name        = "error-count"\n  description = "Counts error logs from the game server"\n  filter      = "resource.type=\\"cloud_run_revision\\" AND severity>=ERROR"\n  metric_descriptor {\n    metric_kind = "COUNTER"\n    value_type  = "INT64"\n  }\n}\n```',
    title: "Cloud RunとCloud SQLを使用したモバイルゲームサーバー",
  },
  {
    description:
      "このアーキテクチャは、Compute Engineを使用してゲームサーバーをホストし、Firestoreを使用してゲームデータを保存します。Cloud MonitoringとCloud Loggingは、サーバーの監視とログ記録に使用されます。Global Load Balancerは、トラフィックを複数のCompute Engineインスタンスに分散します。",
    diagram:
      "```mermaid\ngraph LR\n    A[ユーザー] --> B(Global Load Balancer)\n    B --> C((Compute Engine))\n    C --> D[Firestore]\n    E[Cloud Monitoring] -- モニタリング --> C\n    F[Cloud Logging] -- ログ --> C\n    style A fill:#f9f,stroke:#333,stroke-width:2px\n```",
    runningCost: "月額約700 USD",
    terraform:
      '```terraform\nresource "google_compute_instance" "default" {\n  name         = "game-server-vm"\n  machine_type = "e2-medium"\n  zone         = "us-central1-a"\n\n  boot_disk {\n    initialize_params {\n      image = "debian-cloud/debian-11"\n    }\n  }\n\n  network_interface {\n    network = "default"\n    access_config {\n    }\n  }\n\n  metadata = {\n    startup-script = "#!/bin/bash\\napt-get update\\napt-get install -y nginx\\nsystemctl start nginx"\n  }\n}\n\nresource "google_firestore_database" "default" {\n  name     = "default"\n  location = "us-central1"\n  type     = "FIRESTORE_NATIVE"\n}\n\nresource "google_monitoring_uptime_check_config" "default" {\n  display_name = "Game Server Uptime Check"\n  host_name    = "game-server-vm.us-central1-a.c.PROJECT_ID.internal" # Replace with your Compute Engine instance internal IP\n  period       = "300s"\n  timeout      = "60s"\n  http_check {\n    path = "/"\n    port = 80\n  }\n  monitored_resource {\n    type = "uptime_url"\n  }\n}\n\nresource "google_logging_metric" "error_count" {\n  name        = "error-count"\n  description = "Counts error logs from the game server"\n  filter      = "resource.type=\\"gce_instance\\" AND severity>=ERROR"\n  metric_descriptor {\n    metric_kind = "COUNTER"\n    value_type  = "INT64"\n  }\n}\n```',
    title: "Compute EngineとFirestoreを使用したモバイルゲームサーバー",
  },
  {
    description:
      "このアーキテクチャは、Google Kubernetes Engine（GKE）を使用してゲームサーバーをホストし、Cloud Spannerを使用してゲームデータを保存します。Cloud MonitoringとCloud Loggingは、サーバーの監視とログ記録に使用されます。Cloud Load Balancingは、トラフィックを複数のGKEポッドに分散します。",
    diagram:
      "```mermaid\ngraph LR\n    A[ユーザー] --> B(Cloud Load Balancing)\n    B --> C{{GKE}}\n    C --> D((Cloud Spanner))\n    E[Cloud Monitoring] -- モニタリング --> C\n    F[Cloud Logging] -- ログ --> C\n    style A fill:#f9f,stroke:#333,stroke-width:2px\n```",
    runningCost: "月額約1000 USD",
    terraform:
      '```terraform\nresource "google_container_cluster" "default" {\n  name     = "game-cluster"\n  location = "us-central1"\n  initial_node_count = 1\n\n  node_config {\n    machine_type = "e2-medium"\n  }\n}\n\nresource "google_spanner_instance" "default" {\n  name             = "game-spanner"\n  config           = "regional-us-central1"\n  display_name     = "Game Spanner Instance"\n  num_nodes        = 1\n}\n\nresource "google_monitoring_uptime_check_config" "default" {\n  display_name = "Game Server Uptime Check"\n  host_name    = "game-server.example.com" # Replace with your GKE service URL\n  period       = "300s"\n  timeout      = "60s"\n  http_check {\n    path = "/health"\n    port = 80\n  }\n  monitored_resource {\n    type = "uptime_url"\n  }\n}\n\nresource "google_logging_metric" "error_count" {\n  name        = "error-count"\n  description = "Counts error logs from the game server"\n  filter      = "resource.type=\\"k8s_container\\" AND severity>=ERROR"\n  metric_descriptor {\n    metric_kind = "COUNTER"\n    value_type  = "INT64"\n  }\n}\n```',
    title: "GKEとCloud Spannerを使用したモバイルゲームサーバー",
  },
];

const examples = {
  checkInSystem: checkInSystem,
  game: example,
};
export default examples;
