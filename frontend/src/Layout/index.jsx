// src/layouts/UserLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";


const UserLayout = () => {


  return (
    <div
      className='min-h-screen flex flex-col' 
    >
      <Header />
      <main className="flex-grow mt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;
