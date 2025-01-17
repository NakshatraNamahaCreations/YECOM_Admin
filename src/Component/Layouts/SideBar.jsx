import React from "react";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
// import { FaBarsStaggered, FaBookOpen } from "react-icons";
import { RiDashboardFill } from "react-icons/ri";
import { FaBookOpen, FaGlobe, FaUserAlt, FaUserFriends } from "react-icons/fa";
import {
  FaNoteSticky,
  FaMobileRetro,
  FaUniversalAccess,
} from "react-icons/fa6";
import { BsFillChatQuoteFill } from "react-icons/bs";
import { SiGoogleanalytics } from "react-icons/si";
import {
  MdCampaign,
  MdOutlineElectricalServices,
  MdOutlinePayment,
} from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { IoIosPricetags } from "react-icons/io";

function SideBar() {
  const user = JSON.parse(localStorage.getItem("ecomAdmin"));
  console.log("user in navbar", user);
  const location = useLocation();
  const { pathname } = location;
  // console.log("pathname", pathname);
  const getBorderLeft = (path) => {
    return pathname === path ? "2px solid #00007c6b" : "";
  };
  const getColor = (path) => {
    return pathname === path ? "rgb(0, 0, 124)" : "";
  };
  const getBorderRadius = (path) => {
    return pathname === path ? "25px" : "";
  };
  const getBackgroundColor = (path) => {
    return pathname === path ? "#00007c6b" : "";
  };
  return (
    <div>
      <Sidebar>
        <Menu>
          <div style={{ padding: "24px 0px", textAlign: "center" }}>
            <h3 style={{ color: "#00007c" }}>Proleverage</h3>
          </div>
          {/* Dashboard===================== */}
          <MenuItem
            className="sidebar-font-menu"
            component={<Link to="/dashboard" />}
            icon={<RiDashboardFill className="sidebar-icons" />}
            style={{
              borderLeft: getBorderLeft("/dashboard"),
              color: getColor("/dashboard"),
              // borderRadius: getBorderRadius("/dashboard"),
            }}
          >
            Dashboard
          </MenuItem>
          {/* <SubMenu
            className="sidebar-font-menu"
            label="Website"
            icon={<FaGlobe className="sidebar-icons" />}
            // style={{ borderLeft: getBorderLeft(pathname) }}
          >
            <MenuItem
              className="sidebar-font-submenu"
              component={<Link to="/website/manage-pages" />}
              style={{
                borderLeft: getBorderLeft("/website/manage-pages"),
                color: getColor("/website/manage-pages"),
                // borderRadius: getBorderRadius("/website/manage-pages"),
              }}
            >
              Manage Pages
            </MenuItem> */}
          {/* <MenuItem
              className="sidebar-font-submenu"
              component={<Link to="#" />}
              style={{
                borderLeft: getBorderLeft("#"),
                color: getColor("#"),
                // borderRadius: getBorderRadius("#"),
              }}
            >
              Domain Integrations
            </MenuItem> */}
          {/* </SubMenu> */}
          {/* Courses===================== */}
          {user.course && (
            <SubMenu
              className="sidebar-font-menu"
              label="Courses"
              icon={<FaBookOpen className="sidebar-icons" />}
            >
              <MenuItem
                className="sidebar-font-submenu"
                component={<Link to="/courses/course-list" />}
                style={{
                  borderLeft: getBorderLeft("/courses/course-list"),
                  color: getColor("/courses/course-list"),
                  // borderRadius: getBorderRadius("#"),
                }}
              >
                My Courses
              </MenuItem>

              {/* <MenuItem
              className="sidebar-font-submenu"
              component={<Link to="#" />}
            >
              Global Courses
            </MenuItem> */}
              {/* <MenuItem
              className="sidebar-font-submenu"
              component={<Link to="/courses/manage-coupons" />}
              style={{
                borderLeft: getBorderLeft("/courses/manage-coupons"),
                color: getColor("/courses/manage-coupons"),
                // borderRadius: getBorderRadius("#"),
              }}
            >
              Manage Coupon
            </MenuItem> */}
              {/* <MenuItem
              className="sidebar-font-submenu"
              component={<Link to="#" />}
            >
              Backend Addition
            </MenuItem> */}
            </SubMenu>
          )}
          {/* Content===================== */}
          {/* <SubMenu
            className="sidebar-font-menu"
            label="Content"
            icon={<FaNoteSticky className="sidebar-icons" />}
          >
            <MenuItem
              className="sidebar-font-submenu"
              component={<Link to="/content/free-material" />}
              style={{
                borderLeft: getBorderLeft("/content/free-material"),
                color: getColor("/content/free-material"),
                // borderRadius: getBorderRadius("#"),
              }}
            >
              Free Material
            </MenuItem>
          </SubMenu> */}

          {/* Your App===================== */}
          {user.banner || user.youtubeVideo || user.broadcast ? (
            <SubMenu
              className="sidebar-font-menu"
              label="User App"
              icon={<FaMobileRetro className="sidebar-icons" />}
            >
              {/* <MenuItem
              className="sidebar-font-submenu"
              component={<Link to="#" />}
            >
              Configure App
            </MenuItem> */}
              {user.banner && (
                <MenuItem
                  className="sidebar-font-submenu"
                  component={<Link to="/app/manage-banners" />}
                  style={{
                    borderLeft: getBorderLeft("/app/manage-banners"),
                    color: getColor("/app/manage-banners"),
                    // borderRadius: getBorderRadius("#"),
                  }}
                >
                  Manage Banners
                </MenuItem>
              )}
              {user.youtubeVideo && (
                <MenuItem
                  className="sidebar-font-submenu"
                  component={<Link to="/app/youtube-video" />}
                  style={{
                    borderLeft: getBorderLeft("/app/youtube-video"),
                    color: getColor("/app/youtube-video"),
                    // borderRadius: getBorderRadius("#"),
                  }}
                >
                  Youtube Video
                </MenuItem>
              )}
              {user.broadcast && (
                <MenuItem
                  className="sidebar-font-submenu"
                  component={<Link to="/app/broadcasting" />}
                  style={{
                    borderLeft: getBorderLeft("/app/broadcasting"),
                    color: getColor("/app/broadcasting"),
                    // borderRadius: getBorderRadius("#"),
                  }}
                >
                  Broadcast
                </MenuItem>
              )}
              {/* <MenuItem
              className="sidebar-font-submenu"
              component={<Link to="/app/in-app-notification" />}
              style={{
                borderLeft: getBorderLeft("/app/in-app-notification"),
                color: getColor("/app/in-app-notification"),
                // borderRadius: getBorderRadius("#"),
              }}
            >
              In App Notification
            </MenuItem> */}
            </SubMenu>
          ) : null}
          {/* <MenuItem
            className="sidebar-font-menu"
            component={<Link to="/dashboard" />}
            icon={<FaUserFriends className="sidebar-icons" />}
          >
            1:1 Sessions
          </MenuItem> */}

          {/* <MenuItem
            className="sidebar-font-menu"
            component={<Link to="/dashboard" />}
            icon={<SiGoogleanalytics className="sidebar-icons" />}
          >
            Analytics
          </MenuItem> */}
          {user.payment && (
            <MenuItem
              className="sidebar-font-menu"
              component={<Link to="/users/payments" />}
              icon={<MdOutlinePayment className="sidebar-icons" />}
              style={{
                borderLeft: getBorderLeft("/users/payments"),
                color: getColor("/users/payments"),
              }}
            >
              Payments
            </MenuItem>
          )}
          {user.tryToBook && (
            <MenuItem
              className="sidebar-font-menu"
              component={<Link to="/users/try-to-booking" />}
              icon={<TbReportAnalytics className="sidebar-icons" />}
              style={{
                borderLeft: getBorderLeft("/users/try-to-booking"),
                color: getColor("/users/try-to-booking"),
              }}
            >
              Try to Booking
            </MenuItem>
          )}
          {/* <SubMenu
            className="sidebar-font-menu"
            label="User"
            icon={<MdCampaign className="sidebar-icons" />}
          >
            <MenuItem
              className="sidebar-font-menu"
              component={<Link to="/people/users" />}
              style={{
                borderLeft: getBorderLeft("/people/users"),
                color: getColor("/people/users"), 
              }}
            >
              User List
            </MenuItem>
            <MenuItem
              className="sidebar-font-menu"
              component={<Link to="/users/payments" />}
              style={{
                borderLeft: getBorderLeft("/users/payments"),
                color: getColor("/users/payments"),
                // borderRadius: getBorderRadius("#"),
              }}
            >
              Payments
            </MenuItem>
          </SubMenu> */}
          {/* chat================================ */}
          {user.chat && (
            <MenuItem
              className="sidebar-font-menu"
              component={<Link to="/chat" />}
              icon={<BsFillChatQuoteFill className="sidebar-icons" />}
              style={{
                borderLeft: getBorderLeft("/chat"),
                color: getColor("/chat"),
                // borderRadius: getBorderRadius("#"),
              }}
            >
              Chat
            </MenuItem>
          )}
          {user.pricing && (
            <MenuItem
              className="sidebar-font-menu"
              component={<Link to="/pricing" />}
              icon={<IoIosPricetags className="sidebar-icons" />}
              style={{
                borderLeft: getBorderLeft("/pricing"),
                color: getColor("/pricing"),
                // borderRadius: getBorderRadius("#"),
              }}
            >
              Pricing
            </MenuItem>
          )}
          {/* People===================== */}
          {user.team || user.campaign ? (
            <SubMenu
              className="sidebar-font-menu"
              label="Marketing"
              icon={<MdCampaign className="sidebar-icons" />}
            >
              {user.team && (
                <MenuItem
                  className="sidebar-font-submenu"
                  component={<Link to="/people/team-members" />}
                  style={{
                    borderLeft: getBorderLeft("/people/team-members"),
                    color: getColor("/people/team-members"),
                  }}
                >
                  Team Members
                </MenuItem>
              )}
              {user.campaign && (
                <MenuItem
                  className="sidebar-font-menu"
                  component={<Link to="/campaigns/list" />}
                  style={{
                    borderLeft: getBorderLeft("/campaigns/list"),
                    color: getColor("/campaigns/list"),
                    // borderRadius: getBorderRadius("#"),
                  }}
                >
                  Campaigns(Push notifications)
                </MenuItem>
              )}
            </SubMenu>
          ) : null}
          {/* student */}

          {/* <SubMenu
            className="sidebar-font-menu"
            label="Self Service"
            icon={<MdOutlineElectricalServices className="sidebar-icons" />}
          >
            <MenuItem
              className="sidebar-font-submenu"
              component={<Link to="#" />}
            >
              Add Students
            </MenuItem>
          </SubMenu> */}

          {/* <MenuItem
            className="sidebar-font-menu"
            component={<Link to="/dashboard" />}
            icon={<FaUniversalAccess className="sidebar-icons" />}
          >
            User Controls
          </MenuItem> */}
        </Menu>
      </Sidebar>
    </div>
  );
}

export default SideBar;
