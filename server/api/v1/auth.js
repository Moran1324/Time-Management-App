require('dotenv').config();
const { Router } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const RefreshToken = require('../../models/RefreshToken');
const authenticateToken = require('../../helpers/auth/authenticateToken');
const generateAccessToken = require('../../helpers/generateAccessToken');
const handleMongoErrors = require('../../helpers/auth/mongoErrorHandler');

const router = Router();

// get all users
router.get('/users', authenticateToken, async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// get personal user info
router.get('/user', authenticateToken, async (req, res) => {
  const user = await User.findOne({ _id: req.user.id });
  res.json(user);
});

// register new user
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
    const errors = handleMongoErrors(err);
    res.status(400).json({ errors });
  }
});

// login with existing user
router.post('/login', async (req, res, next) => {
  const rememberMe = req.body.rememberMe || false;
  try {
    const user = await User.findOne({ email: req.body.email });
    // check if user exists and passwords match
    if (!user) return res.status(400).json({ message: 'Cannot find user' });
    const passwordsMatch = await bcrypt.compare(req.body.password, user.password);
    if (!passwordsMatch) return res.status(401).json({ message: 'not allowed' });
    // create token for user
    const userObj = JSON.parse(JSON.stringify(user));
    const accessToken = generateAccessToken(userObj);
    // check if user has refreshToken
    const tokenExists = await RefreshToken.find({ userId: userObj.id });
    if (tokenExists) {
      await RefreshToken.deleteOne({ userId: userObj.id });
    }
    const refreshToken = jwt.sign({ payload: userObj }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: rememberMe ? '365 days' : '24h',
    });
    await RefreshToken.create({ userId: userObj.id, token: refreshToken });
    res.cookie('accessToken', accessToken);
    res.cookie('refreshToken', refreshToken);
    res.json({ user: userObj });
  } catch (err) {
    const errors = handleMongoErrors(err);
    res.status(400).json({ errors });
  }
});

// generate new access token with refresh token
router.post('/token', async (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) return res.status(401).json({ message: 'not allowed' });
  try {
    const refreshTokenExists = await RefreshToken.findOne({ token: refreshToken });
    if (!refreshTokenExists) return res.status(403).json({ message: 'you don\'t authorized 🤪' });
    // console.log('refreshToken: ', refreshTokenExists);
  } catch (err) {
    console.log(err.message);
    return res.sendStatus(500);
  }
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'do not mess with the ZOHAN 😵' });
    const accessToken = generateAccessToken(decoded.payload);
    res.cookie('accessToken', accessToken).json({ message: 'authenticated' });
  });
});

router.post('/logout', async (req, res) => {
  try {
    await RefreshToken.deleteOne({ token: req.body.token });
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.sendStatus(204);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: 'logout failed' });
  }
});

module.exports = router;
