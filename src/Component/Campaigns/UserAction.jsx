import React, { useState } from "react";
import "./style/useraction.css";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { postData, putData, putFormData } from "../../Api-Service/apiHelper";
import { apiUrl } from "../../Api-Service/apiConstants";
import { FaRegCircleCheck } from "react-icons/fa6";

const steps = [
  "Choose Channel",
  "Set Audience",
  "Add Content",
  "Publish Campaign",
];

function UserAction() {
  const { objectId } = useParams();
  console.log("objectId", objectId);
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [bannerImage, setBannerImage] = useState(null);
  const [error, setError] = useState(null);
  const [targetAudience, setTargetAudience] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [notificationsTitle, setNotificationsTitle] = useState("");
  const [notificationDescription, setNotificationDescription] = useState("");
  const [campaignTitle, setCampaignTitle] = useState("");
  console.log("selectedOption", selectedOption);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    if (activeStep === 0 && !selectedOption) {
      alert("Please select a notification method before proceeding.");
      return;
    }

    if (activeStep === 1 && !targetAudience) {
      alert("Please select a target audience before proceeding.");
      return;
    }

    if (activeStep === 2 && !notificationsTitle) {
      alert("Please enter a notifications title before proceeding.");
      return;
    }
    if (activeStep === 3 && !campaignTitle) {
      alert("Please enter a campaign title before proceeding.");
      return;
    }
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleBannerImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type
      const fileType = file.type;
      if (!fileType.startsWith("image/")) {
        // Display an error message on the screen
        setError("Please upload a valid image file (PNG or JPEG).");
        return;
      }
      // // Check file size
      // const maxSize = 800 * 600; // 800px x 600px
      // if (file.size > maxSize) {
      //   // Display an error message on the screen
      //   setError("Image size should be 800px x 600px or smaller.");
      //   return;
      // }
      // // Clear any previous errors
      // setError(null);
      // // Set thumbnail image
      setBannerImage(file);
    }
  };
  console.log(
    "targetAudience",
    targetAudience,
    notificationsTitle,
    notificationDescription,
    campaignTitle,
    bannerImage
  );
  const createNotifications = async () => {
    try {
      if (!targetAudience || !notificationsTitle || !campaignTitle) {
        alert("please fill all fields");
      }
      const formData = new FormData();

      formData.append(
        "channelUsed",
        selectedOption === "1"
          ? "Push Notification"
          : selectedOption === "2"
          ? "Email"
          : selectedOption === "1"
          ? "SMS"
          : ""
      );
      formData.append("targetAudience", targetAudience);
      formData.append("notificationTitle", notificationsTitle);
      formData.append("notificationDescription", notificationDescription);
      formData.append("campaignTitle", campaignTitle);
      formData.append("image", bannerImage);
      const res = await putFormData(
        `${apiUrl.CREATE_NOTIFICATION}${objectId}`,
        formData
      );
      if (res) {
        console.log("res", res);
        // alert("Template Created");
        window.location.assign("/campaigns/list");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleReset = () => {
    // setActiveStep(0);
    createNotifications();
    // window.location.assign("/campaigns/list");
  };

  const styles = {
    uploadImage: {
      // border: "1px dashed #25cff2",
      padding: "12px 18px",
      backgroundColor: "rgba(21, 192, 230, 0.1)",
      width: "155px",
      // height: "150px",
      display: "flex",
      justifyContent: "center",
      borderRadius: "8px",
      fontSize: "12px",
      cursor: "pointer",
    },
    insideBox: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#25cff2",
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

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            {/* <div style={{ borderBottom: "1px solid #E4E6E8" }}></div> */}
            <Typography variant="body1">
              <div
                class="addCourseSection-0-1-699 mt-4"
                style={{ height: "60vh" }}
              >
                <div class="addCourseForm-0-1-700">
                  <div class="sectionContainer-0-1-723">
                    <div class="marginLeft-0-1-718">
                      <div class="abountInfo-0-1-719">
                        I want to send communication via
                        <span style={{ color: "red" }}>*</span>
                      </div>
                      <div>
                        <div class="radioInputTagContainer-0-1-720">
                          <div class="radioBtnWrap-0-1-732">
                            <label
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                fontWeight: "700",
                              }}
                            >
                              <div class="tooltipWrapper-0-1-734">
                                <input
                                  type="radio"
                                  name="notificationMethod"
                                  value="1"
                                  checked={selectedOption === "1"}
                                  onChange={handleOptionChange}
                                  style={{ margin: "0px 8px" }}
                                />
                              </div>
                              <div>Push Notification</div>
                            </label>
                          </div>
                          <div class="radioBtnWrap-0-1-732">
                            <label
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                fontWeight: "700",
                              }}
                            >
                              <div class="tooltipWrapper-0-1-734">
                                <input
                                  name="notificationMethod"
                                  value="2"
                                  type="radio"
                                  checked={selectedOption === "2"}
                                  onChange={handleOptionChange}
                                  style={{ margin: "0px 8px" }}
                                />
                              </div>
                              <div>Email</div>
                            </label>
                          </div>
                          {/* <div class="radioBtnWrap-0-1-732">
                            <label
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                fontWeight: "700",
                              }}
                            >
                              <div class="tooltipWrapper-0-1-734">
                                <div
                                  class="tooltipTip-0-1-735 top-0-1-736"
                                  style={{ top: "-53.5938px", opacity: "0" }}
                                >
                                  Channel change is disabled
                                </div>
                                <input
                                  name="notificationMethod"
                                  value="3"
                                  checked={selectedOption === "3"} // if no option selected, make it
                                  type="radio"
                                  onChange={handleOptionChange}
                                  style={{ margin: "0px 8px" }}
                                />
                              </div>
                              <div>SMS</div>
                            </label>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Typography>
          </>
        );
      case 1:
        return (
          <Typography variant="body1">
            <div
              class="addCourseSection-0-1-699 mt-4"
              style={{ height: "60vh" }}
            >
              <div class="addCourseForm-0-1-700">
                <div class="sectionContainer-0-1-723">
                  <div class="marginLeft-0-1-718">
                    <div class="abountInfo-0-1-719">
                      I want to select my target audience based on user activity
                      <span style={{ color: "red" }}>*</span>
                    </div>
                    <div>
                      <select
                        className="form-select mt-3"
                        onChange={(e) => setTargetAudience(e.target.value)}
                      >
                        <option value="">Select</option>
                        <option value="When user has bought any plan">
                          When user has bought any plan
                        </option>
                        <option value="When user doesn’t purchase any plan">
                          When user doesn’t purchase any plan
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Typography>
        );
      case 2:
        return (
          <>
            {selectedOption === "1" || selectedOption === "2" ? (
              <div className="mt-4 mb-5">
                <div class="content">
                  <div class="headingInfoText-0-1-701">
                    Title<span style={{ color: "red" }}>*</span>
                  </div>
                  <div class="editInput-0-1-729 undefined" tabindex="0">
                    <div class="labelContainer-0-1-730">
                      <label class="editInputLabel-0-1-731" for="title"></label>
                    </div>
                    <div>
                      <textarea
                        className="textarea-0-1-732 textAreaDesc-0-1-724"
                        placeholder="Campaign title"
                        onChange={(e) => setNotificationsTitle(e.target.value)}
                      />
                    </div>
                  </div>
                  <div class="headingInfoText-0-1-701">
                    Description (optional)
                  </div>
                  <textarea
                    className="textarea-0-1-732 textAreaDesc-0-1-724"
                    //                     placeholder="Gone are those days when the only skill required was ‘formal education’ to progress for your overall success.
                    // One has to master their communication skills no matter which industry you are serving."
                    onChange={(e) => setNotificationDescription(e.target.value)}
                  />

                  <div
                    class="headingInfoText-0-1-701"
                    style={{ marginBottom: "12px" }}
                  >
                    Image (optional)
                  </div>
                  <div style={styles.uploadImage}>
                    <div className="d-flex p-2" style={styles.insideBox}>
                      <i class="fa-solid fa-upload me-1"></i>{" "}
                      <input
                        accept="image/gif,image/jpeg,image/jpeg,image/png,image/webp,image/vnd.wap.wbmp,image/svg+xml,image/tiff"
                        style={{ display: "none" }}
                        id="icon-button-file"
                        type="file"
                        onChange={(e) => handleBannerImageChange(e)}
                      />
                      <label
                        htmlFor="icon-button-file"
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        Upload Image
                      </label>
                    </div>
                  </div>

                  {bannerImage && (
                    <img
                      className="mt-2"
                      src={URL.createObjectURL(bannerImage)}
                      style={{
                        width: "155px",
                        height: "150px",
                        borderRadius: "5px",
                      }}
                      alt=""
                    />
                  )}

                  {error ? (
                    <span style={{ color: "red", fontSize: "12px" }}>
                      {error}
                    </span>
                  ) : null}
                </div>
              </div>
            ) : selectedOption === "2" ? (
              <div>two</div>
            ) : selectedOption === "3" ? (
              <div>three</div>
            ) : null}
          </>
        );
      case 3:
        return (
          <>
            <>
              {selectedOption === "1" || selectedOption === "2" ? (
                <div className="mt-5 mb-5">
                  <div class="content">
                    <div class="headingInfoText-0-1-701">
                      My campaign title is
                      <span style={{ color: "red" }}>*</span>
                    </div>
                    <br />
                    <div>
                      <input
                        className="input-0-1-501 input-d2-0-1-542"
                        onChange={(e) => setCampaignTitle(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ) : selectedOption === "2" ? (
                <div>two</div>
              ) : selectedOption === "3" ? (
                <div>three</div>
              ) : null}
            </>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="addCourseMain-0-1-698 mt-3 p-5">
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep}>
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
              <Typography
                className="animated-text-container"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#1976d2",
                }}
                sx={{ mt: 2, mb: 1 }}
              >
                <h1 className="animated-icon">
                  <FaRegCircleCheck />
                </h1>
                <h2 className="animated-text ms-2">Ready To Publish</h2>
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Publish Campaign</Button>
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
                  {activeStep === steps.length - 1 ? "Next" : "Next"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </div>
      </Box>
    </div>
  );
}

export default UserAction;
