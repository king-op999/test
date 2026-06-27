from http.server import BaseHTTPRequestHandler
import requests
import json
import urllib.parse
import base64
from datetime import datetime

# ========== 🔐 LOCKED API URL ==========
_LOCKED = "aHR0cHM6Ly9icm9ueC13ZWItYXBpLm9ucmVuZGVyLmNvbS9hcGkva2V5LWJyb254L251bWJlcj9rZXk9e2tleX0mbnVtPXtudW19"

def _unlock():
    return base64.b64decode(_LOCKED).decode('utf-8')

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        params = urllib.parse.parse_qs(parsed.query)
        
        key = params.get('key', [None])[0]
        num = params.get('num', [None])[0]
        
        # CORS Headers
        self.send_response(200)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        self.send_header('Cache-Control', 'no-cache')
        self.end_headers()
        
        # Validation
        if not key or not num:
            res = {
                "status": "error",
                "message": "❌ ?key=KEY&num=NUMBER required",
                "example": "?key=BRONX&num=9876543210",
                "owner": "BRONX HOSTING ⚡"
            }
            self.wfile.write(json.dumps(res, indent=2).encode('utf-8'))
            return
        
        # Clean number
        num = num.replace('+91', '').replace(' ', '').replace('-', '').strip()
        
        if not num.isdigit() or len(num) < 10:
            res = {
                "status": "error",
                "message": "❌ Invalid number! Must be 10 digits.",
                "owner": "BRONX HOSTING ⚡"
            }
            self.wfile.write(json.dumps(res, indent=2).encode('utf-8'))
            return
        
        # 🔓 Unlock & Call Real API
        try:
            real_url = _unlock().format(key=key, num=num)
            
            resp = requests.get(
                real_url,
                timeout=30,
                headers={
                    'User-Agent': 'BRONX-API/1.0',
                    'Accept': 'application/json'
                }
            )
            
            if resp.status_code == 200:
                try:
                    data = resp.json()
                except:
                    data = resp.text
                
                res = {
                    "status": "success",
                    "api_owner": "BRONX HOSTING ⚡",
                    "powered_by": "bronx.com",
                    "data": data,
                    "query": {
                        "key": key,
                        "number": num
                    },
                    "timestamp": datetime.now().isoformat()
                }
            else:
                res = {
                    "status": "error",
                    "message": f"Upstream API Error: {resp.status_code}",
                    "owner": "BRONX HOSTING ⚡"
                }
                
        except requests.exceptions.Timeout:
            res = {
                "status": "error",
                "message": "⏱️ Request timeout! Try again.",
                "owner": "BRONX HOSTING ⚡"
            }
        except requests.exceptions.ConnectionError:
            res = {
                "status": "error",
                "message": "🔌 Cannot connect to API server!",
                "owner": "BRONX HOSTING ⚡"
            }
        except Exception as e:
            res = {
                "status": "error",
                "message": "❌ Service temporarily unavailable",
                "owner": "BRONX HOSTING ⚡"
            }
        
        self.wfile.write(json.dumps(res, indent=2, ensure_ascii=False).encode('utf-8'))
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        self.end_headers()
