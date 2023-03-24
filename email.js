const nodemailer = require("nodemailer");
const keys = require("./config/keys");

let transporter = nodemailer.createTransport({
  service: "gmail",
  scope: "https://mail.google.com/",
  auth: {
    clientId: "663928070959-eljju6kfhc7tqtjjrjv763e346r0bfgm.apps.googleusercontent.com",
    user: keys.emailUsername,
    pass: keys.emailPassword
  }
});

module.exports = {
  sendEmail: async function sendEmail(fName, lName, clientEmail, business, service, haveWebsite, haveDomain) {
    try {
      let info = await transporter.sendMail({
        from: "nattipop815@gmail.com",
        to: "natalie@vitawd.com",
        subject: `New website form from ${fName} ${lName}`,
        html: `<div>
          <h1>Here's the data:</h1>
          <ul>
            <li>Full Name: ${fName} ${lName}</li>
            <li>Email: ${clientEmail}</li>
            <li>Business/Non-Profit Name: ${business}</li>
            <li>Service: ${service}</li>
            <li>Already have a website: ${haveWebsite}</li>
            <li>Already have domain: ${haveDomain}</li>
          </ul>
        </div>`
      })
    } catch (err) {
      console.log(err)
    }
  }
}