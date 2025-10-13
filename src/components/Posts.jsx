"use client"
import {useState, useEffect} from 'react'

const styles = {
    listStyleType: "none",
    backgroundColor: "white",
    marginTop: "100px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
}
const Fetch = () => {
    const [data, setData] = useState(null);
    const apiUrl = "https://jsonplaceholder.typicode.com/posts";
    
    useEffect(()=>{
        const getData = async()=>{
            const data = await fetch(apiUrl);
            const jsonData = await data.json();
            setData(jsonData);
            // console.log(data);
            // console.log(jsonData);
            // console.log(jsonData)


        }

        getData();
    },[]);
  return (
    <div>
      <ul style={styles}>
        {data && data.map((item)=>(
            <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default Fetch
