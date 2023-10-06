import {useState} from "react";
import {useCookies} from "react-cookie";

const ContactPreview = ({contact, onDelete}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const [cookie] = useCookies();
  
  const handleEdit = contact => {
    window.history.pushState({contact}, "", `/edit/${contact.contact_id}`);
  }

  const handleDelete = async contact => {
    setIsDeleting(true);
    const result = await fetch("/API/deleteContact.php", {
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({user_id: cookie.userID, contact_id: contact.contact_id})
    });
    if (result.ok) {
      await onDelete(contact);
    } else {
      setError(await result.text());
      setIsDeleting(false);
    }
  }

  return <div className={isDeleting ? "contact-preview pending" : "contact-preview"} key = {contact.id}>
    <h2>{contact.first_name} {contact.last_name}</h2>
    <p>{contact.email}</p>
    <p>{contact.phone_number}</p>
    <button onClick={() => handleEdit(contact)} disabled={isDeleting}>Edit</button>
    <button className="destructive" onClick={() => handleDelete(contact)} disabled={isDeleting}>Delete</button>
  </div>;
};

export default ContactPreview;