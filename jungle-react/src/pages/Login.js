import React,{ useState, axios } from "react";
import { useSetRecoilState } from "recoil";
import { TokenAtom } from "recoiil/atom";
import { useNavigate, useLocation } from "react-router-dom";
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
    axios.post('/login',{id:id,pw:password}).then((res)=>{
      console.oog(res.data)
      setAccessToken(res.data.setAccessToken)
      navigate(from);
    })
  }

  return(
    <div className=" p-8 border-2 mt-24 mx-auto w-5/12 flex items-center justify-center flex-col ">
      <p className=" text-3xl">로그인</p>
      <div className=" px-3 py-1 w-10/12 border-2 whitespace-nowrap inline-grid m-3">
        <label htmlFor="id">id</label>
        <input onChange={(e)=>{setId(e.target.value)}} type="text" name="id" id="id" placeholder="Id"/>
      </div>
      <div className=" px-3 py-1 w-10/12 border-2 whitespace-nowrap inline-grid m-3">
        <label htmlFor="pw">pw</label>
        <input onChange={(e)=>{setPassword(e.target.value)}} type="text" name="pw" id="pw" placeholder="password"/>
      </div>
      <div>
        <button type='login' className="mt-3 px-8 py-1 rounded-md border-2 hover:bg-slate-100 active:bg-slate-300" onClick={handleLogin}>버튼</button>
      </div>
    </div>
  )
}

export default Login;