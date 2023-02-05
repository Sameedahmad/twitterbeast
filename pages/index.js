import React, { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
//write the head element and the title and description it's next.js

//use the favicon present int the public folder named favicon.ico

const prompts = [
	"Add hilarious joke with an emoji as a response to the below tweet, no #hashtags please",
	"Add thoughtful comment on the below tweet sound like a typical Twitter user, no #hashtags please",
	"Add a witty and humorous response to the below tweet, no #hashtags please",
	"Add a sarcastic and snarky comment to the below tweet, no #hashtags please",
	"Add a lighthearted and playful comment to the below tweet, no #hashtags please",
	"Add a politically incorrect response to the below tweet, no #hashtags please",
	"Create a tweet that offers a solution to the problem mentioned in the original tweet, no #hashtags please",
	"Generate a tweet that shares a personal experience related to the original tweet, no #hashtags please",
	"Compose a tweet that provides a motivational or inspirational quote related to the original tweet, no #hashtags please",
	"Write a tweet that offers a different perspective or alternative solution to the original tweet, no #hashtags please",
	"Create a tweet that asks a thought-provoking question related to the original tweet, no #hashtags please",
	"Generate a tweet that shares a relevant statistic or fact related to the original tweet, no #hashtags please",
	"Write a tweet that offers a valuable resource or tool related to the original tweet, no #hashtags please",
	"Ask a thought-provoking question related to the below tweet, no #hashtags please",
	"Compose a tweet that summarizes the main points of the original tweet in a simple and concise manner, no #hashtags please",
];

function IndexPage() {
	const [prompt, setPrompt] = useState("");
	const [responses, setResponses] = useState([]);
	const [copied, setCopied] = useState(false);
	const [copiedIndex, setCopiedIndex] = useState(-1);

	const handleSubmit = async (e) => {
		e.preventDefault();
		for (let p of prompts) {
			let sentPrompt = `${p}\n\nTweet Start:${prompt}Tweet End`;
			console.log(sentPrompt);
			const res = await axios.post("/api/gpt-3", { prompt: sentPrompt });
			setResponses((prevResponses) => [...prevResponses, res.data.text]);
		}
	};

	return (
		<div>
			<Head>
				<title>TweetGenie - Get Instant Inspiration </title>
				<meta name='description' content='AI Tweet Generator' />
				<link rel='icon' href='/favicon.ico' />;
			</Head>
			<div class=' bg-gray-900 p-4 text-center text-white'>
				<h2 class='text-3xl font-bold'>
					Say Goodbye to Time-Consuming Tweet Replies
				</h2>
				<p class='text-normal mt-1'> Get Instant Inspiration from AI </p>
			</div>
			<div class='w-full max-w-4xl mx-auto p-4 '>
				<form onSubmit={handleSubmit}>
					<div class='bg-white rounded-lg shadow-lg p-4 border-4'>
						<textarea
							placeholder='Paste a tweet here that you would want to generate reply for'
							rows='8'
							class='w-full p-2 rounded-lg shadow-sm'
							value={prompt}
							onChange={(e) => setPrompt(e.target.value)}
							style={{ outlineColor: "#e0e0e0" }}
						/>
					</div>
					<button
						class='mt-4 bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-full'
						type='submit'>
						Generate Replies
					</button>
				</form>
				<div class='text-right'>
					<p onClick={() => setResponses([])} class='cursor-pointer'>
						<span className='text-lg transition-transform duration-200 transform hover:animate-pulse'>
							🗑️
						</span>
					</p>
				</div>
				<div class='mt-4'>
					<div class='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
						{responses.map((response, index) => {
							if (!response) return null;

							if (response.length < 10) return null;
							return (
								<div
									key={index}
									class='bg-gray-200 p-4 rounded-lg cursor-pointer relative'
									onClick={() => {
										navigator.clipboard.writeText(response);
										setCopiedIndex(index);
										setTimeout(() => setCopiedIndex(-1), 1000);
									}}>
									{index === copiedIndex ? (
										<div className='flex justify-center items-center absolute inset-0 h-full w-full'>
											<div className='bg-green-500 text-white rounded-full w-8 h-8 flex justify-center items-center'>
												<svg
													fill='none'
													stroke='currentColor'
													stroke-width='1.5'
													viewBox='0 0 24 24'
													xmlns='http://www.w3.org/2000/svg'
													aria-hidden='true'>
													<path
														stroke-linecap='round'
														stroke-linejoin='round'
														d='M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
												</svg>
											</div>
											<span>
												{index === copiedIndex ? (
													<p className=' ml-3 text-green-500 text- mb-3 mt-2'>
														Copied
													</p>
												) : null}
											</span>
										</div>
									) : (
										<p className='text-lg'>{response}</p>
									)}
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}

export default IndexPage;
