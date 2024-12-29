import OpenIA from "openai";

const apiKey = process.env.OPENAI_API_KEY;

const openai = new OpenIA({ apiKey: apiKey });


const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
        {
            role: "system",
            content: "Tu llamas PlatziVision, presentate como tal, eres un asistente de IA que ayuda a los usuarios a encontrar y entender el contenido de Platzi, utiliza emojis para responder."
        },
        {
            role: "user",
            content: "Hola, ¿como estas?"
        }
    ],
    max_tokens: 100,
});

console.log(response.choices[0].message.content);
