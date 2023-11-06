import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return(
    <>
      <div className=" border-">
        <Link to={"/boards"}>게시판 가는길</Link>
      </div>
    </>
  )
}

export default Home;