const dotenv = require('dotenv');
const { resolve } = require('path');
dotenv.config({path: resolve(__dirname, "./.dotenv")});

module.exports = {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    github_AppId: process.env.GITHUB_APP_ID,
    github_ClientId: process.env.GITHUB_CLIENT_ID,
    github_ClientSecret: process.env.GITHUB_CLIENT_SECRET,
    github_CallbackURL: process.env.GITHUB_CALLBACK_URL,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    private_key: process.env.PRIVATE_KEY
}