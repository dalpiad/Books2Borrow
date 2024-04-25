import moment from "moment";
import React from "react";

const DueDateCard = ({ selectedRecord }) => {

const checkoutRecord = selectedRecord;
const dueDate = moment().format(checkoutRecord.dueDate);
const momentArray = moment(dueDate).toArray();
const dueIn = moment(momentArray).fromNow();


    return (
        <div className="dueDate">
            <h5>Due in:</h5>
            <h1>{`${dueIn}`}</h1>
        </div>
    )
}

export default DueDateCard;