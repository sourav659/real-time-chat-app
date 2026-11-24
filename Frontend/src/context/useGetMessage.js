
import React, { useEffect, useState } from "react";
import useConversation from "../statemanage/useConversation.js";
import axios from "axios";

const useGetMessage = () => {
  const [loading, setLoading] = useState(false);

  const { messages, setMessage, selectedConversation } =
    useConversation();

  useEffect(() => {
    const getMessages = async () => {
      if (!selectedConversation?._id) {
        setMessage([]);
        return;
      }

      setLoading(true);

      try {
        const res = await axios.get(
          `/api/message/get/${selectedConversation._id}`,
          {
            withCredentials: true,
          }
        );

        setMessage(res.data);
      } catch (error) {
        console.error(
          "Error in getting messages:",
          error.response?.status,
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, [selectedConversation?._id, setMessage]);

  return { loading, messages };
};

export default useGetMessage;
