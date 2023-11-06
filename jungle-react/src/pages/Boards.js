import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../index.css';
import { useNavigate } from 'react-router-dom';



const Boards = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4004/posts")
      .then((response) => {
        return response.json();
      })
      .then((json)=> {
        setData([...json]);
      })
      .catch((error) => console.error('불러오는데 실패하였습니다.',error));
  }, []);

  const checkBoardNum = () => {
    if (data.length === 0){
      return 0;
    }
    const lastBoard = data[data.length - 1];
    return lastBoard.id;
  }
  
  const handelNewData = (data) =>{
    const newId = checkBoardNum() + 1;
    const emtyNewData = {
      title: "",
      body: "",
      owner: 'Kim',
      date: ""
    }
    fetch(`http://localhost:4004/posts`,{
      method: 'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(emtyNewData)
    }
    ).then((response)=> {
      setData([...data,emtyNewData])
      navigate('/boards/'+newId);
      return response.json();
    }).catch((error)=> console.error('새글 만들기 실패했습니다.',error));    
  }

  return (
    <div>
      <div className=' flex mx-auto flex-col w-4/5'>
        <div className="m-3 px-3 py-1 border-2 inline-grid">
          <label htmlFor="title-find">제목 검색 </label>
          <input className="w-full" onChange={()=>{}} type="text" name="title-find" id="title-find"/>
        </div>
        {data? (
          <div>
            <table className='w-full'>
              <thead>
                <tr>
                  <th>id</th>
                  <th className='w-50'>제목</th>
                  <th>작성자</th>
                  <th>날짜</th>
                </tr>
              </thead>
              <tbody>
                {data.filter((b)=>b.date !== "").map((board,e) => {
                    return (
                      <tr key={e}>
                        <td className=' text-center'>{e}</td>
                        <td className=' single-line'><Link to={`${board.id}`}>{board.title}</Link></td>
                        <td className="max-w-20 text-center">{board.owner}</td>
                        <td className="max-w-20 text-center">{board.date}</td>
                      </tr>
                      )}
                    )}
              </tbody>
            </table>
            <div className='flex justify-end'>
              <button className="mt-3 px-8 py-1 rounded-md border-2 hover:bg-slate-100 active:bg-slate-300" onClick={()=>{handelNewData(data)}}>새글쓰기</button>
            </div>
          </div>
          ):(
            <>
              <div>
                데이터 받아오는중....
              </div>
            </>
          )}
      </div>
    </div>
  )
}

export default Boards;