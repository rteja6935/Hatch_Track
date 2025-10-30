const mongoose = require('mongoose');

const HatcherySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  currentDay: { type: Number, default: 1 },
  totalDays: { type: Number, default: 40 },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'declined'],
    default: 'pending'
  },
  thumbnail: { type: String, default: null },
  uploadedDays: { type: Number, default: 0 },
  lastUpload: { type: Date, default: null },
  uploads: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Upload' }]
}, { timestamps: true });

module.exports = mongoose.model('Hatchery', HatcherySchema);
