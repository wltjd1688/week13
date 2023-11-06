import React ,{ useEffect, useState }from 'react';
import { useParams } from 'react-router-dom';

const Board = ()=> {
  const param = useParams();

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${param.id}`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('게시물 가져오기 실패', error));
  }, [param.id]);
  
  console.log(data);

  return (
    <>
      <div>
        {data ? (
          <div>
            <h2>{data.title}</h2>
            <p>{data.body}</p>
          </div>
        ) : (
          <p>게시물을 불러오는 중...</p>
        )}
      </div>
      <div>
        <button className="mt-3 px-8 py-1 rounded-md border-2 hover:bg-slate-100 active:bg-slate-300" onClick={()=>{}}>수정</button>
      </div>
      <div>
        <button className="mt-3 px-8 py-1 rounded-md border-2 hover:bg-slate-100 active:bg-slate-300" onClick={()=>{}}>삭제</button>
      </div>
      </>
    );
}

export default Board;