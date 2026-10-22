import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  subTitle: { type: String, default: '' },
  category: { type: String, default: 'General' },
  badge: { type: String, default: '' },
  description: { type: String, required: true },
  features: [{ type: String }],
  image: { type: String, default: '' },
  externalLink: { type: String, default: '#' },
  createdAt: { type: Date, default: Date.now }
});

export const ProductModel = mongoose.models.Product || mongoose.model('Product', productSchema);
