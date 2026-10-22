import { NewsModel } from '../models/News.js';
import { isConnected, memoryStore } from '../config/db.js';

export const getNews = async (req, res) => {
  try {
    if (isConnected()) {
      const news = await NewsModel.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: news.length, data: news, source: 'mongodb' });
    } else {
      return res.json({ success: true, count: memoryStore.news.length, data: memoryStore.news, source: 'memory-fallback' });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const createNews = async (req, res) => {
  try {
    const { title, date, category, summary, link, isHighlight } = req.body;
    if (!title || !date) {
      return res.status(400).json({ success: false, message: 'Title and Date are required.' });
    }

    const newDoc = {
      title,
      date,
      category: category || 'NEWS',
      summary: summary || '',
      link: link || '#',
      isHighlight: Boolean(isHighlight),
      createdAt: new Date()
    };

    if (isConnected()) {
      const created = await NewsModel.create(newDoc);
      return res.status(201).json({ success: true, data: created, source: 'mongodb' });
    } else {
      newDoc._id = `mem_news_${Date.now()}`;
      memoryStore.news.unshift(newDoc);
      return res.status(201).json({ success: true, data: newDoc, source: 'memory-fallback' });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
