// --- Node.js imports ---
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import carRoutes from './routes/carRoutes.js';

dotenv.config();
const app = express();
const __dirname = path.resolve(); // because ES modules
const PORT = process.env.PORT || 5000;

// --- CORS settings ---
const corsOptions = {
  origin: ['http://localhost:5500', 'http://127.0.0.1:5500'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// --- MongoDB connect ---
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

// --- Car routes (MongoDB based) ---
app.use('/api/cars', carRoutes);

// --- USERS section (File-based authentication) ---
const USERS_FILE = './users.json';

// Helper: read users
function getUsers() {
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([]));
    return [];
  }
  const fileContent = fs.readFileSync(USERS_FILE, 'utf-8');
  return fileContent ? JSON.parse(fileContent) : [];
}

// Helper: save users
function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// ✅ Register
app.post('/api/register', (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ success: false, message: "All fields required." });
    }

    const users = getUsers();
    const userExists = users.find(u => u.email === email);
    if (userExists) {
      return res.json({ success: false, message: "User already exists." });
    }

    users.push({ email, password }); // ⚠️ Password hashing not included
    saveUsers(users);

    console.log(`✅ User registered: ${email}`);
    res.json({ success: true });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Login - POST
app.post('/api/auth', (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ success: false, message: "All fields required." });
    }

    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      console.log(`✅ User authenticated (POST): ${email}`);
      res.json({ success: true });
    } else {
      console.log(`❌ Auth failed (POST): ${email}`);
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error('Auth POST error:', error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Login - GET (query params)
app.get('/api/auth', (req, res) => {
  try {
    const { email, password } = req.query;
    if (!email || !password) {
      return res.json({ success: false, message: "All fields required." });
    }

    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      console.log(`✅ User authenticated (GET): ${email}`);
      res.json({ success: true });
    } else {
      console.log(`❌ Auth failed (GET): ${email}`);
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error('Auth GET error:', error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ All users - test purpose
app.get('/api/users', (req, res) => {
  try {
    const users = getUsers();
    console.log(`📋 Users list requested, ${users.length} users returned`);
    res.json(users);
  } catch (error) {
    console.error('Users list error:', error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Static HTML serving
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Default route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📂 Make sure 'public/index.html' exists`);
});
