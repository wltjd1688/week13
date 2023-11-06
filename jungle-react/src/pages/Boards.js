import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../index.css';


const Boards = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        // console.log();
        console.log("response.json()",response);
        return response.json();
      })
      .then((json)=> {
        // console.log("json",json);
        setData([...json]);
      });
  }, []);

  return (
    <div>
      <div className=' flex mx-auto flex-col w-4/5'>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>제목</th>
              <th>작성자</th>
              <th>날짜</th>
            </tr>
          </thead>
          <tbody>
            {data.map((board) => {
            return (
              <tr key={board.id}>
                <td className=' text-center'>{board.id}</td>
                <td><Link to={`${board.id}`}>{board.title}</Link></td>
                <td>{board.owner}</td>
                <td>{board.date}</td>
              </tr>
              )
            })}
          </tbody>
        </table>
          <div className='flex justify-end'>
            <button className="mt-3 px-8 py-1 rounded-md border-2 hover:bg-slate-100 active:bg-slate-300" onClick={()=>{console.log('새글쓰기')}}>새글쓰기</button>
          </div>
      </div>
    </div>
  )
}

export default Boards;