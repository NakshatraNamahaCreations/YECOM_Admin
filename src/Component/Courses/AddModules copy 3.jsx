import { Box, Step, StepLabel, Stepper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { getData, postData, postFormData } from "../../Api-Service/apiHelper";
import { apiUrl } from "../../Api-Service/apiConstants";

const steps = ["Create Modules", "Add Content"];

function AddModules() {
  const { objectId, couserTitle } = useParams();
  // console.log("objectId", objectId, couserTitle);
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailImage, setThumbnailImage] = useState(null);

  const [allModules, setAllModules] = useState([]);
  const [allVideos, setAllVideos] = useState([]);
  const [allDocs, setAllDocs] = useState([]);
  const [allImage, setAllImages] = useState([]);
  const [allZip, setAllZip] = useState([]);

  // setting state
  const [moduleId, setModuleId] = useState("");
  const [moduleName, setModuleName] = useState("");
  // video
  const [videoName, setVideoName] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [videoDesc, setVideoDesc] = useState("");
  // Document
  const [documentName, setDocumentName] = useState("");
  const [documentRead, setDocumentRead] = useState(null);
  const [documentDesc, setDocumentDesc] = useState("");
  // image
  const [imageName, setImageName] = useState("");
  const [imageDescr, setImageDescr] = useState("");
  const [imageRead, setImageRead] = useState(null);
  // zip
  const [zipName, setZipName] = useState("");
  const [zipFileRead, setZipFileRead] = useState(null);
  const [zipDescr, setZipDescr] = useState("");
  const [moduleItems, setModuleItems] = useState([
    {
      moduleId: "",
      moduleTitle: "",
      description: "",
    },
  ]);
  const handleAddModule = () => {
    let newItemList = moduleItems;
    setModuleItems((prevModules) => [...prevModules, newItemList]);
  };

  const handleModuleChange = (index, key, value) => {
    setModuleItems((prevModules) => {
      const updatedModules = [...prevModules];
      updatedModules[index][key] = value;
      return updatedModules;
    });
  };

  //  error message
  const [error, setError] = useState(null);
  const [videoError, setVideoError] = useState(null);
  const [moduleErrMsg, setModuleErrMsg] = useState(null);

  // depends on state
  const [enableVideo, setEnableVideo] = useState(false);
  const [enableDocument, setEnableDocument] = useState(false);
  const [enableImage, setEnableImage] = useState(false);
  const [enableZip, setEnableZip] = useState(false);

  // opring  modal
  const [showAddContentModal, setShowAddContentModal] = useState(false);

  const handleOpenAddContentModal = () => setShowAddContentModal(true);
  const handleCloseAddContentModal = () => setShowAddContentModal(false);

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
  // console.log("videoFile", videoFile, "thumbnailImage", thumbnailImage);

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

  const handleImageUploadModule = (e) => {
    const file = e.target.files[0];

    setImageRead(file);
  };

  const handleZipUpload = (e) => {
    const file = e.target.files[0];

    setZipFileRead(file);
  };
  // console.log("videoFile", videoFile, "thumbnailImage", thumbnailImage);

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    if (activeStep === 0) {
      addModules();
    }

    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
    if (activeStep === 1) {
      publishCourse();
    }
  };

  const handleBack = () => {
    setModuleErrMsg(null);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    // setActiveStep(0);
    window.location.assign("/courses/course-list");
  };

  const handleModuleSelection = (e) => {
    const findModule = allModules.find((ele) => ele._id === e.target.value);
    setModuleName(findModule.moduleTitle);
    setModuleId(findModule._id);
  };

  const addModules = async () => {
    if (!moduleItems || moduleItems.length === 0) {
      alert("Please add at least one module item.");
    } else {
      try {
        const data = {
          moduleItems: moduleItems.map((item) => ({
            courseName: couserTitle,
            courseId: objectId,
            moduleTitle: item.moduleTitle,
            description: item.description,
          })),
        };
        // Move the alert inside the try block after postData
        await postData(apiUrl.ADD_MODULES, data);
        alert("Added");
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const addVideos = async (e) => {
    e.preventDefault();
    if (!videoName || !videoLink) {
      alert("Please fill the fields");
    } else {
      try {
        const data = {
          courseId: objectId,
          moduleId: moduleId,
          moduleName: moduleName,
          name: videoName,
          videoLink: videoLink,
          description: videoDesc,
        };
        const res = await postData(apiUrl.ADD_VIDEO_MODULES, data);
        if (res) {
          // setVideoName("");
          // setVideoLink("");
          // setVideoDesc("");
          alert("Added");
          setShowAddContentModal(false);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const addDocuments = async (e) => {
    e.preventDefault();
    if (!documentName || !documentRead) {
      alert("Please fill the fields");
    } else {
      try {
        const formData = new FormData();
        formData.append("courseId", objectId);
        formData.append("moduleId", moduleId);
        formData.append("moduleName", moduleName);
        formData.append("name", documentName);
        formData.append("document", documentRead);
        formData.append("description", documentDesc);
        const res = await postFormData(apiUrl.ADD_DOCUMENT_MODULES, formData);
        if (res) {
          alert("Added");
          setShowAddContentModal(false);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const addImage = async (e) => {
    e.preventDefault();
    if (!imageName || !imageRead) {
      alert("Please fill the fields");
    } else {
      try {
        const formData = new FormData();
        formData.append("courseId", objectId);
        formData.append("moduleId", moduleId);
        formData.append("moduleName", moduleName);
        formData.append("name", imageName);
        formData.append("image", imageRead);
        formData.append("description", imageDescr);
        const res = await postFormData(apiUrl.ADD_IMAGE_MODULES, formData);
        if (res) {
          alert("Added");
          setShowAddContentModal(false);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  const addZip = async (e) => {
    e.preventDefault();
    if (!zipName || !zipFileRead) {
      alert("Please fill the fields");
    } else {
      try {
        const formData = new FormData();
        formData.append("courseId", objectId);
        formData.append("moduleId", moduleId);
        formData.append("moduleName", moduleName);
        formData.append("name", zipName);
        formData.append("zip", zipFileRead);
        formData.append("description", zipDescr);
        const res = await postFormData(apiUrl.ADD_ZIP_MODULES, formData);
        if (res) {
          alert("Added");
          setShowAddContentModal(false);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const [videosFilteredByModuleId, setVideosFilteredByModuleId] = useState([]);
  const [docsFilteredByModuleId, setDocsFilteredByModuleId] = useState([]);
  const [imageFilteredByModuleId, setImageFilteredByModuleId] = useState([]);
  const [zipFilteredByModuleId, setZipFilteredByModuleId] = useState([]);

  useEffect(() => {
    fetchData();
  }, [
    allModules,
    allVideos,
    allDocs,
    allImage,
    allZip,
    // videosFilteredByModuleId,
    // docsFilteredByModuleId,
    // imageFilteredByModuleId,
    // zipFilteredByModuleId,
  ]);

  // useEffect(() => {
  //   console.log("videosFilteredByModuleId", videosFilteredByModuleId);
  // }, [videosFilteredByModuleId]);

  // const fetchModuleDATA = async () => {
  //   try {
  //     const moduleRes = await getData(`${apiUrl.GET_MODULES_BY_COURSE_ID}${objectId}`);
  //     setAllModules(moduleRes.data);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };
  const fetchData = async () => {
    try {
      const moduleRes = await getData(
        `${apiUrl.GET_MODULES_BY_COURSE_ID}${objectId}`
      );
      console.log("moduleRes.data", moduleRes.data);
      setAllModules(moduleRes.data);
      console.log("moduleRes.data", moduleRes.data);

      // video res
      const videoRes = await getData(`${apiUrl.GET_ALL_VIDEO}`);
      setAllVideos(videoRes.data);
      console.log("videoRes.data", videoRes.data);

      // docs res
      const docsRes = await getData(`${apiUrl.GET_ALL_DOCUMENT}`);
      setAllDocs(docsRes.data);
      console.log("docsRes.data", docsRes.data);

      // image res
      const imageRes = await getData(`${apiUrl.GET_ALL_IMAGE}`);
      setAllImages(imageRes.data);
      console.log("imageRes.data", imageRes.data);

      // zip res
      const zipRes = await getData(`${apiUrl.GET_ALL_ZIP}`);
      setAllZip(zipRes.data);
      console.log("zipRes.data", zipRes.data);

      const allModulesIds = moduleRes.data.map((module) => module._id);
      // video
      const videosFiltered = allVideos.filter((video) =>
        allModulesIds.includes(video.moduleId)
      );
      setVideosFilteredByModuleId(videosFiltered);
      // doc
      const docsFiltered = allDocs.filter((video) =>
        allModulesIds.includes(video.moduleId)
      );
      setDocsFilteredByModuleId(docsFiltered);
      // image
      const imageFiltered = allImage.filter((video) =>
        allModulesIds.includes(video.moduleId)
      );
      setImageFilteredByModuleId(imageFiltered);

      // zip
      const zipFiltered = allZip.filter((video) =>
        allModulesIds.includes(video.moduleId)
      );
      setZipFilteredByModuleId(zipFiltered);
      console.log("videosFilteredByModuleId", videosFilteredByModuleId);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // console.log("allVideos", allVideos);

  // useEffect(() => {
  //   // Filtering logic should be placed here
  //   if (allVideos.length > 0 && allModules.length > 0) {
  //     const allModulesIds = allModules.map((module) => module._id);

  //     // video
  //     const videosFiltered = allVideos.filter((video) =>
  //       allModulesIds.includes(video.moduleId)
  //     );
  //     setVideosFilteredByModuleId(videosFiltered);

  //     // doc
  //     const docsFiltered = allDocs.filter((video) =>
  //       allModulesIds.includes(video.moduleId)
  //     );
  //     setDocsFilteredByModuleId(docsFiltered);

  //     // image
  //     const imageFiltered = allImage.filter((video) =>
  //       allModulesIds.includes(video.moduleId)
  //     );
  //     setImageFilteredByModuleId(imageFiltered);

  //     // zip
  //     const zipFiltered = allZip.filter((video) =>
  //       allModulesIds.includes(video.moduleId)
  //     );
  //     setZipFilteredByModuleId(zipFiltered);
  //   }
  // }, [allVideos, allDocs, allImage, allZip, allModules]);

  const publishCourse = async () => {
    alert("Course Publisged");
  };
  // const fetchData = async () => {
  //   try {
  //     const moduleRes = await getData(`${apiUrl.GET_MODULES_BY_COURSE_ID}${objectId}`);
  //     setAllModules(moduleRes.data);

  //     const videosPromises = allModules.map(async (module) => {
  //       const videoRes = await getData(
  //         `${apiUrl.GET_VIDEO_BY_MODULE_ID}${module._id}`
  //       );
  //       return videoRes.data;
  //     });

  //     // Wait for all API calls to finish
  //     const videosData = await Promise.all(videosPromises);

  //     // Flatten the array of arrays to get a single array of videos
  //     const allVideos = videosData.flat();
  //     // const videosPromises = await getData(apiUrl.GET_ALL_VIDEO);
  //     setAllVideos(videosPromises);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  // correct
  // const fetchData = async () => {
  //   try {
  //     const moduleRes = await getData(`${apiUrl.GET_MODULES_BY_COURSE_ID}${objectId}`);
  //     setAllModules(moduleRes.data);
  //     if (allModules.length === 0) {
  //       console.log("No modules available");
  //       return;
  //     }

  //     const videosPromises = allModules.map(async (module) => {
  //       const videoRes = await getData(
  //         `${apiUrl.GET_VIDEO_BY_MODULE_ID}${module._id}`
  //       );
  //       return videoRes.data;
  //     });
  //     const videosData = await Promise.all(videosPromises);
  //     const allVideos = videosData.flat();
  //     setAllVideos(allVideos);

  //     const documentPromises = allModules.map(async (module) => {
  //       const videoRes = await getData(
  //         `${apiUrl.GET_ALL_BY_DOCUMENT}${module._id}`
  //       );
  //       return videoRes.data;
  //     });
  //     const docData = await Promise.all(documentPromises);
  //     const allDoc = docData.flat();
  //     setAllDocs(allDoc);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <Typography>
              <div className="mt-2 row">
                <div className="col-md-3">
                  <div className="root-0-1-1416 flex0-0-1-1408 mt-3">
                    <p className="text1-0-1-1417 flex0-0-1-1408">Add content</p>
                    <div className="addContentList-0-1-1418">
                      <div className="tooltipWrapper-0-1-1200 undefined">
                        <button
                          type="button"
                          className="root-0-1-1471 addContentListItem-0-1-1419"
                          onClick={() => {
                            handleOpenAddContentModal();
                            setEnableVideo(true);
                            setEnableDocument(false);
                            setEnableImage(false);
                            setEnableZip(false);
                          }}
                        >
                          <div className="iconCont-0-1-1472 iconCont-d124-0-1-2580 flex0-0-1-1408 ">
                            <img
                              src="https://ali-cdn-cp-assets-public.classplus.co/cp-store-ui-revamp/Icons/video-circle_diy.svg"
                              alt=""
                            />
                          </div>
                          <span className="text-0-1-1473 text-d125-0-1-2581 flex1-0-1-1407 textTruncate-0-1-1406  ">
                            Video{" "}
                          </span>
                        </button>
                      </div>
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
                    </div>
                  </div>
                </div>
                <div className="col-md-9">
                  <table class="table mb-5">
                    <thead>
                      <tr>
                        <th className="text-center" scope="col">
                          #
                        </th>
                        <th className="text-center" scope="col">
                          Module Name
                        </th>
                        {/* <th className="text-center" scope="col">
                      Description
                    </th> */}
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
                        <th className="text-center" scope="col">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {Array.from({ length: 3 }).map((_, i) => ( */}
                      {allModules.map((module, index) => (
                        <tr key={index}>
                          <th
                            className="courseOverviewDesc-0-1-1131 text-center"
                            scope="row"
                          >
                            <div className="mt-4">Module {index + 1}</div>
                          </th>
                          <td className="courseOverviewDesc-0-1-1131 text-center moduleTable-Details">
                            <div className="mt-4">
                              {module?.moduleTitle?.substring(0, 35)}
                            </div>
                          </td>
                          <td className="courseOverviewDesc-0-1-1131 text-center ">
                            <div className="mt-4">
                              {
                                videosFilteredByModuleId.filter(
                                  (video) => video.moduleId === module._id
                                ).length
                              }
                            </div>
                          </td>
                          <td className="courseOverviewDesc-0-1-1131 text-center">
                            <div className="mt-4">
                              {
                                docsFilteredByModuleId.filter(
                                  (docs) => docs.moduleId === module._id
                                ).length
                              }
                            </div>
                          </td>
                          <td className="courseOverviewDesc-0-1-1131 text-center">
                            <div className="mt-4">
                              {
                                imageFilteredByModuleId.filter(
                                  (img) => img.moduleId === module._id
                                ).length
                              }
                            </div>
                          </td>
                          <td className="courseOverviewDesc-0-1-1131 text-center">
                            <div className="mt-4">
                              {
                                zipFilteredByModuleId.filter(
                                  (zipp) => zipp.moduleId === module._id
                                ).length
                              }
                            </div>
                          </td>
                          <td className="courseOverviewDesc-0-1-1131 text-center">
                            <div className="mt-4">
                              <Link to="#">View Details</Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <br />
              <br />
              <br />
            </Typography>
          </>
        );
      case 1:
        return (
          <>
            <Button className="ms-5 mt-2 mb-2" onClick={handleAddModule}>
              + Add Modules
            </Button>
            {moduleItems.map((ele, index) => (
              <div className="mt-2 px-5 row" key={index}>
                <h6 className="course-lable-title">
                  <i class="fa-brands fa-modx"></i> {`Module ${index + 1}`}
                </h6>
                <div className="col-md-6">
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
                    onChange={(e) =>
                      handleModuleChange(index, "moduleTitle", e.target.value)
                    }
                  />
                  {moduleErrMsg && (
                    <p style={styles.errorText}>{moduleErrMsg}</p>
                  )}
                </div>
                <div className="col-md-6">
                  <label>
                    <b>Module Description</b>
                  </label>
                  <br />
                  <textarea
                    className="mt-2 "
                    type="text"
                    name="search"
                    placeholder="Enter module description here..."
                    style={styles.courseInput}
                    onChange={(e) =>
                      handleModuleChange(index, "description", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
            <br />
            <br />
            <br />
          </>
        );
      default:
        return null;
    }
  };

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
    errorText: {
      fontSize: "13px",
      color: "red",
      fontWeight: "500",
    },
  };
  return (
    <div>
      <div className="headerTitle-0-1-70">{couserTitle}</div>
      <div className="headerDesc-0-1-71">
        <div>Add / view content of your course</div>
      </div>
      <div className="addCourseMain-0-1-55 mt-3">
        S
        <Box>
          <Stepper
            className="mt-3"
            activeStep={activeStep}
            style={{ padding: "20px 240px" }}
          >
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <div>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  <div>
                    <img
                      style={{
                        // position: "relative",
                        // left: "50%",
                        // right: "50%",
                        transform: "translate(150%, -4%)",
                        width: "25%",
                        mixBlendMode: "hard-light",
                      }}
                      // src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaWQ9IkxheWVyXzEiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiMyQkI2NzM7fQoJLnN0MXtmaWxsOm5vbmU7c3Ryb2tlOiNGRkZGRkY7c3Ryb2tlLXdpZHRoOjMwO3N0cm9rZS1taXRlcmxpbWl0OjEwO30KPC9zdHlsZT48cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDg5LDI1NS45YzAtMC4yLDAtMC41LDAtMC43YzAtMS42LDAtMy4yLTAuMS00LjdjMC0wLjktMC4xLTEuOC0wLjEtMi44YzAtMC45LTAuMS0xLjgtMC4xLTIuNyAgYy0wLjEtMS4xLTAuMS0yLjItMC4yLTMuM2MwLTAuNy0wLjEtMS40LTAuMS0yLjFjLTAuMS0xLjItMC4yLTIuNC0wLjMtMy42YzAtMC41LTAuMS0xLjEtMC4xLTEuNmMtMC4xLTEuMy0wLjMtMi42LTAuNC00ICBjMC0wLjMtMC4xLTAuNy0wLjEtMUM0NzQuMywxMTMuMiwzNzUuNywyMi45LDI1NiwyMi45UzM3LjcsMTEzLjIsMjQuNSwyMjkuNWMwLDAuMy0wLjEsMC43LTAuMSwxYy0wLjEsMS4zLTAuMywyLjYtMC40LDQgIGMtMC4xLDAuNS0wLjEsMS4xLTAuMSwxLjZjLTAuMSwxLjItMC4yLDIuNC0wLjMsMy42YzAsMC43LTAuMSwxLjQtMC4xLDIuMWMtMC4xLDEuMS0wLjEsMi4yLTAuMiwzLjNjMCwwLjktMC4xLDEuOC0wLjEsMi43ICBjMCwwLjktMC4xLDEuOC0wLjEsMi44YzAsMS42LTAuMSwzLjItMC4xLDQuN2MwLDAuMiwwLDAuNSwwLDAuN2MwLDAsMCwwLDAsMC4xczAsMCwwLDAuMWMwLDAuMiwwLDAuNSwwLDAuN2MwLDEuNiwwLDMuMiwwLjEsNC43ICBjMCwwLjksMC4xLDEuOCwwLjEsMi44YzAsMC45LDAuMSwxLjgsMC4xLDIuN2MwLjEsMS4xLDAuMSwyLjIsMC4yLDMuM2MwLDAuNywwLjEsMS40LDAuMSwyLjFjMC4xLDEuMiwwLjIsMi40LDAuMywzLjYgIGMwLDAuNSwwLjEsMS4xLDAuMSwxLjZjMC4xLDEuMywwLjMsMi42LDAuNCw0YzAsMC4zLDAuMSwwLjcsMC4xLDFDMzcuNywzOTguOCwxMzYuMyw0ODkuMSwyNTYsNDg5LjFzMjE4LjMtOTAuMywyMzEuNS0yMDYuNSAgYzAtMC4zLDAuMS0wLjcsMC4xLTFjMC4xLTEuMywwLjMtMi42LDAuNC00YzAuMS0wLjUsMC4xLTEuMSwwLjEtMS42YzAuMS0xLjIsMC4yLTIuNCwwLjMtMy42YzAtMC43LDAuMS0xLjQsMC4xLTIuMSAgYzAuMS0xLjEsMC4xLTIuMiwwLjItMy4zYzAtMC45LDAuMS0xLjgsMC4xLTIuN2MwLTAuOSwwLjEtMS44LDAuMS0yLjhjMC0xLjYsMC4xLTMuMiwwLjEtNC43YzAtMC4yLDAtMC41LDAtMC43ICBDNDg5LDI1Niw0ODksMjU2LDQ4OSwyNTUuOUM0ODksMjU2LDQ4OSwyNTYsNDg5LDI1NS45eiIgaWQ9IlhNTElEXzNfIi8+PGcgaWQ9IlhNTElEXzFfIj48bGluZSBjbGFzcz0ic3QxIiBpZD0iWE1MSURfMl8iIHgxPSIyMTMuNiIgeDI9IjM2OS43IiB5MT0iMzQ0LjIiIHkyPSIxODguMiIvPjxsaW5lIGNsYXNzPSJzdDEiIGlkPSJYTUxJRF80XyIgeDE9IjIzMy44IiB4Mj0iMTU0LjciIHkxPSIzNDUuMiIgeTI9IjI2Ni4xIi8+PC9nPjwvc3ZnPg=="
                      src="https://gifdb.com/images/high/animated-transparent-background-check-mark-lb1gygckicpca0fb.gif"
                      alt=""
                    />
                    <h3
                      style={{
                        // textAlign: "center",
                        // position: "relative",
                        // left: "42%",
                        // right: "50%",
                        marginLeft: "414px",
                      }}
                    >
                      Couser Published
                    </h3>
                  </div>
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button onClick={handleReset}>Done</Button>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    className="px-5 py-2"
                    variant="outline-info"
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    <i class="fa-solid fa-arrow-left-long"></i> &nbsp;Back
                  </Button>
                  <Button
                    className="ms-2 px-5"
                    onClick={handleNext}
                    variant="info"
                  >
                    {activeStep === steps.length - 1
                      ? "Publish Course"
                      : "Next"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </div>
        </Box>
      </div>
      {/* Add Content modal opeing============================== */}
      <Modal
        show={showAddContentModal}
        onHide={handleCloseAddContentModal}
        animation={false}
        backdrop="static"
        centered
        // size="lg"
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
                <div className="mt-2">
                  <div>
                    <div>
                      <label>
                        <b>Select Module *</b>
                      </label>
                      <br />
                      <select
                        style={styles.addModules}
                        onChange={handleModuleSelection}
                      >
                        <option>---Choose---</option>
                        {allModules.map((ele) => (
                          <option key={ele._id} value={ele._id}>
                            {ele.moduleTitle}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* <br /> */}
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
                        onChange={(e) => setVideoName(e.target.value)}
                      />
                    </div>{" "}
                    {/* <br /> */}
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
                        onChange={(e) => setVideoLink(e.target.value)}
                      />
                    </div>
                    {/* <br /> */}
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
                        onChange={(e) => setVideoDesc(e.target.value)}
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
                      <b>Select Module *</b>
                    </label>
                    <br />
                    <select
                      style={styles.addModules}
                      onChange={handleModuleSelection}
                    >
                      <option>---Choose---</option>
                      {allModules.map((ele) => (
                        <option key={ele._id} value={ele._id}>
                          {ele.moduleTitle}
                        </option>
                      ))}
                    </select>
                  </div>
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
                      onChange={(e) => setDocumentName(e.target.value)}
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
                      onChange={(e) => setDocumentDesc(e.target.value)}
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
                    onChange={(e) => handleImageUploadModule(e)}
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
                  {imageRead && (
                    <div>
                      <img
                        src={URL.createObjectURL(imageRead)}
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
                      <b>Select Module *</b>
                    </label>
                    <br />
                    <select
                      style={styles.addModules}
                      onChange={handleModuleSelection}
                    >
                      <option>---Choose---</option>
                      {allModules.map((ele) => (
                        <option key={ele._id} value={ele._id}>
                          {ele.moduleTitle}
                        </option>
                      ))}
                    </select>
                  </div>
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
                      onChange={(e) => setImageName(e.target.value)}
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
                      onChange={(e) => setImageDescr(e.target.value)}
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
                      <b>Select Module *</b>
                    </label>
                    <br />
                    <select
                      style={styles.addModules}
                      onChange={handleModuleSelection}
                    >
                      <option>---Choose---</option>
                      {allModules.map((ele) => (
                        <option key={ele._id} value={ele._id}>
                          {ele.moduleTitle}
                        </option>
                      ))}
                    </select>
                  </div>
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
                      onChange={(e) => setZipName(e.target.value)}
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
                      onChange={(e) => setZipDescr(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={
              enableVideo
                ? addVideos
                : enableDocument
                ? addDocuments
                : enableImage
                ? addImage
                : enableZip
                ? addZip
                : ""
            }
          >
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddModules;
