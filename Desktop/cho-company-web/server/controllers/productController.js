import { ProductModel } from '../models/Product.js';
import { isConnected, memoryStore } from '../config/db.js';

export const getProducts = async (req, res) => {
  try {
    const { category } = req.query;
    
    if (isConnected()) {
      const query = category ? { category } : {};
      const products = await ProductModel.find(query).sort({ createdAt: -1 });
      return res.json({ success: true, count: products.length, data: products, source: 'mongodb' });
    } else {
      let prods = memoryStore.products;
      if (category) {
        prods = prods.filter(p => p.category === category);
      }
      return res.json({ success: true, count: prods.length, data: prods, source: 'memory-fallback' });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    if (isConnected()) {
      const product = await ProductModel.findOne({ id }) || await ProductModel.findById(id).catch(() => null);
      if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
      return res.json({ success: true, data: product });
    } else {
      const product = memoryStore.products.find(p => p.id === id || p._id === id);
      if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
      return res.json({ success: true, data: product });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
