
import OpenAI from 'openai';
import axios  from 'axios';

const apiKey = process.env.OPENAI_API_KEY;

const client = new OpenAI({
    apiKey: apiKey
});



async function getWeather(latitude, longitude) {
    console.log("Getting weather...");
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    const response = await axios.get(url)
    const weatherData = response.data;

    return JSON.stringify(weatherData);
}

const messages = [
    {
        role: "system",
        content: "Eres un asistente que entrega datos sobre el clima del mundo en tiempo real usando la función get_weather"
    },
    {
        role: "user",
        content: "¿Cuál es el clima de Valledupar, Colombia?"
    }
];

const functions = [
    {
        type: "function",
        function: {
            name: "get_weather",
            description: "Usa esta funcion para obtener información sobre el clima",
            parameters: {
                type: "object",
                properties: {
                    latitude: {
                        type: "number",
                        description: "Latitud de la ubicación"
                    },
                    longitude: {
                        type: "number",
                        description: "Longitud de la ubicación"
                    }
                },
                required: ["latitude", "longitude"]
            },
            output: {
                type: "string",
                description: "Clima de la ubicación pedida por el usuario"
            }
        }
    }
];

async function main() {
    const response = await client.chat.completions.create({
        model: "gpt-4o",
        messages: messages,
        tools: functions
    });

    const assistantMessage = response.choices[0].message;

    console.log("Respuesta del asistente");
    console.log(assistantMessage);

    if (assistantMessage.tool_calls) {
        for (const toolCall of assistantMessage.tool_calls) {
            if (toolCall.type === "function") {
                const functionName = toolCall.function.name;
                const functionArgs = JSON.parse(toolCall.function.arguments);

                if (functionName === "get_weather") {
                    console.log(`El asistente está llamando a la función get_weather`);
                    const weatherInfo = await getWeather(
                        functionArgs.latitude,
                        functionArgs.longitude
                    );

                    messages.push(assistantMessage);
                    messages.push({
                        role: "tool",
                        tool_call_id: toolCall.id,
                        name: functionName,
                        content: weatherInfo
                    });
                }
            }
        }
    }

    const secondResponse = await client.chat.completions.create({
        model: "gpt-4o",
        messages: messages
    });

    const finalReply = secondResponse.choices[0].message.content;

    console.log("Respuesta final del asistente");
    console.log(finalReply);
}

main();

