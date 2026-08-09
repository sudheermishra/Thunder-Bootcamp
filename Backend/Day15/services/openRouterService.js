import openRouter from "../config/openRouter";

export const generateAIResponse = async ({ model, message }) => {
  const completion = openRouter.chat.send({
    chatRequest: {
      model: model,
      message: message,
    },
  });

  // ? isliye lagaye ki agar aage kaaa available nhi ho toh hume error nhi mile undfinied mil jaye
  const aiReply = completion.choices[0]?.message?.content;

  // agar reply nhi mila like undefined mila toh hum error throw kr denge jha generateAiResponse ko call krenge hwha catch block me is error ko catch kr lega

  if (!aiReply) {
    throw new Error("Ai Response Is Empty");
  }

  // prompt Token = input token jitne user llm ko dega
  // completionToken = output token jitne llm output me result dega
  // yeh token hum nikal lenge taaki hum inko use kr le user ke db me store krane k liye

  // agar token nhi mile toh 0 set krdo
  const promptTokens = completion.usage?.promptTokens || 0;
  const completionTokens = completion.usage?.completionTokens || 0;

  // function return krdega
  return {
    aiReply,
    usage: {
      promptTokens,
      completionTokens,
      totalToken: promptTokens + completionTokens,
    },
  };
};
