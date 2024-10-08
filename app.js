require("dotenv").config();// Ensure dotenv is required at the top

const express = require("express");
const app = express();
const PORT = 7000;

const multer = require("multer");
const path = require("path");
app.use(express.json());
app.use(express.urlencoded({ extented: true }));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use(express.static(path.join(__dirname, "public")));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.post("/profileUpload", upload.array("profile-files", 12), (req, res) => {
  let response = '<a href="/">Home</a><br>';
  response += "Files uploaded successfully.<br>";
  req.files.forEach((file) => {
    response += `<img src="/uploads/${file.filename}" style="width:200px;" /><br>`;
  });
  res.send(response);
});

// const otpManager = require("node-twilio-otp-manager")(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN,
//   process.env.TWILIO_SERVICE_SID
// );

// app.post("./test", async (req, res) => {
//   try {
//     const serviceSid = await otpManager.createServiceSID("appCleaning", "4");
//     console.log("serviceSid:", serviceSid);

//     res.json({ success: true, message: "Service SID created", serviceSid });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to create Service SID",
//       error: error.message,
//     });
//   }
// });

// app.post("/send", async (req, res) => {
//   try {
//     const { countryCode, mobile } = req.body;
//     const phone = countryCode + mobile;
//     console.log("Sending OTP to:", phone);
//     try {
//       var resp = await otpManager.sendOTP(phone);
//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         message: "Number is not valid",
//         error: error.message,
//       });
//     }
//     res.json({ success: true, message: "OTP sent", data: resp });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to send OTP",
//       error: error.message,
//     });
//   }
// });

// app.post("/verify", async (req, res) => {
//   try {
//     const { mobileNumber, otp } = req.body;

//     const isMobileExist = { dataValues: { countryCode: "+" } };
//     const formattedMobileNumber =
//       isMobileExist.dataValues.countryCode === null
//         ? "+" + mobileNumber
//         : isMobileExist.dataValues.countryCode + mobileNumber;

//     const resp = await otpManager.verifyOTP(formattedMobileNumber, otp);

//     res.json({ success: true, message: "OTP verified", data: resp });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to verify OTP",
//       error: error.message,
//     });
//   }
// });

require("./dbconnection").connectiondb();

const userRoute = require("./routers/userRoute");
app.use("/api", userRoute);

app.listen(PORT, () => {
  console.log(`listening at port ${PORT}`);
});
