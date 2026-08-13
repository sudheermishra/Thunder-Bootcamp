import Groq from "groq-sdk";
import readlineSync from "readline-sync";
import "dotenv/config";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const history = [];

async function chatApp(question) {
  console.log("hello");
  const completion = await groq.chat.completions.create({
    messages: [
      ...history,
      {
        role: "user",
        content: question,
      },
    ],
    model: "openai/gpt-oss-20b",
  });
  history.push({ role: "user", content: question });
  history.push({
    role: "assistant",
    content: completion.choices[0].message.content,
  });
  console.log(completion.choices[0].message);
}

while (true) {
  const question = readlineSync.question("Ask Me Anything: ");
  if (question === "exist") {
    break;
  }
  await chatApp(question);
}
