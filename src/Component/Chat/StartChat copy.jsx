import React, { useState } from "react";
import "./style/startchat.css";
import { FaPlus } from "react-icons/fa6";
import Slider from "react-slick";

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
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatColors, setChatColors] = useState(
    Array.from({ length: 5 }, () => getRandomColor())
  );

  const handleChatItemClick = (chat) => {
    setSelectedChat(chat);
  };

  return (
    <>
      <div className="row mt-3" style={{ backgroundColor: "white" }}>
        <div className="col-md-4" style={{ border: "1px solid #e5e5e5" }}>
          <div className="Header_header__39F7j">
            <div style={{ fontSize: "20px" }}>Chat</div>
            <div>
              <FaPlus />
            </div>
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
                //   value=""
              />
            </form>
          </div>
          <div className="row">
            <div style={{ color: "grey", fontSize: "14px", padding: "10px" }}>
              STUDENTS ARE WAITING FOR YOU
            </div>
            <div
              className="mb-2"
              style={{ borderBottom: "1px solid #e5e5e5" }}
            ></div>
            <Slider style={{ padding: "0px 40px" }} {...settings}>
              {Array.from({ length: 10 }).map((ele, index) => (
                <div key={index}>
                  <span
                    className="Item_redIcon__1lQYQ"
                    style={{
                      cursor: "pointer",
                      backgroundColor: chatColors[index],
                      // backgroundColor: getRandomColor(),
                    }}
                  >
                    <span className="Item_img__2HaKx"></span>
                    <span className="Item_initials__1vc9z">A</span>
                  </span>
                </div>
              ))}
            </Slider>
            <br />
            <div
              className="mt-2"
              style={{ borderBottom: "1px solid #e5e5e5" }}
            ></div>
          </div>
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
                {Array.from({ length: 5 }).map((ele, index) => (
                  <div onClick={() => handleChatItemClick(index)} key={index}>
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
                          {index + 1}{" "}
                        </span>
                      </span>
                      <div className="List_senderAndMsg__PTfMO">
                        <div className="List_senderName__UvVhm">
                          <span>AI Powered Leads</span>
                          <span className="List_lastActive__5BsgZ">
                            <div className="DateTime_time__2LwRn List_marginZero__39KOC">
                              02:05 am
                            </div>
                          </span>
                        </div>
                        <div className="List_msg__2zExc">
                          <div className="List_msgText__9G79W">
                            AI Powered Leads : [Normal Lead]: Your student Ysn
                            (+919645945661) showed interest in the course "Ecom
                            Gyan Amazon FBA Mastery Course(HINDI) | Lifetime
                            Access + UNLIMITED 1 on 1 Mentorship" but didn’t
                            buy. Please follow up with him/her.
                          </div>
                          <div className="List_singleDigitUnreadCount__3IOvP">
                            <span style={{ color: "rgb(255, 255, 255)" }}>
                              4
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-8" style={{ border: "1px solid #e5e5e5" }}>
          {selectedChat !== null ? (
            <div className="Details_details__1XtbZ">
              <div
                className="Details_mainBody__2bqjf mb-5"
                style={{ marginBottom: "75px" }}
              >
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
                      <span class="Item_initials__1vc9z">K</span>
                    </span>
                    <div class="Header_nameContainer__3MWIq">
                      <span
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <span style={{ fontSize: "17px" }}>Kiruthika</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div role="presentation" tabindex="0" class="wrapperContainer">
                  <div class="Details_msgsContainer__nQ3R5">
                    <div class="InfiniteScroll_InfiniteScroll__3CYvZ-chat">
                      <div class="DateTime_time__2LwRn undefined">
                        2024/04/15
                      </div>
                      {Array.from({ length: 15 }).map((_, index) => (
                        <>
                          <div
                            id="661cd65b37449400125a07fd"
                            class="MsgItem_MsgItem__3pT7c"
                          >
                            <div class="MsgItem_alignSelfRight__2ff7z">
                              <div style={{ order: "0" }}>
                                <div class="Dropdown_ChatDropdown__34tKP ChatDropdown undefined">
                                  <div class="Dropdown_Btn__3FGw8 ">
                                    <span class="MsgItem_threeDots__1Hwp6">
                                      ···
                                    </span>
                                  </div>
                                  <div class="Dropdown_Items__IR149 Dropdown_Hide__S1EQ5 ">
                                    <ul>
                                      <li class="MsgItem_listItems__176hU">
                                        <img
                                          class="MsgItem_listImages__VONfE"
                                          src="/static/media/chatReply.f865aebd.svg"
                                          alt=""
                                        />
                                        Reply
                                      </li>
                                      <li class="MsgItem_listItems__176hU">
                                        <img
                                          width="16"
                                          class="MsgItem_listImages__VONfE"
                                          src="/static/media/pinChat.c61df070.svg"
                                          alt=""
                                        />
                                        Pin Message
                                      </li>
                                      <li class="MsgItem_listItems__176hU">
                                        <img
                                          class="MsgItem_listImages__VONfE"
                                          src="/static/media/copyChat.1de0f034.svg"
                                          alt=""
                                        />
                                        Copy message{" "}
                                      </li>
                                      <li class="MsgItem_listItems__176hU">
                                        <img
                                          class="MsgItem_listImages__VONfE"
                                          src="/static/media/deleteChat.4bca78ca.svg"
                                          alt=""
                                        />
                                        Delete message
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              <span
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <div
                                  class="MsgItem_msg__3H9D2 MsgItem_sent__2L--y"
                                  style={{ flexDirection: "row" }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      flex: "1 1 0%",
                                    }}
                                  >
                                    <span
                                      class="MsgItem_messageText__1hrni"
                                      style={{ whiteSpace: "pre-wrap" }}
                                    >
                                      {" "}
                                      [Normal Lead]: Your student Ajay
                                      (+918956235689) showed interest in the
                                      course "Ecom Gyan Amazon FBA Mastery
                                      Course(HINDI) | 1 on 1 Mentorship
                                      INSTALLMENT PLAN" but didn’t buy. Please
                                      follow up with him/her.
                                    </span>
                                  </div>
                                  <span class="MsgItem_timeStamp__2Wifz">
                                    12:55 pm
                                  </span>
                                </div>
                              </span>
                            </div>
                          </div>

                          <div
                            id="661d12bf47fc5400121da23b"
                            class="MsgItem_MsgItem__3pT7c   "
                          >
                            <div class="MsgItem_alignSelfRight__2ff7z">
                              {/* <div style={{ order: "0" }}>
                            <div class="Dropdown_ChatDropdown__34tKP ChatDropdown undefined">
                              <div class="Dropdown_Btn__3FGw8 ">
                                <span class="MsgItem_threeDots__1Hwp6">
                                  ···
                                </span>
                              </div>
                              <div class="Dropdown_Items__IR149 Dropdown_Hide__S1EQ5 ">
                                <ul>
                                  <li class="MsgItem_listItems__176hU">
                                    <img
                                      class="MsgItem_listImages__VONfE"
                                      src="/static/media/chatReply.f865aebd.svg"
                                      alt=""
                                    />
                                    Reply
                                  </li>
                                  <li class="MsgItem_listItems__176hU">
                                    <img
                                      width="16"
                                      class="MsgItem_listImages__VONfE"
                                      src="/static/media/pinChat.c61df070.svg"
                                      alt=""
                                    />
                                    Pin Message
                                  </li>
                                  <li class="MsgItem_listItems__176hU">
                                    <img
                                      class="MsgItem_listImages__VONfE"
                                      src="/static/media/copyChat.1de0f034.svg"
                                      alt=""
                                    />
                                    Copy message{" "}
                                  </li>
                                  <li class="MsgItem_listItems__176hU">
                                    <img
                                      class="MsgItem_listImages__VONfE"
                                      src="/static/media/deleteChat.4bca78ca.svg"
                                      alt=""
                                    />
                                    Delete message
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div> */}
                              <span
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <div
                                  class="MsgItem_msg__3H9D2 MsgItem_sent__2L--y"
                                  style={{ flexDirection: "row" }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      flex: "1 1 0%",
                                    }}
                                  >
                                    <span
                                      class="MsgItem_messageText__1hrni"
                                      style={{ whiteSpace: "pre-wrap" }}
                                    >
                                      {" "}
                                      hi
                                    </span>
                                  </div>
                                  <span class="MsgItem_timeStamp__2Wifz">
                                    05:12 pm
                                  </span>
                                </div>
                              </span>
                            </div>
                          </div>
                        </>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div class="input_SearchForm__2jrd5">
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
                    style={{ padding: "1rem 4.5rem" }}
                  ></textarea>
                </form>
              </div>
              {/* Selected chat: {selectedChat + 1} */}
            </div>
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

          {/* conversation */}
        </div>
      </div>
    </>
  );
}

export default StartChat;
