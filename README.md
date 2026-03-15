# Quick Commerce Dark Store Analytics Pipeline

This project analyzes delivery performance and stockout issues for quick commerce dark stores.

The system processes order data using an AWS serverless pipeline and visualizes insights through a dashboard.

## Architecture

S3 (Raw Orders)
↓
AWS Lambda (Data Cleaning & Transformation)
↓
S3 Processed Bucket (Parquet)
↓
AWS Glue (Data Catalog)
↓
Amazon Athena (SQL Analytics)
↓
Dashboard (React + Vite)

## Key Metrics

• Average delivery time  
• Late delivery percentage (>10 minutes)  
• Product stockout frequency  
• Orders per hour  
• Dark store performance comparison  

## Tech Stack

AWS S3  
AWS Lambda  
AWS Glue  
Amazon Athena 
![Athena Query Result](screenshots/athena_query_result.png)
React + Vite Dashboard  

## Dataset

The project uses a simulated quick-commerce order dataset containing:

- order_id
- dark_store_id
- product_category
- order_timestamp
- delivery_timestamp
- out_of_stock_flag

A small sample of the dataset is included in the `data/` folder for reference.

## Running the Dashboard

Install dependencies:

npm install

Start the server:

npm run dev
