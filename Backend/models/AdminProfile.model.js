const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: String,
  public_id: String,
});

const adminSchema = new mongoose.Schema({
  adminId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String },
  location: { type: String, default: '' },
  profileImage: imageSchema, // Cloudinary profile image

  // Statistics
  totalUsers: { type: Number, default: 0 },
  approvedRequests: { type: Number, default: 0 },
  pendingApprovals: { type: Number, default: 0 },

  // Optional suggested fields
  role: { type: String, default: 'admin' }, // future RBAC
  bio: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Admin', adminSchema);
