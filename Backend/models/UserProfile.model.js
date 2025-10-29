const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: String,
  public_id: String,
});

const userProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: String, required: true, unique: true },
  userImage: imageSchema, // ✅ profile image object
  phoneNumber: { type: String, required: true },
  email: { type: String },

  images: [imageSchema], // ✅ multiple image objects

  totalSeeds: { type: Number, default: 0 },
  plantedSeeds: { type: Number, default: 0 },
  remainingSeeds: {
    type: Number,
    default: function () {
      return this.totalSeeds - this.plantedSeeds;
    },
  },

  bio: { type: String, default: '' },
  location: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('UserProfile', userProfileSchema);
