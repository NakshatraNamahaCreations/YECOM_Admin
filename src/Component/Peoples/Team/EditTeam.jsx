import React, { useEffect, useState } from "react";
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
import { getData, postData, putData } from "../../../Api-Service/apiHelper";
import { apiUrl } from "../../../Api-Service/apiConstants";
import { useLocation } from "react-router-dom";

function EditTeam() {
  const location = useLocation();
  const members = location.state.data || null; // Remove the leading '?'
  console.log("members", members);

  const [name, setName] = useState(members.name);
  const [phoneNumber, setPhoneNumber] = useState(members.phoneNumber);
  const [email, setEmail] = useState(members.email);
  const [website, setWebsite] = useState(members.website);
  const [banner, setBanner] = useState(members.banner);
  const [chat, setChat] = useState(members.chat);
  const [coupon, setCoupon] = useState(members.coupon);
  const [team, setTeam] = useState(members.team);
  const [user, setUser] = useState(members.user);
  const [freeMaterial, setFreeMaterial] = useState(members.freeMaterial);
  const [campaign, setCampaign] = useState(members.campaign);
  const [course, setCourse] = useState(members.course);
  const [selfService, setSelfService] = useState(members.selfService);

  const updateDetails = async () => {
    try {
      const data = {
        name: name,
        phoneNumber: phoneNumber,
        email: email,
        website: website,
        banner: banner,
        chat: chat,
        coupon: coupon,
        team: team,
        user: user,
        freeMaterial: freeMaterial,
        campaign: campaign,
        course: course,
        selfService: selfService,
      };
      const res = await putData(
        `${apiUrl.UPDATE_TEAM_MEMBER}${members._id}`,
        data
      );
      if (res) {
        alert("Updated");
        console.log("res", res);
        window.location.assign("/people/team-members");
      }
    } catch (error) {
      console.error("Error:", error);
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div class="label-0-1-733">
              <div class="labelText-0-1-734">Phone number </div>
              <div class="inputContainer-0-1-133 undefined ">
                <input
                  class="input-0-1-134 input-d22-0-1-1125 undefined"
                  placeholder="Enter Phone Number"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>
            <div class="label-0-1-733">
              <div class="labelText-0-1-734">Email ID (optional)</div>
              <div class="inputContainer-0-1-133 undefined ">
                <input
                  class="input-0-1-134 input-d23-0-1-1126 undefined"
                  placeholder="Email ID"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div class="label-0-1-733">
              <div class="labelText-0-1-734">Permissions</div>
              <div class="toggleContainer-0-1-177 toggleBar-0-1-171">
                <div class="textSubText-0-1-183">
                  <div class="toggleHeading-0-1-178 undefined">
                    <div class="permissionIconTextWrap-0-1-172">
                      <div class="permissionIconTextWrapIcon-0-1-173">
                        <PiGlobeDuotone />
                      </div>
                      <div class="textWrapper-0-1-176">
                        <span>
                          <div>Website</div>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="medium-0-1-180">
                  <div class="ui fitted toggle checkbox undefined">
                    <input
                      type="checkbox"
                      checked={website}
                      onChange={() => setWebsite(!website)}
                    />
                  </div>
                </div>
              </div>

              <div class="toggleContainer-0-1-177 toggleBar-0-1-171">
                <div class="textSubText-0-1-183">
                  <div class="toggleHeading-0-1-178 undefined">
                    <div class="permissionIconTextWrap-0-1-172">
                      <div class="permissionIconTextWrapIcon-0-1-173">
                        <PiFlagBannerDuotone />
                      </div>
                      <div class="textWrapper-0-1-176">
                        <span>
                          <div>Banner</div>
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
                      onChange={() => setBanner(!banner)}
                    />
                  </div>
                </div>
              </div>
              <div class="toggleContainer-0-1-177 toggleBar-0-1-171">
                <div class="textSubText-0-1-183">
                  <div class="toggleHeading-0-1-178 undefined">
                    <div class="permissionIconTextWrap-0-1-172">
                      <div class="permissionIconTextWrapIcon-0-1-173">
                        <PiChatTeardropDotsDuotone />
                      </div>
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
                      onChange={() => setChat(!chat)}
                    />
                  </div>
                </div>
              </div>
              <div class="toggleContainer-0-1-177 toggleBar-0-1-171">
                <div class="textSubText-0-1-183">
                  <div class="toggleHeading-0-1-178 undefined">
                    <div class="permissionIconTextWrap-0-1-172">
                      <div class="permissionIconTextWrapIcon-0-1-173">
                        <CiDiscount1 />
                      </div>
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
                      checked={coupon}
                      onChange={() => setCoupon(!coupon)}
                    />
                  </div>
                </div>
              </div>
              <div class="toggleContainer-0-1-177 toggleBar-0-1-171">
                <div class="textSubText-0-1-183">
                  <div class="toggleHeading-0-1-178 undefined">
                    <div class="permissionIconTextWrap-0-1-172">
                      <div class="permissionIconTextWrapIcon-0-1-173">
                        <PiUserCircleDuotone />
                      </div>
                      <div class="textWrapper-0-1-176">
                        <span>
                          <div>User</div>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="medium-0-1-180">
                  <div class="ui fitted toggle checkbox undefined ">
                    <input
                      type="checkbox"
                      checked={user}
                      onChange={() => setUser(!user)}
                    />
                  </div>
                </div>
              </div>
              <div class="toggleContainer-0-1-177 toggleBar-0-1-171">
                <div class="textSubText-0-1-183">
                  <div class="toggleHeading-0-1-178 undefined">
                    <div class="permissionIconTextWrap-0-1-172">
                      <div class="permissionIconTextWrapIcon-0-1-173">
                        <PiUsersThreeDuotone />
                      </div>
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
                      onChange={() => setTeam(!team)}
                    />
                  </div>
                </div>
              </div>
              <div class="toggleContainer-0-1-177 toggleBar-0-1-171">
                <div class="textSubText-0-1-183">
                  <div class="toggleHeading-0-1-178 undefined">
                    <div class="permissionIconTextWrap-0-1-172">
                      <div class="permissionIconTextWrapIcon-0-1-173">
                        <PiBookDuotone />
                      </div>
                      <div class="textWrapper-0-1-176">
                        <span>
                          <div>Free Study Material</div>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="medium-0-1-180">
                  <div class="ui fitted toggle checkbox undefined ">
                    <input
                      type="checkbox"
                      checked={freeMaterial}
                      onChange={() => setFreeMaterial(!freeMaterial)}
                    />
                  </div>
                </div>
              </div>
              <div class="toggleContainer-0-1-177 toggleBar-0-1-171">
                <div class="textSubText-0-1-183">
                  <div class="toggleHeading-0-1-178 undefined">
                    <div class="permissionIconTextWrap-0-1-172">
                      <div class="permissionIconTextWrapIcon-0-1-173">
                        <PiSpeakerSimpleHighDuotone />
                      </div>
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
                      onChange={() => setCampaign(!campaign)}
                    />
                  </div>
                </div>
              </div>
              <div class="toggleContainer-0-1-177 toggleBar-0-1-171">
                <div class="textSubText-0-1-183">
                  <div class="toggleHeading-0-1-178 undefined">
                    <div class="permissionIconTextWrap-0-1-172">
                      <div class="permissionIconTextWrapIcon-0-1-173">
                        <PiBookOpenDuotone />
                      </div>
                      <div class="textWrapper-0-1-176">
                        <span>
                          <div>Course</div>
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
                      onChange={() => setCourse(!course)}
                    />
                  </div>
                </div>
              </div>
              {/* <div class="toggleContainer-0-1-177 toggleBar-0-1-171">
                <div class="textSubText-0-1-183">
                  <div class="toggleHeading-0-1-178 undefined">
                    <div class="permissionIconTextWrap-0-1-172">
                      <div class="permissionIconTextWrapIcon-0-1-173">
                        <PiPathDuotone />
                      </div>
                      <div class="textWrapper-0-1-176">
                        <span>
                          <div>Self Service</div>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="medium-0-1-180">
                  <div class="ui fitted toggle checkbox undefined ">
                    <input
                      type="checkbox"
                      checked={selfService}
                      onChange={() => setSelfService(!selfService)}
                    />
                  </div>
                </div>
              </div> */}
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
          <Button className="ms-2 px-5" variant="info" onClick={updateDetails}>
            Update &nbsp; <i class="fa-solid fa-arrow-right-long"></i>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EditTeam;
