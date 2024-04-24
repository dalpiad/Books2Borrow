import React, { useEffect } from "react";
import MarkReturnedButton from "./ui/MarkReturnedButton";
import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import moment from 'moment';




const StatusTracker = () => {
  
    const [selectedId, setSelectedId] = useState(null);
    const [selectedRecord, setSelectedRecord] =useState(null);
    const [currentDate, setCurrentDate] = useState(moment().format('MMMM Do YYYY'));

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
      })
    }
  

    const handleClick = (record) => { 
      setSelectedRecord(record);
      }

      const handleSelected = (recordId) => {
        setSelectedId(recordId);
      }

    return (
        <>
{/* //  on lcick display that displayes a countdown of when the book is due back. Default behavior to show the most recent book due back. 
//  Can display both books you need to return to others as well as books due back to you and who you lent them out to.  */}
            <div>
              <div>
                <h3 className="trackerDate">{currentDate}</h3>
              </div>
              <div>
                {selectedRecord && <p>{selectedRecord.bookId}</p>}
              </div>
            </div>
{/* //  Table that displays book that you currently have borrowed. Clickable. */}
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
                    <th className="myBooksTable">Delete</th>
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
                          <input type="checkbox" onChange={()=>{handleSelected(record.recordId)}} />
                        </label>
                      </td>
                    </tr>
                  ))}
                </tbody>
                </table>
                <MarkReturnedButton id={selectedId} />
            </div>
    </>
    )
}

export default StatusTracker;