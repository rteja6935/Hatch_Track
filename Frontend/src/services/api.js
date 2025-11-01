const API_BASE_URL = 'http://localhost:3000/api';

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }
  return data;
};

// ==================== USER PROFILE APIs ====================
export const getUserProfile = async (phoneNumber) => {
  const response = await fetch(`${API_BASE_URL}/user/${phoneNumber}/profile`);
  return handleResponse(response);
};

export const updateUserProfile = async (phoneNumber, profileData) => {
  const response = await fetch(`${API_BASE_URL}/user/${phoneNumber}/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(profileData),
  });
  return handleResponse(response);
};

// ==================== HATCHERY APIs ====================
export const getUserHatcheries = async (phoneNumber) => {
  const response = await fetch(`${API_BASE_URL}/user/${phoneNumber}/hatcheries`);
  return handleResponse(response);
};

export const createHatchery = async (phoneNumber, hatcheryData) => {
  const response = await fetch(`${API_BASE_URL}/user/${phoneNumber}/hatcheries`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(hatcheryData),
  });
  return handleResponse(response);
};

export const getHatcheryUploads = async (hatcheryId) => {
  const response = await fetch(`${API_BASE_URL}/hatchery/${hatcheryId}/uploads`);
  return handleResponse(response);
};

// ==================== UPLOAD APIs ====================
export const createUpload = async (phoneNumber, uploadData) => {
  const response = await fetch(`${API_BASE_URL}/user/${phoneNumber}/uploads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(uploadData),
  });
  return handleResponse(response);
};

export const deleteUpload = async (uploadId) => {
  const response = await fetch(`${API_BASE_URL}/upload/${uploadId}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
};

// ==================== NOTIFICATION APIs ====================
export const getUserNotifications = async (phoneNumber) => {
  const response = await fetch(`${API_BASE_URL}/user/${phoneNumber}/notifications`);
  return handleResponse(response);
};

export const markNotificationRead = async (notificationId) => {
  const response = await fetch(`${API_BASE_URL}/notification/${notificationId}/read`, {
    method: 'PUT',
  });
  return handleResponse(response);
};

// ==================== DASHBOARD STATS APIs ====================
export const getDashboardStats = async (phoneNumber) => {
  const response = await fetch(`${API_BASE_URL}/user/${phoneNumber}/stats`);
  return handleResponse(response);
};

// ==================== IMAGE UPLOAD HELPER ====================
export const uploadImageToCloudinary = async (file) => {
  // This is a placeholder for Cloudinary or other image hosting service
  // You'll need to implement this based on your image hosting solution

  const formData = new FormData();
  formData.append('file', file);

  // Example Cloudinary setup (you'll need to configure this)
  // const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload';
  // const CLOUDINARY_UPLOAD_PRESET = 'YOUR_UPLOAD_PRESET';
  // formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  // For now, return a mock URL or implement your own upload logic
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      // In production, replace this with actual upload to cloud storage
      resolve(reader.result);
    };
    reader.readAsDataURL(file);
  });
};
