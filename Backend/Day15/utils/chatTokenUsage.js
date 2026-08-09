// chat model me bhi save krna padega ki kis chat p kitne imput token lage and kitne output token
// toh yeh fnction argument me lega chat model and usage(jo ki open router service me humne return krwa doiya wha se isme daal dennge)

export const addChatTokenUsage = async (chat, usage) => {
  chat.usage.promptTokens += usage.promptTokens;
  chat.usage.completionTokens += usage.completionTokens;
  chat.usage.totalTokens += usage.totalToken;

  await chat.save();
};
