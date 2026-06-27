// ============================================
// 🔐 BRONX NUMBER OSINT API – FIXED & WORKING
// ============================================
const axios = require('axios');

// 🔐 Encrypted Real API URL (Base64)
const REAL_API_ENCRYPTED = "aHR0cHM6Ly9vc2ludC1icm9ueC11bHRyYS0yLTAub25yZW5kZXIuY29tL2FwaS9rZXktYnJvbngvbnVtYmVy";
const CREDIT = "BRONX_ULTRA";
const VALID_KEYS = ["demo", "bronx", "free", "test", "demo-ha", "BRONXop"];

// ============ DECRYPT REAL API ============
function getRealAPI() {
    return Buffer.from(REAL_API_ENCRYPTED, 'base64').toString('utf8');
}

// ============ HELPERS ============
function cleanResponse(data, queryNum) {
    let cleaned = { ...data };
    delete cleaned.credit; delete cleaned.owner; delete cleaned.by;
    delete cleaned.channel; delete cleaned.api_by; delete cleaned.key_note;
    delete cleaned.response_time_ms; delete cleaned.cached; delete cleaned.cached_at;
    cleaned.query = queryNum;
    cleaned.credit = CREDIT;
    cleaned.developer = "BRONX_ULTRA";
    cleaned.powered_by = "BRONX ULTRA API";
    return cleaned;
}

// ============ MAIN ============
module.exports = async (req, res) => {
    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    if (req.method === 'OPTIONS') return res.status(200).end();

    // Parse URL
    const url = new URL(req.url, `http://${req.headers.host}`);
    const path = url.pathname;
    const params = url.searchParams;

    // ============ HOME ============
    if (path === '/' || path === '') {
        return res.send(`<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>🔐 BRONX API</title>
<style>body{background:#000a14;color:#d0d8f0;font-family:sans-serif;display:flex;justify-content:center;align-items:center;min-height:100vh;margin:0;text-align:center}
.card{background:rgba(5,15,35,.9);padding:30px;border-radius:16px;border:1px solid rgba(0,150,255,.1)}h2{color:#0096ff}code{color:#00ff88;background:#111;padding:4px 8px;border-radius:4px;font-size:12px}a{color:#ffb400}</style></head>
<body><div class="card"><h2>🔐 BRONX NUMBER API</h2><p>Use: <code>/number?key=demo&num=9876543210</code></p>
<p><a href="/number?key=demo&num=9876543210">Quick Test</a></p></div></body></html>`);
    }

    // ============ NUMBER ENDPOINT ============
    if (path === '/number' || path === '/api/number') {
        const key = params.get('key') || '';
        const num = params.get('num') || '';

        if (!VALID_KEYS.includes(key)) {
            return res.status(403).json({ error: "Invalid API key", valid_keys: VALID_KEYS });
        }
        if (!num) {
            return res.status(400).json({ error: "Missing 'num' parameter" });
        }

        try {
            const REAL_API = getRealAPI();
            const realUrl = `${REAL_API}?key=BRONX_GOD_TIER_V100&num=${encodeURIComponent(num)}`;
            const response = await axios.get(realUrl, { timeout: 30000 });
            const result = cleanResponse(response.data, num);
            return res.json(result);
        } catch (err) {
            return res.status(500).json({ error: "Real API unavailable" });
        }
    }

    // ============ TEST ============
    if (path === '/test') {
        return res.json({ status: "✅ Working", endpoint: "/number?key=demo&num=..." });
    }

    // 404
    return res.status(404).json({ error: "Not found", home: "/" });
};
