const router = require('express').Router();

router.get('/UserProfiles', (req, res) => {
  // Handle fetching user profiles here
  res.send('User Profiles endpoint');
});
module.exports = router;
