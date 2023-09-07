import { useEffect, useState } from "react";
import ContactList from "./ContactList";

const Content = () => {
    const [contacts, setContacts] = useState(null);
    useEffect(() => {
        fetch(/*database endoint*/)
        .then(res => {
            return res.json();
        })
        .then(data => {
            setContacts(data)
        });
    },[]);

    return (  
        <div className="content">
            {contacts && <ContactList contacts = {contacts} title = "All Contacts!"/>}
        </div>
    );
}
 
export default Content;