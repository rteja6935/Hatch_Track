# User Dashboard API Documentation

## Overview
This document describes the backend API endpoints for the User Dashboard functionality in Hatch Track.

## Base URL
```
http://localhost:3000/api
```

## Models

### User Model
- `phoneNumber` (String, required, unique)
- `name` (String)
- `email` (String)
- `profileImage` (String) - URL or path to profile image
- `hatcheries` (Array of ObjectId references to Hatchery)
- `notifications` (Array of ObjectId references to Notification)
- `timestamps` (createdAt, updatedAt)

### Hatchery Model
- `userId` (ObjectId reference to User, required)
- `title` (String, required)
- `currentDay` (Number, default: 1)
- `totalDays` (Number, default: 40)
- `status` (String enum: 'pending', 'accepted', 'declined', default: 'pending')
- `thumbnail` (String)
- `uploadedDays` (Number, default: 0)
- `lastUpload` (Date)
- `uploads` (Array of ObjectId references to Upload)
- `timestamps` (createdAt, updatedAt)

### Upload Model
- `hatcheryId` (ObjectId reference to Hatchery, required)
- `userId` (ObjectId reference to User, required)
- `dayRange` (String, required) - e.g., "Day 1-10", "Day 10-20"
- `imageUrl` (String, required)
- `status` (String enum: 'pending', 'accepted', 'rejected', default: 'pending')
- `uploadedDate` (Date, default: now)
- `adminComment` (String)
- `timestamps` (createdAt, updatedAt)

### Notification Model
- `userId` (ObjectId reference to User, required)
- `type` (String enum: 'accepted', 'rejected', 'comment', required)
- `message` (String, required)
- `comment` (String)
- `date` (Date, default: now)
- `time` (String)
- `read` (Boolean, default: false)
- `relatedUploadId` (ObjectId reference to Upload)
- `timestamps` (createdAt, updatedAt)

## API Endpoints

### User Profile

#### Get User Profile
```
GET /api/user/:phoneNumber/profile
```
Returns user profile with populated hatcheries and notifications.

**Response:**
```json
{
  "success": true,
  "user": {
    "name": "Ramesh Kumar",
    "email": "ramesh@example.com",
    "phone": "+919876543210",
    "profileImage": "url_to_image",
    "hatcheries": [...],
    "notifications": [...]
  }
}
```

#### Update User Profile
```
PUT /api/user/:phoneNumber/profile
```
**Body:**
```json
{
  "name": "Ramesh Kumar",
  "email": "ramesh@example.com",
  "profileImage": "url_to_image"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": {
    "name": "Ramesh Kumar",
    "email": "ramesh@example.com",
    "phone": "+919876543210",
    "profileImage": "url_to_image"
  }
}
```

### Hatcheries

#### Get All User Hatcheries
```
GET /api/user/:phoneNumber/hatcheries
```
Returns all hatcheries for the user with populated uploads.

**Response:**
```json
{
  "success": true,
  "hatcheries": [
    {
      "_id": "...",
      "title": "Pond #1",
      "currentDay": 15,
      "totalDays": 40,
      "status": "accepted",
      "thumbnail": "url_to_image",
      "uploadedDays": 15,
      "lastUpload": "2025-10-27T...",
      "uploads": [...]
    }
  ]
}
```

#### Create New Hatchery
```
POST /api/user/:phoneNumber/hatcheries
```
**Body:**
```json
{
  "title": "Pond #1",
  "thumbnail": "url_to_image"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Hatchery created successfully",
  "hatchery": {
    "_id": "...",
    "title": "Pond #1",
    "currentDay": 1,
    "totalDays": 40,
    "status": "pending",
    ...
  }
}
```

#### Get Hatchery Uploads
```
GET /api/hatchery/:hatcheryId/uploads
```
Returns all uploads for a specific hatchery.

**Response:**
```json
{
  "success": true,
  "uploads": [...]
}
```

### Uploads

#### Create New Upload
```
POST /api/user/:phoneNumber/uploads
```
**Body:**
```json
{
  "hatcheryId": "...",
  "dayRange": "Day 1-10",
  "imageUrl": "url_to_image"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Upload created successfully",
  "upload": {
    "_id": "...",
    "hatcheryId": "...",
    "dayRange": "Day 1-10",
    "imageUrl": "url_to_image",
    "status": "pending",
    ...
  }
}
```

#### Delete Upload
```
DELETE /api/upload/:uploadId
```

**Response:**
```json
{
  "success": true,
  "message": "Upload deleted successfully"
}
```

### Notifications

#### Get User Notifications
```
GET /api/user/:phoneNumber/notifications
```
Returns all notifications for the user, sorted by date (newest first).

**Response:**
```json
{
  "success": true,
  "notifications": [
    {
      "_id": "...",
      "type": "accepted",
      "message": "Your Day 1-10 upload has been approved",
      "comment": "Excellent growth progress!",
      "date": "2025-10-27T...",
      "time": "10:30 AM",
      "read": false,
      "relatedUploadId": "..."
    }
  ]
}
```

#### Mark Notification as Read
```
PUT /api/notification/:notificationId/read
```

**Response:**
```json
{
  "success": true,
  "message": "Notification marked as read"
}
```

### Dashboard Stats

#### Get Dashboard Statistics
```
GET /api/user/:phoneNumber/stats
```
Returns statistics for the user dashboard.

**Response:**
```json
{
  "success": true,
  "stats": {
    "totalHatcheries": 3,
    "pendingCount": 1,
    "acceptedCount": 2,
    "declinedCount": 0,
    "unreadNotifications": 2
  }
}
```

## Frontend Integration

### API Service
The frontend uses a centralized API service located at:
```
Frontend/src/services/api.js
```

This service provides helper functions for all API endpoints:
- `getUserProfile(phoneNumber)`
- `updateUserProfile(phoneNumber, profileData)`
- `getUserHatcheries(phoneNumber)`
- `createHatchery(phoneNumber, hatcheryData)`
- `createUpload(phoneNumber, uploadData)`
- `deleteUpload(uploadId)`
- `getUserNotifications(phoneNumber)`
- `markNotificationRead(notificationId)`
- `getDashboardStats(phoneNumber)`
- `uploadImageToCloudinary(file)` - Helper for image uploads

### Usage Example
```javascript
import { getUserProfile, updateUserProfile } from '../services/api';

// Fetch user profile
const profile = await getUserProfile("+919876543210");

// Update profile
await updateUserProfile("+919876543210", {
  name: "New Name",
  email: "newemail@example.com"
});
```

## Setup Instructions

### Backend Setup
1. Ensure MongoDB is running
2. Install dependencies:
   ```bash
   cd Backend
   npm install
   ```
3. Create `.env` file with:
   ```
   DBurl=your_mongodb_connection_string
   ```
4. Start the server:
   ```bash
   node server.js
   ```

### Frontend Setup
1. Install dependencies:
   ```bash
   cd Frontend
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

## CORS Configuration
CORS is enabled for all origins in development. For production, configure specific origins in `server.js`:
```javascript
app.use(cors({
  origin: 'https://your-frontend-domain.com'
}));
```

## Notes
- Phone numbers are used as the primary identifier for users
- The phone number is stored in localStorage on the frontend after login
- All dates are stored as JavaScript Date objects in MongoDB
- Image uploads currently use a placeholder function - implement cloud storage (Cloudinary, AWS S3, etc.) in production
- All API responses follow a consistent format with `success` and appropriate data/error fields
