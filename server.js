import jsonServer from 'json-server';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import nodemailer from 'nodemailer'; // 1. Import Nodemailer

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// ... (Keep your existing Multer/Upload configuration here) ...

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = path.join(__dirname, 'public/images');
        if (!fs.existsSync(dir)){ fs.mkdirSync(dir, { recursive: true }); }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '-'));
    }
});
const upload = multer({ storage: storage });

server.use(middlewares);
server.use(jsonServer.bodyParser);

// ... (Keep your existing /upload route here) ...
server.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    res.json({ imagePath: `/images/${req.file.filename}` });
});


// ==========================================
// 2. NEW: EMAIL SENDING ROUTE
// ==========================================
const transporter = nodemailer.createTransport({
    service: 'gmail', // or 'outlook', 'yahoo'
    auth: {
        user: 'YOUR_EMAIL@gmail.com', // ⚠️ REPLACE WITH YOUR EMAIL
        pass: 'YOUR_APP_PASSWORD'     // ⚠️ REPLACE WITH YOUR APP PASSWORD (NOT LOGIN PASSWORD)
    }
});

server.post('/send-email', async (req, res) => {
    const { to, subject, text, html } = req.body;

    const mailOptions = {
        from: 'UNIHub System <YOUR_EMAIL@gmail.com>',
        to: to,
        subject: subject,
        text: text,
        html: html
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully to:', to);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});
// ==========================================


server.use(router);
server.listen(3001, () => {
    console.log('Server is running on port 3001');
});