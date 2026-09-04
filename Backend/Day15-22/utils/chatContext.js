const SYSTEM_PROMPT = `
You are a helpful AI assistant.
Answer the user's question clearly and accurately.
If the user asks for code, provide clean and practical code.
If the user asks for explanation, explain in a simple and structured way.
If you are unsure, say that you are unsure instead of guessing.
`;

// chat model input me denege
export const buildMessageForAi = ({ chat, oldMessages, currentMessage }) => {
  // message array h jo hum ai ko dete h
  const messages = [
    {
      role: "system",
      content: SYSTEM_PROMPT,
    },
  ];

  // agar chat model me summary h toh toh usko trim krne ke baad empty string naa ho toh hi message me push kro
  // ex summary 1-40 message
  if (chat.summary && chat.summary.trim() !== "") {
    messages.push({
      role: "system",
      content: `Previous conversation summary:\n${chat.summary}`,
    });
  }

  //  woh message jinki summary nhi bani woh hi older message h
  // ex 41-48 old message
  for (const msg of oldMessages) {
    messages.push({
      role: msg.role,
      content: msg.content,
    });
  }

  // current message bhi push krenge
  // ex 49 current message
  messages.push({
    role: "user",
    content: currentMessage,
  });

  return messages;
};
