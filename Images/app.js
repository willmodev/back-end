import OpenAI from 'openai';
import { readFileSync } from 'fs';

const apiKey = process.env.OPENAI_API_KEY

const client = new OpenAI({
    apiKey: apiKey
});

function encodeImageToBase64(imagePath) {
    const imageFile = readFileSync(imagePath);
    return Buffer.from(imageFile).toString('base64');
}

const messages = [
    {
        role: "system",
        content: "Eres un asistente que analiza las imagenes a gran detalle."
    },
    {
        role: "user",
        content: [
            {
                type: "text",
                text: "Hola, ¿puedes analizar esta imagen?",
            },
            {
                type: "image_url",
                image_url: {
                    url: `data:image/png;base64,${encodeImageToBase64('./image.jpg')}`
                }
            }
        ]
    }
];

const response = await client.chat.completions.create({
    model: "gpt-4o",
    messages: messages
});

console.log("Respuesta del analisis de la imagen:");
console.log(response.choices[0].message.content);
