import mongoose from 'mongoose';
import { seedNews, seedProducts } from '../seedData.js';

let isMongoConnected = false;

// In-Memory Storage for Fallback / Quick Startup
export const memoryStore = {
  news: [...seedNews.map((n, idx) => ({ ...n, _id: `mem_news_${idx + 1}`, createdAt: new Date() }))],
  products: [...seedProducts.map((p, idx) => ({ ...p, _id: `mem_prod_${idx + 1}`, createdAt: new Date() }))],
  inquiries: []
};

export const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cho_company';
  
  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 2000 // 빠른 판단
    });
    isMongoConnected = true;
    console.log(`[MongoDB] Connected successfully: ${conn.connection.host}`);
    
    // Auto-seed if collections are empty
    await autoSeedMongo();
  } catch (error) {
    isMongoConnected = false;
    console.warn(`[MongoDB Warning] Could not connect to MongoDB (${error.message}).`);
    console.info(`[Fallback Active] Operating in High-Speed In-Memory Mock Mode. Full CRUD is still supported!`);
  }
};

export const getDbStatus = () => ({
  connected: isMongoConnected,
  mode: isMongoConnected ? 'MongoDB (Mongoose)' : 'In-Memory Fallback Mode (Ready for MongoDB switch)'
});

const autoSeedMongo = async () => {
  try {
    const { NewsModel } = await import('../models/News.js');
    const { ProductModel } = await import('../models/Product.js');
    
    const newsCount = await NewsModel.countDocuments();
    if (newsCount === 0) {
      await NewsModel.insertMany(seedNews);
      console.log(`[MongoDB] Auto-seeded ${seedNews.length} news items.`);
    }

    const prodCount = await ProductModel.countDocuments();
    if (prodCount === 0) {
      await ProductModel.insertMany(seedProducts);
      console.log(`[MongoDB] Auto-seeded ${seedProducts.length} product items.`);
    }
  } catch (err) {
    console.error('[MongoDB Seed Error]', err);
  }
};

export const isConnected = () => isMongoConnected;
