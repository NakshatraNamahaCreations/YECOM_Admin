import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import "../style/userprofile.css";
import { getData } from "../../../Api-Service/apiHelper";
import { apiUrl } from "../../../Api-Service/apiConstants";
import ReactPlayer from "react-player/youtube";
// import { usersData } from "../../../Global-data/JsonData";
// import  API from "@aws-amplify/api

function UserProfile() {
  const location = useLocation();
  const queryString = location.search.substring(1); // Remove the leading '?'
  console.log("location", queryString);
  const [showCourses, setShowCourses] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userRes = await getData(
        `${apiUrl.GET_PARTICULAR_USER}${queryString}`
      );
      console.log("userRes", userRes);
      setUsersData(userRes.data);
      console.log("userRes", userRes);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  console.log("usersData", usersData);

  // const fetchingUserProfile = usersData?.find((e) => e._id === queryString);

  const regex = /\b\w/g;
  const matches = usersData.name?.match(regex);
  if (matches) {
    const initials = matches.join("").toUpperCase();
    console.log(initials);
  } else {
    console.log("No matches found.");
  }

  const styles = {
    userProfilePic: {
      width: "244px",
      height: "244px",
      borderRadius: "12px",
      marginRight: "12px",
    },
  };

  // useEffect(() => {
  //   const { watchDuration, totalDuration } = usersData?.videoDetails;
  //   const progressPercentage =
  //     (parseFloat(watchDuration) / parseFloat(totalDuration)) * 100;
  //   setProgress(progressPercentage);
  // }, [usersData?.videoDetails]);
  const [watchedSeconds, setWatchedSeconds] = useState([]);

  useEffect(() => {
    if (
      usersData &&
      usersData.videoDetails &&
      usersData.videoDetails.length > 0
    ) {
      const secondsArray = usersData.videoDetails.map((vid) => {
        return parseFloat(vid.watchDuration);
      });
      setWatchedSeconds(secondsArray);
    }
  }, [usersData]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleChange = () => {
    const { watchDuration, totalDuration } = usersData.videoDetails;
    const watched = parseFloat(watchDuration);
    const total = parseFloat(totalDuration);
    const percentage = (watched / total) * 100;
    setProgress(percentage);
  };
  // console.log("watchedPercentage", watchedPercentage);
  return (
    <div>
      <div className="d-flex justify-between" style={{flexDirection:"row",justifyContent:"space-between"}} >
        <div className="headerTitle-0-1-70">{usersData?.name}</div>
        {showCourses ? (
          <div className="mt-2">
            <Button
              className="ms-2 px-5"
              variant="info"
              onClick={() => setShowCourses(false)}
            >
              <i className="fa-solid fa-arrow-left-long"></i> &nbsp;Basic
              Details
            </Button>
          </div>
        ) : (
          ""
        )}
      </div>
      {!showCourses ? (
        <div
          className="contentContainer-0-1-1108 mt-3"
          style={{ marginBottom: "6rem" }}
        >
          <div className="contentRight-0-1-1109">
            <div className="infoContainer-0-1-1116">
              <div className="items-0-1-1119">
                <div className="itemContainer-0-1-1110">
                  <div className="itemLabel-0-1-1111">Name</div>
                  <div className="itemValue-0-1-1112">{usersData?.name}</div>
                </div>
                <div className="divider-0-1-1113"></div>{" "}
                <div className="itemContainer-0-1-1110">
                  <div className="itemLabel-0-1-1111">Mobile Number</div>
                  <div className="itemValue-0-1-1112">
                    {usersData?.phoneNumber}
                  </div>
                </div>
                <div className="divider-0-1-1113"></div>{" "}
                <div className="itemContainer-0-1-1110">
                  <div className="itemLabel-0-1-1111">Email</div>
                  <div className="itemValue-0-1-1112">{usersData?.email}</div>
                </div>
                <div className="divider-0-1-1113"></div>
              </div>
              <div className="profilePic-0-1-1117">
                <div className="profileImageContainer-0-1-1127">
                  {/* <img
                    src={`${apiUrl.IMAGEURL}/user/${usersData.profilePicture}`}
                    alt=""
                    style={styles.userProfilePic}
                  /> */}
                  <div className="studentInitials-0-1-1128">{matches} </div>
                </div>
              </div>
            </div>
          </div>
          <div className="contentLeft-0-1-1120">
            <div
              className="container-0-1-1131"
              onClick={(e) => setShowCourses(true)}
            >
              <div className="icon-0-1-1133">
                <img
                  className="iconImage-0-1-1132"
                  src="https://ali-cdn-cp-assets-public.classplus.co/CampaignManager/1548f055a16d393a45816fe8d097b6c3"
                />
              </div>
              <div className="labels-0-1-1136">
                <div className="header-0-1-1134">Courses</div>
                <div className="subtext-0-1-1135">
                  {" "}
                  {usersData.courseDetails?.length} Courses
                </div>
              </div>
            </div>
            {/* <div className="container-0-1-1137">
            <div className="icon-0-1-1139">
              <img
                className="iconImage-0-1-1138"
                src="https://ali-cdn-cp-assets-public.classplus.co/CampaignManager/dd647cf2644c399ab57b6e916b5b33cc"
              />
            </div>
            <div className="labels-0-1-1142">
              <div className="header-0-1-1140">Performance</div>
              <div className="subtext-0-1-1141">0 Tests</div>
            </div>
          </div>
          <div className="container-0-1-1143">
            <div className="icon-0-1-1145">
              <img
                className="iconImage-0-1-1144"
                src="https://storage.googleapis.com/prod-diy-public/assets/icons/tabIcons/svg/assignment.svg"
              />
            </div>
            <div className="labels-0-1-1148" />
            <div className="header-0-1-1146">Assignment</div>
            <div className="subtext-0-1-1147">0 Assignments</div>
          </div> */}
          </div>
        </div>
      ) : (
        <div className="row showcourse-0-1-1109 mt-3">
          {usersData &&
            usersData.videoDetails &&
            usersData.videoDetails.map((vid, index) => {
              {
                /* const videoId = vid.videoLink.split("v=")[1];
              const embedUrl = `https://www.youtube.com/embed/${videoId}`;
              console.log("embedUrl: ", embedUrl); */
              }
              return (
                <div className="col-md-4 mb-3" key={index}>
                  <div>
                    {/* <iframe
                      width="266px"
                      height="183px"
                      style={{
                        borderTopLeftRadius: "16px",
                        borderTopRightRadius: "16px",
                      }}
                      src={embedUrl}
                      title={vid.videoName}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe> */}
                    <ReactPlayer
                      url={vid.videoLink}
                      width={266}
                      height={183}
                      // controls={false}
                      onProgress={handleChange}
                      // playing={false}
                    />
                    <div style={{ width: "266px", marginTop: "20px" }}>
                      <div
                        style={{
                          position: "relative",
                          width: "100%",
                          height: "20px",
                          backgroundColor: "#f0f0f0",
                          borderRadius: "5px",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            height: "100%",
                            width: `${
                              (watchedSeconds[index] /
                                parseFloat(vid.totalDuration)) *
                              100
                            }%`,
                            backgroundColor: "#007bff",
                            borderRadius: "5px",
                          }}
                        ></div>
                        <span
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            color: "black",
                            fontSize: "13px",
                          }}
                        >
                          {`${formatTime(watchedSeconds[index])} / ${formatTime(
                            parseFloat(vid.totalDuration)
                          )}`}
                        </span>
                      </div>
                    </div>
                    <div className="courseName-0-1-1713">{vid.videoName}</div>
                  </div>
                </div>
              );
            })}
          {/* {usersData.videoDetails.map((vid, index) => {
            return (
              <div className="col-md-4 mb-3" key={index}>
                <div>
                  <ReactPlayer
                    url={vid.videoLink}
                    width={266}
                    height={183}
                    controls={false}
                    progress={progress}
                    onProgress={handleChange}
                  />
                  <div style={{ width: "266px", marginTop: "20px" }}>
                    {usersData &&
                      usersData.videoDetails &&
                      usersData.videoDetails.length > 0 && (
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            height: "20px",
                            backgroundColor: "#f0f0f0",
                            borderRadius: "5px",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              height: "100%",
                              width: `${watchedPercentage}%`,
                              backgroundColor: "#007bff",
                              borderRadius: "5px",
                            }}
                          ></div>
                          <span
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              color: "black",
                              fontSize: "13px",
                            }}
                          >
                            {`${Math.round(watchedPercentage)}% watched`}
                          </span>
                        </div>
                      )}
                  </div>
                  <div className="courseName-0-1-1713">{vid.videoName}</div>
                </div>
              </div>
            );
          })} */}
        </div>
      )}
      <div className="footerNavContainer-0-1-444 footerNavContainer-d0-0-1-457">
        <Button
          className="px-5 py-2"
          variant="outline-info"
          onClick={() => window.location.assign("/people/users")}
        >
          <i className="fa-solid fa-arrow-left-long"></i> &nbsp; Back
        </Button>{" "}
        {/* <Button className="ms-2 px-5" variant="info">
            Save
          </Button> */}
      </div>
    </div>
  );
}

export default UserProfile;
