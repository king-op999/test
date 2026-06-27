// ============================================
// 🔐 BRONX NUMBER OSINT API – API URL LOCKED
// your-app.vercel.app/number?key=demo&num=9876543210
// ============================================
const axios = require('axios');

// ============ CONFIG ============
// 🔐 Real API URL Base64 Encrypted (Hide karo)
const REAL_API_ENCRYPTED = "aHR0cHM6Ly9vc2ludC1icm9ueC11bHRyYS0yLTAub25yZW5kZXIuY29tL2FwaS9rZXktYnJvbngvbnVtYmVy";
const CREDIT = "BRONX_ULTRA";
const DEVELOPER = "BRONX_ULTRA";
const VALID_KEYS = ["demo", "bronx", "free", "test", "demo-ha", "BRONXop"];

// ============ BASE64 DECRYPT ============
function getRealAPI() {
    // Base64 decode karo → real URL
    return Buffer.from(REAL_API_ENCRYPTED, 'base64').toString('utf8');
}

// ============ HELPERS ============
function cleanResponse(data, queryNum) {
    let cleaned = { ...data };
    delete cleaned.credit;
    delete cleaned.owner;
    delete cleaned.by;
    delete cleaned.channel;
    delete cleaned.api_by;
    delete cleaned.key_note;
    delete cleaned.response_time_ms;
    delete cleaned.cached;
    delete cleaned.cached_at;
    
    cleaned.query = queryNum;
    cleaned.credit = CREDIT;
    cleaned.developer = DEVELOPER;
    cleaned.powered_by = "BRONX ULTRA API";
    cleaned.note = "This API is created by BRONX_ULTRA";
    
    return cleaned;
}

// ============ MAIN API HANDLER ============
module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') return res.status(200).end();

    const url = new URL(req.url, `http://${req.headers.host}`);
    const path = url.pathname;
    const params = url.searchParams;

    // ============ HOME PAGE ============
    if (path === '/' || path === '') {
        return res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>🔐 BRONX LOCKED API</title>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        *{margin:0;padding:0;box-sizing:border-box}
        body{background:#000a14;color:#d0d8f0;font-family:'Rajdhani',sans-serif;min-height:100vh;display:flex;justify-content:center;align-items:center;padding:20px}
        body::before{content:'';position:fixed;inset:0;background:radial-gradient(ellipse at 50% 0%,rgba(0,150,255,.06),transparent 60%),radial-gradient(ellipse at 80% 100%,rgba(139,0,255,.04),transparent 60%);pointer-events:none;z-index:0}
        .card{background:rgba(5,15,35,.9);border:1px solid rgba(0,150,255,.1);border-radius:20px;padding:40px;max-width:650px;width:100%;text-align:center;position:relative;z-index:1;backdrop-filter:blur(20px)}
        h1{font-family:'Orbitron',sans-serif;font-size:26px;background:linear-gradient(90deg,#0096ff,#00d4ff,#8b00ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:10px}
        .badge{display:inline-block;background:rgba(0,255,136,.06);color:#00ff88;padding:4px 14px;border-radius:20px;font-size:10px;border:1px solid rgba(0,255,136,.12);margin:4px}
        .section{background:rgba(0,0,0,.5);border:1px solid rgba(0,150,255,.08);border-radius:12px;padding:16px;margin:14px 0;text-align:left}
        code{color:#00ff88;font-family:monospace;font-size:11px;word-break:break-all;display:block;margin:6px 0;background:rgba(0,0,0,.3);padding:8px;border-radius:6px}
        .param{color:#ffb400;font-size:10px;margin:4px 0}
        input,textarea{width:100%;padding:10px;background:rgba(0,0,0,.5);border:1px solid rgba(0,150,255,.08);border-radius:10px;color:#fff;font-size:13px;outline:none;margin:6px 0;font-family:'Rajdhani',sans-serif;resize:vertical}
        input:focus,textarea:focus{border-color:#0096ff}
        button{width:100%;padding:12px;background:linear-gradient(135deg,#0096ff,#0066cc);color:#fff;border:none;border-radius:10px;font-weight:700;cursor:pointer;font-family:'Orbitron',sans-serif;margin:6px 0;transition:.3s}
        button:hover{transform:scale(1.02);box-shadow:0 0 20px rgba(0,150,255,.2)}
        button.green{background:linear-gradient(135deg,#00c853,#009624)}
        .result{background:rgba(0,0,0,.5);border:1px solid rgba(0,255,136,.08);border-radius:10px;padding:14px;margin-top:12px;text-align:left;display:none;max-height:300px;overflow:auto}
        .result.show{display:block}
        .result pre{color:#00ff88;font-family:monospace;font-size:10px;white-space:pre-wrap}
        .lock-icon{font-size:40px;animation:pulse 2s infinite}@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
    </style>
</head>
<body>
<div class="card">
    <div class="lock-icon">🔐</div>
    <h1>BRONX LOCKED API</h1>
    <p style="color:#667;font-size:12px">Real API URL Encrypted • 100% Working</p>
    <div style="margin:10px 0">
        <span class="badge">🔐 Protected</span>
        <span class="badge">📱 Number</span>
        <span class="badge">⚡ Fast</span>
    </div>
    
    <div class="section">
        <p style="color:#0096ff;font-weight:700">🔗 API ENDPOINT</p>
        <code>GET /number?key=demo&num=9876543210</code>
        <p class="param">Simple call with API key</p>
    </div>
    
    <div class="section">
        <p style="color:#00ff88;font-weight:700">🔍 QUICK TEST</p>
        <input type="text" id="numInput" placeholder="Enter phone number (e.g., 9876543210)">
        <button onclick="testAPI()">🔍 LOOKUP</button>
    </div>
    
    <div class="result" id="result">
        <pre id="resultData"></pre>
    </div>
    
    <p style="color:#667;font-size:10px;margin-top:14px">Created by BRONX_ULTRA</p>
</div>
<script>
async function testAPI(){
    var num = document.getElementById('numInput').value.trim();
    if(!num) return alert('Enter number!');
    
    var resultDiv = document.getElementById('result');
    var resultData = document.getElementById('resultData');
    resultDiv.classList.add('show');
    resultData.style.color = '#ffb400';
    resultData.textContent = '🔍 Searching...';
    
    try {
        var resp = await fetch('/number?key=demo&num=' + encodeURIComponent(num));
        var data = await resp.json();
        resultData.style.color = '#00ff88';
        resultData.textContent = JSON.stringify(data, null, 2);
    } catch(e) {
        resultData.style.color = '#ff3366';
        resultData.textContent = '❌ Error: ' + e.message;
    }
}
</script>
</body></html>`);
    }

    // ============ NUMBER API ENDPOINT ============
    if (path === '/number' || path === '/api/number') {
        const key = params.get('key') || '';
        const num = params.get('num') || params.get('number') || '';

        if (!key || !VALID_KEYS.includes(key)) {
            return res.status(403).json({
                status: "error",
                message: `Invalid key. Valid: ${VALID_KEYS.join(', ')}`,
                credit: CREDIT
            });
        }

        if (!num) {
            return res.status(400).json({
                status: "error",
                message: "Missing number. Use: /number?key=demo&num=9876543210",
                credit: CREDIT
            });
        }

        try {
            // ✅ Decrypt real API URL
            const REAL_API = getRealAPI();
            const realUrl = `${REAL_API}?key=BRONX_GOD_TIER_V100&num=${encodeURIComponent(num)}`;
            
            const response = await axios.get(realUrl, { timeout: 30000, headers: { 'User-Agent': 'BRONX-API/1.0' } });
            const result = cleanResponse(response.data, num);
            return res.json(result);
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: "API unavailable. Try again.",
                credit: CREDIT
            });
        }
    }

    // ============ TEST ENDPOINT ============
    if (path === '/test' || path === '/api/test') {
        return res.json({
            status: "✅ ONLINE",
            api: "BRONX NUMBER OSINT (API Locked)",
            endpoint: "/number?key=demo&num=9876543210",
            valid_keys: VALID_KEYS,
            credit: CREDIT,
            developer: DEVELOPER,
            note: "Real API URL is Base64 encrypted inside code"
        });
    }

    // ============ 404 ============
    return res.status(404).json({
        status: "error",
        message: "Not found",
        home: "/",
        test: "/test",
        credit: CREDIT
    });
};
