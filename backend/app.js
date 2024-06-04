const uri =
  'mongodb+srv://subuhinaseer:b7dwFfo08PsD0oi9@cluster0.exkpqqd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const jwt = require('jsonwebtoken');

const app = express();
const port = 8000;
const http = require('http');
// const socketIo = require('socket.io');
const {Server} = require('socket.io');
const { format } = require('date-fns');

// Function to format the timestamp
const getFormattedTimestamp = () => {
  const now = new Date();
  return format(now, 'yyyy-MM-dd HH:mm:ss');
};

// Middleware to parse JSON bodies
app.use(express.json());
const server = http.createServer(app);
const io = new Server(server);
server.listen(4000, () => {
  console.log('server running at http://localhost:3000');
});
// const io = socketIo(server, {
//   cors: {
//     origin: '*',
//   },
// });
// Connect to MongoDB
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 50000,
    socketTimeoutMS: 45000,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB', err.message);
  });
let users = {};

io.on('connection', socket => {
  console.log('New client connected');

  // Listen for user registration (for simplicity, we use email as user ID)
  socket.on('register', userEmail => {
    users[userEmail] = socket.id;
    console.log(`User registered: ${userEmail}`);
  });

  // Listen for private messages
  socket.on('privateMessage', ({recipientEmail, message}) => {
    const recipientSocketId = users[recipientEmail];
    console.log(recipientEmail,message)
    const timestamp = getFormattedTimestamp();
    if (recipientSocketId) {
      io.to(recipientSocketId).emit('privateMessage', {
        sender: socket.id,
        message,
        timestamp
      });
    } else {
      console.log('User not connected:', recipientEmail);
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected');
    // Optionally remove user from the users object
    for (let email in users) {
      if (users[email] === socket.id) {
        delete users[email];
        break;
      }
    }
  });
});
const createToken = userId => {
  // Set the token payload
  const payload = {
    userId: userId,
  };

  // Generate the token with a secret key and expiration time
  const token = jwt.sign(payload, 'Q$r2K6W8n!jCW%Zk', {expiresIn: '1h'});

  return token;
};

// Define routes
app.post('/login', (req, res) => {
  const {email, password} = req.body;

  if (!email || !password) {
    return res.status(400).json({message: 'Email and password are required'});
  }

  User.findOne({email})
    .then(user => {
      if (!user) {
        //user not found
        return res.status(404).json({message: 'User not found'});
      }

      //compare the provided passwords with the password in the database
      if (user.password !== password) {
        return res.status(404).json({message: 'Invalid Password!'});
      }

      const token = createToken(user._id);
      res.status(200).json({token, user});
    })
    .catch(err => {
      console.error('Error finding user', err);
      res.status(500).json({message: 'Internal server error'});
    });
});
// app.get('/profile', authenticateToken, (req, res) => {
//   User.findById(req.user.id)
//     .then(user => {
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }
//       res.status(200).json({ email: user.email, role: user.role });
//     })
//     .catch(err => {
//       console.error('Error fetching user profile', err);
//       res.status(500).json({ message: 'Internal server error' });
//     });
// });

// Handle registration
app.post('/register', (req, res) => {
  const {email, password, role, name} = req.body;

  if (!email || !password) {
    return res.status(400).json({message: 'Email and password are required'});
  }

  const newUser = new User({email, password, role, name});
  newUser
    .save()
    .then(() => res.status(201).json({message: 'User registered successfully'}))
    .catch(err => {
      console.error('Error registering user', err);
      res.status(500).json({message: 'Internal server error'});
    });
});
app.get('/users', (req, res) => {
  User.find()
    .then(users => res.status(200).json(users))
    .catch(err => {
      console.error('Error fetching users', err);
      res.status(500).json({message: 'Internal server error'});
    });
});
