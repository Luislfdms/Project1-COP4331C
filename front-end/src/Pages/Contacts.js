import { useEffect, useState } from "react";
import ContactList from "./ContactList";

const Contacts = () => {
    const [contacts, setContacts] = useState([]);//contacts useState

    const handleDelete = (id) =>{// deletes item from contact based on specified id
        const newContacts = contacts.filter(contact => contact.id !== id)
        setContacts(newContacts);
    }
    
    const fetchUserData = () => {
        fetch(/*database endoint*/)// need db endpoint to fetch data in db
        .then(res => {
            return res.json();
        })
        .then(data => {
            setContacts(data)
        });
    }
    
    useEffect(() => {// use Effect, runs everytime the app renders
        fetchUserData()
    },[])

    return (  
        <div className="contacts">
            {contacts && <ContactList contacts = {contacts} title = "All Contacts!" handleDelete={handleDelete}/>}
        </div>
    );
}
 
export default Conacts;