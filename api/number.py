from http.server import BaseHTTPRequestHandler
import requests
import json
import urllib.parse
import base64
from datetime import datetime

# ========== 🔐 LOCKED API URL (Base64 Encrypted) ==========
# Original: https://bronx-web-api.onrender.com/api/key-bronx/number?key={key}&num={num}
_LOCKED = "aHR0cHM6Ly9icm9ueC13ZWItYXBpLm9ucmVuZGVyLmNvbS9hcGkva2V5LWJyb254L251bWJlcj9rZXk9e2tleX0mbnVtPXtudW19"

def _unlock():
    """Decrypt API URL"""
    return base64.b64decode(_LOCKED).decode('utf-8')

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        # Parse query
        parsed = urllib.parse.urlparse(self.path)
        params = urllib.parse.parse_qs(parsed.query)
        
        key = params.get('key', [None])[0]
        num = params.get('num', [None])[0]
        
        # CORS
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        self.end_headers()
        
        # Validate
        if not key or not num:
            res = {"status": "error", "message": "?key=KEY&num=NUMBER required", "owner": "BRONX HOSTING ⚡"}
            self.wfile.write(json.dumps(res, indent=2).encode())
            return
        
        # Clean number
        num = num.replace('+91', '').replace(' ', '').strip()
        
        # 🔓 Unlock & Call Real API
        try:
            real_url = _unlock().format(key=key, num=num)
            
            resp = requests.get(real_url, timeout=30, headers={
                'User-Agent': 'BRONX-API-LOCKED/1.0',
                'Accept': 'application/json'
            })
            
            if resp.status_code == 200:
                data = resp.json()
                res = {
                    "status": "success",
                    "api_owner": "BRONX HOSTING ⚡",
                    "powered_by": "bronx.com",
                    "data": data,
                    "query": {"key": key, "number": num},
                    "timestamp": datetime.now().isoformat()
                }
            else:
                res = {"status": "error", "message": f"API Error: {resp.status_code}", "owner": "BRONX HOSTING ⚡"}
                
        except Exception as e:
            res = {"status": "error", "message": "Service unavailable", "owner": "BRONX HOSTING ⚡"}
        
        self.wfile.write(json.dumps(res, indent=2).encode())
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        self.end_headers()
