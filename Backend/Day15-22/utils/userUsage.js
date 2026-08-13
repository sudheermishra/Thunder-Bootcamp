// user ne agar token limit reach kr di time duration me toh yahi se return kra denge
export const tokenLimitReached = async (user) => {
  return user.usage.tokenUsed >= user.usage.tokenLimit;
};

export const resetUsageIfNeeded = async (user) => {
  // Abhi ka current time le rahe hain
  const now = new Date();

  // Check kar rahe hain:
  // Kya abhi ka time resetAt se aage nikal gaya hai?
  //
  // Example:
  // now     = 4:00 PM
  // resetAt = 3:00 PM
  //
  // 4 PM > 3 PM → true
  if (now > user.usage.resetAt) {
    // Reset ka time cross ho gaya,
    // isliye user ke used tokens ko 0 kar do
    user.usage.tokenUsed = 0;
    // Ab next 5 hours ke liye naya reset time set kar do
    // Example:
    // Abhi = 4:00 PM
    // New resetAt = 9:00 PM

    user.usage.resetAt = new Date(Date.now() + 5 * 60 * 60 * 1000);
    // Updated data ko database mein save kar do
    await user.save;
  }
};

// user ne token kitne use kre
// total token ko bhi
export const addUserTokenUsage = async (user, totalTokens) => {
  user.usage.tokenUsed += totalTokens;
  user.usage.totalTokenUsed += totalTokens;

  await user.save();
};
