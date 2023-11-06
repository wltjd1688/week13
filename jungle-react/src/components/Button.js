import React from "react";

function Button({props}) {
  
  return(
    <button onClick={(inza)=>{tempFunctino(inza)}} type='login' className=" mt-3 px-6 py-1 rounded-md border-2 hover:bg-slate-100 active:bg-slate-300">회원가입</button>
    )
};

export default Button;