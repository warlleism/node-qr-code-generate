const express = require('express');
const QRCode = require('qrcode');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/generate-qrcode', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        const qrCode = await QRCode.toDataURL(url);
        res.status(200).json({ qrCode });
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate QR Code' });
    }
});

app.listen(port, () => {
    console.log(`API running on http://localhost:${port}`);
});
