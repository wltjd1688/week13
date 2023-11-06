import React,{ useState } from "react";
// import { useSetRecoilState } from "recoil";
// import { TokenAtom } from "recoiil/atom";
import { useNavigate, useLocation, Link } from "react-router-dom";
import '../index.css';

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.redirectedFrom?.pathname || '/'

  const handleLogin = (e) => {
    e.preventDefault();
    fetch("http://localhost:4004/users",{
      method: 'POST',
      body: JSON.stringify({
        email:id,
        password:password
      }),
    })
    .then((res)=>{
      console.log(res)
      localStorage.setItem("login",res.accessToken)
      navigate(from);
    })
    .catch((error)=>{
      console.log(error)
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
        <button  onClick={handleLogin} type='login' className=" mt-3 px-6 py-1 rounded-md border-2 hover:bg-slate-100 active:bg-slate-300">로그인</button>
      </div>
    </div>
  )
}

export default Login;