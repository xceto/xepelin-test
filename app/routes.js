const express = require('express');
const cors = require('cors');

const router = express.Router();
router.use(cors());

const controllerShortUrl = require('./shortUrl/controller');

router.post('/shorten', controllerShortUrl.shorten);
router.get('/shorten/:id', controllerShortUrl.getFromId);
// router.get('/domain', controllerShortUrl.domain);

module.exports = router;
