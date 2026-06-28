const router=require("express").Router();

const user=require("../controllers/userController");

const auth=require("../middleware/auth");

// router.get("/",auth,user.getAll);

// router.get("/:id",auth,user.getById);

// router.post("/",auth,user.create);

// router.put("/:id",auth,user.update);

// router.delete("/:id",auth,user.remove);

router.get("/",user.getAll);

router.get("/:id",user.getById);

router.post("/",user.create);

router.put("/:id",user.update);

router.delete("/:id",user.remove);


module.exports=router;