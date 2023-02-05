const axios = require("axios");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
	try {
		const prompt = req.body.prompt;
		console.log(prompt);
		const completion = await openai.createCompletion({
			model: "text-davinci-003",
			prompt: prompt,
			max_tokens: 500,
			temperature: 0.7,
		});
		console.log(completion);
		res.status(200).json({ text: completion.data.choices[0].text });
		console.log(completion.data);
	} catch (error) {
		if (error.response) {
			console.log(error.response.status);
			console.log(error.response.data);
			res.status(error.response.status).json({ error: error.response.data });
		} else {
			console.log(error.message);
			res.status(500).json({ error: error.message });
		}
	}
}
