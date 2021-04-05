const cryptoJS = require("crypto-js");

async function google(event, context) {
    const keys = {
        map: process.env.GOOGLE_MAP_API_KEY,
        video: process.env.GOOGLE_YOUTUBE_API_KEY
    };
    const encrypted = cryptoJS.AES.encrypt(
        JSON.stringify(keys),
        process.env.CRYPTO_KEY
    );

    return {
        statusCode: 200,
        body: encrypted.toString()
    };
}

export const handler = google;
