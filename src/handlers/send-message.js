import createError from 'http-errors';
import commonMiddleware from '../utils/common-middleware';

async function sendMessage(event, context) {
	const mailer = require('../utils/mailer');
	try {
		await mailer.sendSystemMail(
			{
				to: process.env.SYSTEM_EMAIL,
				subject: 'User feedbacks',
				body: event.body,
			},
			(err) => {
				throw err;
			},
			() => {
				return {
					statusCode: 200,
					body: 'Success!',
				};
			}
		);
	} catch (err) {
		throw createError.InternalServerError(
			'Error occured while sending email!'
		);
	}
}

export const handler = commonMiddleware(sendMessage);
