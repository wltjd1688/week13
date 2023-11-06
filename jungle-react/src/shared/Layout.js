import React from "react";
import '../index.css'
import { Link, Outlet } from "react-router-dom";
import { TokenAtom } from "recoiil/atom";
import { useRecoilValue } from "recoil";

const Header = () => {
  const CheckLogin = useRecoilValue(TokenAtom);

  return (
    <div className="layout justify-between">
      <h2><Link to={"/"}>React 공부하기</Link></h2>
      {CheckLogin? (
        <p>{localStorage.getItem(JSON.)}</p>
      ):(<h2><Link to={"/login"}>Login</Link></h2>)}
    </div>
  );
}

const Footer = () =>{
  return (
    <div className="layout justify-center bg-black text-white">
      <h2> make project</h2>
    </div>
  );
}

function Layout() {
  return (
    <>
      <Header/>
        <div className=" min-h-85vh py-5 px-10">
          <Outlet></Outlet>
        </div>
      <Footer/>
    </>
  )
}

export default Layout