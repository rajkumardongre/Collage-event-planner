const { Router } = require('express');
const clubController = require('../Controller/Club.controller');
const { requireClubAuth } = require('../Middleware/authMiddleware');

const router = Router();

// router.get('/signup', authController.signup_get);
// router.post('/signup', authController.signup_post);
router.get('/add', requireClubAuth, clubController.addEvent_get);
router.post('/add', requireClubAuth, clubController.addEvent_post);
router.get('/all', requireClubAuth, clubController.allEvent_get);
router.get('/edit/:id', requireClubAuth, clubController.editEvent_get);
router.post('/edit/:id', requireClubAuth, clubController.editEvent_post);
router.get('/register/:id', requireClubAuth, clubController.eventRegistrations_get);
// router.post('/register/:id', requireClubAuth, clubController.editEvent_post);

module.exports = router;
