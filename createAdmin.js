// createAdmin.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');

mongoose.connect(process.env.MONGODB_URI);

const createAdmin = async () => {
  const email = 'Willemstefanus56@gmail.com'; // change as needed
  const password = '5678'; // change this!

  const hashed = await bcrypt.hash(password, 10);
  const admin = new User({ email, password: hashed, isAdmin: true });
  await admin.save();
  console.log('Admin user created:', email);
  process.exit();
};

createAdmin().catch(console.error);
