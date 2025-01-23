import React, { useState } from "react";
import "../style/teammember.css";
import { Button } from "react-bootstrap";
import {
  PiFlagBannerDuotone,
  PiGlobeDuotone,
  PiUserCircleDuotone,
  PiBookOpenDuotone,
  PiBookDuotone,
  PiChatTeardropDotsDuotone,
  PiSpeakerSimpleHighDuotone,
  PiPathDuotone,
  PiUsersThreeDuotone,
} from "react-icons/pi";
import { CiDiscount1 } from "react-icons/ci";
import { postData } from "../../../Api-Service/apiHelper";
import { apiUrl } from "../../../Api-Service/apiConstants";

function AddTeam() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(false);
  const [banner, setBanner] = useState(false);
  const [youtubeVideo, setYoutubeVideo] = useState(false);
  const [broadcast, setBroadcast] = useState(false);
  const [payment, setPayment] = useState(false);
  const [tryToBook, setTryToBook] = useState(false);
  const [chat, setChat] = useState(false);
  const [pricing, setPricing] = useState(false);
  const [coupon, setCoupon] = useState(false);
  const [team, setTeam] = useState(false);
  const [user, setUser] = useState(false);
  const [freeMaterial, setFreeMaterial] = useState(false);
  const [campaign, setCampaign] = useState(false);
  const [course, setCourse] = useState(false);
  const [selfService, setSelfService] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const addTeamMember = async () => {
    if (!name || !password) {
      alert("Name and Phone number should not empty");
    } else {
      try {
        const data = {
          name: name,
          password: password,
          email: email,
          tryToBook: tryToBook,
          banner: banner,
          chat: chat,
          youtubeVideo: youtubeVideo,
          team: team,
          broadcast: broadcast,
          payment: payment,
          campaign: campaign,
          course: course,
          pricing: pricing,
        };
        const res = await postData(apiUrl.ADD_TEAMMEMBER, data);
        if (res) {
          alert("Added");
          console.log("res", res);
          window.location.assign("/people/team-members");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div>
      <div className="root-0-1-732 contentContainer-0-1-726">
        <div class="sections-0-1-727">
          <div class="leftSection-0-1-728">
            <div class="label-0-1-733">
              <div class="labelText-0-1-734">Name</div>
              <div class="inputContainer-0-1-133 undefined ">
                <input
                  class="input-0-1-134 input-d21-0-1-1124 undefined"
                  placeholder="Enter Name"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div class="label-0-1-733">
              <div class="labelText-0-1-734">Email ID</div>
              <div class="inputContainer-0-1-133 undefined ">
                <input
                  class="input-0-1-134 input-d23-0-1-1126 undefined"
                  placeholder="Email ID"
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div class="label-0-1-733">
              <div class="labelText-0-1-734">Password</div>
              <div class="inputContainer-0-1-133 undefined ">
                <input
                  class="input-0-1-134 input-d22-0-1-1125 undefined"
                  placeholder="Enter Password"
                  type="tel"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div class="label-0-1-733">
              <div class="labelText-0-1-734">Permissions</div>
              <div className="row">
                <div class="toggleContainer-0-1-177 toggleBar-0-1-171 col-md-4 me-2">
                  <div class="textSubText-0-1-183">
                    <div class="toggleHeading-0-1-178 undefined">
                      <div
                        class="permissionIconTextWrap-0-1-172"
                        style={{ fontSize: "15px" }}
                      >
                        <div class="textWrapper-0-1-176">
                          <span>
                            <div>My Course</div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="medium-0-1-180">
                    <div class="ui fitted toggle checkbox undefined ">
                      <input
                        type="checkbox"
                        checked={course}
                        onChange={(e) => setCourse(!course)}
                      />
                    </div>
                  </div>
                </div>

                <div class="toggleContainer-0-1-177 toggleBar-0-1-171 col-md-4 me-2">
                  <div class="textSubText-0-1-183">
                    <div class="toggleHeading-0-1-178 undefined">
                      <div
                        class="permissionIconTextWrap-0-1-172"
                        style={{ fontSize: "15px" }}
                      >
                        <div class="textWrapper-0-1-176">
                          <span>
                            <div>Manage Banner's</div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="medium-0-1-180">
                    <div class="ui fitted toggle checkbox undefined ">
                      <input
                        type="checkbox"
                        checked={banner}
                        onChange={(e) => setBanner(!banner)}
                      />
                    </div>
                  </div>
                </div>
                <div class="toggleContainer-0-1-177 toggleBar-0-1-171 col-md-4 me-2">
                  <div class="textSubText-0-1-183">
                    <div class="toggleHeading-0-1-178 undefined">
                      <div
                        class="permissionIconTextWrap-0-1-172"
                        style={{ fontSize: "15px" }}
                      >
                        <div class="textWrapper-0-1-176">
                          <span>
                            <div>Youtube Video</div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="medium-0-1-180">
                    <div class="ui fitted toggle checkbox undefined ">
                      <input
                        type="checkbox"
                        checked={youtubeVideo}
                        onChange={(e) => setYoutubeVideo(!youtubeVideo)}
                      />
                    </div>
                  </div>
                </div>
                <div class="toggleContainer-0-1-177 toggleBar-0-1-171 col-md-4 me-2">
                  <div class="textSubText-0-1-183">
                    <div class="toggleHeading-0-1-178 undefined">
                      <div
                        class="permissionIconTextWrap-0-1-172"
                        style={{ fontSize: "15px" }}
                      >
                        <div class="textWrapper-0-1-176">
                          <span>
                            <div>Broadcast</div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="medium-0-1-180">
                    <div class="ui fitted toggle checkbox undefined ">
                      <input
                        type="checkbox"
                        checked={broadcast}
                        onChange={(e) => setBroadcast(!broadcast)}
                      />
                    </div>
                  </div>
                </div>
                <div class="toggleContainer-0-1-177 toggleBar-0-1-171 col-md-4 me-2">
                  <div class="textSubText-0-1-183">
                    <div class="toggleHeading-0-1-178 undefined">
                      <div
                        class="permissionIconTextWrap-0-1-172"
                        style={{ fontSize: "15px" }}
                      >
                        <div class="textWrapper-0-1-176">
                          <span>
                            <div>Payment</div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="medium-0-1-180">
                    <div class="ui fitted toggle checkbox undefined ">
                      <input
                        type="checkbox"
                        checked={payment}
                        onChange={(e) => setPayment(!payment)}
                      />
                    </div>
                  </div>
                </div>
                <div class="toggleContainer-0-1-177 toggleBar-0-1-171 col-md-4 me-2">
                  <div class="textSubText-0-1-183">
                    <div class="toggleHeading-0-1-178 undefined">
                      <div
                        class="permissionIconTextWrap-0-1-172"
                        style={{ fontSize: "15px" }}
                      >
                        <div class="textWrapper-0-1-176">
                          <span>
                            <div>Try to Book</div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="medium-0-1-180">
                    <div class="ui fitted toggle checkbox undefined ">
                      <input
                        type="checkbox"
                        checked={tryToBook}
                        onChange={(e) => setTryToBook(!tryToBook)}
                      />
                    </div>
                  </div>
                </div>
                <div class="toggleContainer-0-1-177 toggleBar-0-1-171 col-md-4 me-2">
                  <div class="textSubText-0-1-183">
                    <div class="toggleHeading-0-1-178 undefined">
                      <div
                        class="permissionIconTextWrap-0-1-172"
                        style={{ fontSize: "15px" }}
                      >
                        <div class="textWrapper-0-1-176">
                          <span>
                            <div>Chat</div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="medium-0-1-180">
                    <div class="ui fitted toggle checkbox undefined ">
                      <input
                        type="checkbox"
                        checked={chat}
                        onChange={(e) => setChat(!chat)}
                      />
                    </div>
                  </div>
                </div>
                <div class="toggleContainer-0-1-177 toggleBar-0-1-171 col-md-4 me-2">
                  <div class="textSubText-0-1-183">
                    <div class="toggleHeading-0-1-178 undefined">
                      <div
                        class="permissionIconTextWrap-0-1-172"
                        style={{ fontSize: "15px" }}
                      >
                        <div class="textWrapper-0-1-176">
                          <span>
                            <div>Pricing</div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="medium-0-1-180">
                    <div class="ui fitted toggle checkbox undefined ">
                      <input
                        type="checkbox"
                        checked={pricing}
                        onChange={(e) => setPricing(!pricing)}
                      />
                    </div>
                  </div>
                </div>

                <div class="toggleContainer-0-1-177 toggleBar-0-1-171 col-md-4 me-2">
                  <div class="textSubText-0-1-183">
                    <div class="toggleHeading-0-1-178 undefined">
                      <div
                        class="permissionIconTextWrap-0-1-172"
                        style={{ fontSize: "15px" }}
                      >
                        <div class="textWrapper-0-1-176">
                          <span>
                            <div>Team</div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="medium-0-1-180">
                    <div class="ui fitted toggle checkbox undefined ">
                      <input
                        type="checkbox"
                        checked={team}
                        onChange={(e) => setTeam(!team)}
                      />
                    </div>
                  </div>
                </div>

                <div class="toggleContainer-0-1-177 toggleBar-0-1-171 col-md-4 me-2">
                  <div class="textSubText-0-1-183">
                    <div class="toggleHeading-0-1-178 undefined">
                      <div
                        class="permissionIconTextWrap-0-1-172"
                        style={{ fontSize: "15px" }}
                      >
                        <div class="textWrapper-0-1-176">
                          <span>
                            <div>Campaign</div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="medium-0-1-180">
                    <div class="ui fitted toggle checkbox undefined ">
                      <input
                        type="checkbox"
                        checked={campaign}
                        onChange={(e) => setCampaign(!campaign)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="footerNavContainer-0-1-444 footerNavContainer-d0-0-1-457">
          <Button
            className="px-5 py-2"
            variant="outline-info"
            onClick={() => window.location.assign("/people/team-members")}
          >
            <i class="fa-solid fa-arrow-left-long"></i> &nbsp; Back
          </Button>
          <Button className="ms-2 px-5" variant="info" onClick={addTeamMember}>
            Save & Proceed &nbsp; <i class="fa-solid fa-arrow-right-long"></i>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddTeam;
