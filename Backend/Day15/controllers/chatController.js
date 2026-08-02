import Chat from "../model/chatSchema.js";
export const createChat = async (req, resp) => {
  try {
    const { model } = req.body;
    // agar user ne model kaa naam sahi nhi dia toh
    if (!model) {
      resp.status(400).json({
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
