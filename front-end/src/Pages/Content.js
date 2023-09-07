import { useEffect, useState } from "react";
import ContactList from "./ContactList";

const Content = () => {
    const [contacts, setContacts] = useState(null);//contacts useState

    const handleDelete = (id) =>{// deletes item from contact based on specified id
        const newContacts = contacts.filter(contact => contact.id !== id)
        setContacts(newContacts);
    }
    
    useEffect(() => {// use Effect, runs everytime the app renders
        fetch(/*database endoint*/)// need db endpoint to fetch data in db
        .then(res => {
            return res.json();
        })
        .then(data => {
            setContacts(data)
        });
    },[]);

    return (  
        <div className="content">
            {contacts && <ContactList contacts = {contacts} title = "All Contacts!" handleDelete={handleDelete}/>}
        </div>
    );
}
 
export default Content;