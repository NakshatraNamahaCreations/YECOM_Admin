import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveChat, fetchChats } from "../redux/chatsSlice";
import { useEffect } from "react";
import { getChatName, getChatPhoto, timeSince } from "../utils/logics";
import NoContacts from "./ui/NoContacts";
import { allUsers } from "../apis/auth";
import { acessCreate } from "../apis/chat.js";
// import SkeletonLoading from './ui/SkeletonLoading'
var aDay = 24 * 60 * 60 * 1000;

function Contacts() {
  const token = localStorage.getItem("userToken");
  const { chats, activeChat } = useSelector((state) => state.chats);
  const dispatch = useDispatch();
  const activeUser = useSelector((state) => state.activeUser);
  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  const [UserResults, setUserResults] = useState([]);
  
  console.log("UserResults", UserResults);

  console.log("chats", chats);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const users = await allUsers(token);

        setUserResults(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchAllUsers();
  }, [token]);

  return (
    <>
      <div className="flex flex-col -space-y-1 overflow-y-scroll scrollbar-hide h-[87vh] pb-10">
        {chats?.length > 0 ? (
          chats?.map((e) => {
            return (
              <div
                onClick={() => {
                  dispatch(setActiveChat(e));
                }}
                key={e._id}
                className={`flex items-center justify-between sm:gap-x-1 md:gap-x-1  ${
                  activeChat._id === e._id ? "bg-[#fafafa]" : "bg-[#fff]"
                } cursor-pointer  py-4 px-2`}
              >
                <div className="flex items-center gap-x-3 sm:gap-x-1 md:gap-x-3">
                  <img
                    className="w-12 h-12  sm:w-12 sm:h-12 rounded-[30px] shadow-lg object-cover"
                    src={getChatPhoto(e, activeUser)}
                    alt=""
                  />
                  <div>
                    <h5 className="text-[13.6px] sm:text-[16px] text-[#2b2e33] font-bold">
                      {getChatName(e, activeUser)}
                    </h5>
                    <p className="text-[13.6px] sm:text-[13.5px] font-medium text-[#56585c] ">
                      {" "}
                      {e.latestMessage?.message.length > 30
                        ? e.latestMessage?.message.slice(0, 30) + "..."
                        : e.latestMessage?.message}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-y-[8px]">
                  <p className="text-[12.4px] sm:text-[12px]  font-normal text-[#b0b2b3] tracking-wide">
                    {timeSince(new Date(Date.parse(e.updatedAt) - aDay))}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <NoContacts />
        )}
      </div>
    </>
  );
}

export default Contacts;
