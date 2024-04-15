import React from "react";
import DeleteCheckoutButton from "./ui/DeleteCheckoutButton";
import { useState } from "react";


const StatusTracker = () => {
    // setup state variable to hold checkout record by Borrower ID. 
    // setup state variable to hhold checkout record by Lender ID. 
    // setup state variable to hold borrowerID object
    // setup state variable to hold lenderID objec
    // setup state variable to hold selected checkout records to mark returned. 
    const [selectedId, setSelectedId] = useState(null);


    // setup React Query to fetch checkout record by Borrower ID. 
    // setup React Query to fetch checkout record by Lender ID.
    // setup React Query to fetch borrowerID object
    // setup React Query to fetch lenderID objec

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