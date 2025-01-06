import OpenAI from 'openai';

const apiKey = process.env.OPENAI_API_KEY

const client = new OpenAI({
    apiKey: apiKey
});

const prompt = "Crea una imagen minimalista de un perro con ojos verdes y pelo negro"
const quality = "standard"

const response = await client.images.generate({
   model: "dall-e-3",
    prompt: prompt,
    quality: quality,
    n: 1,
   
})

console.log(response.data[0].url)