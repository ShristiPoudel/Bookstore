import React, { useEffect, useState } from "react";
import api from "../api/config";
import {useNavigate} from "react-router-dom"

const Homepage = () => {
  const [bookList, setBookList] = useState([]);
  const [tempBookList, setTempBookList] = useState([])
  const [searchText,setSearchText] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchBooks() {
      const response = await api.get("/book");
      console.log(response.data);
      setBookList(response.data);
      setTempBookList(response.data);
    }
    fetchBooks();
  }, []);


  useEffect(()=>{

    async function searchBook(){

      const response = await api.get(`/book/search/all?q=${searchText}`);
      if(response.data){
        console.log(response.data);
        setBookList(response.data);
       
      }
    }

   if(searchText) searchBook()
    else setBookList(tempBookList)


  },[searchText])
  return (
    <>
    <center>
      <input type="text" placeholder="Search Books" 
      style={{
        width:"55%",
        margin:"20px",
        padding:"10px",
        borderRadius:"7px"
      }}
      value={searchText}
      onChange={(e)=>setSearchText(e.target.value)}
      />
    </center>
    <div style={{ display: "flex", flexDirection: "row" , flexWrap:"wrap", alignItems:"center",justifyContent:"center"}}>
      {bookList.length>0 ?
      bookList.map((book, index) => {
        return (
          <div 
          onClick={()=> navigate("/explore",{
            state:{
              book,
            }
          })}
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent:"center",
              textAlign:"center",
              padding: "20px",
              boxShadow:"0px 0px 5px #ccc",
              marginLeft:"20px",
              marginTop:"20px",
              cursor:"pointer"
            }}
          >
            <img
              src={book.image}
              alt="book"
              style={{ height: "250px", width: "250px", objectFit: "contain" }}
            />
            <br />
            {book.name}
          </div>
        );
      }) :"No books found"
    }
    </div>
    </>
  );
};

export default Homepage;
