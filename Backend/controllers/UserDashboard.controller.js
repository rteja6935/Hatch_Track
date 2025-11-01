const User = require('../models/User.model');
const Hatchery = require('../models/Hatchery.model');
const Upload = require('../models/Upload.model');
const Notification = require('../models/Notification.model');

// ===================== GET USER PROFILE =====================
exports.getUserProfile = async (req, res) => {
  try {
    const { phoneNumber } = req.params;

    const user = await User.findOne({ phoneNumber })
      .populate('hatcheries')
      .populate('notifications');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        phone: user.phoneNumber,
        profileImage: user.profileImage,
        hatcheries: user.hatcheries,
        notifications: user.notifications
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ===================== UPDATE USER PROFILE =====================
exports.updateUserProfile = async (req, res) => {
  try {
    const { phoneNumber } = req.params;
    const { name, email, profileImage } = req.body;

    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (profileImage) user.profileImage = profileImage;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        name: user.name,
        email: user.email,
        phone: user.phoneNumber,
        profileImage: user.profileImage
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ===================== GET ALL HATCHERIES FOR USER =====================
exports.getUserHatcheries = async (req, res) => {
  try {
    const { phoneNumber } = req.params;

    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const hatcheries = await Hatchery.find({ userId: user._id })
      .populate('uploads')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      hatcheries
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ===================== CREATE NEW HATCHERY =====================
exports.createHatchery = async (req, res) => {
  try {
    const { phoneNumber } = req.params;
    const { title, thumbnail } = req.body;

    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newHatchery = new Hatchery({
      userId: user._id,
      title,
      thumbnail: thumbnail || null
    });

    await newHatchery.save();

    user.hatcheries.push(newHatchery._id);
    await user.save();

    res.status(201).json({
      success: true,
      message: 'Hatchery created successfully',
      hatchery: newHatchery
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ===================== GET UPLOADS FOR A HATCHERY =====================
exports.getHatcheryUploads = async (req, res) => {
  try {
    const { hatcheryId } = req.params;

    const uploads = await Upload.find({ hatcheryId })
      .sort({ uploadedDate: -1 });

    res.status(200).json({
      success: true,
      uploads
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ===================== CREATE NEW UPLOAD =====================
exports.createUpload = async (req, res) => {
  try {
    const { phoneNumber } = req.params;
    const { hatcheryId, dayRange, imageUrl } = req.body;

    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const hatchery = await Hatchery.findById(hatcheryId);
    if (!hatchery) {
      return res.status(404).json({ message: 'Hatchery not found' });
    }

    const newUpload = new Upload({
      hatcheryId,
      userId: user._id,
      dayRange,
      imageUrl
    });

    await newUpload.save();

    // Update hatchery
    hatchery.uploads.push(newUpload._id);
    hatchery.uploadedDays += 1;
    hatchery.lastUpload = new Date();
    if (!hatchery.thumbnail && imageUrl) {
      hatchery.thumbnail = imageUrl;
    }
    await hatchery.save();

    res.status(201).json({
      success: true,
      message: 'Upload created successfully',
      upload: newUpload
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ===================== DELETE UPLOAD =====================
exports.deleteUpload = async (req, res) => {
  try {
    const { uploadId } = req.params;

    const upload = await Upload.findById(uploadId);
    if (!upload) {
      return res.status(404).json({ message: 'Upload not found' });
    }

    const hatchery = await Hatchery.findById(upload.hatcheryId);
    if (hatchery) {
      hatchery.uploads = hatchery.uploads.filter(
        id => id.toString() !== uploadId
      );
      hatchery.uploadedDays = Math.max(0, hatchery.uploadedDays - 1);
      await hatchery.save();
    }

    await Upload.findByIdAndDelete(uploadId);

    res.status(200).json({
      success: true,
      message: 'Upload deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ===================== GET USER NOTIFICATIONS =====================
exports.getUserNotifications = async (req, res) => {
  try {
    const { phoneNumber } = req.params;

    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const notifications = await Notification.find({ userId: user._id })
      .sort({ date: -1 })
      .populate('relatedUploadId');

    res.status(200).json({
      success: true,
      notifications
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ===================== MARK NOTIFICATION AS READ =====================
exports.markNotificationRead = async (req, res) => {
  try {
    const { notificationId } = req.params;

    const notification = await Notification.findById(notificationId);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    notification.read = true;
    await notification.save();

    res.status(200).json({
      success: true,
      message: 'Notification marked as read'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ===================== GET DASHBOARD STATS =====================
exports.getDashboardStats = async (req, res) => {
  try {
    const { phoneNumber } = req.params;

    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const hatcheries = await Hatchery.find({ userId: user._id });
    const notifications = await Notification.find({ userId: user._id, read: false });

    const stats = {
      totalHatcheries: hatcheries.length,
      pendingCount: hatcheries.filter(h => h.status === 'pending').length,
      acceptedCount: hatcheries.filter(h => h.status === 'accepted').length,
      declinedCount: hatcheries.filter(h => h.status === 'declined').length,
      unreadNotifications: notifications.length
    };

    res.status(200).json({
      success: true,
      stats
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
