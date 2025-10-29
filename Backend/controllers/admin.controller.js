const Admin = require('../models/AdminProfile.model');
const { cloudinary } = require('../config/cloudinary');

// ✅ Create admin
exports.createAdmin = async (req, res) => {
  try {
    const admin = new Admin(req.body);
    await admin.save();
    res.status(201).json({ message: 'Admin created successfully!', admin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get single admin profile
exports.getAdminProfile = async (req, res) => {
  try {
    const { adminId } = req.params;
    const admin = await Admin.findOne({ adminId });
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    res.json(admin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Upload / update profile image
exports.uploadProfileImage = async (req, res) => {
  try {
    const { adminId } = req.params;
    if (!req.file) return res.status(400).json({ message: 'No image uploaded' });

    const admin = await Admin.findOne({ adminId });
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    // Delete old image if exists
    if (admin.profileImage?.public_id) {
      await cloudinary.uploader.destroy(admin.profileImage.public_id);
    }

    admin.profileImage = { url: req.file.path, public_id: req.file.filename };
    await admin.save();

    res.json({ message: 'Profile image uploaded successfully!', admin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
