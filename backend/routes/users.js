const router = require('express').Router();
const { getCurrentUser, updateProfile, updateAvatar } = require('../controllers/users');
const { validateUserProfile, validateUserAvatar } = require('../middleware/validation');

router.get('/me', getCurrentUser);
router.patch('/me', validateUserProfile, updateProfile);
router.patch('/me/avatar', validateUserAvatar, updateAvatar);

module.exports = router;
