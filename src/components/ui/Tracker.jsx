import React from "react";

const Tracker = (props) => {

    const daysLeft = 4;
    

return (
    <div className="progress-bar" style={{ '--width': `${daysLeft}` }} data-label={`Days Left: ${daysLeft}`}></div>
)
};


export default Tracker;