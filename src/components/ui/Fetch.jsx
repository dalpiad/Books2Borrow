import React from "react";
import { useState } from "react";
import { useEffect } from "react";


const FetchComp = ({url, fetchedData})=>{
    const [data, setData] = useState(null);
    const [isLoaded, setIsLoaded] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const jsonData = await response.json();
                setData(jsonData);
                fetchedData(jsonData);
                setIsLoaded(false);
            }
            catch (error) {
                console.error("Error", error);
            }
        };

        fetchData();

        return () => {

        }}, [url, fetchedData])

}

export default FetchComp;