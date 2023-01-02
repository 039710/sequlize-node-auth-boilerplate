const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");
const sendEmail = async (email, subject, template, context) => {
  try {
    const transporter = nodemailer.createTransport({
      // hard coded for now
      host: process.env.EMAIL_HOST,
      secure: false,
      secureConnection: false,
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const handleBarsOptions = {
      viewEngine: {
        extName: ".handlebars",
        partialsDir: path.resolve(__dirname, "views"),
        defaultLayout: false,
      },
      viewPath: path.resolve(__dirname, "views"),
      extName: ".handlebars",
    };
    console.log(handleBarsOptions.viewEngine.partialsDir);
    console.log(handleBarsOptions.viewPath);
    transporter.use("compile", hbs(handleBarsOptions));

    await transporter.sendMail({
      from: `Dev Pipelix <devPipelix@mail.com>`,
      to: email,
      subject: subject,
      template: template,
      context: context,
    });

    console.log("email sent sucessfully");
  } catch (error) {
    console.log(error, "email not sent");
  }
};

module.exports = sendEmail;
