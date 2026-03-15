# Quick Commerce Dark Store Analytics Pipeline

This project implements an end-to-end serverless AWS data pipeline for analyzing operational performance of quick commerce dark stores.

The system ingests raw order data, processes it automatically using AWS services, and enables SQL-based analytics through Amazon Athena. The results are visualized using a React-based dashboard.

---

# Architecture

The pipeline follows a **serverless data lake architecture**:

Data Ingestion Layer
EC2 Auto Scaling Group (inside VPC)
↓
Amazon S3 Raw Data Lake
↓
AWS Lambda ETL (CSV → Parquet)
↓
Amazon S3 Processed Data
↓
AWS Glue Data Catalog
↓
Amazon Athena Analytics
↓
React Operations Dashboard

![Pipeline Architecture](architecture/architecture.png)

---

# AWS Services Used

This project leverages multiple AWS services to build a scalable serverless data pipeline:

- **Amazon S3** – Data lake storage for raw and processed datasets
- **AWS Lambda** – Serverless ETL processing
- **AWS Glue** – Metadata catalog and schema discovery
- **Amazon Athena** – Serverless SQL analytics on S3
- **Amazon EC2** – Data ingestion simulation
- **EC2 Auto Scaling** – Scalable ingestion infrastructure
- **Amazon VPC** – Network isolation for compute resources

---

# Data Pipeline Flow

1. Order datasets are uploaded to the **raw S3 bucket**.
2. An **S3 event trigger** invokes the Lambda ETL function.
3. The Lambda function cleans the dataset and converts **CSV to Parquet**.
4. Processed data is stored in the **processed S3 bucket**.
5. A **Glue crawler** catalogs the dataset and updates the schema.
6. **Amazon Athena** enables SQL queries directly on the data lake.
7. The **React dashboard** visualizes insights derived from Athena analytics.

---

# AWS Infrastructure

## Lambda ETL Function

The Lambda function `darkstore-etl` is triggered when a new CSV file is uploaded to the raw S3 bucket `darkstore-raw-harsha`.

The function performs the following steps:

- Reads raw CSV order data from Amazon S3
- Converts the dataset to **Parquet format**
- Writes the processed file to the processed S3 bucket

Example ETL logic:

```python
import boto3
import pandas as pd
import io

s3 = boto3.client('s3')

def lambda_handler(event, context):

    bucket = event['Records'][0]['s3']['bucket']['name']
    key = event['Records'][0]['s3']['object']['key']

    response = s3.get_object(Bucket=bucket, Key=key)
    df = pd.read_csv(response['Body'])

    buffer = io.BytesIO()
    df.to_parquet(buffer, index=False)

    processed_bucket = "darkstore-processed-harsha"
    new_key = key.replace(".csv", ".parquet")

    s3.put_object(
        Bucket=processed_bucket,
        Key=new_key,
        Body=buffer.getvalue()
    )
```

The full implementation can be found here:

[lambda/data_processing.py](lambda/data_processing.py)

The Lambda function is configured with an **S3 event trigger** on the `darkstore-raw-harsha` bucket for `.csv` object creation events. When a new order file is uploaded, the ETL function executes automatically.

![Lambda Function](screenshots/lambda_function.png)

---

## S3 Data Lake Buckets

The project uses three S3 buckets:

| Bucket                     | Purpose                         |
| -------------------------- | ------------------------------- |
| darkstore-raw-harsha       | Stores raw CSV order data       |
| darkstore-processed-harsha | Stores cleaned Parquet datasets |
| darkstore-query-results    | Stores Athena query outputs     |

![S3 Buckets](screenshots/s3_buckets.png)

---

## AWS Glue Data Catalog

AWS Glue is used to automatically catalog the processed datasets stored in Amazon S3.

A **Glue Crawler** scans the Parquet files stored in the processed data bucket:

`darkstore-processed-harsha`

The crawler automatically infers the schema and registers a table in the AWS Glue Data Catalog.

**Catalog details**

Database:
```
darkstore_db
```

Table:
```
darkstore_processed_harsha
```

This cataloged table allows Amazon Athena to run SQL queries directly on the processed Parquet data stored in S3.

---

# Athena Analytics

Amazon Athena is used to run SQL queries directly on the processed Parquet data stored in S3.

Example query used to calculate **average delivery time per dark store**:

```sql
SELECT
    dark_store_id,
    AVG(
        date_diff(
            'minute',
            CAST(order_timestamp AS timestamp),
            CAST(delivery_timestamp AS timestamp)
        )
    ) AS avg_delivery_time_minutes
FROM darkstore_processed_harsha
GROUP BY dark_store_id
ORDER BY avg_delivery_time_minutes;
```

Example Athena query execution:

![Athena Query Result](screenshots/athena_query_result.png)

Athena query outputs are automatically stored in the S3 bucket:

```
darkstore-query-results
```

---

# Key Metrics Analyzed

The pipeline enables analysis of key operational metrics for quick commerce dark stores:

* Average delivery time per dark store
* Percentage of late deliveries (>10 minutes)
* Product stockout frequency
* Orders by hour
* Dark store performance comparison

These insights help identify **delivery inefficiencies, inventory shortages, and operational bottlenecks**.

---

# Tech Stack

## Cloud & Data Engineering

* AWS S3 (Data Lake Storage)
* AWS Lambda (Serverless Data Processing)
* AWS Glue (Metadata Catalog)
* Amazon Athena (Serverless SQL Analytics)

## Frontend Visualization

* React
* Vite
* TypeScript
* Chart-based analytics dashboard

---

# Dataset

The project uses a **simulated quick commerce order dataset** representing dark store delivery operations.

Dataset schema:

* order_id
* dark_store_id
* product_category
* order_timestamp
* delivery_timestamp
* out_of_stock_flag

A small dataset sample is included in:

```
data/sample_orders.csv
```

This sample dataset demonstrates the structure used by the ETL pipeline.

---

# Repository Structure

```
quick-commerce-analytics-pipeline
│
├── architecture
│   └── architecture.png
│
├── athena_queries
│   └── delivery_analysis.sql
│
├── dashboard
│
├── lambda
│   └── data_processing.py
│
├── screenshots
│   ├── lambda_function.png
│   ├── s3_buckets.png
│   └── athena_query_result.png
│
├── data
│   └── sample_orders.csv
│
└── README.md
```

---

# Running the Dashboard

Install dependencies:

```
npm install
```

Start the development server:

```
npm run dev
```

The dashboard visualizes analytics generated from the pipeline.

## Dashboard Visualization

The React dashboard visualizes operational analytics derived from the Athena query results.

For demonstration purposes, the dashboard uses **pre-computed analytics outputs exported from Amazon Athena** rather than executing live Athena queries.

This approach keeps the frontend lightweight while still demonstrating how analytics insights can be visualized in a real-world operations dashboard.

---

# Project Outcome

This project demonstrates how **serverless AWS services can be combined to build a lightweight data engineering pipeline**.

The pipeline enables:

* automated data ingestion
* scalable serverless data processing
* SQL-based analytics on a data lake
* interactive dashboard visualization

It provides a practical example of an **end-to-end cloud data engineering workflow** using modern AWS services.
