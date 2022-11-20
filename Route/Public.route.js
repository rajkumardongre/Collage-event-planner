const { Router } = require('express');
const publicController = require('../Controller/Public.controller');


const router = Router();

// router.get('/signup', authController.signup_get);
// router.post('/signup', authController.signup_post);
router.get('/', publicController.home);
router.get('/event/:id', publicController.eventDetail);
router.get('/register/:id', publicController.registerEvent_get);
router.post('/register/:id', publicController.registerEvent_post);
router.get('/event/', publicController.allEvents_get);
router.post('/event/', publicController.eventSearch_post);


module.exports = router;
