import AWS from "aws-sdk";
import createError from "http-errors";
import commonMiddleware from "../utils/common-middleware";

const ses = new AWS.SES({ region: "eu-west-1" });

async function sendMessage(event, context) {
    try {
        const { contactName,  contactEmail, contactMessage } = event.body;
        const systemEmail = process.env.SYSTEM_EMAIL;

        const params = {
            Source: contactEmail,
            Destination: {
                ToAddresses: [systemEmail]
            },
            Message: {
                Body: {
                    Text: {
                        Data: contactMessage
                    }
                },
                Subject: {
                    Data: `Message from ${contactName}`
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
