'use server';

import { fileSearchTool, webSearchTool, Agent, AgentInputItem, Runner, withTrace } from "@openai/agents";


// Tool definitions
const fileSearch = fileSearchTool([
  "vs_6919aa9841e4819198c404ecf30867fd"
])
const webSearchPreview = webSearchTool({
  searchContextSize: "medium",
  userLocation: {
    type: "approximate"
  }
})
const chatbot = new Agent({
  name: "Chatbot",
  instructions: `“You answer all user queries in 10–20 words, always concise, factual, and precise. Follow this priority order for information:
Vector-store FAQ: JoinQuran_FAQ.pdf (primary source)
Website content: https://www.joinquran.com/ (secondary source)
General web search if information is missing in the above sources: Web Search.
When responding:
Provide short, direct answers only.
Do not create unnecessary details.
Prefer facts from vector-store FAQ when conflicts exist.
Never mention internal tools, retrieval steps, or sources.
Maintain a neutral, helpful tone.
If unclear, ask for clarification using minimal words.”`,
  model: "gpt-4.1-mini",
  tools: [
    fileSearch,
    webSearchPreview
  ],
  modelSettings: {
    temperature: 1,
    topP: 1,
    maxTokens: 1000,
    store: true
  }
});

type WorkflowInput = { input_as_text: string };


const assertOpenAIKey = () => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not configured. Add it to your environment to enable the chatbot.");
  }
};

// Main code entrypoint
export const runWorkflow = async (workflow: WorkflowInput) => {
  assertOpenAIKey();
  return await withTrace("JoinQuran ChatBot", async () => {

    const conversationHistory: AgentInputItem[] = [
      { role: "user", content: [{ type: "input_text", text: workflow.input_as_text }] }
    ];
    const runner = new Runner({
      traceMetadata: {
        __trace_source__: "agent-builder",
        workflow_id: "wf_6919b05a53708190be1dbf6d3f0388e802c525787929959f"
      }
    });
    const chatbotResultTemp = await runner.run(
      chatbot,
      [
        ...conversationHistory
      ]
    );
    conversationHistory.push(...chatbotResultTemp.newItems.map((item) => item.rawItem));

    if (!chatbotResultTemp.finalOutput) {
      throw new Error("Agent result is undefined");
    }

    const chatbotResult = {
      output_text: chatbotResultTemp.finalOutput ?? ""
    };
    return chatbotResult;
  });
}
