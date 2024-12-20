import fs from 'fs';
import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import cors from 'cors';

const app = express();
const port = 5000;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://unusia:unusia@cluster0.oceot.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Middleware
app.use(express.json());

// Configuring CORS to allow requests from frontend (port 5173 for Vite)
app.use(cors({
  origin: 'http://localhost:5173',  // Frontend running on Vite
  methods: ['GET', 'POST', 'DELETE'],  // Allowed methods
  allowedHeaders: ['Content-Type'],  // Allowed headers
}));

// Image Schema for Gallery
const imageSchema = new mongoose.Schema({
  url: String,
  title: String,
});

const Image = mongoose.model('Image', imageSchema);

// Team Member Schema
const teamMemberSchema = new mongoose.Schema({
  name: String,
  role: String,
  image: String,  // This will store the path of the uploaded image
});

const TeamMember = mongoose.model('TeamMember', teamMemberSchema);

// Ensure uploads directories exist
const uploadDirGallery = 'uploads/gallery';
const uploadDirTeam = 'uploads/teams';

if (!fs.existsSync(uploadDirGallery)) {
  fs.mkdirSync(uploadDirGallery);
}

if (!fs.existsSync(uploadDirTeam)) {
  fs.mkdirSync(uploadDirTeam);
}

// Multer setup for gallery image uploads (validate file type)
const storageGallery = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirGallery);  // Save images in the gallery folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const uploadGallery = multer({
  storage: storageGallery,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];  // Allow only images
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPG, PNG, and GIF are allowed.'), false);
    }
  },
});

// Multer setup for team member image uploads (validate file type)
const storageTeam = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirTeam);  // Save images in the teams folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const uploadTeam = multer({
  storage: storageTeam,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];  // Allow only images
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPG, PNG, and GIF are allowed.'), false);
    }
  },
});

// Routes for Gallery

// Fetch all images for gallery
app.get('/api/gallery', async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching images' });
  }
});

// Handle multiple image uploads for gallery
app.post('/api/uploadgallery', uploadGallery.array('images', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'Please upload at least one image.' });
    }

    const uploadedImages = req.files.map((file) => {
      const newImage = new Image({
        url: `/uploads/gallery/${file.filename}`, 
        title: req.body.title || `Uploaded Image ${Date.now()}`, 
      });
      return newImage.save();
    });

    const savedImages = await Promise.all(uploadedImages);
    res.json(savedImages);  
  } catch (err) {
    res.status(500).json({ message: 'Error uploading images' });
  }
});

// Delete an image from gallery
app.delete('/api/gallery/:id', async (req, res) => {
  try {
    const image = await Image.findByIdAndDelete(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    // Optionally delete the image file from the server as well
    const imagePath = path.join(__dirname, 'uploads/gallery', image.url.split('/uploads/gallery')[1]);
    fs.unlinkSync(imagePath);  // Delete file from the filesystem
    res.json({ message: 'Image deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting image' });
  }
});

// Static file server for gallery images
app.use('/uploads/gallery', express.static(uploadDirGallery));

// Routes for Team Members

// Fetch all team members
app.get('/api/team', async (req, res) => {
  try {
    const teamMembers = await TeamMember.find();
    res.json(teamMembers);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching team members' });
  }
});

// Add a new team member (with image upload)
app.post('/api/uploadteam', uploadTeam.single('image'), async (req, res) => {
  try {
    const { name, role } = req.body;
    const image = req.file ? `/uploads/teams/${req.file.filename}` : null; // Image URL after upload

    if (!name || !role || !image) {
      return res.status(400).json({ message: 'Name, role, and image are required.' });
    }

    const newMember = new TeamMember({ name, role, image });
    await newMember.save();

    res.status(201).json(newMember);  // Return the newly added team member
  } catch (err) {
    res.status(500).json({ message: 'Error adding team member' });
  }
});

// Delete a team member

// Corrected route for deleting a team member and its image
// Delete a team member and their image
app.delete('/api/team/:id', async (req, res) => {
  try {
    const teamMember = await TeamMember.findByIdAndDelete(req.params.id);
    if (!teamMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    
    // Delete the image file from the server
    const imagePath = path.join(__dirname, 'uploads/teams', teamMember.image.split('/uploads/teams')[1]);
    fs.unlinkSync(imagePath);  // Delete file from the filesystem

    res.json({ message: 'Team member deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting team member' });
  }
});





// Static file server for team member images
app.use('/uploads/teams', express.static(uploadDirTeam));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
