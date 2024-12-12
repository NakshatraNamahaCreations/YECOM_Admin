const apiUrl = {
  BASEURL: "https://api.proleverageadmin.in/api",
  IMAGEURL: "https://api.proleverageadmin.in/",
  GET_WEB_BANNER: "/banner/getwebbanner",
  GET_APP_BANNER: "/banner/getappbanner",
  CREATE_BANNERS: "/banner/createbanner",

  CREATE_YOUTUBE_VIDEO: "/youtube/addvideo",
  GET_ALL_YOUTUBE_VIDEOS: "/youtube/getallvideo",
  DELETE_YOUTUBE_VIDEOS: "/youtube/deletevideo/",

  EDIT_BANNERS: "/banner/updatebanner/",
  DELETE_BANNERS: "/banner/deletebanner/",
  CREATE_COURSE: "/mycourse/addcourse",
  UPDATE_COURSE: "/mycourse/updatecourse/",
  MAKE_COURSE_FEATURED: "/mycourse/markcoursefeatured/",
  REMOVE_COURSE_FEATURED: "/mycourse/removecoursefeatured/",
  COURSE_PUBLISH: "/mycourse/coursepublish/",
  COURSE_UNPUBLISH: "/mycourse/courseunpublish/",
  GET_PARTICULAR_COURSE: "/mycourse/getcoursebyid/",
  GET_All_COURSE: "/mycourse/getallcourses",
  DELETE_COURSE: "/mycourse/deletecourse/",
  ADD_RESOURCES: "/mycourse/addresources/",
  ADD_IMPORTANT_REQ: "/mycourse/addimportantrequirement/",
  DELETE_RESOURCE_OR_REQ: "/mycourse/deleteresourcesorimportantreq/",
  ADD_MODULES: "/coursemodule/addmodules",
  GET_MODULES_BY_COURSE_ID: "/coursemodule/getmodulesbycourseid/",
  GET_ALL_MODULES: "/coursemodule/getallmodules",
  ADD_VIDEO_MODULES: "/video-module/addvideoformodule",
  GET_ALL_VIDEO: "/video-module/getallvideos",
  GET_VIDEO_BY_MODULE_ID: "/video-module/getvideobymoduleid/",
  ADD_DOCUMENT_MODULES: "/document-module/adddocumentformodule",
  GET_ALL_BY_DOCUMENT: "/document-module/getdocumentbymoduleid",
  GET_ALL_DOCUMENT: "/document-module/getalldocuments",
  ADD_IMAGE_MODULES: "/image-module/addimageformodule",
  GET_ALL_IMAGE: "/image-module/getallimages",
  ADD_ZIP_MODULES: "/zip-module/addzipformodule",
  GET_ALL_ZIP: "/zip-module/getallzip",
  ADD_COUPON: "/coupon/addcoupon",
  GET_ALL_COUPON: "/coupon/getallcoupon",
  DELETE_COUPON: "/coupon/deletecoupon/",
  ACTIVE_COUPON: "/coupon/makecouponactive/",
  INACTIVE_COUPON: "/coupon/makecouponinactive/",
  APPLY_COUPON_FOR_COURSE: "/coupon/applycouponforcourse/",
  REMOVE_COURSE_FROM_COUPON: "/coupon/deletecoursefromcoupon/",
  ADD_FREEMATERIAL_DOCUMENT: "/freematerial-document/adddocuments",
  GET_FREEMATERIAL_DOCUMENT: "/freematerial-document/getalldocument",
  DELETE_FREEMATERIAL_DOCUMENT: "/freematerial-document/deletedocuments/",
  DELETE_FREEMATERIAL_VIDEO: "/freematerial-video/deletevideo/",
  ADD_FREEMATERIAL_VIDEO: "/freematerial-video/addlink",
  GET_FREEMATERIAL_VIDEO: "/freematerial-video/getallvideo",
  ADD_TEAMMEMBER: "/team/addteammember",
  GET_PARTICULAR_MEMBER: "/team/getteammember/",
  GET_ALL_TEAMMEMBER: "/team/getallteammembers",
  UPDATE_TEAM_MEMBER: "/team/updateteammember/",
  DETELE_TEAMMEMBER: "/team/deleteteammember/",
  GET_ALL_USER: "/users/getallusers",
  GET_PARTICULAR_USER: "/user/getparticularuser/",
  PURCHASE_COURSE: "/user/purchasecourse/",
  USER_PAYMENTS: "/payment/alluser/",
  CONTINUE_WATCHING: "/user/continuewatching/",
  START_MESSAGE: "/user/startconversations/",
  CREATE_CAMPAIGN: "/notification/createcampaign",
  CREATE_NOTIFICATION: "/notification/createnotifications/",
  GET_ALL_NOTIFICATIONS: "/notification/getallnotifications",
  DELETE_NOTIFICATIONS: "/notification/deletenotification/",
  ADD_PLAN: "/plans/addplan",
  GET_PLAN: "/plans/getallplan",
  DELETE_PLAN: "/plans/deleteplan/",
  UPDATE_PLAN: "/plans/updatedplan/",
  CREATE_BROADCAST: "/broadcasting/createbroadcast",
  GET_ALL_BROADCAST: "/broadcasting/getallbroadcast",
  DELETE_BROADCAST: "/broadcasting/deletebroadcast/",
};

export { apiUrl };
