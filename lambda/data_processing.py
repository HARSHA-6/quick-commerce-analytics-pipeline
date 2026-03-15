import boto3
import pandas as pd
import io

s3 = boto3.client('s3')

def lambda_handler(event, context):

    # get bucket and file name
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = event['Records'][0]['s3']['object']['key']

    print("Processing file:", key)

    # read csv file from S3
    response = s3.get_object(Bucket=bucket, Key=key)
    df = pd.read_csv(response['Body'])

    # convert to parquet
    buffer = io.BytesIO()
    df.to_parquet(buffer, index=False)

    # processed bucket
    processed_bucket = "darkstore-processed-harsha"

    # change extension
    new_key = key.replace(".csv", ".parquet")

    # upload parquet file
    s3.put_object(
        Bucket=processed_bucket,
        Key=new_key,
        Body=buffer.getvalue()
    )

    print("Converted and uploaded:", new_key)

    return {
        'statusCode': 200,
        'body': 'File processed successfully'
    }
