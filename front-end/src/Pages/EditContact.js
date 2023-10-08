import { useCookies } from "react-cookie";
import { useParams, useLocation } from "react-router-dom";
import ContactEditor from "../Components/ContactEditor.js";

const EditContact = () => {
  const [cookies] = useCookies(["userID"]);
  const {contactID} = useParams();
  const location = useLocation()

    const reqEditContact = newContact => fetch('/API/updateContact.php', {
      method: 'POST',// tells server that we are sending an object
      headers: { "Content-Type": "application/json" }, // tells server what type of data is being sent
      body: JSON.stringify({...newContact, user_id: cookies.userID, contact_id: contactID})
    });

    return <ContactEditor reqOnSubmit={reqEditContact} initialContact={location.state.contact} submitText="Update Contact" />;
}

 
export default EditContact;