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
  const [Courses, setCourses] = useState(false);
  const [userapp, setuserapp] = useState(false);
  const [tryToBook, settryToBook] = useState(false);
  const [People, setPeople] = useState(false);
  const [Payments, setPayments] = useState(false);
  const [Chat, setChat] = useState(false);
  const [Pricing, setPricing] = useState(false);
  const [Marketing, setMarketing] = useState(false);
  const [Paymentkey, setPaymentkey] = useState(false);
  const [Coupon, setCoupon] = useState(false);
  const [team, setteam] = useState(false);
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
          Courses: Courses,
          userapp: userapp,
          tryToBook: tryToBook,
          People: People,
          Payments: Payments,
          Chat: Chat,
          Pricing: Pricing,
          Marketing: Marketing,
          Paymentkey: Paymentkey,
          Coupon: Coupon,
          team: team,
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
                        checked={Courses}
                        onChange={(e) => setCourses(!Courses)}
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
                            <div>User App</div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="medium-0-1-180">
                    <div class="ui fitted toggle checkbox undefined ">
                      <input
                        type="checkbox"
                        checked={userapp}
                        onChange={(e) => setuserapp(!userapp)}
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
                            <div>People</div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="medium-0-1-180">
                    <div class="ui fitted toggle checkbox undefined ">
                      <input
                        type="checkbox"
                        checked={People}
                        onChange={(e) => setPeople(!People)}
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
                            <div>Payments</div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="medium-0-1-180">
                    <div class="ui fitted toggle checkbox undefined ">
                      <input
                        type="checkbox"
                        checked={Payments}
                        onChange={(e) => setPayments(!Payments)}
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
                        checked={Pricing}
                        onChange={(e) => setPricing(!Pricing)}
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
                        checked={Chat}
                        onChange={(e) => setChat(!Chat)}
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
                        onChange={(e) => setteam(!team)}
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
                            <div>Marketing</div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="medium-0-1-180">
                    <div class="ui fitted toggle checkbox undefined ">
                      <input
                        type="checkbox"
                        checked={Marketing}
                        onChange={(e) => setMarketing(!Marketing)}
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
                            <div>Paymentkey</div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="medium-0-1-180">
                    <div class="ui fitted toggle checkbox undefined ">
                      <input
                        type="checkbox"
                        checked={Paymentkey}
                        onChange={(e) => setPaymentkey(!Paymentkey)}
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
                            <div>Coupon</div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="medium-0-1-180">
                    <div class="ui fitted toggle checkbox undefined ">
                      <input
                        type="checkbox"
                        checked={Coupon}
                        onChange={(e) => setCoupon(!Coupon)}
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
                        onChange={(e) => settryToBook(!tryToBook)}
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
