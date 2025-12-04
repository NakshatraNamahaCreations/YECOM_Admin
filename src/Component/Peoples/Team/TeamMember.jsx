import React, { useEffect, useState } from "react";
import "../style/users.css";
import DataTable from "react-data-table-component";
import { Offcanvas, Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaRegPenToSquare } from "react-icons/fa6";
import { deleteData, getData } from "../../../Api-Service/apiHelper";
import { apiUrl } from "../../../Api-Service/apiConstants";
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
import { BiSolidDiscount } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { RxSlash } from "react-icons/rx";
import axios from "axios";
import { postData } from "../../../Api-Service/apiHelper";

function TeamMember() {
  const [showModal, setShowModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const [updatedMember, setUpdatedMember] = useState({
    name: "",
    email: "",
    password: "",
    permissions: {
      Courses: false,
      userapp: false,
      tryToBook: false,
      People: false,
      Payments: false,
      Chat: false,
      Pricing: false,
      Marketing: false,
      Paymentkey: false,
      Coupon: false,
      team: false,
      Dashboard: false,
    },
  });

  const styles = {
    inputStyle: {
      width: "20em",
      border: "1px solid rgb(216, 224, 240)",
      borderRadius: "16px",
      fontSize: "16px",
      backgroundColor: "white",
      outline: "none",
      backgroundPosition: "10px 10px",
      backgroundRepeat: "no-repeat",
      padding: "12px 18px 11px 44px",
      lineHeight: "24px",
      // boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    },
    createCourseBtn: {
      padding: "12px 20px",
      borderRadius: "16px",
      fontWeight: "600",
      fontSize: "18px",
      lineHeight: "24px",
      cursor: "pointer",
      border: "none",
      // width: "135px",
      color: "00007c",
      backgroundColor: "#9797ff61",
    },
    root01698: {
      // width: "256px",
      padding: 5,
      margin: "auto",
      display: "grid",
      // gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
      //  "1fr  / repeat(4, minmax(0, 10fr)) ",
      gap: "10px",
      // gridTemplateColumns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    },
    iconCont0199: {
      // width: "32px",
      cursor: "pointer",
      // height: "32px",
      display: "flex",
      alignItems: "center",
      // borderRadius: "20px",
      justifyContent: "center",
    },
  };

  const [openCanvas, setOpenCanvas] = useState({});
  const [showUsers, setShowUser] = useState(false);
  const [allMembers, setAllMembers] = useState([]);
  const handleOpeningCanvas = (row) => {
    setOpenCanvas(row);
    setShowUser(true);
  };
  const handleClosingCanvas = () => setShowUser(false);

  const fetchData = async () => {
    try {
      const teamRes = await axios.get(
        // "https://api.proleverageadmin.in/api/team/getallteammembers"
        `${apiUrl.BASEURL}${apiUrl.GET_ALL_TEAMMEMBER}`
      );
      console.log("team list:", teamRes);

      setAllMembers(teamRes.data.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const deleteMember = async (member) => {
    try {
      const res = await deleteData(`${apiUrl.DETELE_TEAMMEMBER}${member}`);
      if (res) {
        alert("Deleted Sucessfull");
        fetchData();
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (member) => {
    setSelectedMember(member);
    setUpdatedMember({
      ...member,
      permissions: {
        Courses: member.Courses || false,
        userapp: member.userapp || false,
        tryToBook: member.tryToBook || false,
        People: member.People || false,
        Payments: member.Payments || false,
        Chat: member.Chat || false,
        Pricing: member.Pricing || false,
        Marketing: member.Marketing || false,
        Paymentkey: member.Paymentkey || false,
        Coupon: member.Coupon || false,
        team: member.team || false,
        Dashboard: member.Dashboard || false,
      },
    });
    setShowModal(true);
  };

  // const handleSave = async () => {
  //   try {
  //     const res = await axios.put(
  //       `https://api.proleverageadmin.in/api/team/updateteammember/${selectedMember._id}`,
  //       updatedMember
  //     );
  //     if (res) {
  //       alert("Member updated successfully");
  //       setShowModal(false);
  //       fetchData();
  //     }
  //   } catch (error) {
  //     console.error("Error updating member:", error);
  //   }
  // };

  const handleSave = async () => {
    try {
      // Flatten the permissions object into the main object
      const payload = {
        ...updatedMember,
        ...updatedMember.permissions, // Spread permissions as individual fields
      };
      delete payload.permissions; // Remove the nested permissions object

      const res = await axios.put(
        `https://api.proleverageadmin.in/api/team/updateteammember/${selectedMember._id}`,
        payload
      );

      if (res) {
        alert("Member updated successfully");
        setShowModal(false);
        fetchData();
      }
    } catch (error) {
      console.error("Error updating member:", error);
    }
  };

  const handleChange = (field, value) => {
    setUpdatedMember((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePermissionChange = (permissionKey) => {
    setUpdatedMember((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permissionKey]: !prev.permissions[permissionKey],
      },
    }));
  };

  const columns = [
    {
      name: "Member name",
      selector: (row) => (
        <>
          <div
            style={{
              color: "#00ade7",
              fontWeight: "700",
              paddingBottom: "6px",
              cursor: "pointer",
            }}
            onClick={() => handleOpeningCanvas(row)}
          >
            {row.name}
          </div>
          <div>{row.email}</div>
          <div>{row.password}</div>
        </>
      ),
      sortable: true,
    },
    {
      name: "Permissions",
      selector: (row) => (
        <div style={styles.root01698}>
          <div style={styles.iconCont0199}>
            <div style={{ color: row.Dashboard ? "black" : "#9e9e9e" }}>
              Dashboard
            </div>
          </div>
          <div style={styles.iconCont0199}>
            <div style={{ color: row.Courses ? "black" : "#9e9e9e" }}>
              My Course
            </div>
          </div>

          <div style={styles.iconCont0199}>
            <div style={{ color: row.userapp ? "black" : "#9e9e9e" }}>
              User App
            </div>
          </div>
          <div style={styles.iconCont0199}>
            <div style={{ color: row.People ? "black" : "#9e9e9e" }}>
              People
            </div>
          </div>
          <div style={styles.iconCont0199}>
            <div style={{ color: row.Payments ? "black" : "#9e9e9e" }}>
              Payments
            </div>
          </div>
          <div style={styles.iconCont0199}>
            <div style={{ color: row.Pricing ? "black" : "#9e9e9e" }}>
              Pricing
            </div>
          </div>
          <div style={styles.iconCont0199}>
            <div style={{ color: row.Chat ? "black" : "#9e9e9e" }}>Chat</div>
          </div>
          <div style={styles.iconCont0199}>
            <div style={{ color: row.tryToBook ? "black" : "#9e9e9e" }}>
              Try to Book
            </div>
          </div>
          <div style={styles.iconCont0199}>
            <div style={{ color: row.Marketing ? "black" : "#9e9e9e" }}>
              Marketing
            </div>
          </div>
          <div style={styles.iconCont0199}>
            <div style={{ color: row.Paymentkey ? "black" : "#9e9e9e" }}>
              Paymentkey
            </div>
          </div>
          <div style={styles.iconCont0199}>
            <div style={{ color: row.Coupon ? "black" : "#9e9e9e" }}>
              Coupon
            </div>
          </div>
          <div style={styles.iconCont0199}>
            <div style={{ color: row.team ? "black" : "#9e9e9e" }}>Team</div>
          </div>
        </div>
      ),
      sortable: true,
    },
    // {
    //   name: "App Downloads",
    //   selector: (row) => "",
    //   sortable: true,
    // },
    {
      name: "Action",
      selector: (row) => (
        <>
          <div
            style={{
              display: "flex",
            }}
            // onClick={() => deleteMember(row._id)}
            // onClick={() => handleOpeningCanvas(row)}
          >
            <div
              style={{ cursor: "pointer" }}
              title="Edit"
              onClick={() => handleEdit(row)}
            >
              <FaRegPenToSquare size={16} color="#00ade7" />
            </div>
            <div>
              <RxSlash size={16} />
            </div>
            <div
              style={{ cursor: "pointer" }}
              title="Delete"
              onClick={() => deleteMember(row._id)}
            >
              <AiFillDelete size={16} color="#e91e63" />
            </div>
          </div>
        </>
      ),
      // sortable: true,
    },
  ];
  console.log("allMembers", allMembers);
  return (
    <div className="mt-3">
      <div className="d-flex justify-content-between mt-3">
        <div>
          <i
            className="fa-solid fa-magnifying-glass"
            style={{
              position: "absolute",
              margin: "16px",
              color: "#7d8592",
            }}
          ></i>
          <input
            type="text"
            name="search"
            placeholder="Search.."
            style={styles.inputStyle}
          />
        </div>
        <div className="">
          <button
            style={styles.createCourseBtn}
            onClick={() =>
              window.location.assign("/people/team-members/create")
            }
          >
            Add New Member
          </button>
        </div>
      </div>
      {/* Table */}
      <div className="TableHeaderContainer-0-1-672">
        <DataTable columns={columns} data={allMembers} defaultSortFieldId={1} />
      </div>
      {/* open canvas */}
      <Offcanvas show={showUsers} onHide={handleClosingCanvas} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{openCanvas.name} </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div
            class="bodyContainer-0-1-581 undefined"
            id="bodyContainerSideDrawer"
          >
            <div class="container-0-1-1442">
              <div class="subHeader-0-1-1443">Basic Information</div>
              <div class="basicInfoContainer-0-1-1444">
                <div class="infoRow-0-1-1445">
                  <img
                    src="https://ali-cdn-cp-assets-public.classplus.co/CampaignManager/e9296b40d1307ae14b192d251cf4d635"
                    width="16px"
                    height="16px"
                    alt=""
                  />
                  <div class="label-0-1-1446">Name : </div>
                  <div class="info-0-1-1447">{openCanvas.name} </div>
                </div>
                <div class="infoRow-0-1-1445">
                  <img
                    src="https://ali-cdn-cp-assets-public.classplus.co/CampaignManager/0df743398951317bb08ae0dfb8b85c98"
                    width="16px"
                    height="16px"
                    alt=""
                  />
                  <div class="label-0-1-1446">Mobile Number : </div>
                  <div class="info-0-1-1447">{openCanvas.phoneNumber}</div>
                </div>
                <div class="infoRow-0-1-1445">
                  <img
                    src="https://ali-cdn-cp-assets-public.classplus.co/CampaignManager/f05a83406b93ac4f6a2e5e039d0b565f"
                    width="16px"
                    height="16px"
                    alt=""
                  />
                  <div class="label-0-1-1446">Email : </div>
                  <div class="info-0-1-1447">{openCanvas.email} </div>
                </div>
              </div>
              <div class="subHeader-0-1-1443">Granted Permissions</div>
              <div class="courseSnapshotContainer-0-1-1448">
                {openCanvas.banner ? (
                  <div class="info-0-1-1447">Banner</div>
                ) : null}
                {openCanvas.campaign ? (
                  <div class="info-0-1-1447">Campaign</div>
                ) : null}
                {openCanvas.chat ? <div class="info-0-1-1447">Chat</div> : null}
                {openCanvas.coupon ? (
                  <div class="info-0-1-1447">Coupon</div>
                ) : null}
                {openCanvas.course ? (
                  <div class="info-0-1-1447">Course</div>
                ) : null}
                {openCanvas.freeMaterial ? (
                  <div class="info-0-1-1447">Free Study Material</div>
                ) : null}
                {/* {openCanvas.selfService ? (
                  <div class="info-0-1-1447">Self Service</div>
                ) : null} */}
                {openCanvas.team ? <div class="info-0-1-1447">Team</div> : null}
                {openCanvas.user ? <div class="info-0-1-1447">User</div> : null}
                {openCanvas.website ? (
                  <div class="info-0-1-1447">Website</div>
                ) : null}
              </div>

              {/* <div class="subHeader-0-1-1443">Login Devices</div>
              <div class="testsContainer-0-1-1457">
                <div class="container-0-1-1461">
                  <div class="left-0-1-1462">
                    <div class="deviceName-0-1-1465">
                      <img src="/diy/assets/mobile-d5f06a76..svg" alt="" />
                    </div>
                    <div class="middle-0-1-1467">
                      <div class="device-0-1-1466">Mobile-Android</div>
                      <div class="loginTime-0-1-1468">
                        Last Login : 3:15 pm, Mar 23
                      </div>
                    </div>
                  </div>
                  <div class="right-0-1-1463">
                    <button class="button-0-1-134 button-d195-0-1-1470 reportButton-0-1-1469 secondary-0-1-136 secondary-d197-0-1-1472  ">
                      Remove
                    </button>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          <div class="footerContainer-0-1-639">
            <Link
              userid="118146927"
              className="button-0-1-146 button-d35-0-1-724  primary-0-1-147 primary-d36-0-1-725"
              style={{ textDecoration: "none", color: "white" }}
              to={"/people/team-member-profile"}
              state={{ data: openCanvas }}
              // to={`/people/team-member-profile?${openCanvas}`}
            >
              View Full Profile
            </Link>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      {/* modal */}
      {showModal && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Team Member</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <label>Name:</label>
              <input
                type="text"
                className="form-control"
                value={updatedMember.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                className="form-control"
                value={updatedMember.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                className="form-control"
                value={updatedMember.password}
                onChange={(e) => handleChange("password", e.target.value)}
              />
            </div>
            <div>
              <label>Permissions:</label>
              <div>
                {Object.keys(updatedMember.permissions).map((permissionKey) => (
                  <div
                    key={permissionKey}
                    className="toggleContainer-0-1-177 toggleBar-0-1-171 col-md-4 me-2"
                  >
                    <div className="textSubText-0-1-183">
                      <div className="toggleHeading-0-1-178 undefined">
                        <div
                          className="permissionIconTextWrap-0-1-172"
                          style={{ fontSize: "15px" }}
                        >
                          <div className="textWrapper-0-1-176">
                            <span>
                              <div>
                                {permissionKey.charAt(0).toUpperCase() +
                                  permissionKey.slice(1)}
                              </div>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="medium-0-1-180">
                      <div className="ui fitted toggle checkbox undefined">
                        <input
                          type="checkbox"
                          checked={updatedMember.permissions[permissionKey]}
                          onChange={() => handlePermissionChange(permissionKey)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default TeamMember;
