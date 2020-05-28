const express = require('express');

const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');
const coopCtrl = require('../controllers/cooperative');

const router = express.Router();

router.post('/', multer, auth, coopCtrl.createCoop);
router.get('/coops', auth, coopCtrl.fetchCoop);

module.exports = router;
