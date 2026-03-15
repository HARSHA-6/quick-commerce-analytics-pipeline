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
