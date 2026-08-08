import Chat from "../model/chatSchema.js";
import Message from "../model/messageSchema.js";
import mongoose from "mongoose";

export const getMessage = async (req, resp) => {
  try {
    const { chatId } = req.params;

    const chat = await Chat.findOne({ _id: chatId, userId: req.user._id });
    if (!chat) {
      return resp.status(404).json({
        message: "Chat Not Found",
      });
    }

    const message = await Message.find({ chatId: chatId }).sort({
      createdAt: 1,
    });
    resp.status(200).json({
      message: "your all messages are here",
      msg: message,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const sendMessage = async (req, resp) => {
  try {
    const { chatId } = req.params;
    const { content, model } = req.body;
    // kahi user ne content empty yaa phir trim krne ke baad bhi empty string toh nhi diya
    if (!content || content.trim() === "") {
      return resp.status(400).json({
        message: "Content is Missing",
      });
    }

    // agar chatId nhi h toh chatId create kro
    // q ki firstTime user new chat banayega toh chatId hogi nhi
    // agar chatId h toh validate kro usi user ki chat id h ki nhi

    let chat;

    if (chatId) {
      // chat Id h toh validate kro user ki match kr rahi h h ki nhi
      if (!mongoose.Types.ObjectId.isValid(chatId)) {
        return resp.status(400).json({
          message: "Invalid chat id",
        });
      }

      chat = await Chat.findOne({ _id: chatId, userId: req.user._id });
      if (!chat) {
        return resp.status(404).json({
          message: "Chat Not Found",
        });
      }
    }
    // user ki chat Id nhi h toh nayi create kro model ke basis prr
    else {
      if (!model) {
        return resp.status(400).json({
          message: "model is required for new chat",
        });
      }
      chat = await Chat.create({
        userId: req.user._id,
        model: model,
        topic: content.trim().slice(0, 40),
      });
    }

    // jo bhi user message content daalega phle database me store krayenge fir llm ko send krenge
    const userMessage = await Message.create({
      userId: req.user._id,
      chatId: chat._id,
      role: "user",
      content: content,
    });

    const aiReply = "AI reply will come here later.";

    //llm wla data bhi database me store krayenge

    const aiMessage = await Message.create({
      userId: req.user._id,
      chatId: chat._id,
      role: "assistant",
      content: aiReply,
    });

    // 7. Update chat metadata
    chat.messageCount += 2;

    // If topic is still default, update it from first message
    if (chat.topic === "New Chat") {
      chat.topic = content.trim().slice(0, 40);
    }
    await chat.save();
    // 8. Send response
    resp.status(201).json({
      message: "Message sent successfully",
      chatId: chat._id,
      userMessage,
      aiMessage,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      message: "Internal Server Error",
    });
  }
};
