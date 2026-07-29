import mongoose from "mongoose";
// ================= CHAT SCHEMA =================

// Ek user ki ek conversation (chat) represent karta hai.
// Ek user ke paas multiple chats ho sakti hain.
const chatSchema = new mongoose.Schema(
  {
    // user schema jo humne banya uske  id ke basis p hum search krke layenge
    // isme mene indexing create nhi kri (unique:true,index:true:sparse:true)
    // q ki hum composite indexing create kr rahe h
    userId: {
      // Kis user ki ye chat hai
      // User collection ke _id ko reference karta hai
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    topic: {
      type: String,
      default: "New Chat",
    },
    model: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      default: "",
    },
    summaryUpdateAt: {
      type: Date,
      default: null,
    },
    summarizedTillMessageNumber: {
      type: Number,
      default: 0,
    },
    messageCount: {
      type: Number,
      default: 0,
    },
    usage: {
      // Is chat ke total prompt tokens
      promptTokens: {
        type: Number,
        default: 0,
      },

      completionTokens: {
        // Is chat ke total completion tokens
        type: Number,
        default: 0,
      },

      totalTokens: {
        // Chat me total tokens
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true },
);

// composite indexing
// indexing create kr rahe h
// composte indexing isliye ki user login kre toh recent 20 use chat milegi
//  toh humne indexing create kr di ki userId Ke 20 recennt chat send kr do updatedAt -1 isliye ki humne desecending kr di q ki jo last me hoga woh latest hoga
// userId: 1 (user ko asscending order me se kr diya)
//  updatedAt : -1 (lastest wale chat chaiye isliye descending me kr diya)
// yeh dono milke ek key denge hume

// User ki recent chats jaldi fetch karne ke liye
// Pehle userId match hoga
// Fir updatedAt descending me sort hoga
// Latest updated chat sabse pehle milegi
chatScehma.index({ userId: 1, updatedAt: -1 });

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
