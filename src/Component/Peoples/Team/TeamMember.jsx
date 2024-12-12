import React, { useEffect, useState } from "react";
import "../style/users.css";
import DataTable from "react-data-table-component";
import { Offcanvas } from "react-bootstrap";
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

function TeamMember() {
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
      margin: "auto",
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
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

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const teamRes = await getData(apiUrl.GET_ALL_TEAMMEMBER);
      setAllMembers(teamRes.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
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

  console.log("openCanvas", openCanvas);
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
          <div>{row.phoneNumber}</div>
        </>
      ),
      sortable: true,
    },
    {
      name: "Permissions",
      selector: (row) => (
        <div style={styles.root01698}>
          <div style={styles.iconCont0199}>
            <PiGlobeDuotone
              size={20}
              color={row.website ? "#34a32d" : "#E0E0E0"}
              title="Website"
            />
          </div>
          <div style={styles.iconCont0199}>
            <PiFlagBannerDuotone
              size={20}
              color={row.banner ? "#34a32d" : "#E0E0E0"}
              title="Banner"
            />
          </div>
          <div style={styles.iconCont0199}>
            <PiChatTeardropDotsDuotone
              size={20}
              color={row.chat ? "#34a32d" : "#E0E0E0"}
              title="Chat"
            />
          </div>
          <div style={styles.iconCont0199}>
            <BiSolidDiscount
              size={20}
              color={row.coupon ? "#34a32d" : "#E0E0E0"}
              title="Coupon"
            />
          </div>
          <div style={styles.iconCont0199}>
            <PiUserCircleDuotone
              size={20}
              color={row.user ? "#34a32d" : "#E0E0E0"}
              title="User"
            />
          </div>
          <div style={styles.iconCont0199}>
            <PiUsersThreeDuotone
              size={20}
              color={row.team ? "#34a32d" : "#E0E0E0"}
              title="Team"
            />
          </div>
          <div style={styles.iconCont0199}>
            <PiBookDuotone
              size={20}
              color={row.freeMaterial ? "#34a32d" : "#E0E0E0"}
              title="Free Study Material"
            />
          </div>
          <div style={styles.iconCont0199}>
            <PiSpeakerSimpleHighDuotone
              size={20}
              color={row.campaign ? "#34a32d" : "#E0E0E0"}
              title="Campaign"
            />
          </div>
          <div style={styles.iconCont0199}>
            <PiBookOpenDuotone
              size={20}
              color={row.course ? "#34a32d" : "#E0E0E0"}
              title="Course"
            />
          </div>
          {/* <div style={styles.iconCont0199}>
            <PiPathDuotone
              size={20}
              color={row.selfService ? "#34a32d" : "#E0E0E0"}
              title="Self Service"
            />
          </div> */}
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
            // onClick={() => handleOpeningCanvas(row)}
          >
            {/* <div style={{ cursor: "pointer" }} title="Edit">
              <FaRegPenToSquare size={16} color="#00ade7" />
            </div>
            <div>
              <RxSlash size={16} />
            </div> */}
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
    </div>
  );
}

export default TeamMember;
