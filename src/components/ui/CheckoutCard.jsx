import React from "react";

const CheckoutCard = ({ selectedRecord }) => {

    const checkoutRecord = selectedRecord;


    return (
        <div>
            <div>{`Title: ${checkoutRecord.bookTitle}`}</div>
            <div>{`Lender : ${checkoutRecord.lenderName}`}</div>
            <div>{`Borrower: ${checkoutRecord.borrowerName}`}</div>
            <div>{`Checkout Date: ${checkoutRecord.checkoutDate.slice(0,10)}`}</div>
            <div>{`Due Date: ${checkoutRecord.dueDate.slice(0,10)}`}</div>
        </div>
    )
}

export default CheckoutCard;