var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  if (!req.user) {
    res.render('index', { title: 'Welcome page' });
  } else {
    const user = req.user.username;
    res.render('user_page', { user: user });
  }
});

module.exports = router;
