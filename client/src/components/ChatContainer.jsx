import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessage,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  //get chat message
  useEffect(() => {
    // console.log(selectedUser);
    getMessage(selectedUser?._id);
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [
    getMessage,
    selectedUser?._id,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  });

  // if (isMessageLoading) {
  //   return (
  //     <div className="flex-1 flex flex-col overflow-auto">
  //       <ChatContainer />
  //       <MessageSkeleton />
  //       <MessageInput />
  //     </div>
  //   );
  // }
  return (
    <div className="min-w-0 flex-1 flex flex-col">
      <ChatHeader />

      <div className="min-h-0 flex-1 overflow-y-auto p-3 sm:p-4 space-y-4">
        {messages.map((message, index) => {
          const isOwnMessage = message?.senderId === authUser._id;

          return (
            <div
              key={message._id}
              className={`chat ${isOwnMessage ? "chat-end" : "chat-start"}`}
              ref={index === messages.length - 1 ? messageEndRef : null}
            >
              <div className=" chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img
                    src={
                      isOwnMessage
                        ? authUser.profilePic || "/avatar.webp"
                        : selectedUser.profilePic || "/avatar.webp"
                    }
                    alt="profile pic"
                  />
                </div>
              </div>
              <div className="chat-header mb-1">
                <time className="text-xs opacity-50 ml-1">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>
              <div
                className={`chat-bubble max-w-[85%] sm:max-w-[75%] wrap-break-word flex flex-col ${
                  isOwnMessage
                    ? "bg-primary text-primary-content"
                    : "bg-base-200 text-base-content"
                }`}
              >
                {message.file && (
                  <img
                    src={message.file}
                    alt="Attachment"
                    className="max-w-full sm:max-w-50 rounded-md mb-2"
                  />
                )}
                {message.text && <p>{message.text}</p>}
              </div>
            </div>
          );
        })}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
