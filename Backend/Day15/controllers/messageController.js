import Chat from "../model/chatSchema.js";
import Message from "../model/messageSchema.js";

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
    const { content } = req.body;
    // kahi user ne content empty yaa phir trim krne ke baad bhi empty string toh nhi diya
    if (!content || content.trim() === "") {
      return resp.status(400).json({
        message: "Content is Missing",
      });
    }

    const chat = await Chat.findOne({ _id: chatId, userId: req.user_id });
    if (!chat) {
      return resp.status(404).json({
        message: "Chat Not Found",
      });
    }

    // jo bhi user message content daalega phle database me store krayenge fir llm ko send krenge
    const userMessage = await Message.create({
      userId: req.user._id,
      chatId: chatId,
      role: user,
      content: content,
    });

    const dummy = "bss bdiya bhai";

    //llm wla data bhi database me store krayenge

    const aiMessage = await Message.create({
      userId: req.user._id,
      chatId: chatId,
      role: assistant,
      content: dummy,
    });

    resp.status(200).json({
      message: dummy,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      message: "Internal Server Error",
    });
  }
};
