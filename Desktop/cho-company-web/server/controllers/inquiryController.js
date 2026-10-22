import { InquiryModel } from '../models/Inquiry.js';
import { isConnected, memoryStore } from '../config/db.js';

export const createInquiry = async (req, res) => {
  try {
    const { company, name, email, phone, type, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and message are required fields.' 
      });
    }

    const doc = {
      company: company || '',
      name,
      email,
      phone: phone || '',
      type: type || 'Product',
      message,
      status: 'pending',
      createdAt: new Date()
    };

    if (isConnected()) {
      const created = await InquiryModel.create(doc);
      return res.status(201).json({ 
        success: true, 
        message: 'Inquiry received successfully. Our team will contact you shortly.', 
        data: created,
        source: 'mongodb'
      });
    } else {
      doc._id = `mem_inq_${Date.now()}`;
      memoryStore.inquiries.push(doc);
      return res.status(201).json({ 
        success: true, 
        message: 'Inquiry received successfully. Our team will contact you shortly.', 
        data: doc,
        source: 'memory-fallback'
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getInquiries = async (req, res) => {
  try {
    if (isConnected()) {
      const list = await InquiryModel.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: list.length, data: list });
    } else {
      return res.json({ success: true, count: memoryStore.inquiries.length, data: memoryStore.inquiries });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
