// import Login from './pages/Login';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Regsiter from './pages/Regsiter';
// import Home from './pages/Home';
// import Start from './components/Start';

// function App() {
//   return (
//     <div className="bg-[#F8F4EA]">
//       <Router>
//         <Routes>
//           <Route exact path="/login" element={<Login />} />
//           <Route exact path="/register" element={<Regsiter />} />
//           <Route exact path="/chats" element={<Home />} />
//           <Route exact path="/" element={<Start />} />
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Component/Layouts/Layout";
import Dashboard from "./Component/Dashboard";
import Login from "./Component/Auth/Login";
import "./App.css";
import ManagePages from "./Component/Website/ManagePages";
import Header from "./Component/Layouts/Header";
import MyCourse from "./Component/Courses/MyCourse";
import AddCourse from "./Component/Courses/AddCourse";
import ManageBanners from "./Component/YourApp/ManageBanners";
import ManageCoupons from "./Component/Courses/ManageCoupons";
import FreeMaterial from "./Component/Content/FreeMaterial";
import AddDocument from "./Component/Content/AddDocument";
import Campaign from "./Component/Campaigns/Campaign";
import CreateCampaign from "./Component/Campaigns/CreateCampaign";
import UserAction from "./Component/Campaigns/UserAction";
import AddModules from "./Component/Courses/AddModules";
import AddVideo from "./Component/Content/AddVideo";
import CourseOverview from "./Component/Courses/CourseOverview";
import ModuleOverview from "./Component/Courses/ModuleOverview";
import Users from "./Component/Peoples/User/Users";
import UserProfile from "./Component/Peoples/User/UserProfile";
import TeamMember from "./Component/Peoples/Team/TeamMember";
import AddTeam from "./Component/Peoples/Team/AddTeam";
import EditTeam from "./Component/Peoples/Team/EditTeam";
import StartChat from "./Component/Chat/StartChat";
import AddResources from "./Component/Courses/AddResources";
import YoutubeVideo from "./Component/YourApp/YoutubeVideo";
import Chat from "./Component/Chat/chat";
import BroadCating from "./Component/YourApp/BroadCating";
import Home from "./pages/Home";
import Regsiter from "./pages/Regsiter";
import Payments from "./Component/Peoples/User/Payments";
import TryToBooking from "./Component/Peoples/User/TryToBooking";
import Pricing from "./Component/Content/Pricing";
import AddContent from "./Component/Courses/AddContent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* dashboard */}
        <Route
          path="/dashboard"
          element={
            <Layout
              Children={
                <>
                  <Header />
                  <Dashboard />
                </>
              }
            />
          }
        />
        <Route exact path="/chats" element={<Home />} />
        {/* website */}
        <Route
          path="/website/manage-pages"
          element={
            <Layout
              Children={
                <>
                  <Header />
                  <ManagePages />
                </>
              }
            />
          }
        />
        {/* Course */}
        <Route
          path="/courses/course-list"
          element={
            <Layout
              Children={
                <>
                  <Header />
                  <MyCourse />
                </>
              }
            />
          }
        />
        <Route
          path="/courses/add"
          element={
            <Layout
              Children={
                <>
                  <Header />
                  <AddCourse />
                </>
              }
            />
          }
        />
        <Route
          path="/courses/course-overview"
          element={
            <Layout
              Children={
                <>
                  <Header />
                  <CourseOverview />
                </>
              }
            />
          }
        />
        <Route
          path="/courses/add-resource/:objectId/:couserTitle"
          element={
            <Layout
              Children={
                <>
                  <Header />
                  <AddResources />
                </>
              }
            />
          }
        />
        <Route
          path="/courses/add-modules/:objectId/:couserTitle"
          element={
            <Layout
              Children={
                <>
                  <Header />
                  <AddModules />
                </>
              }
            />
          }
        />
        <Route
          path="/courses/add-contents/:objectId/:couserTitle"
          element={
            <Layout
              Children={
                <>
                  <Header />
                  <AddContent />
                </>
              }
            />
          }
        />
        <Route
          path="/courses/modules-overview"
          element={
            <Layout
              Children={
                <>
                  <Header />
                  <ModuleOverview />
                </>
              }
            />
          }
        />
        <Route
          path="/courses/manage-coupons"
          element={
            <Layout
              Children={
                <>
                  <Header />
                  <ManageCoupons />
                </>
              }
            />
          }
        />
        {/* Your App */}
        <Route
          path="/app/manage-banners"
          element={
            <Layout
              Children={
                <>
                  <Header />
                  <ManageBanners />
                </>
              }
            />
          }
        />
        <Route
          path="/app/youtube-video"
          element={
            <Layout
              Children={
                <>
                  <Header />
                  <YoutubeVideo />
                </>
              }
            />
          }
        />
        <Route
          path="/app/broadcasting"
          element={
            <Layout
              Children={
                <>
                  <Header />
                  <BroadCating />
                </>
              }
            />
          }
        />

        {/* Content */}
        <Route
          path="/content/free-material"
          element={
            <Layout
              Children={
                <>
                  <Header />
                  <FreeMaterial />
                </>
              }
            />
          }
        />
        <Route
          path="/free-material/add-document"
          element={
            <Layout
              Children={
                <>
                  <Header />
                  <AddDocument />
                </>
              }
            />
          }
        />
        <Route
          path="/free-material/add-video"
          element={
            <Layout
              Children={
                <>
                  <Header />
                  <AddVideo />
                </>
              }
            />
          }
        />
        {/* Campaign */}
        <Route
          path="/campaigns/list"
          element={
            <Layout
              Children={
                <>
                  <Header />
                  <Campaign />
                </>
              }
            />
          }
        />
        <Route
          path="/campaigns/create"
          element={
            <Layout
              Children={
                <>
                  <Header />
                  <CreateCampaign />
                </>
              }
            />
          }
        />
        <Route
          path="/campaigns/create/useractioncampaign/channel/:objectId"
          element={
            <Layout
              Children={
                <>
                  <Header />
                  <UserAction />
                </>
              }
            />
          }
        />
        {/* Peoples */}
        <Route
          path="/people/users"
          element={
            <Layout
              Children={
                <>
                  <Header />
                  <Users />
                </>
              }
            />
          }
        />
        <Route
          path="/users/payments"
          element={
            <Layout
              Children={
                <>
                  <Header />
                  <Payments />
                </>
              }
            />
          }
        />
        <Route
          path="/users/try-to-booking"
          element={
            <Layout
              Children={
                <>
                  <Header />
                  <TryToBooking />
                </>
              }
            />
          }
        />
        <Route
          path="/people/users-profile"
          element={
            <Layout
              Children={
                <>
                  <Header />
                  <UserProfile />
                </>
              }
            />
          }
        />
        {/* Teams */}
        <Route
          path="/people/team-members"
          element={
            <Layout
              Children={
                <>
                  <Header />
                  <TeamMember />
                </>
              }
            />
          }
        />
        <Route
          path="/people/team-members/create"
          element={
            <Layout
              Children={
                <>
                  <Header />
                  <AddTeam />
                </>
              }
            />
          }
        />
        <Route
          path="/people/team-member-profile"
          element={
            <Layout
              Children={
                <>
                  <Header />
                  <EditTeam />
                </>
              }
            />
          }
        />

        <Route exact path="/register" element={<Regsiter />} />
        {/* chat */}
        <Route
          path="/chat"
          element={
            <Layout
              Children={
                <>
                  <Header />
                  <Home />
                </>
              }
            />
          }
        />
        <Route
          path="/cchat"
          element={
            <Layout
              Children={
                <>
                  <Header />
                  <Chat />
                </>
              }
            />
          }
        />
        <Route
          path="/pricing"
          element={
            <Layout
              Children={
                <>
                  <Header />
                  <Pricing />
                </>
              }
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// import React, { useState } from "react";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Chat from "./Chat";
// import CreateGroup from "./CreateGroup";
// import Register from "./Register";
// import Login from "./Login";

// const App = () => {
//   const [user, setUser] = useState(null);

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/register" component={Register} />
//         <Route path="/login">
//           <Login setUser={setUser} />
//         </Route>
//         <Route path="/create-group" component={CreateGroup} />
//         {user && (
//           <Route path="/chat/:groupId">
//             <Chat userId={user._id} />
//           </Route>
//         )}
//         <Route path="/">
//           <div>Welcome to the Chat App</div>
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;
