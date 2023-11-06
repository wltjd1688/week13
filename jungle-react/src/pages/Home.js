import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return(
    <>
      <div className=" flex justify-center border-2 rounded-md">
        <Link to={"/boards"}>게시판 가는길</Link>
      </div>
    </>
  )
}

export default Home;