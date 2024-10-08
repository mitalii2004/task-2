require("dotenv").config();
const express = require("express");
const models = require("../models");
const app = express();
const otpManager = require("node-twillo-otp-manager")(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN,
    process.env.TWILIO_SERVICE_SID
);

module.exports = {
    test: async (req, res) => {
        try {
            const serviceSid = await otpManager.createServiceSID("appCleaning", "4");
            res.status(200).send({
                serviceSid: serviceSid,
                success: true,
                message: "Service SID created",
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({
                success: false,
                message: "Failed to create Service SID",
                error: error.message,
            });
        }
    },


    sendopt: async (req, res) => {
        try {
            const { countryCode, mobile } = req.body; 
            const phone = countryCode + mobile; 
            try {
                var resp = await otpManager.sendOTP(phone);
            } catch (error) {
                res.status(500).json({
                        success: false,
                        message: "Number is not valid",
                        error: error.message,
                    });
            }
            res.status(200).json({ success: true, message: "OTP sent", data: resp });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                    success: false,
                    message: "Failed to send OTP",
                    error: error.message,
                });
        }
    },

 
    VerifyOTP: async (req, res) => {
        try {
            const { mobileNumber, otp } = req.body; 
            const isMobileExist = { dataValues: { countryCode: "+" } }; 
            const formattedMobileNumber =
                isMobileExist.dataValues.countryCode === null
                    ? "+" + mobileNumber
                    : isMobileExist.dataValues.countryCode + mobileNumber;

            const resp = await otpManager.verifyOTP(formattedMobileNumber, otp);

            res.json({ success: true, message: "OTP verified", data: resp });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                    success: false,
                    message: "Failed to verify OTP",
                    error: error.message,
                });
        }
    }
}

