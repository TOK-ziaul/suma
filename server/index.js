import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { fileURLToPath } from "url";
// import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = "your-secret-key";

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for demo (replace with MongoDB in production)
let users = [];
let games = [];

// Mock products data
const products = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    image: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg",
    price: 999.99,
  },
  {
    id: 2,
    name: "MacBook Pro",
    image: "https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg",
    price: 2399.99,
  },
  {
    id: 3,
    name: "Nike Air Jordan",
    image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
    price: 189.99,
  },
  {
    id: 4,
    name: "Sony WH-1000XM4",
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg",
    price: 349.99,
  },
  {
    id: 5,
    name: "Samsung 4K TV",
    image: "https://images.pexels.com/photos/1201996/pexels-photo-1201996.jpeg",
    price: 899.99,
  },
  {
    id: 6,
    name: "Rolex Submariner",
    image: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg",
    price: 8995.0,
  },
  {
    id: 7,
    name: "Louis Vuitton Bag",
    image: "https://images.pexels.com/photos/904350/pexels-photo-904350.jpeg",
    price: 2500.0,
  },
  {
    id: 8,
    name: "Pepsi 6-Pack",
    image: "https://images.pexels.com/photos/3008882/pexels-photo-3008882.jpeg",
    price: 5.99,
  },
  {
    id: 9,
    name: "Coffee Beans 1kg",
    image: "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg",
    price: 24.99,
  },
  {
    id: 10,
    name: "Organic Honey",
    image: "https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg",
    price: 12.5,
  },
];

// Auth middleware
const auth = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

// Routes

// Register
app.post("/api/auth/register", async (req, res) => {
  try {
    const { email, password, phone, countryCode } = req.body;

    // Check if user exists
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = {
      id: users.length + 1,
      email,
      password: hashedPassword,
      phone,
      countryCode,
      phoneVerified: false, // In production, implement phone verification
      createdAt: new Date(),
    };

    users.push(user);

    // Generate JWT
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        phoneVerified: user.phoneVerified,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = users.find((u) => u.email === email);
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "30d",
    });

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        phoneVerified: user.phoneVerified,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get products for game
app.get("/api/products", (req, res) => {
  const { count = 3 } = req.query;
  const shuffled = products.sort(() => 0.5 - Math.random());
  res.json(shuffled.slice(0, parseInt(count)));
});

// Get random products for final round
app.get("/api/products/final-round", (req, res) => {
  const shuffled = products.sort(() => 0.5 - Math.random());
  const rounds = [];

  for (let i = 0; i < 3; i++) {
    const roundProducts = shuffled
      .slice(i * 3, (i + 1) * 3)
      .map((product, index) => ({
        ...product,
        quantity: Math.floor(Math.random() * 5) + 1,
        row: index + 1,
      }));
    rounds.push(roundProducts);
  }

  res.json(rounds);
});

// Save game result
app.post("/api/games", auth, (req, res) => {
  try {
    const gameResult = {
      id: games.length + 1,
      userId: req.user.userId,
      ...req.body,
      createdAt: new Date(),
    };

    games.push(gameResult);
    res.status(201).json(gameResult);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get user's game history
app.get("/api/games", auth, (req, res) => {
  try {
    const userGames = games.filter((game) => game.userId === req.user.userId);
    res.json(userGames);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
