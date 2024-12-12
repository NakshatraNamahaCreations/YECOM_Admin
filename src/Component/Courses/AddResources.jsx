import React, { useEffect, useState } from "react";
// import "..";
import { Button, Offcanvas } from "react-bootstrap";
import { deleteData, getData, putData } from "../../Api-Service/apiHelper";
import { apiUrl } from "../../Api-Service/apiConstants";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function AddResources() {
  const Navigate = useNavigate();
  const { objectId, couserTitle } = useParams();

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
  const [showResource, setShowResource] = useState(false);
  const [showRequirement, setShowRequirement] = useState(false);
  const [showEditCanvas, setShowEditCanvas] = useState(false);
  const [course, setCourse] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [allDocs, setAllDocs] = useState([]);
  const [allDocsaa, setAllDocsaa] = useState([]);

  const handleDocumentUpload = (e) => {
    const file = e.target.files;
    const selectedFiles = Array.from(file).map((file) => file);
    setSelectedFiles(selectedFiles);
  };
  const handleSubmitChanges = (e) => {
    uploadResourceToCourse();
  };

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const documentRes = await getData(apiUrl.GET_FREEMATERIAL_DOCUMENT);
      setAllDocsaa(documentRes.data);
      setAllDocs(documentRes.data.flatMap((docs) => docs.materialDocuments));
      // course============================
      const courseResponse = await getData(
        `${apiUrl.GET_PARTICULAR_COURSE}${objectId}`
      );
      setCourse(courseResponse.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const uploadResourceToCourse = async () => {
    if (selectedFiles.length === 0) {
      alert("Please select at least one file.");
      return;
    }
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("externalContent", file);
    });
    try {
      const response = await putData(
        `${apiUrl.ADD_RESOURCES}${objectId}`,
        formData
      );
      console.log("uploadResourceToCourse status", response);
      alert(response.success || "Added Successfully");
      setShowResource(false);
      fetchData();
      setSelectedFiles([]);
    } catch (error) {
      console.error("Error:", error);
      alert("Unable to complete the upload.");
    }
  };

  const uploadImportantRequirementToCourse = async () => {
    if (selectedFiles.length === 0) {
      alert("Please select at least one file.");
      return;
    }
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("externalContent", file);
    });
    try {
      const response = await putData(
        `${apiUrl.ADD_IMPORTANT_REQ}${objectId}`,
        formData
      );
      console.log("uploadResourceToCourse status", response);
      alert(response.success || "Added Successfully");
      setShowRequirement(false);
      fetchData();
      setSelectedFiles([]);
    } catch (error) {
      console.error("Error:", error);
      alert("Unable to complete the upload.");
    }
  };

  const handleDeletObj = async (id) => {
    try {
      const res = await deleteData(`${apiUrl.DELETE_RESOURCE_OR_REQ}${id}`);
      if (res) {
        alert("Deleted Successfully");
        console.log("delete response:", res);
        fetchData();
        // window.location.reload();
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // console.log("course", course);
  const navigateToCourseModule = () => {
    Navigate(
      `/courses/add-modules/${objectId}/${encodeURIComponent(couserTitle)}`
    );
  };
  return (
    <div>
      <div className="headerTitle-0-1-70">{couserTitle}</div>
      <div className="row">
        <div className="col-md-6 container-0-1-369 mt-3">
          <Button
            className="px-5 py-2"
            variant="info"
            onClick={() => setShowResource(true)}
          >
            Add Resource
          </Button>
          <br /> <br />
          {course && course.externalContent && (
            <>
              {course.externalContent
                .filter((item) => item.contentType === "Resource")
                .map((docs, index) => (
                  <div
                    className="root-0-1-372 root-d105-0-1-723 listItem-0-1-370"
                    key={index}
                  >
                    <div className="content-0-1-373 flex1-0-1-385">
                      {docs.fileType === "pdf" ? (
                        <svg
                          width="80"
                          height="60"
                          viewBox="0 0 80 60"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          class="icon-0-1-374 icon-d106-0-1-724 flex0-0-1-386"
                        >
                          <rect
                            width="80"
                            height="60"
                            rx="4"
                            fill="#F2FBFE"
                          ></rect>
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
                          src={`${apiUrl.IMAGEURL}/resource/${docs.documentOrImage}`}
                          alt={docs.originalName}
                        />
                      )}
                      <div class="rightContentCont-0-1-375 rightContentCont-d107-0-1-725 flex1-0-1-385">
                        <a
                          href={`${apiUrl.IMAGEURL}/resource/${docs.documentOrImage}`}
                          target="_blank"
                          style={{ textDecoration: "none" }}
                        >
                          <p class="heading-0-1-376 heading-d108-0-1-726 textTruncate-0-1-387">
                            {docs.originalName}
                          </p>
                        </a>
                      </div>
                      <div class="flex0-0-1-637 others-0-1-629 others-d5-0-1-645">
                        <div
                          style={{ cursor: "Pointer" }}
                          onClick={() => handleDeletObj(docs._id)}
                        >
                          <img
                            src="https://classplusapp.com/diy/assets/trash-2-db8990c1..svg"
                            alt=""
                            class="iconImage-0-1-649"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>
        <div className="col-md-6 container-0-1-369 mt-3">
          <Button
            className="px-5 py-2 ms-2"
            variant="info"
            onClick={() => setShowRequirement(true)}
          >
            Important Requirements
          </Button>
          <br /> <br />
          {course && course.externalContent && (
            <>
              {course.externalContent
                .filter((item) => item.contentType === "Important Requirement")
                .map((docs, index) => (
                  <div
                    className="root-0-1-372 root-d105-0-1-723 listItem-0-1-370"
                    key={index}
                  >
                    <div className="content-0-1-373 flex1-0-1-385">
                      {docs.fileType === "pdf" ? (
                        <svg
                          width="80"
                          height="60"
                          viewBox="0 0 80 60"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          class="icon-0-1-374 icon-d106-0-1-724 flex0-0-1-386"
                        >
                          <rect
                            width="80"
                            height="60"
                            rx="4"
                            fill="#F2FBFE"
                          ></rect>
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
                          src={`${apiUrl.IMAGEURL}/resource/${docs.documentOrImage}`}
                          alt={docs.originalName}
                        />
                      )}

                      <div class="rightContentCont-0-1-375 rightContentCont-d107-0-1-725 flex1-0-1-385">
                        <a
                          href={`${apiUrl.IMAGEURL}/resource/${docs.documentOrImage}`}
                          target="_blank"
                          style={{ textDecoration: "none" }}
                        >
                          <p class="heading-0-1-376 heading-d108-0-1-726 textTruncate-0-1-387">
                            {docs.originalName}
                          </p>
                        </a>
                      </div>
                      <div class="flex0-0-1-637 others-0-1-629 others-d5-0-1-645">
                        <div
                          style={{ cursor: "Pointer" }}
                          onClick={() => handleDeletObj(docs._id)}
                        >
                          <img
                            src="https://classplusapp.com/diy/assets/trash-2-db8990c1..svg"
                            alt=""
                            class="iconImage-0-1-649"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>
      </div>
      {/* <div class="heading-0-1-294">Contents</div> */}

      <div className="footerNavContainer-0-1-444 footerNavContainer-d0-0-1-457">
        <Button
          className="px-5 py-2"
          variant="outline-info"
          onClick={() => window.location.assign("/courses/course-list")}
        >
          <i class="fa-solid fa-arrow-left-long"></i> &nbsp; Back
        </Button>
        <Button
          className="ms-2 px-5"
          variant="info"
          onClick={navigateToCourseModule}
          // onClick={() => window.location.assign("/courses/add-modules")}
        >
          Add Modules &nbsp; <i class="fa-solid fa-arrow-right-long"></i>
        </Button>
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
      {/* ................ add resource ............... */}
      <Offcanvas
        show={showResource}
        onHide={() => setShowResource(false)}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Add Resources</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div style={styles.uploadImage}>
            <div className="d-flex p-2" style={styles.insideBox}>
              <i class="fa-solid fa-circle-plus me-1"></i>{" "}
              <input
                accept="image/jpeg,image/jpg,image/png,application/pdf"
                style={{ display: "none" }}
                id="icon-button-file"
                type="file"
                multiple
                onChange={(e) => handleDocumentUpload(e)}
              />
              <label className="cursor-pointer" htmlFor="icon-button-file">
                Select Documents/Images
              </label>
            </div>
          </div>
          {selectedFiles.length > 0 && (
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
          )}
          <div className="text-center mt-3">
            <Button variant="info" onClick={handleSubmitChanges}>
              Upload
            </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      {/* .................add requirement.......... */}
      <Offcanvas
        show={showRequirement}
        onHide={() => setShowRequirement(false)}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Add Important Requirement</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div style={styles.uploadImage}>
            <div className="d-flex p-2" style={styles.insideBox}>
              <i class="fa-solid fa-circle-plus me-1"></i>{" "}
              <input
                accept="image/jpeg,image/jpeg,image/png,application/pdf"
                style={{ display: "none" }}
                id="icon-button-file"
                type="file"
                multiple
                onChange={(e) => handleDocumentUpload(e)}
              />
              <label className="cursor-pointer" htmlFor="icon-button-file">
                Select Documents/Images
              </label>
            </div>
          </div>
          {selectedFiles.length > 0 && (
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
          )}
          <div className="text-center mt-3">
            <Button variant="info" onClick={uploadImportantRequirementToCourse}>
              Upload
            </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default AddResources;
