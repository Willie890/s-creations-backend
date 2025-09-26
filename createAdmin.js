// createAdmin.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');

mongoose.connect(process.env.MONGODB_URI);

const createAdmin = async () => {
  const email = 'admin@screations.com'; // change as needed
  const password = 'secureAdminPassword123!'; // change this!

  const hashed = await bcrypt.hash(password, 10);
  const admin = new User({ email, password: hashed, isAdmin: true });
  await admin.save();
  console.log('Admin user created:', email);
  process.exit();
};

createAdmin().catch(console.error);
