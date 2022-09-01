const router = require("express").Router();
const { validateUser, validateAdmin, validateNewUser } = require("../../auth/validate");
const {
  createUser,
  editUser,
  searchUser,
  createGroup,
  deleteGroup,
  addMember,
  sendMessage,
  viewMesssages,
  test
} = require("./userController");
// router.get("/", validateUser, getUsers);
// router.post("/", test);
// router.get("/:id", validateUser, getUserByUserId);
// router.post("/login", login);
// router.patch("/", validateUser, updateUsers);
// router.delete("/", validateUser, deleteUser);
// router.delete("/", validateUser, deleteUser);


router.post("/createUser", validateAdmin, createUser);
router.patch("/editUser", validateAdmin, editUser);
router.post("/searchUser/:id", validateUser, searchUser);
router.post("/createGroup", validateUser, createGroup);
router.delete("/deleteGroup", validateUser, deleteGroup);
router.post("/addMember", validateUser, validateNewUser, addMember);
router.post("/sendMessage", validateUser, sendMessage);
router.post("/viewMessage", validateUser, viewMesssages);

module.exports = router;