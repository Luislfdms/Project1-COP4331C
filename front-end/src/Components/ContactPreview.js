import {useState} from "react";
import {useCookies} from "react-cookie";
import { useHistory } from "react-router-dom";

const ContactPreview = ({contact, onDelete}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();

  const [cookie] = useCookies(["userID"]);
  
  const handleEdit = contact => {
    history.push(`/edit/${contact.contact_id}`, {contact});
    console.log("navigating!", history)
    // window.location.reload();
  }

  const handleDelete = async contact => {
    setIsDeleting(true);
    const result = await fetch("/API/deleteContact.php", {
      headers: {"Content-Type": "application/json"},
      method: "POST",
      body: JSON.stringify({user_id: cookie.userID, contact_id: contact.contact_id})
    });
    let json;
    try {
      json = result.json();
    } catch (e) {
      setError("The response from the server could not be parsed.");
      setIsDeleting(false);
      return;
    }
    if (result.ok) {
      await onDelete(contact);
    } else {
      setError(json.error);
      setIsDeleting(false);
    }
  }

  return <div className={isDeleting ? "contact-preview pending" : "contact-preview"} key = {contact.id}>
    <h2>{contact.first_name} {contact.last_name}</h2>
    <p>{contact.email}</p>
    <p>{contact.phone_number}</p>
    <button onClick={() => handleEdit(contact)} disabled={isDeleting}>Edit</button>
    <button className="destructive" onClick={() => handleDelete(contact)} disabled={isDeleting}>Delete</button>
    {error && <div className="error">{error}</div>}
  </div>;
};

export default ContactPreview;