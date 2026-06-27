// ============================================
// 🔐 BRONX NUMBER API – RENDER READY
// ============================================
const express = require('express');
const axios = require('axios');
const app = express();

// ============ CONFIG ============
// 🔐 Real API URL Base64 Locked
const REAL_API_LOCKED = "aHR0cHM6Ly9vc2ludC1icm9ueC11bHRyYS0yLTAub25yZW5kZXIuY29tL2FwaS9rZXktYnJvbngvbnVtYmVy";
const CREDIT = "BRONX_ULTRA";
const VALID_KEYS = ["demo", "bronx", "free", "test", "demo-ha", "BRONXop"];
const PORT = process.env.PORT || 3000;

// ============ HELPERS ============
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

// ============ CORS ============
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    if (req.method === 'OPTIONS') return res.sendStatus(200);
    next();
});

// ============ HOME ============
app.get('/', (req, res) => {
    const baseURL = `${req.protocol}://${req.get('host')}`;
    res.json({
        status: "✅ BRONX NUMBER API ONLINE",
        credit: CREDIT,
        endpoints: {
            number: `${baseURL}/number?key=demo&num=9876543210`,
            test: `${baseURL}/test`
        },
        valid_keys: VALID_KEYS,
        note: "Real API URL is encrypted (Base64)"
    });
});

// ============ TEST ============
app.get('/test', (req, res) => {
    res.json({
        status: "✅ All systems working!",
        uptime: process.uptime(),
        credit: CREDIT
    });
});

// ============ NUMBER API ============
app.get('/number', async (req, res) => {
    const key = req.query.key || '';
    const num = req.query.num || '';

    // Validate key
    if (!VALID_KEYS.includes(key)) {
        return res.status(403).json({
            status: "error",
            message: `Invalid API key. Valid keys: ${VALID_KEYS.join(', ')}`,
            valid_keys: VALID_KEYS,
            credit: CREDIT
        });
    }

    // Validate number
    if (!num) {
        return res.status(400).json({
            status: "error",
            message: "Missing phone number. Use: /number?key=demo&num=9876543210",
            credit: CREDIT,
            example: `/number?key=demo&num=9876543210`
        });
    }

    try {
        // Decrypt real API URL
        const REAL_API = getRealURL();
        const realUrl = `${REAL_API}?key=BRONX_GOD_TIER_V100&num=${encodeURIComponent(num)}`;
        
        console.log('🔗 Calling real API...');
        
        const response = await axios.get(realUrl, {
            timeout: 30000,
            headers: { 'User-Agent': 'BRONX-API/1.0' }
        });

        const data = response.data;
        const result = cleanResponse(data, num);
        
        console.log('✅ Success for:', num);
        return res.json(result);

    } catch (error) {
        console.error('❌ Error:', error.message);
        return res.status(500).json({
            status: "error",
            message: "Real API temporarily unavailable. Please try again.",
            credit: CREDIT,
            developer: "BRONX_ULTRA"
        });
    }
});

// ============ ENCRYPT HELPER ============
app.get('/encrypt', (req, res) => {
    const num = req.query.num || '';
    if (!num) {
        return res.json({
            status: "error",
            message: "Send number to encrypt",
            usage: "/encrypt?num=9876543210"
        });
    }
    
    const data = JSON.stringify({ num: num, timestamp: Date.now() });
    const encrypted = Buffer.from(data).toString('base64');
    
    res.json({
        status: "success",
        original: { num: num },
        encrypted: encrypted,
        usage: `/number?key=demo&num=${num}`
    });
});

// ============ 404 ============
app.use((req, res) => {
    res.status(404).json({
        status: "error",
        message: "Endpoint not found",
        home: "/",
        test: "/test",
        api: "/number?key=demo&num=9876543210",
        credit: CREDIT
    });
});

// ============ START SERVER ============
app.listen(PORT, '0.0.0.0', () => {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔐 BRONX LOCKED API');
    console.log(`🚀 Running on port ${PORT}`);
    console.log(`📱 Test: http://localhost:${PORT}/number?key=demo&num=9876543210`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
});
