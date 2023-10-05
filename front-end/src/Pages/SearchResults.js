import {useCookies} from "react-cookie";
import ContactList from "../Components/ContactList.js";
import {useEffect, useState} from "react";

const SearchResults = () => {
    const query = new URLSearchParams(window.location.search).get("q");
    const [cookies] = useCookies();
    const [error, setError] = useState("");
    const [isPending, setIsPending] = useState(true);
    const [contacts, setContacts] = useState(null);

    useEffect(() => {
        fetch("/API/searchContact.php", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({user_id: cookies.userID, query})
        }).then(async res => {
            if (res.ok) {
                setContacts(await res.json());
            } else setError(await res.text());
            setIsPending(false);
        })
    }, [cookies.userID, query])

    
    const onDeleteContact = contact => {
        setContacts(contacts.filter(c => c !== contact));
    }

    if (query) {
        if (isPending) return <div className="pending">Loading...</div>
        else if (error) return <div className="error">{error}</div>
        else return <ContactList contacts={contacts} title="Search Results" fallback="(No contacts found.)" handleDelete={onDeleteContact} />
    } else {
        setTimeout(() => window.location.assign("/contacts"), 5000);
        return <div className="error">No query specified!</div>
    }
}
 
export default SearchResults;