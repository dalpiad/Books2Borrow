import React from "react";
import DeleteCheckoutButton from "./ui/DeleteCheckoutButton";
import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";



const StatusTracker = () => {
    // setup state variable to hold checkout record by Borrower ID. 
    // setup state variable to hhold checkout record by Lender ID. 
    // setup state variable to hold borrowerID object
    // setup state variable to hold lenderID objec
    // setup state variable to hold selected checkout records to mark returned. 
    const [selectedId, setSelectedId] = useState(null);


    // This will call by ID to the Checkout Record Controller. 
    // This needs to take the logged in users token and get where user is Borrower in checkout Object and isDue is true. 
    const { data: checkoutBorrowObj, isCheckoutBorrowObjLoading } = useQuery({
        queryFn: async (id) => {
          const response = await axios.get(
            `http://localhost:8080/api/${id}`
          )
          console.log(response.data);
          return response.data;
        },
        queryKey: ["checkoutBorrowObj"]
      });

    // This will call by ID to the Checkout Record Controller.
    // This needs to take the logged in users token and get where user is lender in checkout Object and isDue is true.  
    const { data: checkoutLenderObj, isCheckoutLenderObjLoading } = useQuery({
        queryFn: async (id) => {
          const response = await axios.get(
            `http://localhost:8080/api/${id}`
          )
          console.log(response.data);
          return response.data;
        },
        queryKey: ["checkoutLenderObj"]
      });
    // setup React Query to fetch borrowerID object. This will call by ID to the Customer Controller. 
    const { data: borrowerObj, isBorrowerObjLoading } = useQuery({
        queryFn: async (id) => {
          const response = await axios.get(
            `http://localhost:8080/api/${id}`
          )
          console.log(response.data);
          return response.data;
        },
        queryKey: ["borrowerObj"]
      });
    // setup React Query to fetch lenderID object. This will call by ID to the Customer Controller. 
    const { data: lenderObj, isLenderObjLoading } = useQuery({
        queryFn: async (id) => {
          const response = await axios.get(
            `http://localhost:8080/api/${id}`
          )
          console.log(response.data);
          return response.data;
        },
        queryKey: ["lenderObj"]
      });

    // will need an update checkout record button. This will send and update request to checkout controller to update the isDue value to false. 
    // this will likely be it's own button component. 


    // onclick method to handle clicks of rows. This will populate the first component that displays the record in more detail. 


    // handle selected method for the lent table only. Able to update that the book has been returned. 
    const handleCLick = (recordId) => {
        setSelectedId(recordId);
      }

    return (
        <>
{/* //  on lcick display that displayes a countdown of when the book is due back. Default behavior to show the most recent book due back. 
//  Can display both books you need to return to others as well as books due back to you and who you lent them out to.  */}
            <div>
                <h1>Click to display component</h1>
            </div>
{/* //  Table that displays book that you currently have borrowed. Clickable. */}
            <div>
                <h1>Table displaying books borrowed</h1>
            </div>
    {/* Table that displays books that you currently have lent out to others. Clickable.  */}
            <div>
                <h1>Table displaying books lent</h1>
                <DeleteCheckoutButton id={selectedId} />
            </div>
    </>
    )
}

export default StatusTracker;