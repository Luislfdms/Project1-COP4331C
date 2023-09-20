import { useEffect, useState } from "react";
import ContactList from "../Components/ContactList";
import { Redirect } from "react-router-dom";

const Contacts = () => {
    const [contacts, setContacts] = useState([]);//contacts useState
    const DEBUG = true;  // temporary!

    const handleDelete = (id) =>{// deletes item from contact based on specified id
        const newContacts = contacts.filter(contact => contact.id !== id)
        setContacts(newContacts);
        //need to find a way to post new updated list to database
    }
    const handleDeleteAll = () => {
        const newContacts = []
        setContacts(newContacts);
        // same deal here
    }

    const handleEditContact = () =>{

    }
    const handleAddContact = () => {
       return Redirect("/create")
    }
    
    const fetchUserData = () => {
        if (DEBUG)
            setContacts([{id: "test-1", firstName: "Firstname", lastName: "Lastname", email: "test-contact-1@example.com", phoneNumber: "555-PHONE-NO"}, ...Array.from({length: 9}, (_, i)=>({id: `test-${i+3}`, firstName: `Name${i}`, lastName: "Surname", email: `test-contact-${i+3}@example.com`, phoneNumber: `555-EXA-MPLE-${i+1}`})), {id: "test-99", firstName: "Name", lastName: "Surname", email: `test-contact-${"9".repeat(99)}@example.com`, phoneNumber: "555-EXA-MPLE"}]);
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
            <ContactList contacts = {contacts} title = "All Contacts!" handleDelete={handleDelete} handleEdit={handleEditContact} handleCreate={handleAddContact} handleDeleteAll={handleDeleteAll}/>
        </div>
    );
}
 
export default Contacts;