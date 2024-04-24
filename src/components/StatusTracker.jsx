import React, { useEffect } from "react";
import MarkReturnedButton from "./ui/MarkReturnedButton";
import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import moment from 'moment';




const StatusTracker = () => {
  
    const [selectedId, setSelectedId] = useState(null);
    const [selectedRecord, setSelectRecord] =useState(null);
    const [currentDate, setCurrentDate] = useState(moment().format('MMMM Do YYYY'));


    // This will call by ID to the Checkout Record Controller. 
    // This needs to take the logged in users token and get where user is Borrower in checkout Object and isDue is true. 
    const { data: borrowedBooks, isBorrowedBooksLoading} = useQuery({
      queryFn: async (id) => {
        const response = await axios.get(
          `http://localhost:9000/checkoutRecords`
        )
        return response.data;
      },
      queryKey: ["borrowedBooks"]
    });
    

    // This will call by ID to the Checkout Record Controller.
    // This needs to take the logged in users token and get where user is lender in checkout Object and isDue is true.  
    const { data: lentBooks, isLentBooksLoading} = useQuery({
        queryFn: async (id) => {
          const response = await axios.get(
            `http://localhost:3000/checkoutRecords`
          )
          return response.data;
        },
        queryKey: ["lentBooks"]
      });

    // will need an update checkout record button. This will send and update request to checkout controller to update the isDue value to false. 
    // this will likely be it's own button component. 


    // onclick method to handle clicks of rows. This will populate the first component that displays the record in more detail. 


    // handle selected method for the lent table only. Able to update that the book has been returned. 
    const handleClick = (record) => { 
      setSelectRecord(record);
      }

      const handleSelected = (recordId) => {
        setSelectedId(recordId);
      }

    return (
        <>
{/* //  on lcick display that displayes a countdown of when the book is due back. Default behavior to show the most recent book due back. 
//  Can display both books you need to return to others as well as books due back to you and who you lent them out to.  */}
            <div>
                <h3>{currentDate}</h3>
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
                      <td>Not Available</td>
                      <td className="myBooksTable">{record.bookId}</td>
                      <td className="myBooksTable">{record.borrowerId}</td>
                      <td className="myBooksTable">{record.checkoutDate}</td>
                      <td className="myBooksTable">{record.dueDate}</td>
                    </tr>
                  ))}
                </tbody>
                </table>
            </div>
            <br/>
    {/* Table that displays books that you currently have lent out to others. Clickable.  */}
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
                      <td>Not Available</td>
                      <td className="myBooksTable">{record.bookId}</td>
                      <td className="myBooksTable">{record.borrowerId}</td>
                      <td className="myBooksTable">{record.checkoutDate}</td>
                      <td className="myBooksTable">{record.dueDate}</td>
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