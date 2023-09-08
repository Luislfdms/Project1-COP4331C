import { useEffect, useState } from "react";
import ContactList from "../Components/ContactList";

const Contacts = () => {
    const [contacts, setContacts] = useState([]);//contacts useState

    const DEBUG = true;  // temporary!

    const handleDelete = (id) =>{// deletes item from contact based on specified id
        const newContacts = contacts.filter(contact => contact.id !== id)
        setContacts(newContacts);
    }
    
    const fetchUserData = () => {
        if (DEBUG)
            setContacts([{userID: "d40bf310-ef43-4b79-a341-71f218f5fb66", firstName: "Firstname", lastName: "Lastname", email: "test-contact-1@example.com", phoneNumber: "555-PHONE-NO"}, {userID: "80c0f39f-c02f-40f7-b9a5-245c1039c6af", firstName: "Name", lastName: "Surname", email: "test-contact-2@example.com", phoneNumber: "555-EXA-MPLE"}]);
        else
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
 
export default Contacts;