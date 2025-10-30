const { cloudinary } = require('../config/cloudinary');
const UserProfile = require('../models/UserProfile.model');


exports.createUserProfile = async (req, res) => {
  try {
    const user = new UserProfile(req.body);
    await user.save();
    res.status(201).json({ message: 'User created successfully!', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserProfile.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get single user by userId
exports.getUserById = async (req, res) => {
  try {
    const user = await UserProfile.findOne({ userId: req.params.userId });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ✅ Upload profile image
exports.uploadProfileImage = async (req, res) => {
  try {
    const { userId } = req.params;
    const { path, filename } = req.file;

    let user = await UserProfile.findOne({ userId });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Delete old image if exists
    if (user.userImage?.public_id) {
      await cloudinary.uploader.destroy(user.userImage.public_id);
    }

    user.userImage = { url: path, public_id: filename };
    await user.save();

    res.json({ message: 'Profile image uploaded successfully!', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Upload multiple images (max 4)
exports.uploadMultipleImages = async (req, res) => {
  try {
    const { userId } = req.params;
    const uploaded = req.files.map((file) => ({
      url: file.path,
      public_id: file.filename,
    }));

    const user = await UserProfile.findOneAndUpdate(
      { userId },
      { $push: { images: { $each: uploaded } } },
      { new: true }
    );

    res.json({ message: 'Images uploaded successfully!', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Update profile image (replace)
exports.updateProfileImage = async (req, res) => {
  try {
    const { userId } = req.params;
    const { path, filename } = req.file;

    const user = await UserProfile.findOne({ userId });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Delete old image
    if (user.userImage?.public_id) {
      await cloudinary.uploader.destroy(user.userImage.public_id);
    }

    // Set new image
    user.userImage = { url: path, public_id: filename };
    await user.save();

    res.json({ message: 'Profile image updated successfully!', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Delete profile image
exports.deleteProfileImage = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await UserProfile.findOne({ userId });

    if (!user || !user.userImage?.public_id) {
      return res.status(404).json({ message: 'No profile image found' });
    }

    await cloudinary.uploader.destroy(user.userImage.public_id);

    user.userImage = { url: '', public_id: '' };
    await user.save();

    res.json({ message: 'Profile image deleted successfully!', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Delete one image from “images” array
exports.deleteSingleImage = async (req, res) => {
  try {
    const { userId, publicId } = req.params;

    await cloudinary.uploader.destroy(publicId);

    const user = await UserProfile.findOneAndUpdate(
      { userId },
      { $pull: { images: { public_id: publicId } } },
      { new: true }
    );

    res.json({ message: 'Image deleted successfully!', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ✅ Get user images
exports.getUserImages = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await UserProfile.findOne({ userId });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      userId: user.userId,
      name: user.name,
      profileImage: user.userImage?.url || null,
      images: user.images.map(img => img.url) || [],
    });
  } catch (err) {
    console.error("❌ Error fetching images:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

