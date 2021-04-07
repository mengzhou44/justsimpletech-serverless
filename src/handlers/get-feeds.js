import AWS from "aws-sdk";
import createError from "http-errors";
import commonMiddleware from "../utils/common-middleware";

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function getFeeds(event, context) {
    const params = {
        TableName: process.env.FEEDS_TABLE_NAME
    };
    try {
        const result = await dynamodb.scan(params).promise();
        
        return {
            statusCode: 201,
            body: JSON.stringify({ feeds: result.Items })
        };
    } catch (error) {
        throw createError.InternalServerError(error);
    }
}

export const handler = commonMiddleware(getFeeds);
