import moment from "moment";
import React from "react";

const DueDateCard = ({selectedRecord}) => {


let checkoutRecord = selectedRecord.selectedRecord;
let currentDate = moment().format();
// let dueDate = checkoutRecord.dueDate;

// let daysDue = dueDate.diff(currentDate, 'days');
console.log(checkoutRecord);
console.log("current date: " + currentDate);
// console.log("due date:" + dueDate);
// console.log(daysDue);



let dueInDays = 5;

    return (
        <div className="dueDate">
            <h5>Due in:</h5>
            <h1>{`${dueInDays}`} Days</h1>
        </div>
    )
}

export default DueDateCard;