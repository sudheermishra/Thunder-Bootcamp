import Chat from "../model/chatSchema.js";
import Message from "../model/messageSchema.js";
// import Message from "../model/messageSchema.js";
export const createChat = async (req, resp) => {
  try {
    const { model } = req.body;
    // agar user ne model kaa naam sahi nhi dia toh
    if (!model) {
      return resp.status(400).json({
        message: "Module Name Is Missing",
      });
    }

    const chats = await Chat.create({
      // req.user req me jo humne object banaya tha user middleware m
      // toh req.user._id user ki id mil jayegi toh use isko create kr denge
      // is id se user chat se link ho gya
      userId: req.user._id,
      model: model,
    });

    resp.status(201).json({
      message: "Chat Created Successfully",
      chatId: chats._id,
      userId: req.user._id,
      model: model,
      topic: chats.topic,
      createdAt: chats.createdAt,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getRecentChat = async (req, resp) => {
  try {
    const chats = await Chat.find({ userId: req.user._id })
      .select("topic updatedAt model")
      .sort({ updatedAt: -1 });
    resp.status(200).json({
      message: "Your all recent chats",
      chats,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getSingleChat = async (req, resp) => {
  try {
    const { chatId } = req.params;
    const chat = Chat.findOne({ _id: chatId, userId: req.user._id });

    if (!chat) {
      return resp.status(403).json({
        messages: "Data Not Found",
      });
    }

    resp.status(200).json({
      chatId: chat._id,
      userId: chat.userId,
      topic: chat.topic,
      usage: chat.usage,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const deleteChat = async (req, resp) => {
  try {
    const { chatId } = req.params;

    const chat = await Chat.findOne({ _id: chatId, userId: req.user._id });
    if (!chat) {
      resp.status(403).json({
        message: "You are not allowed to do this",
      });
    }

    await Message.deleteMany({
      chatId: chat._id,
    });

    await chat.deleteOne({
      _id: chatId,
    });

    resp.status(200).json({
      message: "Your chat deleted successfully",
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      message: "Internal Server Error",
    });
  }
};
