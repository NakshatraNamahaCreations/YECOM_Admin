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

function ManageBanners() {
  const formData = new FormData();
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);
  const [seteditView, setEditView] = useState(false);
  const [bannerData, setBannerData] = useState([]);
  const [bannerTitle, setBannerTitle] = useState("");
  const [screenImage, setScreenImage] = useState(null);

  const [selectedBannerData, setSelectedBannerData] = useState({});
  const [editScreenName, setEditScreenName] = useState(
    selectedBannerData.screenName
  );
  const [editBannerImage, setEditBannerImage] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const appResponse = await getData(apiUrl.GET_APP_BANNER);
      setBannerData(appResponse.data);
      // const webResponse = await getData(apiUrl.GET_WEB_BANNER);
      // setBannerData1(webResponse.data);
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

  // const handleBannerImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     // Check file type
  //     const fileType = file.type;
  //     if (!fileType.startsWith("image/")) {
  //       // Display an error message on the screen
  //       setError("Please upload a valid image file (PNG or JPEG).");
  //       return;
  //     }
  //     // Check file size
  //     const maxSize = 800 * 600; // 800px x 600px
  //     if (file.size > maxSize) {
  //       // Display an error message on the screen
  //       setError("Image size should be 800px x 600px or smaller.");
  //       return;
  //     }
  //     // Clear any previous errors
  //     setError(null);
  //     // Set thumbnail image
  //     setBannerImage(file);
  //   }
  // };

  const handleSubmitChanges = (e) => {
    setShow(false);
  };
  const handleEditChanges = (data) => {
    setSelectedBannerData(data);
    setEditView(true);
  };
  console.log("selectedBannerData", selectedBannerData);
  const handleEditBannerImage = (e) => {
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
      setEditBannerImage(file);
    }
  };

  const addBanner = async (e) => {
    e.preventDefault();
    if (!bannerTitle || !screenImage) {
      alert("please fill all fields");
    } else {
      formData.append("screenName", bannerTitle);
      formData.append("bannerImage", screenImage);
      formData.append("bannerType", "app");
      try {
        const response = await postFormData(apiUrl.CREATE_BANNERS, formData);
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

  const editBanner = async (e) => {
    e.preventDefault();
    formData.append("screenName", editScreenName);
    if (editBannerImage) {
      formData.append("bannerImage", editBannerImage);
    }
    try {
      const response = await putFormData(
        `${apiUrl.EDIT_BANNERS}${selectedBannerData._id}`,
        formData
      );
      console.log("put Request Success:", response);
      alert("Updated");
      setEditView(false);
      fetchData();
      // setSelectedBannerData({});
      // window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteBanner = async (id) => {
    try {
      const res = await deleteData(`${apiUrl.DELETE_BANNERS}${id}`);
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
    <div className=" mt-4">
      <Button
        className="px-5 py-2"
        variant="info"
        onClick={() => setShow(true)}
      >
        Add Banners
      </Button>
      <div className="row">
        {bannerData.length === 0 ? (
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
            {bannerData.map((ele, index) => (
              <div className="col-md-4" key={index}>
                <div style={{ backgroundColor: "white" }}>
                  <div class="Banner__Main__Left__Content__ImageSection">
                    <div>
                      <div class="Banner__Main__Left__Content__ImageSection--Top">
                        <div class="Banner__Main__Left__Content__ImageSection--Top--Label">
                          Image
                        </div>
                        <div
                          class="Banner__Main__Left__Content__ImageSection--Top--Remove"
                          onClick={() => handleDeleteBanner(ele._id)}
                        >
                          <img
                            src="https://ali-cdn-cloudn.classplus.co/web/bannerAssests/Bin.svg"
                            alt=""
                          />
                          Remove
                        </div>
                      </div>
                      <div class="UploadedImageArea" id="UploadedImageArea">
                        <img
                          class="panel-body-image Banner__Main__Left__Content__ImageSection--Image"
                          src={`${apiUrl.IMAGEURL}/banners/${ele.bannerImage}`}
                          alt="notificationImage"
                          id="UploadedImage"
                          style={{ maxWidth: "100%", maxHeight: "100%" }}
                        />
                        <div class="UploadedImageArea__Change" id="ChangeIcon">
                          <div class="UploadedImageArea__Change--Button">
                            <img
                              src="https://ali-cdn-cloudn.classplus.co/web/bannerAssests/Pen.svg"
                              alt=""
                            />
                            Change
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="Banner__Main__Left__Content__ImageSection--Select">
                      {/* <div class="Banner__Main__Left__Content__ImageSection--Select--Note">
                    Select screen to open on tapping banner
                  </div> */}
                      <div class="Banner__Main__Left__Content__ImageSection--Select--Action">
                        <div class="Banner__Main__Left__Content__ImageSection--Select--Action--Selected">
                          {ele.screenName}
                        </div>
                        <div
                          class="Banner__Main__Left__Content__ImageSection--Select--Action--Change"
                          onClick={() => handleEditChanges(ele)}
                        >
                          Change
                        </div>
                      </div>
                    </div>
                    {/* <div class="Banner__Main__Left__Content__ImageSection--BannerTimer">
                <div class="Banner__Main__Left__Content__ImageSection--BannerTimer--ToggleSection">
                  <div class="Banner__Main__Left__Content__ImageSection--BannerTimer--ToggleSection--Note">
                    Remove banner automatically after fixed date
                  </div>
                  <div class="ui fitted toggle checkbox Banner__Main__Left__Content__ImageSection--BannerTimer--ToggleSection--Switch">
                    <input
                      class="hidden"
                      readonly=""
                      tabindex="0"
                      type="checkbox"
                      value=""
                    />
                    <label></label>
                  </div>
                </div>
              </div> */}
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      {/* add================= */}
      <Offcanvas show={show} onHide={() => setShow(false)} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Add New Banner</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="">
            <label>
              <b>Title</b>
            </label>
            <input
              className="mt-2 mb-4"
              type="text"
              // placeholder="Enter Title"
              style={styles.courseInput}
              onChange={(e) => setBannerTitle(e.target.value)}
            />
            {/* <select
              className="mt-2 mb-4"
              style={styles.selectField}
              onChange={(e) => setBannerTitle(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Store Tab">Store Tab</option>
              <option value="Specific Course(s)">Specific Course(s)</option>
              <option value="Category of Courses">Category of Courses</option>
              <option value="External Link">External Link</option>
              <option value="Youtube Video">Youtube Video</option>
              <option value="Free Course material">Free Course material</option>
            </select> */}
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
              <Button variant="info" onClick={addBanner}>
                Save Changes
              </Button>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      {/* banner edit ================= */}
      <Offcanvas
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
              <b>Title</b>
            </label>
            <input
              className="mt-2 mb-4"
              type="text"
              // placeholder="Enter Title"
              style={styles.courseInput}
              value={editScreenName}
              onChange={(e) => setEditScreenName(e.target.value)}
            />
            {/* <label>
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
            </select> */}
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
      </Offcanvas>
    </div>
  );
}

export default ManageBanners;
