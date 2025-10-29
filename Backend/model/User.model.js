const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true, unique: true },
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  profileImage: { type: String, default: null }, // URL or path to profile image
  hatcheries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hatchery' }],
  notifications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notification' }]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
