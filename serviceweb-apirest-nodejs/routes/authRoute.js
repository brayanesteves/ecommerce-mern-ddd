const express            = require("express");
const { createUser, createUserSingle, loginUserCtrl, getUsers, getUser, updatedUser, deleteUser, blockUser, unblockUser } = require("../controllers/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router             = express.Router();

router.post  ( '/register-single', createUserSingle);
router.post  (        '/register', createUser);
router.post  (           '/login', loginUserCtrl);
router.get   (       '/all-users', authMiddleware, isAdmin, getUsers);
router.get   (    '/get-user/:id', authMiddleware, isAdmin, getUser);
router.delete( '/delete-user/:id', authMiddleware, isAdmin, deleteUser);
router.put   (  '/block-user/:id', authMiddleware, isAdmin, blockUser);
router.put   ('/unblock-user/:id', authMiddleware, isAdmin, unblockUser);
router.put   ( '/update-user/:id', authMiddleware, updatedUser);

module.exports = router;