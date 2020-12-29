const express = require('express');
const { createFormData, getAllForm } = require('../controller/Form');
const router = express.Router();

router.get('/form', getAllForm)
router.post('/form',createFormData)

module.exports = router