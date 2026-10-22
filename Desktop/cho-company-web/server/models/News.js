import m from 'mongoose';

const newsSchema = new m.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  category: { type: String, default: 'NEWS' },
  summary: { type: String, default: '' },
  link: { type: String, default: '#' },
  isHighlight: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export const NewsModel = m.models.News || m.model('News', newsSchema);
