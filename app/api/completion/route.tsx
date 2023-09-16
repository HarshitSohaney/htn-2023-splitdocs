import { StreamingTextResponse, CohereStream } from 'ai'

export const runtime = 'edge'

export async function POST(request: Request) {
    const { prompt } = await request.json();

    const body = JSON.stringify({
        prompt,
        model: 'command',
        max_tokens: 300,
        stop_sequences: [],
        temperature: 1,
        stream: true,
    });

    const response = await fetch('https://api.cohere.ai/v1/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
        },
        body,
    });

    if (!response.ok) {
        return new Response(await response.text(), {
            status: response.status,
        });
    }

    const stream = CohereStream(response)

    return new StreamingTextResponse(stream)
}

export async function GET(request: Request) {

}