const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: {
    type: String,
    enum: ['accepted', 'rejected', 'comment'],
    required: true
  },
  message: { type: String, required: true },
  comment: { type: String, default: null },
  date: { type: Date, default: Date.now },
  time: { type: String, default: '' },
  read: { type: Boolean, default: false },
  relatedUploadId: { type: mongoose.Schema.Types.ObjectId, ref: 'Upload', default: null }
}, { timestamps: true });

module.exports = mongoose.model('Notification', NotificationSchema);
