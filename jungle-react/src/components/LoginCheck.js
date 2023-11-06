import React from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { isLoginSelector } from "recoiil/atom"

const ProtectedRoute = ()=>{
  // const isLogin = useRecoilValue(isLoginSelector)
  const isLogin = true;
  const currentLocation = useLocation();
  // if(isLogin){
  //   return
  // } else {
  //   navigate("/login");
  // }
  return (
    <>
      {isLogin ? <Outlet/>:<Navigate to={'/login'} replace state={{redirectedFrom:currentLocation}}/>}
    </>
  )
}
export default ProtectedRoute