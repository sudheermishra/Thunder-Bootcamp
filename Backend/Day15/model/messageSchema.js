import mongoose, { model } from "mongoose";
// ================= MESSAGE SCHEMA =================

// Har message (User ya Assistant) alag document hoga.
const messageSchema = new mongoose.Schema(
  {
    //  user ki id
    userId: {
      // Message kis user ka hai
      // Ek user ki saari chats ke messages identify karne ke liye
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // chat ki id
    chatId: {
      // Ye message kis chat ke andar hai
      // Chat collection ke _id ko reference karta hai
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },

    role: {
      // Message kisne bheja
      // user -> User ka message
      // assistant -> AI ka response
      type: String,
      enum: ["user", "assistant"],
      required: true,
    },

    content: {
      // Actual message text
      type: String,
      required: true,
    },

    tokens: {
      type: Number,
      default: 0,
    },

    usage: {
      promptTokens: {
        type: Number,
        default: 0,
      },

      completionTokens: {
        type: Number,
        default: 0,
      },

      totalTokens: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true },
);

// Kisi ek chat ke messages oldest → newest order me jaldi fetch karne ke liye
messageSchema.index({ chatId: 1, createdAt: 1 });
// Kisi user ke sabhi messages me se latest messages
// jaldi fetch karne ke liye
messageSchema.index({ userId: 1, createdAt: -1 });

const Message = mongoose.model("Message", messageSchema);
export default Message;
