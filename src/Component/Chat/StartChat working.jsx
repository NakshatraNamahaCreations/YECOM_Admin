import React, { useEffect, useState } from "react";
import "./style/startchat.css";
import { FaPlus } from "react-icons/fa6";
import Slider from "react-slick";
import { getData, postData } from "../../Api-Service/apiHelper";
import { apiUrl } from "../../Api-Service/apiConstants";
import { PiWechatLogoDuotone } from "react-icons/pi";
import moment from "moment";
import "./chat.css";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

function StartChat() {
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
  };
  function getRandomColor() {
    // Generate random RGB values
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    // Convert to hexadecimal color code
    let color = "#" + r.toString(16) + g.toString(16) + b.toString(16);
    // console.log("color:", color);
    return color;
  }
  const [allUsers, setAllUsers] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  const [searchUser, setSearchUser] = useState("");
  const [filterdata, setfilterdata] = useState([]);

  const [startConversations, setStartConversations] = useState("");
  const [chatColors, setChatColors] = useState(
    Array.from({ length: 5 }, () => getRandomColor())
  );

  useEffect(() => {
    fetchData();
  }, [selectedChat, startConversations]);

  const fetchData = async () => {
    try {
      const userRes = await getData(apiUrl.GET_ALL_USER);
      setAllUsers(userRes.data);
      setfilterdata(userRes.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  console.log("selectedChat", selectedChat);
  useEffect(() => {
    const searchResults = () => {
      let results = allUsers;
      if (searchUser) {
        results = results.filter(
          (item) =>
            item.name &&
            item.name.toLowerCase().includes(searchUser.toLowerCase())
        );
      }
      setfilterdata(results);
    };
    searchResults();
  }, [searchUser]);

  const handleChatItemClick = (chat) => {
    setSelectedChat(chat);
  };

  const getInitialsFromName = (user) => {
    const regex = /\b\w/g;
    const matches = user.name?.match(regex);
    if (matches) {
      const initials = matches.join("").toUpperCase();
      return initials;
    } else {
      console.log("No matches found.");
    }
  };

  const getInitialsFromNameForParticularUser = (user) => {
    const regex = /\b\w/g;
    const matches = user.name?.match(regex);
    if (matches) {
      const initials = matches.join("").toUpperCase();
      return initials;
    } else {
      console.log("No matches found.");
    }
  };
  // const sendMessage = async (selectedUser) => {
  //   if (!startConversations.trim()) {
  //     alert("Please type message");
  //   } else {
  //     try {
  //       const data = {
  //         chat: startConversations,
  //       };

  //       setSelectedChat((prevSelectedChat) => ({
  //         ...prevSelectedChat,
  //         conversationList: [
  //           ...prevSelectedChat.conversationList,
  //           { chat: startConversations, timestamp: new Date() }, // Add new message immediately
  //         ],
  //       }));

  //       const res = await postData(
  //         `${apiUrl.START_MESSAGE}${selectedUser._id}`,
  //         data
  //       );
  //       if (res) {
  //         // alert("message sent");
  //         console.log("res", res);
  //         setStartConversations(" ");
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   }
  // };

  const [messages, setMessages] = useState(
    selectedChat?.conversationList || []
  );
  const [typeMessage, setTypeMessage] = useState("");
  console.log("messages", messages);

  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.conversationList || []);
    }
  }, [selectedChat]);

  useEffect(() => {
    socket.on("receiveMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);
  const userId = "662c932f56fb50dc2ebd8019";
  const sendMessage = () => {
    if (typeMessage.trim() && selectedChat) {
      const newMessage = {
        userId, //kiru
        chat: typeMessage,
        receiverId: selectedChat._id,
      };

      socket.emit("sendMessage", newMessage);
      setMessages([...messages, newMessage]);
      setTypeMessage("");
    }
  };
  // const sendMessage = async (selectedUser) => {
  //   console.log("selectedUser befor calling the api", selectedUser);
  //   if (!startConversations.trim()) {
  //     alert("Please type message");
  //   } else {
  //     try {
  //       const data = {
  //         chat: startConversations,
  //       };
  //       const res = await postData(
  //         `${apiUrl.START_MESSAGE}${selectedUser._id}`,
  //         data
  //       );
  //       if (res) {
  //         alert("message sent");
  //         console.log("res", res);
  //         setStartConversations(" ");
  //         setSelectedChat((prevSelectedChat) => ({
  //           ...prevSelectedChat,
  //           conversationList: [...prevSelectedChat.conversationList, res.data],
  //         }));
  //         // fetchData();
  //         // setSelectedChat({
  //         //   ...selectedUser,
  //         //   conversationList: selectedUser.conversationList.concat(res.data),
  //         // });
  //         console.log("after calling the api", selectedChat);
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   }
  // };

  return (
    <>
      <div className="row mt-3" style={{ backgroundColor: "white" }}>
        <div className="col-md-4" style={{ border: "1px solid #e5e5e5" }}>
          <div className="Header_header__39F7j">
            <div style={{ fontSize: "20px" }}>Chat</div>
            <div>{/* <FaPlus /> */}</div>
          </div>
          <div className="Search_SearchForm__5sDuf SearchForm">
            <img
              src="https://web.classplusapp.com/static/media/search.763fc6cc.svg"
              alt="search"
            />
            <form autocomplete="off">
              <input
                className="Search_searchButton__vkUbe"
                placeholder="Search by name or number"
                type="text"
                onChange={(e) => setSearchUser(e.target.value)}
                //   value=""
              />
            </form>
          </div>
          <div className="row"></div>
          <div className="row">
            <div className="mt-2">
              <div className="List_unseenHeader__RnECG">
                <span>MESSAGES</span>
              </div>
            </div>
            <div
              className="List_listContainer__1Rz3n"
              style={{ overflowY: "hidden" }}
            >
              <div className="InfiniteScroll_InfiniteScroll__3CYvZ">
                {filterdata.map((user, index) => {
                  const reversedConversationList = [
                    ...user.conversationList,
                  ].reverse();
                  const latestMessage =
                    reversedConversationList.length > 0
                      ? reversedConversationList[0].chat
                      : "Start a conversation";
                  const messageTime =
                    reversedConversationList.length > 0
                      ? reversedConversationList[0].timestamp
                      : "";
                  return (
                    <div onClick={() => handleChatItemClick(user)} key={index}>
                      <div
                        className="Item_item__1PDSu Item_hasUnreadMsg__jKiST item undefined"
                        key={index}
                      >
                        <span
                          className="Item_redIcon__1lQYQ"
                          style={{ backgroundColor: chatColors[index] }}
                        >
                          <span className="Item_img__2HaKx"></span>
                          <span className="Item_initials__1vc9z">
                            {getInitialsFromName(user)}
                          </span>
                        </span>
                        <div className="List_senderAndMsg__PTfMO">
                          <div className="List_senderName__UvVhm">
                            <span>{user.name}</span>
                            <span className="List_lastActive__5BsgZ">
                              <div className="DateTime_time__2LwRn List_marginZero__39KOC">
                                {messageTime
                                  ? moment(messageTime).format("h:mm a")
                                  : ""}

                                {/* {moment(messageTime).format("LT")} */}
                                {/* 02:05 am */}
                              </div>
                            </span>
                          </div>
                          <div className="List_msg__2zExc">
                            <div className="List_msgText__9G79W">
                              You: {latestMessage}
                            </div>
                            <div className="List_singleDigitUnreadCount__3IOvP">
                              <span style={{ color: "rgb(255, 255, 255)" }}>
                                {/* 4 */}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="chat-container col-md-6">
          <div className="messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${
                  msg.senderId === userId ? "sent" : "received"
                }`}
              >
                <span>{msg.chat}</span>
                <span className="timestamp">
                  {moment(msg.timestamp).format("LT")}
                </span>
              </div>
            ))}
          </div>
          <div className="input-container111">
            <textarea
              value={typeMessage}
              onChange={(e) => setTypeMessage(e.target.value)}
              placeholder="Write something here …"
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default StartChat;

{
  /* <div className="col-md-8" style={{ border: "1px solid #e5e5e5" }}> */
}
{
  /* start conversation */
}
{
  /* {selectedChat ? (
  <div className="Details_details__1XtbZ">
    <div className="Details_mainBody__2bqjf">
      <div class="Header_header__1V2oq">
        <div class="Item_item__1PDSu  item Header_chatHeaderDiy__3fGgQ ">
          <span
            class="Item_redIcon__1lQYQ"
            style={{ cursor: "pointer" }}
          >
            <span
              class="Item_img__2HaKx"
              style={{ backgroundColor: "rgb(155, 170, 171)" }}
            >
              {" "}
            </span>

            <span class="Item_initials__1vc9z">
              {getInitialsFromNameForParticularUser(selectedChat)}
            </span>
          </span>
          <div class="Header_nameContainer__3MWIq">
            <span
              style={{ display: "flex", flexDirection: "column" }}
            >
              <span style={{ fontSize: "17px" }}>
                {selectedChat.name}{" "}
              </span>
            </span>
          </div>
        </div>
      </div>
      <div role="presentation" tabindex="0" class="wrapperContainer">
        <div class="Details_msgsContainer__nQ3R5">
          <div class="InfiniteScroll_InfiniteScroll__3CYvZ-chat">
            {selectedChat.conversationList &&
            selectedChat.conversationList?.length === 0 ? (
              <div style={{ textAlign: "center", marginTop: "10%" }}>
                <p
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <PiWechatLogoDuotone style={{ fontSize: "50px" }} />
                </p>
                <p>No Messages Found!</p>
              </div>
            ) : ( */
}
// <Chat
//   userId="662c932f56fb50dc2ebd8019" //kiru userId
//   selectedChat={selectedChat}
// />
// <>
//   {selectedChat.conversationList?.map((chat, index) => (
//     // <>
//     //   <div class="DateTime_time__2LwRn undefined">
//     //     {/* {chat.timestamp} */}
//     //     {moment(chat.timestamp).format("Do MMM YYYY")}
//     //   </div>
//     //   <div
//     //     id={chat._id}
//     //     key={index}
//     //     class="MsgItem_MsgItem__3pT7c"
//     //   >
//     //     <div class="MsgItem_alignSelfRight__2ff7z">
//     //       <span
//     //         style={{
//     //           display: "flex",
//     //           justifyContent: "center",
//     //         }}
//     //       >
//     //         <div
//     //           class="MsgItem_msg__3H9D2 MsgItem_sent__2L--y"
//     //           style={{ flexDirection: "row" }}
//     //         >
//     //           <div
//     //             style={{
//     //               display: "flex",
//     //               flexDirection: "column",
//     //               flex: "1 1 0%",
//     //             }}
//     //           >
//     //             <span
//     //               class="MsgItem_messageText__1hrni"
//     //               style={{ whiteSpace: "pre-wrap" }}
//     //             >
//     //               {chat.chat}
//     //             </span>
//     //           </div>
//     //           <span class="MsgItem_timeStamp__2Wifz">
//     //             {/* new Date(timestamp).toISOString().split('T')[1].split('.')[0]{new Date(timestamp).toISOString().split('T')[1].split('.')[0]} */}
//     //             {moment(chat.timestamp).format("LT")}
//     //           </span>
//     //         </div>
//     //       </span>
//     //     </div>
//     //   </div>
//     // </>
//     // <Chat
//     //   userId="662c932f56fb50dc2ebd8019" //kiru userId
//     //   selectedChat={selectedChat}
//     // />
//   ))}
// </>
//         )}
//       </div>
//     </div>
//   </div>
// </div>

{
  /* <div class="input_SearchForm__2jrd5">
      <form
        autocomplete="off"
        style={{
          flex: "1 1 1px",
          paddingRight: "1rem",
          display: "flex",
        }}
      >
        <textarea
          placeholder="Write something here …"
          type="text"
          style={{ padding: "1rem" }}
          value={startConversations}
          onChange={(e) => setStartConversations(e.target.value)}
        ></textarea>
      </form>
      <img
        class="input_right__2Z46_"
        alt="send"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAXCAYAAAAV1F8QAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJySURBVHgBvZZNSBRRHMB/Ozu76yYVVmhbUgR+kUV00W5FBEV07lqdOnTKU4eKPYRCRdsXmWJGkGTtQQpSsKywT0oxCi3ScqlgVczN/Zyd2dnpTbCotOnutvaDgTdv3nu/9/7vY56VSx/62HkgisMywqd+jUXCQrPP+J1KaF9QIzfxDXg4f+gneWZGlCKhKejxLgJjDZzc9YY88adoNtFgH1rMw+v2DryeGIsmSqEpAZTwdcYnPJze+50cyEyUIqFFSeqdjI00cWrfQ7IgO1EKwzClr0iqZ+nt7sRbt2BYcxPNRk98FXPZQlRt58S24b+LGoefiR6WYLAWm81pZuWEGVYt5iUu5jLa/RS3OzlXlOLI5ZWUlJViL6rG6SzFKrvQ9WokqQLZsU68Z94DJfyCcOAqAz238brVuaL52OGWqdm8GruzghWuMuyOYuLxKgoK15OIb8W5tDBtPVWZRIm04vddsWYk8j1J8vxOkN62UVyuQZJSCOfyCay2EdGYXzwSFkuxGLU0p55VXgJJFxZjKv2IDl4oZ2NtOQVFq4gHK3A4K0VDm5DkNcj2ZSI9f8eMpEEsdB9Dqedo7Uszy4LnXR0WqQrZKhaEsQHJWoXNYSMXlOgPIbnG+NAt6ve/nf3p35e3ia4OEZxs5HN3K83uaLoiMrlihkcJ3yMWOMex7b0LFc9epKtTYs+04f/WQP0ef6bVMhOZR44aG0DTblC35aKZQ5bML0pocQy9i9BEC/2PHqQ2Xy6kF+napNjZHURE/N27P5IHZkRmeLTYIMHpM6gFd3HX5PV3LgvBtDgIHxMJNTH6vofmw4t0QTneVcl/4BfXWBMK2l33LgAAAABJRU5ErkJggg=="
        style={{ cursor: "pointer" }}
        onClick={() => sendMessage(selectedChat)}
      />
    </div> */
}
{
  /* </div>
) : (
  <div
    style={{
      margin: "8rem",
      width: "65%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      textAlign: "center",
    }}
  >
    <img
      src="https://web.classplusapp.com/static/media/EmptyChat.a919e46f.svg"
      alt=""
    />
    <div>
      <div
        style={{
          fontSize: "18px",
          lineHeight: "21px",
          textAlign: "center",
          color: "rgb(0, 0, 0)",
          marginTop: "32px",
        }}
      >
        No conversation selected
      </div>
      <div
        style={{
          fontSize: "14px",
          lineHeight: "22px",
          textAlign: "center",
          color: "rgb(119, 119, 119)",
          marginTop: "16px",
        }}
      >
        Select a conversation from the left panel{" "}
      </div>
    </div>
  </div>
)}
</div> */
}
