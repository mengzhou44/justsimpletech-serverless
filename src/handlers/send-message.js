import AWS from "aws-sdk";
import createError from "http-errors";
import commonMiddleware from "../utils/common-middleware";

const ses = new AWS.SES({ region: "eu-west-1" });

async function sendMessage(event, context) {
    try {
        const { name, email, message } = event.body;
        const systemEmail = process.env.SYSTEM_EMAIL;

        const params = {
            Source: email,
            Destination: {
                ToAddresses: [systemEmail]
            },
            Message: {
                Body: {
                    Text: {
                        Data: message
                    }
                },
                Subject: {
                    Data: `Message from ${name}`
                }
            }
        };

        await ses.sendEmail(params).promise();

        return {
            statusCode: 200,
            body: "Message is sent successfully!"
        };

    } catch (err) {
        throw createError.InternalServerError(
            "Error occured while seending message"
        );
    }
}

export const handler = commonMiddleware(sendMessage);
