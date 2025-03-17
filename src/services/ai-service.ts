
import { AIModel } from "@/components/ModelSelector";
import { Message } from "@/components/AIMessage";

// Mock AI models data
export const mockModels: AIModel[] = [
  {
    id: "gemini-pro",
    name: "Gemini Pro",
    description: "Advanced model with strong reasoning and coding abilities",
    capabilities: [
      "Natural language understanding and generation",
      "Code generation and explanation",
      "Complex reasoning tasks",
      "Content summarization",
    ],
  },
  {
    id: "gemini-ultra",
    name: "Gemini Ultra",
    description: "Most capable model for highly complex tasks",
    capabilities: [
      "Advanced reasoning and problem solving",
      "Multi-step instructions",
      "Nuanced content understanding",
      "Expert-level code generation",
      "Creative writing and ideation",
    ],
  },
  {
    id: "claude-3",
    name: "Claude 3",
    description: "Balanced model for general purpose use cases",
    capabilities: [
      "Balanced reasoning and creativity",
      "Conversational responses",
      "Moderate complexity tasks",
      "Instruction following",
    ],
  },
  {
    id: "gpt-4o",
    name: "GPT-4o",
    description: "Highly capable model with strong reasoning",
    capabilities: [
      "Advanced text completion and generation",
      "Strong contextual understanding",
      "Complex query handling",
      "Consistent persona maintenance",
    ],
  },
];

// Mock AI response generation
export const generateAIResponse = async (
  prompt: string,
  modelId: string,
  temperature: number,
  maxTokens: number
): Promise<string> => {
  // Simulate API call delay
  return new Promise((resolve) => {
    console.log(`Generating response with model: ${modelId}, temp: ${temperature}, tokens: ${maxTokens}`);
    setTimeout(() => {
      // Simple response patterns based on model
      let response = "";
      
      if (prompt.toLowerCase().includes("hello") || prompt.toLowerCase().includes("hi")) {
        response = "Hello! How can I assist you today?";
      } else if (prompt.toLowerCase().includes("help")) {
        response = "I'm here to help! What would you like to know about?";
      } else if (prompt.toLowerCase().includes("thank")) {
        response = "You're welcome! Feel free to ask if you have any other questions.";
      } else if (prompt.toLowerCase().includes("weather")) {
        response = "I don't have access to real-time weather data, but I can help you understand weather patterns or recommend weather services.";
      } else if (prompt.toLowerCase().includes("code") || prompt.toLowerCase().includes("programming")) {
        const codeSnippets = [
          "```javascript\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet('World'));\n```\n\nThis is a simple JavaScript function that greets the input name.",
          "```python\ndef fibonacci(n):\n    a, b = 0, 1\n    for _ in range(n):\n        a, b = b, a + b\n    return a\n\nprint(fibonacci(10))  # Output: 55\n```\n\nThis Python function calculates the nth Fibonacci number using an iterative approach.",
          "```typescript\ninterface User {\n  id: number;\n  name: string;\n  email: string;\n}\n\nfunction getUserInfo(user: User): string {\n  return `${user.name} (${user.email})`;\n}\n```\n\nThis TypeScript example shows how to define an interface and use it in a function."
        ];
        response = `Here's an example related to coding:\n\n${codeSnippets[Math.floor(Math.random() * codeSnippets.length)]}`;
      } else {
        const responses = [
          `I understand you're asking about "${prompt}". Let me elaborate on that topic based on my knowledge.`,
          `That's an interesting question about "${prompt}". Here's what I know about this subject.`,
          `Regarding "${prompt}", there are several aspects to consider...`,
          `When it comes to "${prompt}", I can provide the following information...`,
          `"${prompt}" is a fascinating topic. Here's my perspective based on available information.`
        ];
        
        // Add model-specific flavor to the response
        let modelSpecificInfo = "";
        if (modelId === "gemini-pro") {
          modelSpecificInfo = "\n\nFrom my analysis, I can break this down into key components for better understanding.";
        } else if (modelId === "gemini-ultra") {
          modelSpecificInfo = "\n\nThis is a multi-faceted topic that I can examine from several analytical perspectives.";
        } else if (modelId === "claude-3") {
          modelSpecificInfo = "\n\nI aim to provide a balanced and nuanced perspective on this topic.";
        } else if (modelId === "gpt-4o") {
          modelSpecificInfo = "\n\nLet me provide a comprehensive overview while considering different viewpoints.";
        }
        
        response = responses[Math.floor(Math.random() * responses.length)] + modelSpecificInfo;
        
        // Add length based on maxTokens
        if (maxTokens > 500) {
          response += "\n\nFurthermore, when we examine this in greater depth, we find additional nuances worth discussing...";
        }
        
        // Add creativity based on temperature
        if (temperature > 1.5) {
          response += "\n\nTaking a creative approach, we might also consider some unconventional perspectives...";
        } else if (temperature < 0.5) {
          response += "\n\nTo be precise and factual, let me focus on the core elements without speculation.";
        }
      }
      
      resolve(response);
    }, 1500);
  });
};
