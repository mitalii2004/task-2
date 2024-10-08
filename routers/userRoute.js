const express = require("express");
const router = express.Router();
const controllers = require("../controllers/index");
const commonHelper = require("../helpers/commonHelper");

router.get("/mail", controllers.sendMailControllers.sendMail);

router.post("/insert", controllers.userController.insert);
router.get("/getRecord", controllers.userController.getRecord);
router.put("/updateSome", controllers.userController.updateSomeRecord);
router.patch("/updateAll", controllers.userController.updateAllRecord);
router.delete("/delete", controllers.userController.deleteRecord);

router.post("/test", commonHelper.test );
router.post("/sendotp", commonHelper.sendopt );
router.post("/verifyotp", commonHelper.VerifyOTP )

module.exports = router;