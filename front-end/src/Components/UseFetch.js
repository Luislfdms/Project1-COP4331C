import {useState, useEffect} from 'react';

const useFetch = (url, options={}) => {//fetches data everytime new url is passed

    const [data, setData] = useState(null);// grabs data
    const [isPending, setIsPending] = useState(true);// for user experience purposes
    const [error, setError] = useState(null);// display the error message, if neccessary

    //runs every render, unless you put '[]' after function call
    //fetches data data
    useEffect(() => {
        const abortCont =  new AbortController();// abort controller

        if (url)
            setTimeout(() =>{
                fetch(url, {...options, signal: abortCont.signal})//fetch from database (this endpoint was available to us after watching the database from a command in the terminal)
                .then(response => {//check to see if there was a proper response from the data base...
                    if(!response.ok) {
                        throw Error('Could not fetch data for that end point');
                    }
                    return response.json();
                })
                .then((data) => {
                    setData(data);// sets blogs to that data
                    setIsPending(false);
                    setError(null);
                })
                .catch(error => {// catches any kind of network error
                    if(error.name === 'AbortError'){
                        console.log('Fetch aborted')
                    }else{
                        setIsPending(false);
                        setError(null);
                    }
                    setIsPending(false);
                    setError(error.message);
                })
            }, 0)
        else {
            setIsPending(false);
            setError("invalid url");
        }
        
        return () => abortCont.abort();// clean up funtion
    }, [url]);// dependency on url

    return{data, isPending, error}
}

export default useFetch;