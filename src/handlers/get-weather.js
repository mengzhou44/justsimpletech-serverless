import axios from "axios";
import createError from "http-errors";
import commonMiddleware from "../utils/common-middleware";

async function getWeather(event, context) {
    try {
        const { latitude, longitude } = event.body;
        const apiKey = process.env.WEATHER_API_KEY;
        const url = `https://api.darksky.net/forecast/${apiKey}/${latitude},${longitude}?units=si`;

        const response = await axios.get(url);
        const { summary } = response.data.daily.data[0];
        const { temperature, precipProbability } = response.data.currently;

        return {
            statusCode: 200,
            body: JSON.stringify({
                summary,
                temperature,
                precipProbability
            })
        };
    } catch (error) {
        throw createError.InternalServerError(error);
    }
}

export const handler = commonMiddleware(getWeather);
