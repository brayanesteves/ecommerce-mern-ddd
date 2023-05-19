const express = require("express");
const { createUser, createUserSingle, loginUserCtrl } = require("../controllers/userCtrl");
const router   = express.Router();

router.post('/register-single', createUserSingle);
router.post(       '/register', createUser);
router.post(          '/login', loginUserCtrl);

module.exports = router;