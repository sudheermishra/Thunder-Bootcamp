// user ne token kitne use kre
// total token ko bhi
export const addUserTokenUsage = async (user, totalTokens) => {
  user.usage.totalTokenUsed += totalTokens;

  await user.save();
};
