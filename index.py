# 🔐 BRONX NUMBER API – RENDER PYTHON
from flask import Flask, request, jsonify
import requests
import base64
import json

app = Flask(__name__)

REAL_API_LOCKED = "aHR0cHM6Ly9vc2ludC1icm9ueC11bHRyYS0yLTAub25yZW5kZXIuY29tL2FwaS9rZXktYnJvbngvbnVtYmVy"
CREDIT = "BRONX_ULTRA"
VALID_KEYS = ["demo", "bronx", "free", "test", "demo-ha", "BRONXop"]

def get_real_url():
    return base64.b64decode(REAL_API_LOCKED).decode('utf8')

def clean_response(data, num):
    data['query'] = num
    data['credit'] = CREDIT
    data['developer'] = "BRONX_ULTRA"
    data['powered_by'] = "BRONX ULTRA API"
    return data

@app.route('/')
def home():
    return jsonify({"status": "BRONX API", "endpoint": "/number?key=demo&num=9876543210"})

@app.route('/test')
def test():
    return jsonify({"status": "Working"})

@app.route('/number')
def number():
    key = request.args.get('key', '')
    num = request.args.get('num', '')
    
    if key not in VALID_KEYS:
        return jsonify({"error": "Invalid key"}), 403
    if not num:
        return jsonify({"error": "Missing num"}), 400
    
    try:
        real_api = get_real_url()
        real_url = f"{real_api}?key=BRONX_GOD_TIER_V100&num={num}"
        resp = requests.get(real_url, timeout=30)
        data = resp.json()
        return jsonify(clean_response(data, num))
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=10000)
