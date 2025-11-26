import { NextResponse } from 'next/server';
import { runWorkflow } from '@/components/chatbot';

type ChatbotRequest = {
  input?: string;
};

export async function POST(request: Request): Promise<Response> {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: 'Chatbot is not configured. Missing OpenAI API key.' },
      { status: 500 },
    );
  }

  try {
    const { input } = (await request.json()) as ChatbotRequest;

    if (!input || typeof input !== 'string') {
      return NextResponse.json(
        { error: 'A valid question is required.' },
        { status: 400 },
      );
    }

    if (input.length > 4000) {
      return NextResponse.json(
        { error: 'Input is too long.' },
        { status: 413 },
      );
    }

    const result = await runWorkflow({ input_as_text: input });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Chatbot API error:', error);

    return NextResponse.json(
      { error: 'Unable to connect to the chatbot right now.' },
      { status: 500 },
    );
  }
}
