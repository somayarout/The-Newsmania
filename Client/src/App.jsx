import { useEffect, useState } from "react";
import "./App.css";
import { Outlet } from "react-router";
import { useAuthStore } from "./Stores/useAuthStore";
import Header from "./Components/Header.jsx";
import Footer from "./Components/Footer.jsx";
function App() {
  // const initAuth = useAuthStore((s) => s.init);

  // useEffect(() => {
  //   initAuth();
  // }, [initAuth]);

  return (
    <div>
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
