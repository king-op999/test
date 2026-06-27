// ============================================
// 🔐 BRONX NUMBER API – FIXED VERCEL
// ============================================
const axios = require('axios');

// 🔐 Real API URL Base64 Locked
const REAL_API_LOCKED = "aHR0cHM6Ly9vc2ludC1icm9ueC11bHRyYS0yLTAub25yZW5kZXIuY29tL2FwaS9rZXktYnJvbngvbnVtYmVy";
const CREDIT = "BRONX_ULTRA";
const VALID_KEYS = ["demo", "bronx", "free", "test", "demo-ha", "BRONXop"];

function getRealURL() {
    return Buffer.from(REAL_API_LOCKED, 'base64').toString('utf8');
}

function cleanResponse(data, num) {
    let cleaned = { ...data };
    delete cleaned.credit; delete cleaned.owner; delete cleaned.by;
    delete cleaned.channel; delete cleaned.api_by; delete cleaned.key_note;
    delete cleaned.response_time_ms; delete cleaned.cached; delete cleaned.cached_at;
    cleaned.query = num;
    cleaned.credit = CREDIT;
    cleaned.developer = "BRONX_ULTRA";
    cleaned.powered_by = "BRONX ULTRA API";
    return cleaned;
}

// ✅ Express App (Vercel ke liye best)
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.json({
        status: "✅ BRONX API Online",
        endpoint: "/number?key=demo&num=9876543210",
        test: "/test"
    });
});

app.get('/test', (req, res) => {
    res.json({ status: "✅ Working" });
});

app.get('/number', async (req, res) => {
    const key = req.query.key || '';
    const num = req.query.num || '';

    if (!VALID_KEYS.includes(key)) {
        return res.status(403).json({ error: "Invalid key", valid_keys: VALID_KEYS });
    }
    if (!num) {
        return res.status(400).json({ error: "Missing num parameter" });
    }

    try {
        const REAL_API = getRealURL();
        const realUrl = `${REAL_API}?key=BRONX_GOD_TIER_V100&num=${encodeURIComponent(num)}`;
        const response = await axios.get(realUrl, { timeout: 30000 });
        const result = cleanResponse(response.data, num);
        return res.json(result);
    } catch (err) {
        return res.status(500).json({ error: "API unavailable, try again" });
    }
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: "Not found", home: "/" });
});

module.exports = app;
