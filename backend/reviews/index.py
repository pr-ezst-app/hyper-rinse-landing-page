"""Reviews API — fetch paginated reviews and submit new ones."""
import json
import os
import psycopg2

CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}

def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])

def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    method = event.get("httpMethod", "GET")

    if method == "GET":
        params = event.get("queryStringParameters") or {}
        offset = int(params.get("offset", 0))
        limit = int(params.get("limit", 3))

        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            "SELECT id, name, stars, service, text, to_char(created_at, 'Mon YYYY') FROM reviews ORDER BY created_at DESC LIMIT %s OFFSET %s",
            (limit, offset)
        )
        rows = cur.fetchall()
        cur.execute("SELECT COUNT(*), COALESCE(ROUND(AVG(stars)::numeric, 1), 0) FROM reviews")
        count, avg = cur.fetchone()
        cur.close()
        conn.close()

        reviews = [
            {"id": r[0], "name": r[1], "stars": r[2], "service": r[3], "text": r[4], "date": r[5]}
            for r in rows
        ]
        return {
            "statusCode": 200,
            "headers": CORS,
            "body": json.dumps({"reviews": reviews, "total": count, "avg": float(avg)}),
        }

    if method == "POST":
        body = json.loads(event.get("body") or "{}")
        name = (body.get("name") or "").strip()
        stars = int(body.get("stars", 0))
        service = (body.get("service") or "General").strip()
        text = (body.get("text") or "").strip()

        if not name or not text or stars < 1 or stars > 5:
            return {"statusCode": 400, "headers": CORS, "body": json.dumps({"error": "Invalid input"})}

        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO reviews (name, stars, service, text) VALUES (%s, %s, %s, %s) RETURNING id",
            (name, stars, service, text)
        )
        new_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        conn.close()

        return {"statusCode": 201, "headers": CORS, "body": json.dumps({"id": new_id})}

    return {"statusCode": 405, "headers": CORS, "body": json.dumps({"error": "Method not allowed"})}
