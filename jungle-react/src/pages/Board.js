import React ,{ useEffect, useState }from 'react';
import { useNavigate, useParams } from 'react-router-dom';


const Board = ()=> {
  const navigate = useNavigate();
  const param = useParams();
  const [data, setData] = useState([]);

  const today = new Date();
  const month = today.getMonth()+1;
  const year = today.getFullYear();
  const date = today.getDate();
  const currentDate = year+'-'+month+'-'+date;

  const [edit, setEdit] = useState(true);
  const [editTitle,setEditTitle] = useState('');
  const [editBody,setEditBody] = useState('');
  const [isNew, setIsNew] = useState(true);
  
  
  useEffect(() => {
    fetch(`https://week13-yi5g.vercel.app/posts/${param.id}`)
    .then((response) => response.json())
    .then((data) => {
      setData(data);
      setEditTitle(data.title);
      setEditBody(data.body);
      if (data.title !== ""){
        setEdit(false);
      } else {
        setEdit(true);
      };
    })
    .catch((error) => console.error('게시물 가져오기 실패', error));
  },[param]);

  useEffect(()=>{
    if (editTitle===""){
      setIsNew(false)
    }
  },[])

  const LimitStr = ()=>{
    const NumTitle = editTitle;
    if (NumTitle.length > 10){
      return true;
    } else{
      return false;
    }
  };

  function getData(){
    fetch(`https://week13-yi5g.vercel.app/posts/${param.id}`)
    .then((response) => response.json())
    .then((data) => {
      setData(data);
      setEditTitle(data.title);
      setEditBody(data.body);
      if (data.title !== ""){
        setEdit(false);
      } else {
        setEdit(true);
      };
    })
    .catch((error) => console.error('게시물 가져오기 실패', error));
  }
  
  const handelEditSave = (data) => {
    if (!LimitStr()){
      return console.log()
    } 
    const newData = {
      title: editTitle,
      body: editBody,
      owner: 'Kim',
      date: currentDate
    }
    fetch(`https://week13-yi5g.vercel.app/posts/${param.id}`,{
      method: 'PATCH',
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify(newData), 
    })
      .then((response)=> {
        if(response.ok) {
          setData(data);
          getData()
          if (isNew){
            alert("추가완료!");
          } else {
            alert("수정완료!");
          }
          return response.json();
        }  else {
          throw new Error('POST 요청 실패');
        }
      })
      .catch((error) => console.error('수정에 실패하였습니다.',error));
      setEdit(false)
  }

  const handelDelete = (e) => {
    e.preventDefault();
    fetch(`https://week13-yi5g.vercel.app/posts/${param.id}`,{
      method: 'DELETE',
      headers:{
        'Content-Type':'application/json',
      },
    })
      .then((response)=> {
        console.log(response);
        if(response.ok) {
          alert("삭제 성공!")
          navigate('/boards')
          return response.json()
        }  else {
          return new Error('DELETE 요청 실패');
        }
      })
  }

  return (
    <>
      {edit? (
        <div className=' flex flex-col mx-5'>
          <div className=" px-3 py-1 border-2 m-5">
            <label htmlFor="title">제목 </label>
            <input className="w-full" onChange={(e)=>{setEditTitle(e.target.value)}} type="text" name="title" id="title" value={editTitle}/>
          </div>
          <div className=" px-3 py-1 border-2 mx-5">
            <label htmlFor="content">내용 </label>
            <textarea className='w-full h-[35vh] ' onChange={(e)=>{setEditBody(e.target.value)}} type="text" name="content" id="content" value={editBody}></textarea>
          </div>
          <div className=' flex justify-end mx-5 gap-3'>
            <button className="mt-3 px-8 py-1 rounded-md border-2 hover:bg-slate-100 active:bg-slate-300  disabled:bg-slate-300 disabled:text-slate-50" onClick={(e)=>{handelEditSave(data,e)}} disabled={(editTitle === '' || editBody === '')}>완료</button>
            <button className="mt-3 px-8 py-1 rounded-md border-2 hover:bg-slate-100 active:bg-slate-300" onClick={(e)=>{handelDelete(e)}}>삭제</button>
          </div>
        </div>):(
          data ? (
            <>
              <div className=' flex flex-col mx-5 item' >
                <div className=" px-3 py-1 border-2 m-5">
                  <label htmlFor="title">제목 </label>
                  <h2 name="title">{data.title}</h2>
                </div>
                <div className=" px-3 py-1 border-2 mx-5">
                  <label htmlFor="content">내용 </label>
                  <p className=' break-words w-full h-auto' name="content">{data.body}</p>
                </div>
                <div className=' flex justify-end mx-5 gap-3'>
                    <button className="mt-3 px-8 py-1 rounded-md border-2 hover:bg-slate-100 active:bg-slate-300" onClick={()=>{setEdit(true)}}>수정</button>
                    <button className="mt-3 px-8 py-1 rounded-md border-2 hover:bg-slate-100 active:bg-slate-300" onClick={(e)=>{handelDelete(e)}}>삭제</button>
                </div>
              </div>
            </>
          ) : (
            <p>게시물을 불러오는 중...</p>
            ))}
    </>
  )
};

export default Board;