const express  = require("express");
const { createUser, createUserSingle, loginUserCtrl, getUsers, getUser, deleteUser } = require("../controllers/userCtrl");
const router   = express.Router();

router.post  ('/register-single', createUserSingle);
router.post  (       '/register', createUser);
router.post  (          '/login', loginUserCtrl);
router.get   (      '/all-users', getUsers);
router.get   (   '/get-user/:id', getUser);
router.delete('/delete-user/:id', deleteUser);

module.exports = router;