import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB, getDbStatus } from './config/db.js';
import newsRoutes from './routes/newsRoutes.js';
import productRoutes from './routes/productRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
connectDB();

// API Routes
app.use('/api/news', newsRoutes);
app.use('/api/products', productRoutes);
app.use('/api/inquiries', inquiryRoutes);

// Health & System Status Endpoint (DB 상태 등 확인)
app.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    system: 'CHO&Company Solution Platform Backend',
    database: getDbStatus()
  });
});

// Root fallback
app.get('/', (req, res) => {
  res.send('CHO&Company API Server is running.');
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Unhandled Error]', err);
  res.status(500).json({ success: false, message: 'Internal Server Error', error: err.message });
});

app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(` CHO&Company API Server listening on port ${PORT}`);
  console.log(` Health check: http://localhost:${PORT}/api/status`);
  console.log(`===============================================`);
});
