import { createFileRoute } from "@tanstack/react-router";
import { createUIMessageStream, createUIMessageStreamResponse, type UIMessage } from "ai";

const DEFAULT_RESPONSE =
  "Sorry, I don't currently have verified information about that. Please contact Anshika directly.";

function getQuestionFromMessages(messages: UIMessage[]) {
  const lastUserMessage = [...messages].reverse().find((message) => message.role === "user");
  if (!lastUserMessage) return "";
  return lastUserMessage.parts
    .map((part) => (part.type === "text" ? part.text : ""))
    .join("")
    .trim();
}

function answerQuestion(question: string) {
  const normalized = question.toLowerCase().trim();

  if (/(who|tell me about|about|introduce).*(anshika|her|you)/.test(normalized)) {
    return (
      "Anshika Pandey is a B.Tech Computer Science Engineering student at JK Lakshmipat University in Jaipur (2025–2029). " +
      "She works at the intersection of machine learning, thoughtful interfaces, and social-impact engineering, with a foundation in C, Python, and web development."
    );
  }

  if (/^(skills?|what are (her )?(skills|technologies)|technology|technologies|tools?)$/.test(normalized)) {
    return (
      "Her verified skills include programming in C and Python, web development with HTML, CSS, and JavaScript, and tools like VS Code, Git & GitHub, and Vercel. " +
      "She also emphasizes problem solving, programming fundamentals, and algorithmic thinking."
    );
  }

  if (/(what|which).*(technolog|tool|skill|know|use)/.test(normalized)) {
    return (
      "Her verified skills include programming in C and Python, web development with HTML, CSS, and JavaScript, and tools like VS Code, Git & GitHub, and Vercel. " +
      "She also emphasizes problem solving, programming fundamentals, and algorithmic thinking."
    );
  }

  if (/(what|which).*(projects|built|work|portfolio)|^projects?$/.test(normalized)) {
    return (
      "She has built three featured projects: Asha Jugaad Diagnostics, an AI-based health triage platform for ASHA workers; Jugaad 2, a refined prototype exploring accessible tooling; " +
      "and a Blood Donation Networking System that connects donors with patients and hospitals in real time."
    );
  }

  if (/^(education|academics?|school|college|university)$/.test(normalized) || /(education|academics?|school|college|university)/.test(normalized)) {
    return (
      "Anshika studies B.Tech Computer Science Engineering at JK Lakshmipat University in Jaipur (2025–2029). " +
      "She completed strong first-year coursework in Python, C Programming, Linear Algebra, Differential Equations, and Digital Electronics, and is active in the Competition Programming Club and university hackathons."
    );
  }

  if (/(what|which).*(achievements|award|recognition|roles|experience)|^(achievements?|awards?|recognition|roles?)$/.test(normalized)) {
    return (
      "Her achievements include an Academic Excellence Award in 2025, Rajasthan Patrika recognition for academic excellence, Best Singer Award, and leadership roles such as IC Member of the Competition Programming Club, anchor for Sarang 2025, and volunteer for HackJKLU v5.0."
    );
  }

  if (/(how|where|can i).*(contact|reach|email|linkedin|github|phone)|^(contact|reach|email|linkedin|github|phone)$/.test(normalized)) {
    return (
      "You can contact Anshika by email at anshika.pandey1375@gmail.com, on LinkedIn at linkedin.com/in/anshika-pandey-635286378, or on GitHub at github.com/anshikapandey1375-hue."
    );
  }

  if (/^(hi|hello|hey|what's up|good morning|good evening)/.test(normalized)) {
    return "Hi! I can answer questions about Anshika's background, projects, skills, achievements, and contact details. Ask me anything from her portfolio.";
  }

  if (normalized.length === 0) {
    return DEFAULT_RESPONSE;
  }

  return DEFAULT_RESPONSE;
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages } = (await request.json()) as { messages?: UIMessage[] };
        if (!Array.isArray(messages)) {
          return new Response("Messages required", { status: 400 });
        }

        const question = getQuestionFromMessages(messages);
        const answer = answerQuestion(question);
        const stream = createUIMessageStream({
          execute: async ({ writer }) => {
            const id = crypto.randomUUID();
            writer.write({ type: "text-start", id });
            writer.write({ type: "text-delta", id, delta: answer });
            writer.write({ type: "text-end", id });
          },
          originalMessages: messages,
        });

        return createUIMessageStreamResponse({
          status: 200,
          statusText: "OK",
          stream,
        });
      },
    },
  },
});
