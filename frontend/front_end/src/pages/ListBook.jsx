import React, { useEffect, useState } from "react";
import api from "../api/config";
import { FaTrashAlt } from "react-icons/fa";
import {ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'


const ListBook = () => {
  const [bookList, setBookList] = useState([]);
  useEffect(() => {
    async function getBooks() {
      const response = await api.get("/book");

      console.log(response.data);
      if (response.data) {
        setBookList(response.data);
      }
    }

    getBooks();
  }, []);

  const deleteBook = async (id, idx) => {
    const data = window.confirm("Do you want to delete?");
    if (data) {
      try{
      const response = await api.delete(`/book/delete/${id}`);
      console.log(response);
      if(response.data.success){

       const newBookList =   bookList.filter((book,index)=> index!==idx)
       setBookList(newBookList);
        toast.success("book deleted");
      }
      else{
        toast.error("unable to delete book");
      }
    }
    catch(error){
    toast.error(`Error while deleting, ${error.message}`);    }
  }
  };

  return (
    <center>
      <ToastContainer/>
      {bookList.length > 0
        ? bookList.map((book, index) => {
            return (
              <div
                key={index}
                style={{
                  boxShadow: "0px 0px 5px #ccc",
                  padding: "10px",
                  margin: "10px",
                  color: "green",
                  width: "45%",
                  textAlign: "start",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {book.name}
                <FaTrashAlt
                  color="red"
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => deleteBook(book.id, index)}
                />
              </div>
            );
          })
        : "no books"}
    </center>
  );
};

export default ListBook;
