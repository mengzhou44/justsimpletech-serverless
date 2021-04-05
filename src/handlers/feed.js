import commonMiddleware from "../utils/common-middleware";
const feedRead = require("feed-read");
import createError from "http-errors";
const util = require("util");

async function feed(event, context) {
    try {
        const { url } = event.queryStringParameters;
        const articles = await util.promisify(feedRead)(url);
        return {
            statusCode: 200,
            body: JSON.stringify(articles)
        };
    } catch (error) {
        throw createError.InternalServerError(error);
    }
}

export const handler = commonMiddleware(feed);
