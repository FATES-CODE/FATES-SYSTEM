import express from 'express';
import { createInquiry, getInquiries } from '../controllers/inquiryController.js';

const router = express.Router();

router.post('/', createInquiry);
router.get('/', getInquiries); // 관리자용 조회

export default router;
