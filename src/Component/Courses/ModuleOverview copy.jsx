import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getData } from "../../Api-Service/apiHelper";
import { apiUrl } from "../../Api-Service/apiConstants";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import "./style/mycourses.css";

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

  useEffect(() => {
    fetchData();
  }, [selectedModule]);
  const fetchData = async () => {
    try {
      const moduleRes = await getData(
        `${apiUrl.GET_MODULES_BY_COURSE_ID}${courseDetails._id}`
      );
      if (selectedModule && selectedModule._id) {
        const videoRes = await getData(`${apiUrl.GET_ALL_VIDEO}`);
        const filterVideoByModuleId = videoRes.data.filter(
          (vid) => vid.moduleId === selectedModule._id
        );
        setAllVideos(filterVideoByModuleId);
      }
      const docsRes = await getData(`${apiUrl.GET_ALL_DOCUMENT}`);

      const imageRes = await getData(`${apiUrl.GET_ALL_IMAGE}`);
      setAllImages(imageRes.data);
      setAllDocs(docsRes.data);

      setAllModules(moduleRes.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  console.log("allModules", allModules);
  console.log("allVideos", allVideos);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 4, // optional, default to 1.
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
  const sliderImageUrl = [
    //First image url
    {
      url: "https://i2.wp.com/www.geeksaresexy.net/wp-content/uploads/2020/04/movie1.jpg?resize=600%2C892&ssl=1",
    },
    {
      url: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-kids-movies-2020-call-of-the-wild-1579042974.jpg?crop=0.9760858955588091xw:1xh;center,top&resize=480:*",
    },
    //Second image url
    {
      url: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-movies-for-kids-2020-sonic-the-hedgehog-1571173983.jpg?crop=0.9871668311944719xw:1xh;center,top&resize=480:*",
    },
    //Third image url
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQS82ET2bq9oTNwPOL8gqyoLoLfeqJJJWJmKQ&usqp=CAU",
    },

    //Fourth image url

    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTdvuww0JDC7nFRxiFL6yFiAxRJgM-1tvJTxA&usqp=CAU",
    },
  ];
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
                <Carousel
                  responsive={responsive}
                  autoPlay={true}
                  swipeable={true}
                  draggable={true}
                  showDots={true}
                  infinite={true}
                  partialVisible={false}
                  dotListClass="custom-dot-list-style"
                >
                  {sliderImageUrl.map((imageUrl, index) => {
                    return (
                      <div className="slider" key={index}>
                        <img src={imageUrl.url} alt="movie" />
                      </div>
                    );
                  })}
                </Carousel>
                {/* <div className="tooltipWrapper-0-1-1200 undefined">
                  <span className="text-0-1-1473 text-d125-0-1-2581 flex1-0-1-1407 textTruncate-0-1-1406 root-0-1-1471 addContentListItem-0-1-1419">
                    Video
                  </span>
                </div> */}
                {/* <div class="tooltipWrapper-0-1-1200 undefined">
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
                    </div> */}
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="mt-4">
              <div className="text1-0-1-1417 flex0-0-1-1408">Video</div>

              {/* <Slider {...settings}>
                {allVideos.map((video, index) => (
                  <div key={index} className="p-3">
                 
                    <iframe
                      style={{ width: "100%" }}
                      src={`https://www.youtube.com/embed/${video.videoLink
                        .split("/")
                        .pop()}`}
                      title={video.name}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                  </div>
                ))}
              </Slider> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModuleOverview;
