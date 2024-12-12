import React, { useEffect, useState } from "react";
import "./style/courseoverview.css";
import { Button, Offcanvas } from "react-bootstrap";
import { LuStarOff } from "react-icons/lu";
import { BiSolidDiscount } from "react-icons/bi";
import { LuStar } from "react-icons/lu";
import { GrResources } from "react-icons/gr";
import {
  deleteData,
  getData,
  putData,
  putFormData,
} from "../../Api-Service/apiHelper";
import { apiUrl } from "../../Api-Service/apiConstants";
import { useLocation, useNavigate } from "react-router-dom";
import { Autocomplete, TextField } from "@mui/material";
import moment from "moment";

function CourseOverview() {
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
  let location = useLocation();
  let courseData = location.state.course || null;
  console.log("courseData", location.state.course || null);
  const Navigate = useNavigate();
  const formData = new FormData();
  const [error, setError] = useState(null);
  const [course, setCourse] = useState([]);
  const [courseTitle, setCourseTitle] = useState(courseData.courseName);
  const [courseDescription, setCourseDescription] = useState(
    courseData.courseDescription
  );
  const [materialVideoId, setMaterialVideoId] = useState(null);
  const [materialDocsId, setMaterialDocsId] = useState("");
  const [freeMaterialDocs, setFreeMaterialDocs] = useState(
    courseData.freeMaterialDocs
  );
  const [freematerialVideo, setFreematerialVideo] = useState("");
  const [durationType, setDurationType] = useState(courseData.durationType);
  const [validity, setValidity] = useState(courseData.validity);
  const [validityPeriod, setValidityPeriod] = useState(
    courseData.validityPeriod
  );
  const [effectivePrice, setEffectivePrice] = useState(
    courseData.effectivePrice
  );
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [price, setPrice] = useState(courseData.price);
  const [discount, setDiscount] = useState(courseData.discount);
  const [allMaterialVideo, setAllMaterialVideo] = useState([]);
  const [allMaterialDocs, setAllMaterialDocs] = useState([]);
  const [couponList, setCouponList] = useState([]);
  const [showCoupon, setShowCoupon] = useState(false);
  const [allModules, setAllModules] = useState([]);
  const [allVideos, setAllVideos] = useState([]);
  const [allDocs, setAllDocs] = useState([]);
  const [allImage, setAllImages] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const materialVideo = await getData(apiUrl.GET_FREEMATERIAL_VIDEO);
      const materialDocumentRes = await getData(
        apiUrl.GET_FREEMATERIAL_DOCUMENT
      );
      const couponRes = await getData(apiUrl.GET_ALL_COUPON);
      const moduleRes = await getData(
        `${apiUrl.GET_MODULES_BY_COURSE_ID}${courseData._id}`
      );

      // const videoRes = await getData(`${apiUrl.GET_ALL_VIDEO}`);

      // const docsRes = await getData(`${apiUrl.GET_ALL_DOCUMENT}`);

      // const imageRes = await getData(`${apiUrl.GET_ALL_IMAGE}`);

      setAllMaterialDocs(materialDocumentRes.data);
      setCouponList(couponRes.data);
      // setAllImages(imageRes.data);
      setAllMaterialVideo(materialVideo.data);
      // setAllDocs(docsRes.data);
      // setAllVideos(videoRes.data);
      setAllModules(moduleRes.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const showingLengthOfDocus =
    allModules.length + courseData.externalContent.length;
  console.log("allModules", showingLengthOfDocus);
  // console.log("allVideos", allVideos);
  // console.log("allDocs", allDocs);
  // console.log("allImage", allImage);

  const handleDoc = (e, newValue) => {
    if (newValue) {
      setFreeMaterialDocs(newValue.originalName);
      setMaterialDocsId(newValue._id);
    }
  };
  const handleVideo = (e, newValue) => {
    if (newValue) {
      setFreematerialVideo(newValue.Videotitle);
      setMaterialVideoId(newValue._id);
    }
  };
  // console.log("couponList", couponList);
  const matchedCoupons = couponList
    .map((coupon) => {
      const matchingCourses = coupon.appliedCourses.filter(
        (course) => course.courseId === courseData._id
      );
      return {
        ...coupon,
        appliedCourses: matchingCourses,
      };
    })
    .filter((coupon) => coupon.appliedCourses.length > 0);

  // console.log("matchedCoupons", matchedCoupons);

  const calculateEffectiveAmount = (price, discount) => {
    const discountedAmount = Number(price) * (1 - Number(discount) / 100);
    return discountedAmount.toFixed(2);
  };

  // Update effective price when price or discount changes
  React.useEffect(() => {
    if (price !== "" && discount !== "") {
      const calculatedEffectivePrice = calculateEffectiveAmount(
        price,
        discount
      );
      setEffectivePrice(calculatedEffectivePrice);
    }
  }, [price, discount]);
  // console.log("allDocs", allMaterialDocs);
  // const getCourseDocumentObj = allMaterialDocs?.filter(
  //   (doc) => doc._id === courseData.materialDocsId
  // );
  // console.log("getCourseDocumentObj", getCourseDocumentObj);

  const navigateToModuleOverview = () => {
    // Navigate(
    //   `/courses/course-overview/${courseId}/${encodeURIComponent(couserTitle)}`
    // );
    Navigate("/courses/modules-overview", {
      state: {
        courseData,
      },
    });
  };

  const updateCourse = async (e) => {
    e.preventDefault();
    if (
      !courseTitle ||
      // !newCourse.thumbnailImage ||
      !price ||
      !durationType ||
      !validity ||
      !validityPeriod
    ) {
      alert("please fill all fields");
    } else {
      formData.append("courseName", courseTitle);
      formData.append("courseDescription", courseDescription);
      formData.append("freeMaterialVideo", freematerialVideo);
      formData.append("freeMaterialDocs", freeMaterialDocs);
      formData.append("materialDocsId", materialDocsId);
      formData.append("materialVideoId", materialVideoId);
      formData.append("durationType", durationType);
      formData.append("validity", validity);
      formData.append("validityPeriod", validityPeriod);
      formData.append("price", price);
      formData.append("discount", discount);
      formData.append("effectivePrice", effectivePrice);
      formData.append("thumbnailImage", thumbnailImage);

      try {
        const response = await putFormData(
          `${apiUrl.UPDATE_COURSE}${courseData._id}`,
          formData
        );
        console.log("put Request Success:", response);
        alert("Added");
        window.location.assign("/courses/course-list");
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const makeCourseFeatured = async (id) => {
    try {
      const res = await putData(
        `${apiUrl.MAKE_COURSE_FEATURED}${courseData._id}`
      );
      if (res) {
        alert("The course has been add to featured list.");

        // fetchData();
        window.location.assign("/courses/course-list");
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const removeCourseFeatured = async (id) => {
    try {
      const res = await putData(
        `${apiUrl.REMOVE_COURSE_FEATURED}${courseData._id}`
      );
      if (res) {
        alert("The course has been removed from the featured list.");
        // fetchData();
        window.location.assign("/courses/course-list");
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const removeCourseFromCoupon = async (id) => {
    try {
      const res = await deleteData(`${apiUrl.REMOVE_COURSE_FROM_COUPON}${id}`);
      if (res) {
        alert("The COUPON has been removed.");
        console.log("res", res);
        // fetchData();
        window.location.reload();
        // window.location.assign("/courses/course-list");
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const publishCourse = async (id) => {
    try {
      const res = await putData(`${apiUrl.COURSE_PUBLISH}${courseData._id}`);
      if (res) {
        alert("The course has been published successfully.");
        // fetchData();
        window.location.assign("/courses/course-list");
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const unPublishCourse = async (id) => {
    try {
      const res = await putData(`${apiUrl.COURSE_UNPUBLISH}${courseData._id}`);
      if (res) {
        alert("Updated.");
        // fetchData();
        window.location.assign("/courses/course-list");
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deteleCourse = async () => {
    try {
      const res = await deleteData(`${apiUrl.DELETE_COURSE}${courseData._id}`);
      if (res) {
        alert("Deleted Sucessfull");
        // fetchData();
        window.location.assign("/courses/course-list");
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleThumbnailChange = (e) => {
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

  return (
    <div>
      <div className="headerTitle-0-1-70">{courseData.courseName}</div>
      <br />
      <div class="courseOverviewContentContainer-0-1-662">
        <div class="courseOverviewMain-0-1-631 p-3">
          <div className="row">
            <div className="col-md-6">
              <label className="mb-1 course-lable-title">
                <i class="fa-solid fa-greater-than"></i> Title
              </label>
              <div className="">
                <label>
                  <b>Name</b>
                </label>
                <br />
                <input
                  className="mt-2"
                  type="text"
                  name="search"
                  // placeholder="Enter course name"
                  value={courseTitle}
                  style={styles.courseInput}
                  onChange={(e) => setCourseTitle(e.target.value)}
                />
              </div>

              <div>
                <label>
                  <b>Description</b>
                </label>
                <br />
                <textarea
                  className="mt-2 h-32"
                  type="text"
                  name="search"
                  placeholder="Enter course description here..."
                  style={styles.courseInput}
                  value={courseDescription}
                  onChange={(e) => setCourseDescription(e.target.value)}
                />
              </div>
              <div
                className="mt-2 mb-2"
                style={{ border: "1px dashed #e4e6e8" }}
              ></div>

              <div className="mb-3">
                <div className="row">
                  <label className="mb-1 course-lable-title">
                    <i class="fa-solid fa-greater-than"></i> Free Materials
                  </label>
                  <div className="col-6">
                    <label>
                      <b>Documents</b>
                    </label>

                    <Autocomplete
                      className="mt-2"
                      disablePortal
                      id="combo-box-demo"
                      options={allMaterialDocs}
                      getOptionLabel={(option) => option.originalName}
                      renderInput={(params) => (
                        <TextField {...params} label="Select documents" />
                      )}
                      onChange={(e, newValue) => handleDoc(e, newValue)}
                    />

                    {/* <a
                      className="course-lable-title"
                      href={`${apiUrl.IMAGEURL}/documents/${getCourseDocumentObj[0]?.documentImage}`}
                      target="_blank"
                    >
                      {courseData.freeMaterialDocs}
                    </a> */}
                  </div>
                  <div className="col-6">
                    <label>
                      <b>Video</b>
                    </label>

                    <Autocomplete
                      className="mt-2"
                      disablePortal
                      id="combo-box-demo"
                      options={allMaterialVideo}
                      getOptionLabel={(option) => option.thumbnailTitle}
                      renderInput={(params) => (
                        <TextField {...params} label="Select video" />
                      )}
                      onChange={(e, newValue) => handleVideo(e, newValue)}
                    />
                  </div>
                </div>
              </div>

              <div
                className="mb-3"
                style={{ border: "1px dashed #e4e6e8" }}
              ></div>

              <div className="row mb-5">
                <label className="mb-1 course-lable-title">
                  <i class="fa-solid fa-greater-than"></i> Upload Image/Video
                </label>

                <div className="col-md-6">
                  <div>
                    <label>
                      <b>Add Thumbnail Image</b>
                    </label>
                  </div>
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
                  {thumbnailImage ? (
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
                  ) : (
                    <img
                      src={`${apiUrl.IMAGEURL}/course/${courseData.thumbnailImage}`}
                      // alt={thumbnailImage.name}
                      style={{
                        width: "200px",
                        height: "155px",
                        marginTop: "20px",
                      }}
                    />
                  )}
                  <span style={styles.imgStateText}>
                    {error && <div style={{ color: "red" }}>{error}</div>}
                  </span>
                </div>
                {/* <div className="col-md-6 mb-4">
                <label>
                  <b>Add Video</b>
                </label>
                <br />

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
                  style={{ padding: "14px 18px", fontSize: "12px" }}
                  htmlFor="video-file-input"
                >
                  <i class="fa-solid fa-upload"></i> Upload from your pc
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
                  </div>
                )}
                <br />
                <span style={styles.imgStateText}>
                  {videoError && (
                    <div style={{ color: "red" }}>{videoError}</div>
                  )}
                </span>
              </div> */}
              </div>
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
            <div className="col-md-6">
              <label className="mb-1 course-lable-title">
                <i class="fa-solid fa-greater-than"></i> Course Validity
              </label>
              <div className="mb-2">
                <label>
                  <b>Course Duration Type</b>
                </label>
                <br />
                <select
                  className="mt-2"
                  style={styles.selectField}
                  value={durationType}
                  onChange={(e) => setDurationType(e.target.value)}
                >
                  <option value="">Select Course Duration</option>
                  <option value="Single Validity">Single Validity</option>
                  <option value="Multiple Validity">Multiple Validity</option>
                  <option value="Lifetime Validity">Lifetime Validity</option>
                  <option value="Course Expiry Date">Course Expiry Date</option>
                </select>
                <br />
                <span
                  class="help-block"
                  style={{ fontSize: "12px", marginLeft: "13px" }}
                >
                  Course will expire after a fixed period of time for all
                  students based on their purchase date.
                </span>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-4">
                    <input
                      className="mt-2"
                      type="text"
                      name="search"
                      placeholder="Enter validity"
                      value={validity}
                      onChange={(e) => setValidity(e.target.value)}
                      style={styles.courseInput}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-4">
                    <select
                      className="mt-2"
                      style={styles.selectField}
                      value={validityPeriod}
                      onChange={(e) => setValidityPeriod(e.target.value)}
                    >
                      <option value="">Select Time Period</option>
                      <option value="Days">Days</option>
                      <option value="Month">Month</option>
                      <option value="Year">Year</option>
                    </select>
                  </div>
                </div>
              </div>
              <div
                className="mb-3"
                style={{ border: "1px dashed #e4e6e8" }}
              ></div>
              <div className="row">
                <label className="mb-1 course-lable-title">
                  <i class="fa-solid fa-greater-than"></i> Pricing & Discount
                </label>
                <div className="col-md-4">
                  <label>
                    <b>Price</b>
                  </label>
                  <br />
                  <input
                    className="mt-2"
                    type="number"
                    min={1}
                    placeholder="Enter price"
                    style={styles.courseInput}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}

                    // onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="col-md-4">
                  <label>
                    <b>Discount</b>
                  </label>
                  <br />
                  <input
                    className="mt-2"
                    type="number"
                    min={0}
                    placeholder="Enter discount"
                    style={styles.courseInput}
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}

                    // onChange={(e) => setDiscount(e.target.value)}
                  />
                </div>
                <div className="col-md-4">
                  <label>
                    <b>Effective price</b>
                  </label>
                  <br />
                  <div className="mt-2" style={styles.courseInput}>
                    {effectivePrice}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="contentLeft-0-1-663">
          <div
            class="tooltipWrapper-0-1-784 hover-effe-box popUpWrap-0-1-783"
            onClick={() => navigateToModuleOverview()}
          >
            <div class="container-0-1-770">
              <div class="icon-0-1-772">
                {/* <img
                  class="iconImage-0-1-771"
                  src="https://ali-cdn-cp-assets-public.classplus.co/CampaignManager/1548f055a16d393a45816fe8d097b6c3"
                  alt=""
                /> */}
                <i class="fa-solid fa-folder" style={{ color: "#00ade7" }}></i>
              </div>
              <div class="labels-0-1-779">
                <div class="headerContainer-0-1-774">
                  <div class="header-0-1-773"> Content</div>
                </div>
                <div class="subtext-0-1-777"> {allModules.length} Content</div>
              </div>
            </div>
          </div>
          <div
            class="tooltipWrapper-0-1-784 hover-effe-box popUpWrap-0-1-805"
            onClick={deteleCourse}
          >
            <div class="container-0-1-792">
              <div class="icon-0-1-794">
                {/* <img
                  class="iconImage-0-1-793"
                  src="https://ali-cdn-cp-assets-public.classplus.co/CampaignManager/aa40c864cc05147e33ebd44fc0b124be"
                  alt=""
                /> */}
                <i
                  class="fa-solid fa-trash-can"
                  style={{ color: "#00ade7" }}
                ></i>
              </div>
              <div class="labels-0-1-801">
                <div class="headerContainer-0-1-796">
                  <div class="header-0-1-795"> Delete Course</div>
                </div>
                {/* <div class="subtextBlue-0-1-800">Go Live</div> */}
              </div>
            </div>
          </div>
          <div
            class="tooltipWrapper-0-1-784 hover-effe-box popUpWrap-0-1-820"
            onClick={() => setShowCoupon(true)}
          >
            <div class="container-0-1-807">
              <div class="icon-0-1-809">
                {/* <img
                  class="iconImage-0-1-808"
                  src="https://ali-cdn-cp-assets-public.classplus.co/CampaignManager/8b5deb8fb29a94caa0221ad93a6168e4"
                  alt=""
                /> */}
                {/* <i class="fa-solid fa-percent" style={{ color: "#00ade7" }}></i> */}
                <BiSolidDiscount style={{ color: "#00ade7" }} />
              </div>
              <div class="labels-0-1-816">
                <div class="headerContainer-0-1-811">
                  <div class="header-0-1-810"> Manage Coupon</div>
                </div>
                {/* <div class="subtextBlue-0-1-815">Create a Notice</div> */}
              </div>
            </div>
          </div>

          {courseData.courseFeature === false ? (
            <div
              class="tooltipWrapper-0-1-784 hover-effe-box popUpWrap-0-1-835"
              onClick={makeCourseFeatured}
            >
              <div class="container-0-1-822">
                <div class="icon-0-1-824">
                  <LuStar style={{ color: "#00ade7" }} />
                </div>
                <div class="labels-0-1-831">
                  <div class="headerContainer-0-1-826">
                    <div class="header-0-1-825"> Make Featured Course</div>
                  </div>
                </div>
              </div>
            </div>
          ) : courseData.courseFeature === true ? (
            <div
              class="tooltipWrapper-0-1-784 hover-effe-box popUpWrap-0-1-835"
              onClick={removeCourseFeatured}
            >
              <div class="container-0-1-822">
                <div class="icon-0-1-824">
                  <LuStarOff style={{ color: "#00ade7" }} />
                </div>
                <div class="labels-0-1-831">
                  <div class="headerContainer-0-1-826">
                    <div class="header-0-1-825">Remove Featured Course</div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          <div
            class="tooltipWrapper-0-1-784 hover-effe-box popUpWrap-0-1-835"
            // onClick={makeCourseFeatured}
          >
            <div class="container-0-1-822">
              <div class="icon-0-1-824">
                <GrResources style={{ color: "#00ade7" }} />
              </div>
              <div class="labels-0-1-831">
                <div class="headerContainer-0-1-826">
                  <div class="header-0-1-825">Resource</div>
                </div>
                <div class="subtext-0-1-777">
                  {" "}
                  {courseData.externalContent.length} Docs/Image
                </div>
              </div>
            </div>
          </div>
          {/* <button
            class="button-0-1-290 button-d45-0-1-842 publishButton-0-1-665 
          primary-0-1-291 primary-d46-0-1-843"
          >
            Publish Course
          </button> */}
        </div>
      </div>
      <div className="footerNavContainer-0-1-444 footerNavContainer-d0-0-1-457">
        <Button
          className="px-5 py-2"
          variant="outline-info"
          onClick={() => window.location.assign("/courses/course-list")}
        >
          <i class="fa-solid fa-arrow-left-long"></i> &nbsp; Back
        </Button>
        <Button className="ms-2 px-5" variant="info" onClick={updateCourse}>
          Update
        </Button>
      </div>
      <Offcanvas
        show={showCoupon}
        onHide={() => setShowCoupon(false)}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            Available Coupons ({matchedCoupons.length})
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div
            class="bodyContainer-0-1-1915 undefined"
            id="bodyContainerSideDrawer"
          >
            <div class="ribbonTagContainer-0-1-1921">
              <span
                class="ribbonTagText-0-1-1922"
                style={{ textAlign: "center" }}
              >
                You can create new coupons from ‘Manage Coupons’ tab
              </span>
            </div>

            <div class="manageCouponContainer-0-1-1907">
              {matchedCoupons.length < 0 ? (
                <div class="couponCardWithCheckBoxContainer-0-1-1908 mb-2">
                  No Coupons Found
                </div>
              ) : (
                <>
                  {matchedCoupons.map((coupon) => (
                    <div class="couponCardWithCheckBoxContainer-0-1-1908 mb-2">
                      <div class="couponContainer-0-1-1932">
                        <div class="couponCard-0-1-1933">
                          <div class="cardLeftDiscoundTextWrapper-0-1-1934">
                            <p class="cardLeftDiscoundText-0-1-1935">
                              ₹ {coupon.discountAmount} OFF
                            </p>
                          </div>
                        </div>
                        <div class="cardRightDiscoundWrapper-0-1-1936">
                          <div class="cardRightContainer-0-1-1937">
                            <div>
                              <p class="couponCodeText-0-1-1938">
                                {coupon.couponCode.toUpperCase()}{" "}
                              </p>
                              <p class="couponCodeDescription-0-1-1939">
                                Flat ₹ {coupon.discountAmount} OFF
                              </p>
                            </div>
                            <div>
                              <div class="tooltipWrapper-0-1-681 undefined">
                                <button
                                  disabled=""
                                  class="deleteCouponBtn-0-1-1940"
                                  onClick={() =>
                                    removeCourseFromCoupon(coupon._id)
                                  }
                                >
                                  <img
                                    src="https://classplusapp.com/diy/assets/disabledDeleteBtn-e4c5c655..svg"
                                    alt=""
                                    title="Remove from the course"
                                  />
                                </button>
                              </div>
                            </div>
                          </div>
                          <div>
                            <ul class="couponTermsTextList-0-1-1941">
                              <li class="couponTermsText-0-1-1942">
                                {moment(coupon.startDate).format("ll")},{" "}
                                {coupon.startTime} -{" "}
                                {moment(coupon.endDate).format("ll")}
                              </li>
                              <li class="couponTermsText-0-1-1942">
                                Effective course price: ₹{" "}
                                {courseData.effectivePrice}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default CourseOverview;
