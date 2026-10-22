import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
  company: { type: String, default: '' },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: '' },
  type: { 
    type: String, 
    enum: ['Product', 'Partnership', 'Recruitment', 'Other'],
    default: 'Product' 
  },
  message: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'in-review', 'completed'],
    default: 'pending' 
  },
  createdAt: { type: Date, default: Date.now }
});

export const InquiryModel = mongoose.models.Inquiry || mongoose.model('Inquiry', inquirySchema);
