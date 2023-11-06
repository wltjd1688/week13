import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return(
    <>
      <div>
        <Link to={"/boards"}>게시판 드가자~</Link>
      </div>
    </>
  )
}

export default Home;