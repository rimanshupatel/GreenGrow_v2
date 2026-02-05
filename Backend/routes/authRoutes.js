const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/authController');

router.post('/register', registerUser);

// ✅ ADD THIS
router.get('/user', (req, res) => {
    console.log(req.session.user)
    if (!req.session.user) {
        return res.status(401).json({ message: "User not logged in" });
    }
    res.json(req.session.user);
});

module.exports = router;
