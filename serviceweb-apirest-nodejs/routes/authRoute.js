const express = require("express");
const { createUser, createUserSingle, loginUserCtrl, getUser } = require("../controllers/userCtrl");
const router   = express.Router();

router.post('/register-single', createUserSingle);
router.post(       '/register', createUser);
router.post(          '/login', loginUserCtrl);
router.get(       '/all-users', getUser);

module.exports = router;