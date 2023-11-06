import React,{ useState } from "react";
// import { useSetRecoilState } from "recoil";
// import { TokenAtom } from "recoiil/atom";
import { useNavigate, useLocation } from "react-router-dom";

const Singup = () => {
  const [password,setPassword] = useState('');

  const [inputValue, setInputValue] = useState({
    email:'',
    password:'',
  })

  const inputChangeHandler = (e) => {
    const { name, value} = e.target
    setInputValue({
      ...inputValue,
      [name]: value,
    })
  }
  // const setAccessToken = useSetRecoilState(TokenAtom);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.redirectedFrom?.pathname || '/'

  const doSignUp = async () => {
    try {
      const res = await fetch('https://week13-yi5g.vercel.app/register',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputValue),
      });
      if (res.ok){
        const data = await res.json();
        console.log(data);
        navigate(from);
      } else {
        const errorData = await res.json();
        console.log(errorData);
      }
  } catch(error) {
    console.log(error);
  }
  };
  
  

  return(
    <div className="relative p-8 border-2 rounded-xl mt-24 mx-auto w-5/12 outline-none">
      <p className=" text-center text-3xl">로그인</p>
      <div className=" px-3 py-1 w-full border-2 whitespace-nowrap inline-grid my-3">
        <label htmlFor="email">id</label>
        <input className="outline-none hover:bg-slate-100" onChange={(e)=>{inputChangeHandler()}} type="text" name="email" id="email" placeholder="Id"/>
      </div>
      <div className=" px-3 py-1 w-full border-2 whitespace-nowrap inline-grid my-3">
        <label htmlFor="password">password</label>
        <input className="outline-none hover:bg-slate-100" onChange={(e)=>{inputChangeHandler()}} type="text" name="password" id="password" placeholder="password"/>
      </div>
      <div className=" px-3 py-1 w-full border-2 whitespace-nowrap inline-grid my-3">
        <label htmlFor="cpw">confirm password</label>
        <input className="outline-none hover:bg-slate-100" onChange={(e)=>{setPassword(e.target.value)}} type="text" name="cpw" id="cpw" placeholder="password"/>
      </div>
      <div className="flex justify-center">
        <button onClick={(e)=>{doSignUp(e)}} type='login' className=" mt-3 px-6 py-1 rounded-md border-2 hover:bg-slate-100 active:bg-slate-300" disabled={inputValue.password !== password}>회원가입</button>
      </div>
    </div>
  )
}

export default Singup;