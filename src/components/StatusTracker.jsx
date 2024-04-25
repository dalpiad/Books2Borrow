import React, { useEffect } from "react";
import MarkReturnedButton from "./ui/MarkReturnedButton";
import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import moment from 'moment';
import BookCard from "./ui/BookCard";
import Tracker from "./ui/Tracker";
import CheckoutCard from "./ui/CheckoutCard";
import DueDateCard from "./ui/DueDateCard";




const StatusTracker = () => {
  
    const [ selectedId, setSelectedId ] = useState(null);
    const [ currentDate, setCurrentDate ] = useState(moment().format('MMMM Do YYYY'));
    const [ bookId, setBookId ] = useState(null);
    const [selectedRecord, setSelectedRecord] = useState({
      "id": 0,
      "bookTitle": "Not Available",
      "lenderId": 0,
      "lenderName": "Not Available",
      "borrowerId": 0,
      "borrowerName": "Not Available",
      "checkoutDate": "2024-04-25T08:30:00Z",
      "dueDate": "2024-04-25T08:30:00Z",
      "isCheckedout": true
  });

    const token = localStorage.getItem('jwt'); 
    const { data: borrowedBooks, isBorrowedBooksLoading} = useQuery({
      queryFn: async (id) => {
        const response = await axios.get(
          `http://localhost:8080/api/borrow/borrowed`, {headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
          }})
        
        return response.data;
      },
      queryKey: ["borrowedBooks"]
    });
  
    const { data: lentBooks, isLentBooksLoading} = useQuery({
      queryFn: async (id) => {
        const response = await axios.get(
          `http://localhost:8080/api/borrow/lent`, {headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
          }})
          
        return response.data;
      },
      queryKey: ["lentBooks"]
    });

    if ((selectedRecord === null) && (!isBorrowedBooksLoading)) {
      borrowedBooks?.map((record)=>{
        setSelectedRecord(record);
      })
    } else if (selectedRecord === null && !isLentBooksLoading) {
      lentBooks?.map((record)=>{
        setSelectedRecord(record);
      })}


    const handleClick = (record) => { 
      setSelectedRecord(record);
      setBookId(record.bookId);
      }

      const handleSelected = (recordId) => {
        setSelectedId(recordId);
      }


    if (isBorrowedBooksLoading || isBorrowedBooksLoading){
      return (
      <div>Loading</div>
      )} else { 
        return (
          <>
            <div className="borderContainer">
              <div className="trackerContainer">
                <h3 className="trackerDate">{currentDate}</h3>
                <div className="progressBar-container">
                  <Tracker selectedRecord={selectedRecord} />
                </div>
              </div>
              <br/>
              <div className="displayContainer">
                <BookCard className="statusBookCard" bookId={bookId} />
                <CheckoutCard className="checkoutCard" selectedRecord={selectedRecord} />
                <DueDateCard className="dueDateCard" selectedRecord={selectedRecord} />
              </div>
            </div>
            <div>
            <table>
                <thead className="myBooksTable">
                  <tr className="myBooksTable">
                    <th className="myBooksTable">Book Title</th>
                    <th className="myBooksTable">Book ID</th>
                    <th className="myBooksTable">Borrowed From</th>
                    <th className="myBooksTable">Checkout Date</th>
                    <th className="myBooksTable">Due Date</th>
                  </tr>
                </thead >
                <tbody className="myBooksTable">
                  {borrowedBooks?.map((record) => (
                    <tr className={`myBooksTable ${selectedRecord === record ? "selected" : ""}`} onClick={()=>{handleClick(record)}} key={record.recordId}>
                      <td className="myBooksTable">{record.bookTitle}</td>
                      <td className="myBooksTable">{record.bookId}</td>
                      <td className="myBooksTable">{record.lenderName}</td>
                      <td className="myBooksTable">{record.checkoutDate.slice(0,10)}</td>
                      <td className="myBooksTable">{record.dueDate.slice(0,10)}</td>
                    </tr>
                  ))}
                </tbody>
                </table>
            </div>
            <br/>
            <div>
                <table>
                <thead className="myBooksTable">
                  <tr className="myBooksTable">
                    <th className="myBooksTable">Book Title</th>
                    <th className="myBooksTable">Book ID</th>
                    <th className="myBooksTable">Lent To</th>
                    <th className="myBooksTable">Checkout Date</th>
                    <th className="myBooksTable">Due Date</th>
                    <th className="myBooksTable">Select</th>
                  </tr>
                </thead >
                <tbody className="myBooksTable">
                  {lentBooks?.map((record) => (
                    <tr className={`myBooksTable ${selectedRecord === record ? "selected" : ""}`} onClick={()=>{handleClick(record)}} key={record.recordId}>
                      <td className="myBooksTable">{record.bookTitle}</td>
                      <td className="myBooksTable">{record.bookId}</td>
                      <td className="myBooksTable">{record.borrowerName}</td>
                      <td className="myBooksTable">{record.checkoutDate.slice(0,10)}</td>
                      <td className="myBooksTable">{record.dueDate.slice(0,10)}</td>
                      <td className="myBooksTable">
                        <label>
                          <input type="checkbox" onChange={()=>{handleSelected(record.id)}} />
                        </label>
                      </td>
                    </tr>
                  ))}
                </tbody>
                </table>
                <MarkReturnedButton selectedId={selectedId} />
            </div>
      </>
    )
}
}

export default StatusTracker;