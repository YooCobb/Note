import { adjectives, nouns } from "./secretWords";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-mailgun-transport";
import jwt from "jsonwebtoken";

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

const sendMail = email => {
  const options = {
    auth: {
      api_key: "0d728e3754e3146bdf7f57b85c6dfc5b-713d4f73-99a6d636",
      domain: "sandboxc6fae68a48634dc9a31ebd9d4e618a62.mailgun.org"
    }
  };
  console.log(options);
  const client = nodemailer.createTransport(sgTransport(options));
  return client.sendMail(email);
};

export const sendSecretMail = (adress, secret) => {
  const email = {
    from: "recoder@gmail.com",
    to: adress,
    subject: "Login Secret for Prismagram",
    html: `Hello! Your login secret is <strong>${secret}</strong>.<br/>Copy paste on the app/website to log in`
  };
  return sendMail(email);
};

export const generateToken = id =>
  jwt.sign({ id }, "3QmSqB7oj74WkLyopovlSatrjaiRmsJa");
