import React, { useEffect, useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { manageBannerStyle as styles } from "../../Styles/JSXStyles";
import "./style/managebanner.css";
import { apiUrl } from "../../Api-Service/apiConstants";
import {
  deleteData,
  getData,
  postFormData,
  putFormData,
} from "../../Api-Service/apiHelper";
import ReactPlayer from "react-player/youtube";
import { CiTrash } from "react-icons/ci";

function YoutubeVideo() {
  const formData = new FormData();
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);
  const [seteditView, setEditView] = useState(false);
  const [youtubeData, setYoutubeData] = useState([]);
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [screenImage, setScreenImage] = useState(null);

  const [selectedBannerData, setSelectedBannerData] = useState({});
  const [editScreenName, setEditScreenName] = useState("");
  const [editBannerImage, setEditBannerImage] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const appResponse = await getData(apiUrl.GET_ALL_YOUTUBE_VIDEOS);
      setYoutubeData(appResponse.data);
      // const webResponse = await getData(apiUrl.GET_WEB_BANNER);
      // setYoutubeData1(webResponse.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleBannerImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type;
      if (!fileType.startsWith("image/")) {
        setError("Please upload a valid image file (PNG or JPEG).");
        return;
      }
      const maxSize = 800 * 600;
      if (file.size > maxSize) {
        setError("Image size should be 800px x 600px or smaller.");
        return;
      }
      setError(null);
      setScreenImage(file);
    }
  };

  // const handleSubmitChanges = (e) => {
  //   setShow(false);
  // };
  // const handleEditChanges = (data) => {
  //   setSelectedBannerData(data);
  //   setEditView(true);
  // };
  console.log("youtubeData", youtubeData);
  // const handleEditBannerImage = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const fileType = file.type;
  //     if (!fileType.startsWith("image/")) {
  //       setError("Please upload a valid image file (PNG or JPEG).");
  //       return;
  //     }
  //     const maxSize = 800 * 600;
  //     if (file.size > maxSize) {
  //       setError("Image size should be 800px x 600px or smaller.");
  //       return;
  //     }
  //     setError(null);
  //     setEditBannerImage(file);
  //   }
  // };

  const addVideo = async (e) => {
    e.preventDefault();
    if (!link || !title || !screenImage) {
      alert("please fill all fields");
    } else {
      formData.append("title", title);
      formData.append("description", description);
      formData.append("thumbnailImage", screenImage);
      formData.append("link", link);
      try {
        const response = await postFormData(
          apiUrl.CREATE_YOUTUBE_VIDEO,
          formData
        );
        console.log("POST Request Success:", response);
        alert("Added");
        // window.location.reload();
        fetchData();
        setShow(false);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  // const editBanner = async (e) => {
  //   e.preventDefault();
  //   formData.append("screenName", editScreenName);
  //   if (editBannerImage) {
  //     formData.append("bannerImage", editBannerImage);
  //   }
  //   try {
  //     const response = await putFormData(
  //       `${apiUrl.EDIT_BANNERS}${selectedBannerData._id}`,
  //       formData
  //     );
  //     console.log("put Request Success:", response);
  //     alert("Updated");
  //     setEditView(false);
  //     fetchData();
  //     // setSelectedBannerData({});
  //     // window.location.reload();
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  const handleDelete = async (id) => {
    try {
      const res = await deleteData(`${apiUrl.DELETE_YOUTUBE_VIDEOS}${id}`);
      if (res) {
        alert("Deleted Sucessfull");
        fetchData();
        // window.location.reload();
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-4">
      <Button
        className="px-5 py-2"
        variant="info"
        onClick={() => setShow(true)}
      >
        Add
      </Button>
      <div className="row  mt-3">
        {youtubeData.length === 0 ? (
          <div className="mt-5">
            <div class="container-0-1-2782" id="foldersListID">
              <img
                src="https://www.freeiconspng.com/uploads/training-icon-19.png"
                width="350"
                alt="img"
                style={{ mixBlendMode: "luminosity" }}
              />
              <div class="heading-0-1-2783">No Banners Added</div>
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
            {youtubeData.map((ele, index) => (
              <div
                className="col-md-3 mb-4"
                key={index}

                // onClick={() => navigateToCourseOverview(ele)}
              >
                <div className="courseCard-0-1-330">
                  <div
                    className="courseCardTag-0-1-331-youtube"
                    style={styles.courseCardTag}
                    onClick={() => handleDelete(ele._id)}
                  >
                    <CiTrash />
                  </div>
                  <a
                    href={ele.link}
                    target="_blank"
                    key={index}
                    style={{ textDecoration: "none" }}
                    // onClick={() => navigateToCourseOverview(ele)}
                  >
                    <div className="courseCardImage-0-1-334-987">
                      <img
                        className="courseCardImage-0-1-334-youtube"
                        src={`${apiUrl.IMAGEURL}/youtube/${ele.thumbnailImage}`}
                        alt=""
                      />
                    </div>
                    <div className="courseCardContent-0-1-335-123">
                      <div className="courseCardTitle-0-1-336">{ele.title}</div>
                      <div className="courseCardTitle-0-1-336-descr">
                        {ele.description}
                      </div>
                      <br />
                    </div>
                  </a>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      {/* add================= */}
      <Offcanvas show={show} onHide={() => setShow(false)} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Add Video</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="">
            <label>
              <b>Title</b>
            </label>
            <input
              className="mt-2 mb-2"
              type="text"
              // placeholder="Enter Title"
              style={styles.courseInput}
              onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <label>
              <b>Youtube Link</b>
            </label>
            <input
              className="mt-2 mb-2"
              type="text"
              // placeholder="Enter Title"
              style={styles.courseInput}
              onChange={(e) => setLink(e.target.value)}
            />
            <br />
            <label>
              <b>Description</b>
            </label>
            <textarea
              className="mt-2 mb-2"
              type="text"
              // placeholder="Enter Title"
              style={styles.courseInput}
              onChange={(e) => setDescription(e.target.value)}
            />
            <br />
            <div style={styles.uploadImage}>
              <div className="d-flex p-2" style={styles.insideBox}>
                <i class="fa-solid fa-circle-plus me-1"></i>{" "}
                <input
                  accept="image/gif,image/jpeg,image/jpeg,image/png,image/webp,image/vnd.wap.wbmp,image/svg+xml,image/tiff"
                  style={{ display: "none" }}
                  id="icon-button-file"
                  type="file"
                  onChange={handleBannerImageChange}
                />
                <label htmlFor="icon-button-file">Upload Banner Image</label>
              </div>
            </div>
            {screenImage && (
              <div style={styles.bannerImageCont}>
                <img
                  src={URL.createObjectURL(screenImage)}
                  alt={screenImage}
                  style={{ width: "100%", height: "100%", marginTop: "20px" }}
                />
              </div>
            )}
            <span style={styles.imgStateText}>
              {" "}
              {error && <div style={{ color: "red" }}>{error}</div>}
            </span>
            <div className="text-center mt-2">
              <Button variant="info" onClick={addVideo}>
                Save Changes
              </Button>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      {/* banner edit ================= */}
      {/* <Offcanvas
        show={seteditView}
        onHide={() => setEditView(false)}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{selectedBannerData.screenName} </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="">
            <label>
              <b>Select Landing Screen</b>
            </label>
            <select
              className="mt-2 mb-4"
              style={styles.selectField}
              onChange={(e) => setEditScreenName(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Store Tab">Store Tab</option>
              <option value="Specific Course(s)">Specific Course(s)</option>
              <option value="Category of Courses">Category of Courses</option>
              <option value="External Link">External Link</option>
              <option value="Youtube Video">Youtube Video</option>
              <option value="Free Course material">Free Course material</option>
            </select>
            <div style={styles.uploadImage}>
              <div className="d-flex p-2" style={styles.insideBox}>
                <i class="fa-solid fa-circle-plus me-1"></i>{" "}
                <input
                  accept="image/gif,image/jpeg,image/jpeg,image/png,image/webp,image/vnd.wap.wbmp,image/svg+xml,image/tiff"
                  style={{ display: "none" }}
                  id="icon-button-file"
                  type="file"
                  onChange={handleEditBannerImage}
                />
                <label htmlFor="icon-button-file">Upload Banner Image</label>
              </div>
            </div>
            {editBannerImage ? (
              <div style={styles.bannerImageCont}>
                <img
                  src={URL.createObjectURL(editBannerImage)}
                  alt={editBannerImage}
                  style={{ width: "100%", height: "100%", marginTop: "20px" }}
                />
              </div>
            ) : (
              <div style={styles.bannerImageCont}>
                <img
                  src={`${apiUrl.IMAGEURL}/banners/${selectedBannerData.bannerImage}`}
                  // src={selectedBannerData.bannerImage}
                  style={{ width: "100%", height: "100%", marginTop: "20px" }}
                />
              </div>
            )}
            <span style={styles.imgStateText}>
              {error && <div style={{ color: "red" }}>{error}</div>}
            </span>
            <div className="text-center mt-2">
              <Button variant="info" onClick={editBanner}>
                Update
              </Button>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas> */}
    </div>
  );
}

export default YoutubeVideo;
