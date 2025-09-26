// server/routes/auth.js
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Debug: log incoming request
    console.log('Login attempt for:', email);

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Ensure JWT_SECRET is set
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is missing!');
      return res.status(500).json({ message: 'Server misconfigured' });
    }

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, isAdmin: user.isAdmin } });
  } catch (err) {
    console.error('Login error:', err); // 👈 This will show in Render logs
    res.status(500).json({ message: 'Server error' });
  }
});
