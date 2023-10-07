import { useEffect, useState } from "react";
import ContactList from "../Components/ContactList";
import { Link, Redirect } from "react-router-dom";
import {useCookies} from "react-cookie";

const Contacts = () => {
    const [contacts, setContacts] = useState(null);//contacts useState
    const DEBUG = false;  // temporary!
    const [cookies] = useCookies();
    const [error, setError] = useState("");
    const [isPending, setIsPending] = useState(true);
    
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
            {if (!contacts) setContacts([{contact_id: "test-1", first_name: "Firstname", last_name: "Lastname", email: "test-contact-1@example.com", phone_number: "555-PHONE-NO"}, ...Array.from({length: 9}, (_, i)=>({contact_id: `test-${i+3}`, first_name: `Name${i}`, last_name: "Surname", email: `test-contact-${i+3}@example.com`, phone_number: `555-EXA-MPLE-${i+1}`})), {contact_id: "test-99", first_name: "Name", last_name: "Surname", email: `test-contact-${"9".repeat(99)}@example.com`, phone_number: "555-EXA-MPLE"}]); setIsPending(false)}
        else
        {
            fetch("/API/retrieveContacts.php", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({user_id: cookies.userID})
            }).then(async res => {
                try {
                    const json = await res.json();
                    if (res.ok) {
                        setContacts(json);
                    } else {
                        console.log(json);
                        setError(json.error);
                    }
                } catch (e) {
                    setError("The response from the server could not be parsed.");
                }
            }).catch(reason => setError(reason))
            .finally(()=>setIsPending(false));
        }
    }
    
    useEffect(() => {// use Effect, runs everytime the app renders
        if (!contacts) fetchUserData()
    },[contacts])

    return (
        isPending ? <div className="pending">Loading...</div> 
        : error ? <div className="error">{error}</div>
        : <div className="contacts">
            <ContactList contacts = {contacts} title = "All Contacts!" handleCreate={handleAddContact} onDelete={onDelete} handleDeleteAll={handleDeleteAll}/>
        </div>
    );
}
 
export default Contacts;