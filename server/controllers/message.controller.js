const Message = require("../models/message.model");
const User = require("../models/user.model");
const cloudinary = require("../configs/cloudinary");
const { getReceiverSocketId, io } = require("../lib/socket");

const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error While getting users info" });
  }
};

const getMessage = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id: userToChat } = req.params;
    console.log(myId, userToChat);

    const messages = await Message.find({
      $or: [
        {
          senderId: myId,
          recipientId: userToChat,
        },
        {
          senderId: userToChat,
          recipientId: myId,
        },
      ],
    });
    res.json(messages);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error While getting message" });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { id: recipientId } = req.params;
    if (!recipientId) {
      return res.status(400).json({ message: "Recipient Id is missing" });
    }
    const senderId = req.user._id;
    const { text, file } = req.body;
    let fileUrl = "";
    if (file) {
      const uploadResponse = await cloudinary.uploader.upload(file);
      fileUrl = uploadResponse.secure_url;
    }
    const newMessage = await new Message({
      senderId,
      recipientId,
      text,
      file: fileUrl,
    });
    await newMessage.save();
    res.json(newMessage);
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .json({ message: "Internal Server Error While sending message" });
  }
};
const messageController = {
  getUsersForSidebar,
  getMessage,
  sendMessage,
};

module.exports = messageController;
