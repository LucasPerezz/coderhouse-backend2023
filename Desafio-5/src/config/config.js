const dotenv = require('dotenv');
const options = require('./../process');
dotenv.config({
    path: options.mode.toUpperCase()==="DEVELOPMENT" ? '.env.development' : '.env.production'
});

module.exports = {
    mode: options.mode.toUpperCase(),
    debug: options.d,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    mongo_url: process.env.MONGO_URL,
    port: options.p || process.env.PORT,
    github_app_id: process.env.GITHUB_APP_ID,
    github_client_secret: process.env.GITHUB_CLIENT_SECRET,
    github_client_id: process.env.GITHUB_CLIENT_ID,
    github_callback_url: process.env.GITHUB_CALLBACK_URL,
    private_key: process.env.PRIVATE_KEY
}