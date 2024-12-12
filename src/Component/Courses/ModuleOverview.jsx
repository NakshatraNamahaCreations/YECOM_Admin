import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getData } from "../../Api-Service/apiHelper";
import { apiUrl } from "../../Api-Service/apiConstants";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import "./style/mycourses.css";
import { MdVideoLibrary } from "react-icons/md";
import { IoDocumentText } from "react-icons/io5";
import { FcDocument } from "react-icons/fc";
import { FaImage } from "react-icons/fa";
import { Button } from "react-bootstrap";

function ModuleOverview() {
  let location = useLocation();
  let courseDetails = location.state.courseData || null;
  console.log("courseDetails", courseDetails);
  const [allModules, setAllModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  const [enableVideo, setEnableVideo] = useState(false);
  const [enableDocument, setEnableDocument] = useState(false);
  const [enableImage, setEnableImage] = useState(false);

  const [showAddContentModal, setShowAddContentModal] = useState(false);
  const handleOpenAddContentModal = () => setShowAddContentModal(true);
  const handleCloseAddContentModal = () => setShowAddContentModal(false);

  const [allVideos, setAllVideos] = useState([]);
  const [allDocs, setAllDocs] = useState([]);
  const [allImage, setAllImages] = useState([]);

  const handleSelectedModules = (mod) => {
    setSelectedModule(mod);
  };
  console.log("selectedModule", selectedModule);
  console.log("allVideos", allVideos);

  useEffect(() => {
    fetchData();
  }, [selectedModule]);
  const fetchData = async () => {
    try {
      const moduleRes = await getData(
        `${apiUrl.GET_MODULES_BY_COURSE_ID}${courseDetails._id}`
      );
      if (selectedModule && selectedModule._id) {
        // video res
        const videoRes = await getData(`${apiUrl.GET_ALL_VIDEO}`);
        const filterVideoByModuleId = videoRes.data.filter(
          (vid) => vid.moduleId === selectedModule._id
        );
        setAllVideos(filterVideoByModuleId);

        //  document res
        const docsRes = await getData(`${apiUrl.GET_ALL_DOCUMENT}`);
        const filterDocsByModuleId = docsRes.data.filter(
          (vid) => vid.moduleId === selectedModule._id
        );
        setAllDocs(filterDocsByModuleId);

        // image res
        const imageRes = await getData(`${apiUrl.GET_ALL_IMAGE}`);
        const filterImageByModuleId = imageRes.data.filter(
          (vid) => vid.moduleId === selectedModule._id
        );
        setAllImages(filterImageByModuleId);
      }

      setAllModules(moduleRes.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  console.log("allModules", allModules);
  // console.log("allVideos", allVideos);
  console.log("allDocs", allDocs);
  console.log("allImage", allImage);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 2, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 767, min: 464 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <div>
      <div class="headerTitle-0-1-70"> {courseDetails.courseName} </div>
      <br />
      <div className="addCourseMain-0-1-55">
        <div className="row mb-3">
          <div className="col-md-3">
            <div className="root-0-1-1416 flex0-0-1-1408 mt-3">
              <p className="text1-0-1-1417 flex0-0-1-1408">Modules</p>
              <div className="addContentList-0-1-1418">
                {allModules.map((module, index) => (
                  <div
                    className="tooltipWrapper-0-1-1200"
                    key={index}
                    onClick={() => handleSelectedModules(module)}
                  >
                    <span
                      className="text-0-1-1473 text-d125-0-1-2581 flex1-0-1-1407 textTruncate-0-1-1406 root-0-1-1471 addContentListItem-0-1-1419"
                      title={module.moduleTitle}
                    >
                      {module.moduleTitle.substring(0, 15) + "..."}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="mt-4">
              <div className="text1-0-1-1417 flex0-0-1-1408">
                Video ({allVideos.length})
              </div>
              {allVideos.length === 0 ? (
                <div className="p-4 text-center">
                  <div className="d-flex justify-center">
                    <MdVideoLibrary color="grey" size={50} />
                  </div>
                  <div style={{ color: "gray" }}>
                    No Video Available for this Module.
                  </div>
                </div>
              ) : (
                <Carousel
                  responsive={responsive}
                  autoPlay={false}
                  swipeable={true}
                  draggable={true}
                  // showDots={true}
                  infinite={true}
                  partialVisible={false}
                  dotListClass="custom-dot-list-style"
                >
                  {allVideos.map((video, index) => {
                    const videoId = video.videoLink.split("v=")[1];
                    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
                    return (
                      <div className="courseCard-0-1-330">
                        <div className="courseCardImage-0-1-334">
                          <div className="slider" key={index}>
                            <iframe
                              width="266px"
                              height="183px"
                              style={{
                                borderTopLeftRadius: "16px",
                                borderTopRightRadius: "16px",
                              }}
                              src={embedUrl}
                              title={video.name}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </div>
                        </div>
                        <div className="courseOverViewCardContent-0-1-335">
                          <div className="courseCardTitle-0-1-336">
                            {video.name}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </Carousel>
              )}
              <br />
              <div className="text1-0-1-1417 flex0-0-1-1408">
                Documents ({allDocs.length})
              </div>
              {allDocs.length === 0 ? (
                <div className="p-4 text-center">
                  <div className="d-flex justify-center">
                    <IoDocumentText color="grey" size={50} />
                  </div>
                  <div style={{ color: "gray" }}>
                    No Document Available for this Module.
                  </div>
                </div>
              ) : (
                <Carousel
                  responsive={responsive}
                  autoPlay={false}
                  swipeable={true}
                  draggable={true}
                  // showDots={true}
                  infinite={true}
                  partialVisible={false}
                  dotListClass="custom-dot-list-style"
                >
                  {allDocs.map((doc, index) => {
                    return (
                      <div className="courseCard-0-1-330" key={index}>
                        <a
                          href={`${apiUrl.IMAGEURL}/document-module/${doc.document}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: "none" }}
                        >
                          <div className="courseCardDocsImage-0-1-334">
                            <div className="docs-slider" key={index}>
                              <FcDocument style={{ fontSize: "130px" }} />
                            </div>
                          </div>
                          <div className="courseOverViewdocumentCardContent-0-1-335">
                            <div
                              className="courseCardTitle-0-1-336"
                              style={{ color: "black" }}
                              title={doc.name}
                            >
                              {doc.name}
                            </div>
                          </div>
                        </a>
                      </div>
                    );
                  })}
                </Carousel>
              )}
              <br />
              <div className="text1-0-1-1417 flex0-0-1-1408">
                Images ({allImage.length})
              </div>
              {allImage.length === 0 ? (
                <div className="p-4 text-center">
                  <div className="d-flex justify-center">
                    <FaImage color="grey" size={50} />
                  </div>
                  <div style={{ color: "gray" }}>
                    No Images Available for this Module.
                  </div>
                </div>
              ) : (
                <Carousel
                  responsive={responsive}
                  autoPlay={false}
                  swipeable={true}
                  draggable={true}
                  // showDots={true}
                  infinite={true}
                  partialVisible={false}
                  dotListClass="custom-dot-list-style"
                >
                  {allImage.map((doc, index) => {
                    return (
                      <div className="courseCard-0-1-330" key={index}>
                        <div className="courseOverViewCardContent-0-1-334">
                          <div className="docs-slider" key={index}>
                            <img
                              src={`${apiUrl.IMAGEURL}/image/${doc.image}`}
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="courseOverViewdocumentCardContent-0-1-335">
                          <div
                            className="courseCardTitle-0-1-336"
                            style={{ color: "black" }}
                            title={doc.name}
                          >
                            {doc.name}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </Carousel>
              )}
            </div>
            <div className="footerNavContainer-0-1-444 footerNavContainer-d0-0-1-457">
              <Button
                className="px-5 py-2"
                variant="outline-info"
                onClick={() => window.location.assign("/courses/course-list")}
              >
                <i class="fa-solid fa-arrow-left-long"></i> &nbsp; Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModuleOverview;
