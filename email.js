const nodemailer = require("nodemailer");
const keys = require("./config/keys");
console.log(keys.privateKey);
const nodeMailerPrivateKey = keys.privateKey.replace(/\n/g, "\n");

let transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    type: "OAuth2",
    user: keys.clientEmail,
    serviceClient: keys.clientId,
    privateKey: nodeMailerPrivateKey
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