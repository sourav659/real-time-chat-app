import React from "react";

function Message({ message }) {
  const authUser = JSON.parse(localStorage.getItem("ChatApp"));
  const itsMe = message.senderId === authUser?.user?._id;

  const chatName = itsMe ? "chat-end" : "chat-start";
  const chatColor = itsMe
    ? "bg-blue-600 text-white"
    : "bg-slate-700 text-white";

  const createdAt = new Date(message.createdAt);
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="p-4">
      <div className={`chat ${chatName}`}>
        <div
          className={`chat-bubble ${chatColor} opacity-100`}
        >
          {message.message}
        </div>

        <div className="chat-footer text-gray-300">
          {formattedTime}
        </div>
      </div>
    </div>
  );
}

export default Message;