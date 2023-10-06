import { useEffect, useState } from "react";
import ContactList from "../Components/ContactList";
import { Link, Redirect } from "react-router-dom";

const Contacts = () => {
    const [contacts, setContacts] = useState([]);//contacts useState
    const DEBUG = true;  // temporary!
    
    const onDelete = contact => {
        setContacts(contacts.filter(c => c !== contact));
    }
    const handleDeleteAll = () => {
        const newContacts = []
        setContacts(newContacts);
        // same deal here
    }

    const handleAddContact = () => {
        return window.location.assign("/create");
    }
    
    const fetchUserData = () => 
    {
        if (DEBUG)
            {if (!contacts) setContacts([{contact_id: "test-1", first_name: "Firstname", last_name: "Lastname", email: "test-contact-1@example.com", phone_number: "555-PHONE-NO"}, ...Array.from({length: 9}, (_, i)=>({contact_id: `test-${i+3}`, first_name: `Name${i}`, last_name: "Surname", email: `test-contact-${i+3}@example.com`, phone_number: `555-EXA-MPLE-${i+1}`})), {contact_id: "test-99", first_name: "Name", last_name: "Surname", email: `test-contact-${"9".repeat(99)}@example.com`, phone_number: "555-EXA-MPLE"}]);}
        else
        {
            const fetchData = async () => {
                const result = await fetch('/API/contacts.php')
                if (result.ok) {
                    const jsonResult = await result.json()
                    setContacts(jsonResult)
                } else {
                    console.error(result);
                }
            }
            fetchData()
        }
    }
    
    useEffect(() => {// use Effect, runs everytime the app renders
        fetchUserData()
    },[contacts])

    return (  
        <div className="contacts">
            <ContactList contacts = {contacts} title = "All Contacts!" handleCreate={handleAddContact} onDelete={onDelete} handleDeleteAll={handleDeleteAll}/>
        </div>
    );
}
 
export default Contacts;