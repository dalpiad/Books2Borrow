import React from "react";
import moment from "moment";

const Tracker = ({ selectedRecord }) => {

    const checkoutRecord = selectedRecord;
    const dueDate = moment().format(checkoutRecord.dueDate);
    const momentArray = moment(dueDate).toArray();
    const dueIn = moment(momentArray).fromNow();
    const newDueIn = parseInt(dueIn.split(" ")[1]);
    

return (
    <div className="progress-bar" style={{ '--width': `${newDueIn}` }} data-label={`Days Left: ${newDueIn}`}></div>
)
};


export default Tracker;