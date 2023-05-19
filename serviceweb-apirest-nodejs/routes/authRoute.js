const express            = require("express");
const { createUser, createUserSingle, loginUserCtrl, getUsers, getUser, updatedUser, deleteUser } = require("../controllers/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router             = express.Router();

router.post  ('/register-single', createUserSingle);
router.post  (       '/register', createUser);
router.post  (          '/login', loginUserCtrl);
router.get   (      '/all-users', authMiddleware, getUsers);
router.get   (   '/get-user/:id', authMiddleware, isAdmin, getUser);
router.delete('/delete-user/:id', authMiddleware, deleteUser);
router.put   ('/update-user/:id', authMiddleware, updatedUser);

module.exports = router;