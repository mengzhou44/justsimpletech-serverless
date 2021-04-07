import AWS from "aws-sdk";
import createError from "http-errors";
import commonMiddleware from "../utils/common-middleware";

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function uploadFeeds(event, context) {
    const {feeds} = event.body;
    try {
        for (let feed of feeds) {
            await dynamodb
            .put({
                TableName: process.env.FEEDS_TABLE_NAME,
                Item: feed,
            })
            .promise();
        }

        return {
            statusCode: 200,
            body: 'Success!'
        };
    } catch (error) {
        throw createError.InternalServerError(error);
    }
}

export const handler = commonMiddleware(uploadFeeds);
