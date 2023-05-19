const express            = require("express");
const { createUser, createUserSingle, loginUserCtrl, getUsers, getUser, updatedUser, deleteUser } = require("../controllers/userCtrl");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router             = express.Router();

router.post  ('/register-single', createUserSingle);
router.post  (       '/register', createUser);
router.post  (          '/login', loginUserCtrl);
router.get   (      '/all-users', getUsers);
router.get   (   '/get-user/:id', authMiddleware, getUser);
router.delete('/delete-user/:id', deleteUser);
router.put   ('/update-user/:id', updatedUser);

module.exports = router;