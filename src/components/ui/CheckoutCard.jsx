import React from "react";

const CheckoutCard = ({ selectedRecord }) => {

    const checkoutRecord = selectedRecord;


    return (
        <div>
            <div>{`Book Title: ${checkoutRecord.bookTitle}`}</div>
            <div>Lender Name{`Lender Name: ${checkoutRecord.lenderName}`}</div>
            <div>Borrower Name{`Borrower Name: ${checkoutRecord.borrowerName}`}</div>
            <div>Checkout Date{`Checkout Date: ${checkoutRecord.checkoutDate.slice(0,10)}`}</div>
            <div>Due Date{`Due Date: ${checkoutRecord.dueDate.slice(0,10)}`}</div>
        </div>
    )
}

export default CheckoutCard;