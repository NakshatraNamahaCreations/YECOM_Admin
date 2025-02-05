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
import { IoLogOutOutline } from "react-icons/io5";

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

  const logoutUser = () => {
    localStorage.removeItem("ecomAdmin");
    window.location.assign("/");
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

          {user.Courses && (
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
                }}
              >
                My Courses
              </MenuItem>
            </SubMenu>
          )}

          {/* Your App===================== */}
          {/* {user.banner || user.youtubeVideo || user.broadcast ? ( */}
          {user.userapp && (
            <SubMenu
              className="sidebar-font-menu"
              label="User App"
              icon={<FaMobileRetro className="sidebar-icons" />}
            >
              {/* {user.banner && ( */}
              <MenuItem
                className="sidebar-font-submenu"
                component={<Link to="/app/manage-banners" />}
                style={{
                  borderLeft: getBorderLeft("/app/manage-banners"),
                  color: getColor("/app/manage-banners"),
                }}
              >
                Manage Banners
              </MenuItem>
              {/* )} */}
              {/* {user.youtubeVideo && ( */}
              <MenuItem
                className="sidebar-font-submenu"
                component={<Link to="/app/youtube-video" />}
                style={{
                  borderLeft: getBorderLeft("/app/youtube-video"),
                  color: getColor("/app/youtube-video"),
                }}
              >
                Youtube Video
              </MenuItem>
              {/* )} */}
              {/* {user.broadcast && ( */}
              <MenuItem
                className="sidebar-font-submenu"
                component={<Link to="/app/broadcasting" />}
                style={{
                  borderLeft: getBorderLeft("/app/broadcasting"),
                  color: getColor("/app/broadcasting"),
                }}
              >
                Broadcast
              </MenuItem>
              {/* )} */}
            </SubMenu>
            // ) : null}
          )}

          {user.Payments && (
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

          {user.People && (
            <SubMenu
              className="sidebar-font-menu"
              label="People"
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
            </SubMenu>
          )}

          {user.Chat && (
            <MenuItem
              className="sidebar-font-menu"
              component={<Link to="/chat" />}
              icon={<BsFillChatQuoteFill className="sidebar-icons" />}
              style={{
                borderLeft: getBorderLeft("/chat"),
                color: getColor("/chat"),
              }}
            >
              Chat
            </MenuItem>
          )}

          {user.Coupon && (
            <MenuItem
              className="sidebar-font-menu"
              component={<Link to="/coupons" />}
              icon={<BsFillChatQuoteFill className="sidebar-icons" />}
              style={{
                borderLeft: getBorderLeft("/coupons"),
                color: getColor("/coupons"),
              }}
            >
              Coupons
            </MenuItem>
          )}

          {user.Pricing && (
            <MenuItem
              className="sidebar-font-menu"
              component={<Link to="/pricing" />}
              icon={<IoIosPricetags className="sidebar-icons" />}
              style={{
                borderLeft: getBorderLeft("/pricing"),
                color: getColor("/pricing"),
              }}
            >
              Pricing
            </MenuItem>
          )}

          {/* {user.team || user.campaign ? ( */}
          {user.Marketing && (
            <SubMenu
              className="sidebar-font-menu"
              label="Marketing"
              icon={<MdCampaign className="sidebar-icons" />}
            >
              {/* {user.campaign && ( */}
              <MenuItem
                className="sidebar-font-menu"
                component={<Link to="/campaigns/list" />}
                style={{
                  borderLeft: getBorderLeft("/campaigns/list"),
                  color: getColor("/campaigns/list"),
                }}
              >
                Campaigns(Push notifications)
              </MenuItem>
              {/* )} */}
            </SubMenu>
            // ) : null}
          )}

          {user.Paymentkey && (
            <MenuItem
              className="sidebar-font-menu"
              component={<Link to="/paymentkey" />}
              icon={<MdOutlinePayment className="sidebar-icons" />}
              style={{
                borderLeft: getBorderLeft("/paymentkey"),
                color: getColor("/paymentkey"),
              }}
            >
              Paymentkey
            </MenuItem>
          )}

          <MenuItem
            className="sidebar-font-menu"
            icon={<IoLogOutOutline className="sidebar-icons" />}
            onClick={logoutUser}
          >
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}

export default SideBar;
