# PixSpectrum - Image Processing Tool

A comprehensive full-stack Image Processing Software as a Service (SaaS) platform that provides both a web interface and RESTful API for uploading, processing, and managing images with various filters and effects.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [API Documentation](#api-documentation)
- [Troubleshooting](#troubleshooting)
- [Team](#team)

## 🎯 Project Overview

PixSpectrum is an integrated image processing platform designed for both end-users and developers. It offers:

- **Web Interface**: An intuitive React-based UI for uploading images and applying various filters in real-time
- **RESTful API**: A comprehensive FastAPI backend that developers can integrate into their applications
- **Cloud Storage**: Secure image storage using Cloudinary for persistent image management
- **User Management**: Complete authentication system with API key-based access control
- **Image Gallery**: Personal dashboard to view, download, and manage all processed images

The platform simplifies complex image processing tasks, allowing users to access high-quality, scalable image processing without managing extensive infrastructure.

## ✨ Features

### Image Processing Filters & Effects

1. **Grayscale** - Convert images to classic black and white
2. **Sepia** - Apply vintage, brownish antique tones
3. **Warm Filter** - Add cozy, reddish hues for inviting images
4. **Cool Filter** - Apply serene, bluish tones for calming effects
5. **Contrast Enhancement** - Improve image contrast and definition using CLAHE (Contrast Limited Adaptive Histogram Equalization)
6. **Grainy Effect** - Add film-like texture for vintage/retro aesthetics
7. **Pencil Sketch** - Transform photos into hand-drawn sketch effects
8. **Cartoonify** - Convert images into cartoon-like effects with simplified colors
9. **Gotham Filter** - Apply dark, dramatic cinematic filter inspired by Instagram's Gotham
10. **HDR Effect** - Create High Dynamic Range effects for vibrant, detailed images
11. **Color Invert** - Invert all colors to create negative-like effects
12. **Image Compression** - Optimize images by reducing file size while maintaining quality

### User Features

- **User Authentication**: Secure signup/login system with bcrypt password hashing
- **API Key Management**: Unique API keys for each user for secure API access
- **Image Gallery**: Personal dashboard to view all saved images
- **Image Management**: Download and delete saved images
- **Password Management**: Update account passwords securely
- **Real-time Processing**: Instant filter application with live preview

### Developer Features

- **RESTful API**: Well-documented API endpoints for all features
- **API Key Authentication**: Secure access control for API endpoints
- **Fast Processing**: Optimized image processing using OpenCV and NumPy
- **Scalable Architecture**: Built to handle growing demands
- **Comprehensive Documentation**: Detailed API documentation with examples

## 📁 Project Structure

```
SDL_PROject/
├── BackEnd/                    # FastAPI backend server
│   ├── main.py                 # Application entry point
│   ├── db.py                   # MongoDB database configuration
│   ├── requirements.txt        # Python dependencies
│   ├── Pipfile                 # Pipenv configuration
│   ├── .env                    # Environment variables (not in repo)
│   ├── models/                 # Database models
│   │   └── user.py             # User model
│   ├── routes/                 # API route handlers
│   │   ├── grayscale.py
│   │   ├── pencilsketch.py
│   │   ├── cartoonify.py
│   │   ├── grainyeffect.py
│   │   ├── contrastehancement.py
│   │   ├── coolfilter.py
│   │   ├── warmfilter.py
│   │   ├── sepia.py
│   │   ├── hdreffect.py
│   │   ├── colorinvert.py
│   │   ├── gotham.py
│   │   ├── compression.py
│   │   ├── signup.py
│   │   ├── login.py
│   │   ├── savefile.py
│   │   ├── getAllimages.py
│   │   ├── deleteimage.py
│   │   ├── editpassword.py
│   │   └── isAuth.py
│   ├── schema/                 # Pydantic schemas
│   │   └── schemas.py
│   └── utils/                  # Utility functions
│       ├── filters.py          # Image processing filter classes
│       └── validators.py       # Input validation utilities
│
└── FrontEnd/                   # React frontend application
    ├── src/
    │   ├── pages/              # Page components
    │   │   ├── Home.jsx
    │   │   ├── Filter.jsx      # Main image processing interface
    │   │   ├── DashBoard.jsx   # User image gallery
    │   │   ├── Login.jsx
    │   │   ├── Signup.jsx
    │   │   ├── Profile.jsx
    │   │   ├── Documentation.jsx
    │   │   └── AboutPage.jsx
    │   ├── components/         # Reusable components
    │   ├── redux/              # State management
    │   ├── hooks/              # Custom React hooks
    │   └── lib/                # Utility functions
    ├── package.json
    └── vite.config.js
```

## 🛠 Technology Stack

### Backend

- **FastAPI** - Modern, high-performance Python web framework
- **MongoDB** - NoSQL database for user and image metadata storage
- **OpenCV** - Advanced image processing and computer vision
- **NumPy** - Numerical computing for image manipulation
- **SciPy** - Scientific computing (UnivariateSpline for color mapping)
- **Pillow (PIL)** - Additional image processing capabilities
- **PyJWT** - JSON Web Token authentication
- **Bcrypt** - Secure password hashing
- **Cloudinary** - Cloud-based image storage and CDN
- **Uvicorn** - ASGI server for FastAPI
- **Python-dotenv** - Environment variable management

### Frontend

- **React** - UI library for building interactive interfaces
- **Vite** - Fast build tool and development server
- **Redux** - State management for application data
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **React Dropzone** - File upload component

### Infrastructure

- **Cloudinary** - Cloud image storage and transformation
- **MongoDB Atlas** - Cloud database hosting (or local MongoDB)

## 🚀 Getting Started

### Prerequisites

**Backend:**

- Python 3.12 or higher
- MongoDB (local installation or MongoDB Atlas account)
- pip or pipenv

**Frontend:**

- Node.js (v16 or higher)
- npm or yarn

## 🔧 Backend Setup

### 1. Navigate to Backend Directory

```bash
cd SDL_PROject/BackEnd
```

### 2. Install Dependencies

**Using pip:**

```bash
pip install -r requirements.txt
```

**Using pipenv:**

```bash
pipenv install
pipenv shell
```

### 3. Environment Variables

Create a `.env` file in the `BackEnd/` directory:

```env
MONGODB_URI=your_mongodb_connection_string
```

**Example for MongoDB Atlas:**

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
```

**Example for Local MongoDB:**

```env
MONGODB_URI=mongodb://localhost:27017/
```

### 4. Start the Backend Server

**Option 1: Using Python directly**

```bash
python3 main.py
```

**Option 2: Using uvicorn (Recommended for development)**

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The `--reload` flag enables auto-reload when you make code changes.

### 5. Verify Backend is Running

- **Server URL:** http://localhost:8000
- **API Documentation:** http://localhost:8000/docs (Swagger UI)
- **Alternative Docs:** http://localhost:8000/redoc (ReDoc)
- **Health Check:** http://localhost:8000/ (returns backend and MongoDB status)

## 🎨 Frontend Setup

### 1. Navigate to Frontend Directory

```bash
cd SDL_PROject/FrontEnd
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables (if needed)

If the frontend requires API endpoint configuration, create a `.env` file:

```env
VITE_API_URL=http://localhost:8000
```

### 4. Start the Frontend Development Server

```bash
npm run dev
```

The frontend will typically run on http://localhost:5173

## 📚 API Documentation

### Authentication

Most endpoints require API key authentication. To obtain your API key:

1. **Sign Up:** `POST /auth/signup`

   - Request body: `{ "email": "string", "password": "string" }`
   - Returns: User object with `api_key`

2. **Sign In:** `POST /auth/signin`

   - Request body: `{ "email": "string", "password": "string" }`
   - Returns: User object with `api_key`

3. Include your API key in the request body as `apikey` for all protected endpoints

### Image Processing Endpoints

All image processing endpoints:

- **Method:** POST
- **Content-Type:** multipart/form-data
- **Request Body:**
  - `file`: Image file (multipart/form-data)
  - `apikey`: Your API key
- **Response:** Processed image as binary data (image/jpeg)

**Available Endpoints:**

- `/grayscale` - Convert to grayscale
- `/pencilsketch` - Apply pencil sketch effect
- `/cartoonify` - Cartoonify image
- `/grainyeffect` - Add grainy texture
- `/contrastehancement` - Enhance contrast
- `/coolfilter` - Apply cool color filter
- `/warmfilter` - Apply warm color filter
- `/sepia` - Apply sepia tone
- `/hdreffect` - Apply HDR effect
- `/invertcolor` - Invert colors
- `/gotham` - Apply Gotham filter
- `/compression` - Compress image

### Image Management Endpoints

- **Save Image:** `POST /savefile?user_id={user_id}`

  - Saves processed image to Cloudinary
  - Returns: Cloudinary URL

- **Get All Images:** `GET /getallimages?user_id={user_id}`

  - Returns: Array of user's saved images

- **Delete Image:** `DELETE /deleteimage?user_id={user_id}&file_id={file_id}`
  - Deletes image from Cloudinary and database

### User Management

- **Edit Password:** `PUT /editpassword?user_id={user_id}`

  - Request body: `{ "apikey": "string", "new_password": "string" }`

- **Check Authentication:** `GET /isAuth?apikey={apikey}`
  - Verifies if API key is valid

For detailed API documentation with request/response examples, visit http://localhost:8000/docs when the backend is running.

## 🔍 Troubleshooting

### Port Already in Use Error

**Error:** `[Errno 48] error while attempting to bind on address ('127.0.0.1', 8000): address already in use`

**Solution:**

1. **Check what's using port 8000:**

```bash
lsof -i :8000
```

2. **Kill the process:**

```bash
kill -9 <PID>
```

Replace `<PID>` with the process ID from step 1.

3. **Or use a different port:**

```bash
uvicorn main:app --reload --port 8001
```

### MongoDB Connection Issues

**Symptoms:**

- Backend fails to start
- "MongoDB connection failed" error
- SSL certificate errors

**Solutions:**

1. **Verify MongoDB URI:**

   - Check your `.env` file has the correct `MONGODB_URI`
   - Ensure MongoDB instance is running (if local)
   - Verify network connectivity (if cloud)

2. **SSL Certificate Issues (macOS):**

```bash
python3 -m pip install --upgrade certifi
```

3. **Test MongoDB Connection:**
   - Try connecting using MongoDB Compass or `mongosh`
   - Verify credentials and cluster whitelist settings

### Dependencies Not Found

**Error:** `ModuleNotFoundError` or import errors

**Solution:**

1. **Ensure virtual environment is activated:**

```bash
python3 -m venv venv
source venv/bin/activate  # On macOS/Linux
pip install -r requirements.txt
```

2. **Or use pipenv:**

```bash
pipenv install
pipenv shell
```

3. **Verify Python version:**

```bash
python3 --version  # Should be 3.12 or higher
```

### Frontend Build Issues

**Error:** Module not found or build failures

**Solution:**

1. **Clear node_modules and reinstall:**

```bash
rm -rf node_modules package-lock.json
npm install
```

2. **Check Node.js version:**

```bash
node --version  # Should be v16 or higher
```

### Image Processing Errors

**Error:** Filter not applying or returning errors

**Solution:**

1. **Verify image format:** Supported formats include JPG, PNG, GIF
2. **Check file size:** Very large images may cause memory issues
3. **Verify API key:** Ensure valid API key is included in requests
4. **Check backend logs:** Look for detailed error messages in terminal

## 👥 Team

This project was developed as part of the Integrated Software Development Lab (SDL) project by:

- **Savitur Chauhan** (23UCC598) - [LinkedIn](https://www.linkedin.com/in/saviturchauhan) | [GitHub](https://github.com/SaviturChauhan)
- **Naman Arora** (23UCC575) - [LinkedIn](https://www.linkedin.com/in/naman-arora-798852291/) | [GitHub](https://github.com/Naman-2208)
- **Sabhay Thakkar** (23UCC594) - [LinkedIn](https://www.linkedin.com/in/sabhay-thakkar-660b02291/) | [GitHub](https://github.com/sabhay02)
- **Saanvi Chabaque** (23UCC593) - [LinkedIn](https://www.linkedin.com/in/saanvi-chabaque-116060312/) | [GitHub](https://github.com/Schabaque)

## 🤝 Contributing

[Add contribution guidelines if applicable]

---

**Note:** This is an academic project developed for the Integrated Software Development Lab. For production use, ensure proper security measures, error handling, and scalability optimizations are implemented.
