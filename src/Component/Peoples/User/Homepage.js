import React from "react";

function Homepage() {
  const user = JSON.parse(localStorage.getItem("ecomAdmin"));
  console.log("user in navbar===", user);

  return (
    <div className="flex items-center justify-center min-h-screen text-center">
      <div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-800 tracking-wide">
          {user?.name ? `Hello, ${user.name}!` : "Welcome to Your Dashboard"}
        </h1>
        <p className="text-lg sm:text-xl mt-3 text-gray-500">
          Stay productive and manage everything from one place 🚀
        </p>
      </div>
    </div>
  );
}

export default Homepage;
