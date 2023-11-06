import React,{ useState } from "react";
import { useSetRecoilState } from "recoil";
import { TokenAtom } from "recoiil/atom";
import { useNavigate, useLocation, Link } from "react-router-dom";
import '../index.css';

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const setAccessToken = useSetRecoilState(TokenAtom);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.redirectedFrom?.pathname || '/'

  const handleLogin = (e) => {
    e.preventDefault();
    fetch('/login',{
      method: "POSE",
      body: {id:id,pw:password}})
    .then((res)=>{
      setAccessToken(res.data.setAccessToken)
      navigate(from);
    })
  }

  return(
    <div className="relative p-8 border-2 rounded-xl mt-24 mx-auto w-5/12 outline-none">
      <p className=" text-center text-3xl">로그인</p>
      <div className=" px-3 py-1 w-full border-2 whitespace-nowrap inline-grid my-3">
        <label htmlFor="id">id</label>
        <input className="outline-none hover:bg-slate-100" onChange={(e)=>{setId(e.target.value)}} type="text" name="id" id="id" placeholder="Id"/>
      </div>
      <div className=" px-3 py-1 w-full border-2 whitespace-nowrap inline-grid my-3">
        <label htmlFor="pw">pw</label>
        <input className="outline-none hover:bg-slate-100" onChange={(e)=>{setPassword(e.target.value)}} type="text" name="pw" id="pw" placeholder="password"/>
      </div>
      <div>
        <Link className=" text-right hover:text-slate-400" to={'/singup'}><p>회원가입</p></Link>
      </div>
      <div className="flex justify-center">
        <button  onClick={(e)=>{handleLogin(e)}} type='login' className=" mt-3 px-6 py-1 rounded-md border-2 hover:bg-slate-100 active:bg-slate-300">로그인</button>
      </div>
    </div>
  )
}

export default Login;