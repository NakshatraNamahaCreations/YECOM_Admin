import React, { useEffect, useState } from "react";
import "./style/adddocument.css";
import { Button, Offcanvas } from "react-bootstrap";
import { deleteData, getData } from "../../Api-Service/apiHelper";
import { apiUrl } from "../../Api-Service/apiConstants";
import YouTube from "react-youtube";
import axios from "axios";
import ReactPlayer from "react-player/youtube";

function AddVideo() {
  const styles = {
    uploadImage: {
      border: "1px dashed #25cff2",
    },
    insideBox: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#25cff2",
      cursor: "pointer",
    },

    bannerImageCont: {
      width: "200px",
      height: "150px",
    },
    imgStateText: {
      fontSize: "14px",
      fontStyle: "normal",
      fontFamily: "inherit",
      fontWeight: "600",
      lineHeight: "16px",
      paddingLeft: "11px",
      color: "rgb(239, 105, 30)",
    },
    selectField: {
      width: "100%",
      border: "1px solid rgb(216, 224, 240)",
      // borderRadius: "16px",
      fontSize: "16px",
      backgroundColor: "white",
      outline: "none",
      backgroundPosition: "10px 10px",
      backgroundRepeat: "no-repeat",
      padding: "12px 18px 11px 13px",
      lineHeight: "20px",
      // boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    },
  };
  const [show, setShow] = useState(false);
  const [allVideo, setAllVideo] = useState([]);
  const [Videotitle, setVideotitle] = useState("");
  const [videolink, setvideolink] = useState("");

  const handleSubmitChanges = (e) => {
    addvideo();
  };
  // console.log("selectedFiles", selectedFiles);

  const addvideo = async () => {
    try {
      let config = {
        url: apiUrl.ADD_FREEMATERIAL_VIDEO,
        method: "post",
        baseURL: apiUrl.BASEURL,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          youtubeLink: videolink,
          thumbnailTitle: Videotitle,
        },
      };
      let response = await axios(config);
      if (response.status === 200) {
        alert("added successfully");
        window.location.reload();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const videoRes = await getData(apiUrl.GET_FREEMATERIAL_VIDEO);

      setAllVideo(videoRes.data);
      // const webResponse = await getData(apiUrl.GET_WEB_BANNER);
      // setBannerData1(webResponse.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  console.log(allVideo, "allvideo");
  const handleDeleteVideo = async (id) => {
    try {
      const res = await deleteData(`${apiUrl.DELETE_FREEMATERIAL_VIDEO}${id}`);
      if (res) {
        alert("Deleted Sucessfull");
        window.location.reload();
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div class="bodyContainer-0-1-281">
      <div class="listContainer-0-1-295 mt-4">
        <div style={{ display: "flex", justifyContent: "start" }}>
          <Button
            className="px-5 py-2"
            variant="info"
            onClick={() => setShow(true)}
          >
            Add Video
          </Button>
          <Button
            className="px-5 py-2 ms-2"
            variant="outline-info"
            onClick={() =>
              window.location.assign("/free-material/add-document")
            }
          >
            Add Document
          </Button>
        </div>
        {/* <div class="heading-0-1-294">Contents</div> */}
        <div class="container-0-1-369 mt-3">
          {allVideo.length === 0 ? (
            <div className="mt-5">
              <div class="container-0-1-2782" id="foldersListID">
                <img
                  src="https://www.freeiconspng.com/uploads/training-icon-19.png"
                  alt="img"
                  style={{ mixBlendMode: "luminosity", width: "200px" }}
                />
                <div class="heading-0-1-2783">No Video's Added</div>
                {/* <div class="description-0-1-2784">
                Add course to be shown to students on your app
              </div> */}
                <div
                  style={{
                    visibility: "hidden",
                    height: "5px",
                    overflow: "hidden",
                  }}
                >
                  *
                </div>
              </div>
            </div>
          ) : (
            <>
              {allVideo.map((video, index) => (
                <div
                  class="root-0-1-372 root-d105-0-1-723 listItem-0-1-370"
                  key={index}
                >
                  <div class="content-0-1-373 flex1-0-1-385">
                    {/* <iframe
                      style={{
                        width: "80px",
                        height: "60px",
                      }}
                      // src={`https://www.youtube.com/embed/${video.youtubeLink
                      //   .split("/")
                      //   .pop()}`}
                      title="Big Reason Behind Changing My Youtube Channel Name!!!"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      aria-current
                      autoPlay
                    ></iframe> */}
                    <ReactPlayer
                      url={video.youtubeLink}
                      width={100}
                      height={100}
                      controls={true}
                      // onProgress={handleChange}
                      // playing={false}
                    />
                    <div class="rightContentCont-0-1-375 rightContentCont-d107-0-1-725 flex1-0-1-385">
                      <a
                        href={video.youtubeLink}
                        target="_blank"
                        style={{ textDecoration: "none" }}
                      >
                        <p class="heading-0-1-376 heading-d108-0-1-726 textTruncate-0-1-387">
                          {video.thumbnailTitle}
                        </p>
                      </a>
                      {/* <p class="subHeading-0-1-377 subHeading-d109-0-1-727">
                    Ronald C Matt
                  </p> */}
                    </div>
                    <div class="flex0-0-1-637 others-0-1-629 others-d5-0-1-645">
                      <div
                        style={{ cursor: "Pointer" }}
                        onClick={() => handleDeleteVideo(video._id)}
                      >
                        <img
                          src="https://classplusapp.com/diy/assets/trash-2-db8990c1..svg"
                          alt=""
                          class="iconImage-0-1-649"
                        />
                      </div>
                      {/* {isOpen === i && (
                    <div style={{ position: "relative" }}>
                      <div class="popupContainer-0-1-647" ref={popupRef}>
                        <div class="listItemContainer-0-1-648">
                          <img
                            src="https://classplusapp.com/diy/assets/editIcon2-ff45bcab..svg"
                            alt=""
                            class="iconImage-0-1-649"
                          />
                          <div>Rename</div>
                        </div>
                        <div class="listItemContainer-0-1-648">
                          <img
                            src="https://classplusapp.com/diy/assets/trash-2-db8990c1..svg"
                            alt=""
                            class="iconImage-0-1-649"
                          />
                          <div>Delete</div>
                        </div>
                      </div>
                    </div>
                  )} */}
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        <div className="footerNavContainer-0-1-444 footerNavContainer-d0-0-1-457">
          <Button
            className="px-5 py-2"
            variant="outline-info"
            onClick={() => window.location.assign("/content/free-material")}
          >
            <i class="fa-solid fa-arrow-left-long"></i> &nbsp; Back
          </Button>
        </div>
      </div>
      {/* <form class="blankStyle">
        <input
          class="blankStyle"
          type="file"
          multiple=""
          accept=".doc,.docx,application/pdf,.png,.jpg,.xls,.xlsx,.csv"
        />
        <input class="blankStyle" type="reset" multiple="" />
      </form> */}
      <Offcanvas show={show} onHide={() => setShow(false)} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Add Video</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            {/* <div className="d-flex p-2" style={styles.insideBox}> */}
            <label>
              <b>Thumbnail Title</b>
            </label>
            <br />
            <input
              class="mt-2 input-0-1-685 input-d15-0-1-1047 uploadText-0-1-649 uploadText-d63-0-1-1036"
              type="text"
              placeholder="Enter thumbnail title"
              onChange={(e) => setVideotitle(e.target.value)}
            />
            <br /> <br />
            <label>
              <b>Video Url Link</b>
            </label>
            <br />
            <input
              class="mt-2 input-0-1-685 input-d15-0-1-1047 uploadText-0-1-649 uploadText-d63-0-1-1036"
              type="text"
              placeholder="Enter or Paste Video Link"
              onChange={(e) => setvideolink(e.target.value)}
            />
            {/* </div> */}
          </div>
          {/* {selectedFiles.length > 0 && (
            <>
              {selectedFiles.map((file, index) => (
                <div className="uploadItem-0-1-648" key={index}>
                  {file.type === "application/pdf" ? (
                    <svg
                      width="80"
                      height="60"
                      viewBox="0 0 80 60"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon-0-1-374 icon-d106-0-1-724 flex0-0-1-386"
                    >
                      <rect width="80" height="60" rx="4" fill="#F2FBFE"></rect>
                      <path
                        d="M43.1429 13H29.4286C28.5193 13 27.6472 13.3612 27.0042 14.0042C26.3612 14.6472 26 15.5193 26 16.4286V43.8571C26 44.7665 26.3612 45.6385 27.0042 46.2815C27.6472 46.9245 28.5193 47.2857 29.4286 47.2857H50C50.9093 47.2857 51.7814 46.9245 52.4244 46.2815C53.0673 45.6385 53.4286 44.7665 53.4286 43.8571V23.2857L43.1429 13Z"
                        fill="#EB5757"
                        stroke="#FF8888"
                        stroke-width="1.71429"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                      <path
                        d="M43.1426 13V23.2857H53.4283"
                        fill="#FF8888"
                      ></path>
                      <path
                        d="M43.1426 13V23.2857H53.4283"
                        stroke="#FF8888"
                        stroke-width="1.71429"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                      <path
                        d="M32.4336 35.0445V29.8125H34.9022C35.4142 29.8125 35.8165 29.9405 36.109 30.1965C36.4062 30.4479 36.5547 30.8456 36.5547 31.3896C36.5547 31.7279 36.4839 32.0205 36.3422 32.2674C36.205 32.5142 36.0107 32.7039 35.7593 32.8365C35.5079 32.9645 35.2222 33.0285 34.9022 33.0285H33.661V35.0445H32.4336ZM34.7307 31.9656C35.1376 31.9656 35.341 31.7874 35.341 31.4308C35.341 31.2616 35.2885 31.1336 35.1833 31.0468C35.0827 30.9554 34.9319 30.9096 34.7307 30.9096H33.661V31.9656H34.7307Z"
                        fill="white"
                      ></path>
                      <path
                        d="M37.1144 35.0445V29.8125H38.6984C39.5898 29.8125 40.2733 30.0365 40.7487 30.4845C41.2241 30.9325 41.4618 31.5771 41.4618 32.4182C41.4618 33.2639 41.2241 33.9131 40.7487 34.3656C40.2733 34.8182 39.5898 35.0445 38.6984 35.0445H37.1144ZM38.6847 33.9474C39.1967 33.9474 39.583 33.8239 39.8435 33.5771C40.1041 33.3256 40.2344 32.9394 40.2344 32.4182C40.2344 31.9291 40.0973 31.5565 39.823 31.3005C39.5487 31.0399 39.1693 30.9096 38.6847 30.9096H38.3418V33.9474H38.6847Z"
                        fill="white"
                      ></path>
                      <path
                        d="M43.3173 35.0445H42.0898V29.8125H45.6624V30.9096H43.3173V31.8834H45.4361V32.9736H43.3173V35.0445Z"
                        fill="white"
                      ></path>
                    </svg>
                  ) : (
                    <img
                      style={{ width: "15%" }}
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                    />
                  )}
                  <input
                    class="ms-3 input-0-1-685 input-d15-0-1-1047 uploadText-0-1-649 uploadText-d63-0-1-1036"
                    type="text"
                    readOnly
                    value={file.name}
                  />
                </div>
              ))}
            </>
          )} */}

          {/* {selectedFiles.length > 0 && (
            <div class="uploadItem-0-1-648">
              {selectedFiles.type === "application/pdf" ? (
                <img
                  src="https://classplusapp.com/diy/assets/addFolderIcon-f1025cc7..svg"
                  alt="icon"
                  class="uploadImg-0-1-650"
                />
              ) : (
                <img src={selectedFiles.name} alt={selectedFiles.name} />
              )}
              <div class="input-0-1-685 input-d9-0-1-1010 uploadText-0-1-649 uploadText-d39-0-1-996">
                {selectedFiles.name}
              </div>
            </div>
          )} */}
          {/* {selectedFiles.length > 0 && (
            <div style={styles.bannerImageCont}>
              <img
                src={selectedFiles.name}
                alt={selectedFiles.name}
                style={{ width: "100%", height: "100%", marginTop: "20px" }}
              />
            </div>
          )} */}
          <div className="text-center mt-3">
            <Button variant="info" onClick={handleSubmitChanges}>
              Upload
            </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default AddVideo;
