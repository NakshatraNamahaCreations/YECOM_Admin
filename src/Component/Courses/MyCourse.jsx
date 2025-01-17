import React, { useEffect, useState } from "react";
import "./style/mycourses.css";
import { getData, postFormData } from "../../Api-Service/apiHelper";
import { apiUrl } from "../../Api-Service/apiConstants";
import { useNavigate } from "react-router-dom";

function MyCourse() {
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
    courseCardTag: {
      color: "rgb(255, 255, 255)",
      background: "rgb(253, 179, 6)",
      display: "flex",
      alignItems: "center",
      gap: "4px",
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
  };
  const Navigate = useNavigate();
  const [allCourse, setAllCourse] = useState([]);
  const [searchCourse, setSearchCourse] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const appResponse = await getData(apiUrl.GET_All_COURSE);
      setAllCourse(appResponse.data);
      // const webResponse = await getData(apiUrl.GET_WEB_BANNER);
      // setBannerData1(webResponse.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // console.log("allCourse", allCourse);

  const filterCourse = allCourse.filter((course) =>
    course.courseName.toLowerCase().includes(searchCourse)
  );

  const navigateToCourseOverview = (course) => {
    // Navigate(
    //   `/courses/course-overview/${courseId}/${encodeURIComponent(couserTitle)}`
    // );
    Navigate("/courses/course-overview", {
      state: {
        course,
      },
    });
  };
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
            onChange={(e) => setSearchCourse(e.target.value)}
          />
        </div>
        <div className="">
          <button
            style={styles.createCourseBtn}
            onClick={() => window.location.assign("/courses/add")}
          >
            Create Course
          </button>
        </div>
      </div>
      <div className="mt-3">
        <div className="row">
          {allCourse.length === 0 ? (
            <div className="mt-5">
              <div class="container-0-1-2782" id="foldersListID">
                <img
                  src="https://www.freeiconspng.com/uploads/training-icon-19.png"
                  width="350"
                  alt="img"
                  style={{ mixBlendMode: "luminosity" }}
                />
                <div class="heading-0-1-2783">No Courses Added</div>
                <div class="description-0-1-2784">
                  Add course to be shown to students on your app
                </div>
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
              {filterCourse.map((ele, index) => (
                <div
                  className="col-md-3 mb-4"
                  key={index}
                  onClick={() => navigateToCourseOverview(ele)}
                >
                  <div className="courseCard-0-1-330">
                    {ele.courseFeature === true && (
                      <div
                        className="courseCardTag-0-1-331"
                        style={styles.courseCardTag}
                      >
                        <i className="fa-solid fa-star"></i> Featured Course
                      </div>
                    )}
                    <div className="courseCardImage-0-1-334">
                      <img
                        className="courseCardImage-0-1-334"
                        src={`${apiUrl.IMAGEURL}/course/${ele.thumbnailImage}`}
                        alt=""
                      />
                    </div>
                    <div className="courseCardContent-0-1-335">
                      <div className="courseCardTitle-0-1-336">
                        {ele.courseName}
                      </div>
                      <div className="courseCreatedBy-0-1-338">
                        Created by: You(Owner)
                      </div>
                      <div className="courseCardTags-0-1-333">
                        {ele.durationType}
                      </div>
                      <br />
                      <div className="courseCardPriceSection-0-1-337">
                        <div
                          style={{
                            color: "rgb(10, 22, 41)",
                            fontWeight: "700",
                          }}
                        >
                          ₹ {ele.effectivePrice}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyCourse;
