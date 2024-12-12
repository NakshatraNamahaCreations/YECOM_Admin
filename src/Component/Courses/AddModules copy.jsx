import { Typography } from "@mui/material";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const steps = [
  "Choose Channel",
  "Set Audience",
  "Add Content",
  "Publish Campaign",
];

function AddModules() {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [videoFile, setVideoFile] = useState(null);
  const [documentRead, setDocumentRead] = useState(null);
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [zipFileRead, setZipFileRead] = useState(null);

  //  error message
  const [error, setError] = useState(null);
  const [videoError, setVideoError] = useState(null);

  // depends on state
  const [enableVideo, setEnableVideo] = useState(false);
  const [enableDocument, setEnableDocument] = useState(false);
  const [enableImage, setEnableImage] = useState(false);
  const [enableZip, setEnableZip] = useState(false);

  // opring  modal
  const [showAddContentModal, setShowAddContentModal] = useState(false);

  const handleOpenAddContentModal = () => setShowAddContentModal(true);
  const handleCloseAddContentModal = () => setShowAddContentModal(false);

  const styles = {
    courseInput: {
      width: "100%",
      border: "1px solid rgb(216, 224, 240)",
      borderRadius: "16px",
      fontSize: "16px",
      backgroundColor: "white",
      outline: "none",
      backgroundPosition: "10px 10px",
      backgroundRepeat: "no-repeat",
      padding: "12px 18px 11px 13px",
      lineHeight: "24px",
      // boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    },
    addModules: {
      width: "100%",
      border: "1px solid rgb(216, 224, 240)",
      borderRadius: "9px",
      fontSize: "16px",
      backgroundColor: "white",
      outline: "none",
      backgroundPosition: "10px 10px",
      backgroundRepeat: "no-repeat",
      padding: "10px",
      lineHeight: "24px",
      // boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
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
    thumbnailImgCont: {
      width: "200px",
      height: "150px",
    },
    selectField: {
      width: "100%",
      border: "1px solid rgb(216, 224, 240)",
      borderRadius: "16px",
      fontSize: "16px",
      backgroundColor: "white",
      outline: "none",
      backgroundPosition: "10px 10px",
      backgroundRepeat: "no-repeat",
      padding: "12px 18px 11px 13px",
      lineHeight: "24px",
      // boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    },
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type
      const fileType = file.type;
      if (!fileType.startsWith("image/")) {
        // Display an error message on the screen
        setError("Please upload a valid image file (PNG or JPEG).");
        return;
      }
      // Check file size
      const maxSize = 800 * 600; // 800px x 600px
      if (file.size > maxSize) {
        // Display an error message on the screen
        setError("Image size should be 800px x 600px or smaller.");
        return;
      }
      // Clear any previous errors
      setError(null);
      // Set thumbnail image
      setThumbnailImage(file);
    }
  };

  const handleDocumentUpload = (e) => {
    const file = e.target.files[0];

    setDocumentRead(file);
  };
  console.log("videoFile", videoFile, "thumbnailImage", thumbnailImage);

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type
      const fileType = file.type;
      if (!fileType.startsWith("video/")) {
        setVideoError(
          "Please upload a valid video file (mp4 or mkv or x-m4v)."
        );
        return;
      }
      // Clear any previous errors
      setVideoError(null);
      // Set video file
      setVideoFile(file);
    }
  };

  const handleZipUpload = (e) => {
    const file = e.target.files[0];

    setZipFileRead(file);
  };
  console.log("videoFile", videoFile, "thumbnailImage", thumbnailImage);

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <Typography>
              <div class="abountInfo-0-1-719">
                I want to send communication via
              </div>
            </Typography>
          </>
        );
      case 1:
        return (
          <>
            <Typography>
              <div class="abountInfo-0-1-719">
                I want to send communication via
              </div>
            </Typography>
          </>
        );
      case 2:
        return (
          <>
            <Typography>
              <div class="abountInfo-0-1-719">
                I want to send communication via
              </div>
            </Typography>
          </>
        );
      default:
        return null;
    }
  };
  return (
    <div>
      <div className="headerTitle-0-1-70">
        {/* course title */}
        GYANADDA UGC NET Paper 2 (Geography) Mock Test 2024
      </div>
      <div className="headerDesc-0-1-71">
        <div>Add / view content of your course</div>
      </div>
      <div className="addCourseMain-0-1-55 mt-3">
        <div className="p-4">
          <div className="row">
            <div className="col-md-8">
              <div className="mb-4">
                <label>
                  <b>Module Name</b>
                </label>
                <br />
                <input
                  className="mt-2"
                  type="text"
                  name="search"
                  placeholder="Enter module name"
                  style={styles.courseInput}
                />
              </div>
              <div className="mb-4">
                <label>
                  <b>Module Description</b>
                </label>
                <br />
                <textarea
                  className="mt-2 h-32"
                  type="text"
                  name="search"
                  placeholder="Enter module description here..."
                  style={styles.courseInput}
                />
              </div>
              <Button
                className="px-5 py-2"
                variant="outline-info"
                // onClick={() => window.location.assign("/courses/course-list")}
              >
                Add Module
              </Button>
              {/* <br /> */}

              {/* <div className="mb-4">
                <label>
                  <b>Add Thumbnail</b>
                </label>
                <br />

                <input
                  accept="image/gif,image/jpeg,image/jpeg,image/png,image/webp,image/vnd.wap.wbmp,image/svg+xml,image/tiff"
                  style={{ display: "none" }}
                  id="icon-button-file"
                  type="file"
                  onChange={(e) => handleThumbnailChange(e)}
                />
                <label
                  className="btn btn-outline-primary mt-2"
                  style={{ padding: "14px 18px", fontSize: "12px" }}
                  htmlFor="icon-button-file"
                >
                  <i class="fa-solid fa-upload"></i> Upload thumbnail Image
                </label>
                <br />

                {thumbnailImage && (
                  <div style={styles.thumbnailImgCont}>
                    <img
                      src={URL.createObjectURL(thumbnailImage)}
                      // alt={thumbnailImage.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        marginTop: "20px",
                      }}
                    />
                  </div>
                )}
                <br />
                <span style={styles.imgStateText}>
                  {error && <div style={{ color: "red" }}>{error}</div>}
                </span>
              </div> */}
              {/* <div className="mb-4">
            <label>
              <b>Add Thumbnail</b>
            </label>
            <br />
            <input
              accept="video/mp4,video/mkv,video/x-m4v"
              style={{ display: "none" }}
              id="video-file-input"
              type="file"
              onChange={(e) => handleVideoUpload(e)}
            />
            <label
              className="btn btn-outline-primary mt-2"
              style={{ padding: "14px 18px", fontSize: "12px" }}
              htmlFor="video-file-input"
            >
              Upload Video
            </label>
            {videoFile && (
              <div>
                <p>Selected Video: {videoFile.name}</p>
                <video controls style={{ maxWidth: "100%" }}>
                  <source
                    src={URL.createObjectURL(videoFile)}
                    type={videoFile.type}
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
            {videoError && <div style={{ color: "red" }}>{videoError}</div>}
          </div> */}
            </div>
            <div className="col-md-4">
              <div class="root-0-1-1416 flex0-0-1-1408">
                <p class="text1-0-1-1417 flex0-0-1-1408">Add content</p>
                <div class="addContentList-0-1-1418">
                  {/* <div class="tooltipWrapper-0-1-1200 undefined">
                    <button
                      type="button"
                      class="root-0-1-1471 addContentListItem-0-1-1419"
                    >
                      <div class="iconCont-0-1-1472 iconCont-d122-0-1-2577 flex0-0-1-1408 ">
                        <img
                          src="https://ali-cdn-cp-assets-public.classplus.co/cp-store-ui-revamp/Icons/folder_diy.svg"
                          alt=""
                        />
                      </div>
                      <span class="text-0-1-1473 text-d123-0-1-2578 flex1-0-1-1407 textTruncate-0-1-1406  ">
                        Folder{" "}
                      </span>
                    </button>
                  </div> */}
                  <div class="tooltipWrapper-0-1-1200 undefined">
                    <button
                      type="button"
                      class="root-0-1-1471 addContentListItem-0-1-1419"
                      onClick={() => {
                        handleOpenAddContentModal();
                        setEnableVideo(true);
                        setEnableDocument(false);
                        setEnableImage(false);
                        setEnableZip(false);
                      }}
                    >
                      <div class="iconCont-0-1-1472 iconCont-d124-0-1-2580 flex0-0-1-1408 ">
                        <img
                          src="https://ali-cdn-cp-assets-public.classplus.co/cp-store-ui-revamp/Icons/video-circle_diy.svg"
                          alt=""
                        />
                      </div>
                      <span class="text-0-1-1473 text-d125-0-1-2581 flex1-0-1-1407 textTruncate-0-1-1406  ">
                        Video{" "}
                      </span>
                    </button>
                  </div>
                  {/* <div class="tooltipWrapper-0-1-1200 undefined">
                    <button
                      type="button"
                      class="root-0-1-1471 addContentListItem-0-1-1419"
                    >
                      <div class="iconCont-0-1-1472 iconCont-d126-0-1-2583 flex0-0-1-1408 ">
                        <img
                          src="https://cdn-diy-public.classplus.co/assets/icons/subjective-test-icon.svg"
                          alt=""
                        />
                      </div>
                      <span class="text-0-1-1473 text-d127-0-1-2584 flex1-0-1-1407 textTruncate-0-1-1406  ">
                        Subjective Test{" "}
                      </span>
                    </button>
                  </div> */}
                  <div class="tooltipWrapper-0-1-1200 undefined">
                    <button
                      type="button"
                      class="root-0-1-1471 addContentListItem-0-1-1419"
                      onClick={() => {
                        handleOpenAddContentModal();
                        setEnableDocument(true);
                        setEnableVideo(false);
                        setEnableImage(false);
                        setEnableZip(false);
                      }}
                    >
                      <div class="iconCont-0-1-1472 iconCont-d128-0-1-2586 flex0-0-1-1408 ">
                        <img
                          src="https://ali-cdn-cp-assets-public.classplus.co/cp-store-ui-revamp/Icons/document_diy.svg"
                          alt=""
                        />
                      </div>
                      <span class="text-0-1-1473 text-d129-0-1-2587 flex1-0-1-1407 textTruncate-0-1-1406  ">
                        Document{" "}
                      </span>
                    </button>
                  </div>
                  <div class="tooltipWrapper-0-1-1200 undefined">
                    <button
                      type="button"
                      class="root-0-1-1471 addContentListItem-0-1-1419"
                      onClick={() => {
                        handleOpenAddContentModal();
                        setEnableVideo(false);
                        setEnableDocument(false);
                        setEnableImage(true);
                        setEnableZip(false);
                      }}
                    >
                      <div class="iconCont-0-1-1472 iconCont-d130-0-1-2589 flex0-0-1-1408 ">
                        <img
                          src="https://ali-cdn-cp-assets-public.classplus.co/cp-store-ui-revamp/Icons/image_diy.svg"
                          alt=""
                        />
                      </div>
                      <span class="text-0-1-1473 text-d131-0-1-2590 flex1-0-1-1407 textTruncate-0-1-1406  ">
                        Image{" "}
                      </span>
                    </button>
                  </div>
                  <div class="tooltipWrapper-0-1-1200 undefined">
                    <button
                      type="button"
                      class="root-0-1-1471 addContentListItem-0-1-1419"
                      onClick={() => {
                        handleOpenAddContentModal();
                        setEnableVideo(false);
                        setEnableDocument(false);
                        setEnableImage(false);
                        setEnableZip(true);
                      }}
                    >
                      <div class="iconCont-0-1-1472 iconCont-d132-0-1-2592 flex0-0-1-1408 ">
                        <img
                          src="https://ali-cdn-cp-assets-public.classplus.co/cp-store-ui-revamp/Icons/zip_diy.svg"
                          alt=""
                        />
                      </div>
                      <span class="text-0-1-1473 text-d133-0-1-2593 flex1-0-1-1407 textTruncate-0-1-1406  ">
                        Zip File{" "}
                      </span>
                    </button>
                  </div>
                  {/* <div class="tooltipWrapper-0-1-1200 undefined">
                    <button
                      type="button"
                      class="root-0-1-1471 addContentListItem-0-1-1419"
                    >
                      <div class="iconCont-0-1-1472 iconCont-d134-0-1-2595 flex0-0-1-1408 ">
                        <img
                          src="https://ali-cdn-cp-assets-public.classplus.co/cp-store-ui-revamp/Icons/import_diy.svg"
                          alt=""
                        />
                      </div>
                      <span class="text-0-1-1473 text-d135-0-1-2596 flex1-0-1-1407 textTruncate-0-1-1406  ">
                        Import Content{" "}
                      </span>
                    </button>
                  </div>
                  <div class="tooltipWrapper-0-1-1200 undefined">
                    <button
                      type="button"
                      class="root-0-1-1471 addContentListItem-0-1-1419"
                    >
                      <div class="iconCont-0-1-1472 iconCont-d136-0-1-2598 flex0-0-1-1408 ">
                        <img
                          src="https://ali-cdn-cp-assets-public.classplus.co/cp-store-ui-revamp/Icons/import_diy.svg"
                          alt=""
                        />
                      </div>
                      <span class="text-0-1-1473 text-d137-0-1-2599 flex1-0-1-1407 textTruncate-0-1-1406  ">
                        Import Live{" "}
                      </span>
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          {/* <div class="courseOverviewSection-0-1-1127"> */}
          {/* <div class="courseOverviewdata-0-1-1128">
              <div class="courseOverviewLabel-0-1-1130">Module Name</div>
              <div class="courseOverviewDesc-0-1-1131">
                Ecom Gyan Amazon FBA Mastery Course(HINDI) | 1 on 1 Mentorship
                INSTALLMENT PLAN
              </div>
            </div>
            <div class="linebreak-0-1-1126"></div>
            <div class="courseOverviewdata-0-1-1128">
              <div class="courseOverviewLabel-0-1-1130">Module Description</div>
              <div class="courseOverviewDesc-0-1-1131 description-0-1-1132">
                Amazon FBA Mastery Course Import &amp; Gst Guidance 1 on 1
                Mentorship 24/7 Customer Support
              </div>
            </div> */}
          <br />
          <table class="table mb-5">
            <thead>
              <tr>
                <th className="text-center" scope="col">
                  #
                </th>
                <th className="text-center" scope="col">
                  Module Name
                </th>
                <th className="text-center" scope="col">
                  Description
                </th>
                <th className="text-center" scope="col">
                  Video
                </th>
                <th className="text-center" scope="col">
                  Document
                </th>
                <th className="text-center" scope="col">
                  Image
                </th>
                <th className="text-center" scope="col">
                  Zip File
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 3 }).map((_, i) => (
                <tr>
                  <th
                    className="courseOverviewDesc-0-1-1131 text-center"
                    scope="row"
                  >
                    <div className="mt-4">Module {i + 1}</div>
                  </th>
                  <td className="courseOverviewDesc-0-1-1131 text-center moduleTable-Details">
                    <div className="mt-4">
                      {`Big Reason Behind Changing My Youtube Channel Name!!!`.substring(
                        0,
                        35
                      )}
                      ...
                    </div>
                  </td>
                  <td className="courseOverviewDesc-0-1-1131 text-center moduleTable-Details">
                    <div className="mt-4">
                      {`Big Reason Behind Changing My Youtube Channel Name!!!`.substring(
                        0,
                        35
                      )}
                      ...
                    </div>
                  </td>
                  <td className="courseOverviewDesc-0-1-1131 text-center ">
                    <video
                      controls
                      autoPlay
                      style={{ width: "150px", height: "115px" }}
                    >
                      <source
                        src="https://www.w3schools.com/tags/movie.mp4"
                        type="video/mp4"
                      />
                    </video>
                  </td>
                  <td className="courseOverviewDesc-0-1-1131 text-center">
                    <div className="mt-4">
                      <i
                        class="fa-regular fa-file-lines"
                        style={{ color: "#146ebe", fontSize: "40px" }}
                      ></i>
                    </div>
                  </td>
                  <td className="courseOverviewDesc-0-1-1131 text-center">
                    <img
                      src="https://images.pexels.com/photos/6758294/pexels-photo-6758294.jpeg"
                      alt=""
                      style={{ width: "150px", height: "115px" }}
                    />
                  </td>
                  <td className="courseOverviewDesc-0-1-1131 text-center">
                    <div className="mt-4">
                      <i
                        class="fa-regular fa-file-zipper"
                        style={{ color: "#146ebe", fontSize: "40px" }}
                      ></i>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* {Array.from({ length: 3 }).map((_, i) => (
                  <>
                    <div class="linebreak-0-1-1126"></div>
                    <div class="content-0-1-1436 flex1-0-1-1407 mt-3">
                      <div class="icon-0-1-1437 icon-d309-0-1-3419 flex0-0-1-1408">
                        <img
                          src="https://cdn-cp-assets-public.classplus.co/cams/image-coming-soon.jpg"
                          alt=""
                        />
                        <svg
                          width="28"
                          height="28"
                          viewBox="0 0 28 28"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          class="videoPlayIcon-0-1-1443"
                        >
                          <g filter="url(#filter0_d)">
                            <circle
                              cx="14"
                              cy="13"
                              r="10"
                              fill="black"
                              fill-opacity="0.24"
                            ></circle>
                            <circle
                              cx="14"
                              cy="13"
                              r="9.5"
                              stroke="white"
                            ></circle>
                          </g>
                          <path
                            d="M17.5226 13.1936L12.3663 16.7092C12.3267 16.7362 12.2805 16.75 12.2344 16.75C12.1969 16.75 12.1591 16.7411 12.1249 16.7228C12.048 16.6823 12 16.6026 12 16.5156V9.48435C12 9.3974 12.048 9.31771 12.1249 9.27716C12.2018 9.23638 12.2946 9.24201 12.3666 9.29076L17.5228 12.8064C17.5866 12.85 17.625 12.9224 17.625 13C17.625 13.0776 17.5866 13.15 17.5226 13.1936Z"
                            fill="white"
                          ></path>
                          <defs>
                            <filter
                              id="filter0_d"
                              x="0"
                              y="0"
                              width="28"
                              height="28"
                              filterUnits="userSpaceOnUse"
                              color-interpolation-filters="sRGB"
                            >
                              <feFlood
                                flood-opacity="0"
                                result="BackgroundImageFix"
                              ></feFlood>
                              <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                              ></feColorMatrix>
                              <feOffset dy="1"></feOffset>
                              <feGaussianBlur stdDeviation="2"></feGaussianBlur>
                              <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
                              ></feColorMatrix>
                              <feBlend
                                mode="normal"
                                in2="BackgroundImageFix"
                                result="effect1_dropShadow"
                              ></feBlend>
                              <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="effect1_dropShadow"
                                result="shape"
                              ></feBlend>
                            </filter>
                          </defs>
                        </svg>
                      </div>
                      <div class="rightContentCont-0-1-1438 rightContentCont-d310-0-1-3420 flex1-0-1-1407">
                        <p class="heading-0-1-1439 heading-d311-0-1-3421 textTruncate-0-1-1406">
                          Big Reason Behind Changing My Youtube Channel Name!!!
                        </p>
                        <p class="subHeading-0-1-1440 subHeading-d312-0-1-3422 textTruncate-0-1-1406">
                          Big Rason Behind Changing My Youtube Channel Name!!!
                        </p>
                      </div>
                    </div>
                  </>
                ))} */}
          {/* </div> */}
          <div className="footerNavContainer-0-1-444 footerNavContainer-d0-0-1-457">
            <Button
              className="px-5 py-2"
              variant="outline-info"
              onClick={() => window.location.assign("/courses/add")}
            >
              <i class="fa-solid fa-arrow-left-long"></i> &nbsp; Back
            </Button>
            <Button className="ms-2 px-5" variant="info">
              Publish
              {/* &nbsp; <i class="fa-solid fa-arrow-right-long"></i> */}
            </Button>
          </div>
        </div>
      </div>
      {/* Add Content modal opeing============================== */}
      <Modal
        show={showAddContentModal}
        onHide={handleCloseAddContentModal}
        animation={false}
        backdrop="static"
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {enableVideo
              ? "Add Video"
              : enableDocument
              ? "Add Document"
              : enableImage
              ? "Add Image"
              : enableZip
              ? "Add Zip File"
              : ""}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {enableVideo ? (
              <>
                <Button>Add +</Button>

                <div className="row mt-2">
                  {/* <div className="col-md-4">
                  <input
                    // accept="video/mp4,video/mkv,video/x-m4v,video/*"
                    accept="video/mp4,video/mkv,video/x-m4v"
                    style={{ display: "none" }}
                    id="video-file-input"
                    type="file"
                    onChange={(e) => handleVideoUpload(e)}
                  />
                  <label
                    className="btn btn-outline-primary mt-2"
                    style={{ padding: "8px 13px", fontSize: "15px" }}
                    htmlFor="video-file-input"
                  >
                    <i class="fa-solid fa-cloud-arrow-up"></i> Upload from your
                    pc
                  </label>
                  <br />
                  <br />
                  {videoFile && (
                    <div style={styles.thumbnailImgCont}>
                      <video controls style={{ maxWidth: "100%" }}>
                        <source
                          src={URL.createObjectURL(videoFile)}
                          type={videoFile.type}
                        />
                        Your browser does not support the video tag.
                      </video>
                      <span style={styles.imgStateText}>
                        {videoError && (
                          <div style={{ color: "red" }}>{error}</div>
                        )}
                      </span>
                    </div>
                  )}
                </div> */}

                  <div className="col-md-4">
                    <div>
                      <label>
                        <b>Video Name *</b>
                      </label>
                      <br />
                      <input
                        className="mt-2"
                        type="text"
                        name="Video Name"
                        placeholder="Video name"
                        style={styles.addModules}
                      />
                    </div>
                    <div>
                      <label>
                        <b>Video Link *</b>
                      </label>
                      <br />
                      <input
                        className="mt-2"
                        type="text"
                        name="Video Link"
                        placeholder="Video link"
                        style={styles.addModules}
                      />
                    </div>
                    <div>
                      <label>
                        <b>Description</b>
                      </label>
                      <br />
                      <textarea
                        className="mt-2 h-20"
                        type="text"
                        name="Description"
                        placeholder="Description here..."
                        style={styles.addModules}
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : enableDocument ? (
              <div className="row">
                <div className="col-md-4">
                  <input
                    accept="application/pdf"
                    style={{ display: "none" }}
                    id="pdf-file-input"
                    type="file"
                    onChange={(e) => handleDocumentUpload(e)}
                  />
                  <label
                    className="btn btn-primary mt-2"
                    style={{ padding: "8px 13px", fontSize: "15px" }}
                    htmlFor="pdf-file-input"
                  >
                    Select Document
                  </label>
                  <br />
                  <br />
                  {documentRead && (
                    <div>
                      <img
                        src="https://classplusapp.com/diy/assets/pdfListIcon-4737e94f..svg"
                        alt=""
                        style={{ width: "160px" }}
                      />
                    </div>
                  )}
                </div>
                <div className="col-md-8">
                  <div>
                    <label>
                      <b>Document Name *</b>
                    </label>
                    <br />
                    <input
                      className="mt-2"
                      type="text"
                      name="Document Name"
                      placeholder="Document name"
                      style={styles.addModules}
                    />
                  </div>
                  <div>
                    <label>
                      <b>Description</b>
                    </label>
                    <br />
                    <textarea
                      className="mt-2 h-20"
                      type="text"
                      name="Description"
                      placeholder="Description here..."
                      style={styles.addModules}
                    />
                  </div>
                </div>
              </div>
            ) : enableImage ? (
              <div className="row">
                <div className="col-md-4">
                  <input
                    accept="image/gif,image/jpeg,image/jpeg,image/png,image/webp,image/vnd.wap.wbmp,image/svg+xml,image/tiff"
                    style={{ display: "none" }}
                    id="image-file-input"
                    type="file"
                    onChange={(e) => handleImageUpload(e)}
                  />
                  <label
                    className="btn btn-primary mt-2"
                    style={{ padding: "8px 13px", fontSize: "15px" }}
                    htmlFor="image-file-input"
                  >
                    Select Image
                  </label>
                  <br />
                  <br />
                  {thumbnailImage && (
                    <div>
                      <img
                        src={URL.createObjectURL(thumbnailImage)}
                        alt=""
                        style={{ width: "160px" }}
                      />
                      <span style={styles.imgStateText}>
                        {error && <div style={{ color: "red" }}>{error}</div>}
                      </span>
                    </div>
                  )}
                </div>
                <div className="col-md-8">
                  <div>
                    <label>
                      <b>Image Name *</b>
                    </label>
                    <br />
                    <input
                      className="mt-2"
                      type="text"
                      name="Image Name"
                      placeholder="Image name"
                      style={styles.addModules}
                    />
                  </div>
                  <div>
                    <label>
                      <b>Description</b>
                    </label>
                    <br />
                    <textarea
                      className="mt-2 h-20"
                      type="text"
                      name="Description"
                      placeholder="Description here..."
                      style={styles.addModules}
                    />
                  </div>
                </div>
              </div>
            ) : enableZip ? (
              <div className="row">
                <div className="col-md-4">
                  <input
                    // accept="video/mp4,video/mkv,video/x-m4v,video/*"
                    accept=".zip,.rar,.7zip"
                    style={{ display: "none" }}
                    id="video-file-input"
                    type="file"
                    onChange={(e) => handleZipUpload(e)}
                  />
                  <label
                    className="btn btn-outline-primary mt-2"
                    style={{ padding: "8px 13px", fontSize: "15px" }}
                    htmlFor="video-file-input"
                  >
                    Choose files
                  </label>
                  <br />
                  <br />
                  {zipFileRead && (
                    <div style={styles.thumbnailImgCont}>
                      <img
                        src="https://ali-cdn-cp-assets-public.classplus.co/cp-store-ui-revamp/Icons/zip_diy.svg"
                        alt=""
                        style={{ width: "160px" }}
                      />
                    </div>
                  )}
                </div>
                <div className="col-md-8">
                  <div>
                    <label>
                      <b>Zip Name *</b>
                    </label>
                    <br />
                    <input
                      className="mt-2"
                      type="text"
                      name="Zip Name"
                      placeholder="Zip name"
                      style={styles.addModules}
                    />
                  </div>
                  <div>
                    <label>
                      <b>Description</b>
                    </label>
                    <br />
                    <textarea
                      className="mt-2 h-20"
                      type="text"
                      name="Description"
                      placeholder="Description here..."
                      style={styles.addModules}
                    />
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button>Done</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddModules;
