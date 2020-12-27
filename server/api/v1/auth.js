require('dotenv').config();
const { Router } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const RefreshToken = require('../../models/RefreshToken');
const authenticateToken = require('../../helpers/authenticateToken');
const generateAccessToken = require('../../helpers/generateAccessToken');

const router = Router();

router.get('/users', authenticateToken, async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

router.get('/user', authenticateToken, async (req, res) => {
  const user = await User.findOne({ _id: req.user.id });
  res.json(user);
});

router.post('/register', async (req, res) => {
  try {
    const user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });
    res.status(201).json({ user });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: 'email already registered' });
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // check if user exists and passwords match
    if (!user) return res.status(400).json({ message: 'Cannot find user' });
    const passwordsMatch = await bcrypt.compare(req.body.password, user.password);
    if (!passwordsMatch) res.status(401).json({ message: 'not allowed' });
    // create token for user
    const userObj = JSON.parse(JSON.stringify(user));
    const accessToken = generateAccessToken(userObj);
    const refreshToken = jwt.sign({ payload: userObj }, process.env.REFRESH_TOKEN_SECRET);
    await RefreshToken.create({ userId: userObj.id, token: refreshToken });
    res.json({ accessToken, refreshToken });
  } catch (err) {
    next(err);
  }
});

router.post('/token', async (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) return res.status(401).json({ message: 'not allowed' });
  const refreshTokenExists = await RefreshToken.findOne({ token: refreshToken });
  if (!refreshTokenExists) {
    return res.status(403).json({ message: 'do not mess with the ZOHAN 🤪' });
  }
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'do not mess with the ZOHAN 🤪' });
    const accessToken = generateAccessToken(decoded.payload);
    res.json({ accessToken });
  });
});

module.exports = router;
