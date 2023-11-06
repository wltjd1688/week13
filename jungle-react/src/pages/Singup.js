import React,{ useState, axios } from "react";
import { useSetRecoilState } from "recoil";
import { TokenAtom } from "recoiil/atom";
import { useNavigate, useLocation } from "react-router-dom";

const Singup = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const setAccessToken = useSetRecoilState(TokenAtom);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location)
  const from = location?.state?.redirectedFrom?.pathname || '/'

  const handleSingUp = (e) => {
    e.preventDefault();
    axios.post('/singup',{id:id,pw:password}).then((res)=>{
      console.oog(res.data)
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
        <label htmlFor="pw">password</label>
        <input className="outline-none hover:bg-slate-100" onChange={(e)=>{setPassword(e.target.value)}} type="text" name="pw" id="pw" placeholder="password"/>
      </div>
      <div className=" px-3 py-1 w-full border-2 whitespace-nowrap inline-grid my-3">
        <label htmlFor="cpw">confirm password</label>
        <input className="outline-none hover:bg-slate-100" onChange={(e)=>{setPassword(e.target.value)}} type="text" name="cpw" id="cpw" placeholder="password"/>
      </div>
      <div className="flex justify-center">
        <button onClick={(e)=>{handleSingUp(e)}} type='login' className=" mt-3 px-6 py-1 rounded-md border-2 hover:bg-slate-100 active:bg-slate-300">회원가입</button>
      </div>
    </div>
  )
}

export default Singup;