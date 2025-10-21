import express from "express";
import dotenv from "dotenv";
dotenv.config(); // Load .env for this service

const app = express();
app.use(express.json());

// Mock user data
const users = [
  { id: 'user1', email: 'test@example.com', name: 'Test User', roles: ['user'] },
  { id: 'admin1', email: 'admin@example.com', name: 'Admin User', roles: ['user', 'admin'] }
];

// Health check endpoint for this service
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'User Service UP', timestamp: new Date().toISOString() });
});

// Simulate an internal authentication check (used by gateway for /login, /register)
app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  // Basic mock authentication
  const user = users.find(u => u.email === email);
  if (user && password === 'password123') { // Super secure mock password!
    return res.status(200).json({ user, message: 'Login successful' });
  }
  return res.status(401).json({ message: 'Invalid credentials' });
});

app.post('/auth/register', (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  if (users.some(u => u.email === email)) {
    return res.status(409).json({ message: 'User with this email already exists' });
  }
  const newUser = { 
    id: `user${users.length + 1}`, 
    email, 
    name: `${firstName} ${lastName}`, 
    roles: ['user'] 
  };
  users.push(newUser);
  res.status(201).json({ user: newUser, message: 'Registration successful' });
});


// User-related routes
app.get('/users', (req, res) => {
  // Check for X-User-ID header forwarded by gateway
  const requestingUserId = req.headers['x-user-id'];
  console.log(`User Service: Request to /users from Gateway. X-User-ID: ${requestingUserId}`);
  res.json(users);
});

app.get('/users/:id', (req, res) => {
  const requestingUserId = req.headers['x-user-id'];
  console.log(`User Service: Request to /users/:id from Gateway. X-User-ID: ${requestingUserId}`);
  const user = users.find(u => u.id === req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

export default app;