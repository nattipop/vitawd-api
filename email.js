const nodemailer = require("nodemailer");
const ejs = require("ejs");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const keys = require("./config/keys");

const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground';

const Mailing = {};

const oauth2Client = new OAuth2(
  keys.clientId,
  keys.clientSecret,
  OAUTH_PLAYGROUND
);

Mailing.sendEmail = async (fName, lName, clientEmail, business, service, haveWebsite, haveDomain, additionalInfo) => {
  oauth2Client.setCredentials({
    refresh_token: keys.refreshToken
  });

  const accessToken = oauth2Client.getAccessToken();

  const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: keys.senderEmail,
      clientId: keys.clientId,
      clientSecret: keys.clientSecret,
      refreshToken: keys.refreshToken,
      accessToken
    }
  });

  try {
    let info = await smtpTransport.sendMail({
      from: keys.senderEmail,
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
          <li>Additional notes: ${additionalInfo}</li>
        </ul>
      </div>`
    })
  } catch (err) {
    console.log(err)
  }
}

exports.Mailing = Mailing;