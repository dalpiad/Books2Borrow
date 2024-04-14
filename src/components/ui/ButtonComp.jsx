import React from "react";


const ButtonComp = (props)=> {
   const handleClick =() => {
    alert(props.name);
   }
    return (
        <div>
            <button className="BasicButton" onClick={props.handle}>{props.name}</button>
        </div>
        
    )
}

export default ButtonComp;