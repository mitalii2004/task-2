const nodemailer = require("nodemailer");
const sendMail = async (req, res) => {
  let transporter = await nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 587,
    auth: {
      user: process.env.MY_MAIL,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: "mitaligoura@cqlsys.co.uk",
    to: "vaneetkumar@cqlsys.co.uk",
    subject: "HELLO VANEET SIR",
    text: "I'M MITALi",
    html: "<b>HELLO WORLD</b>",
  });
  console.log("Message sent:%s", info.messageId);
  res.json(info);
};

module.exports = {
  sendMail: sendMail,
};
