import { useCookies } from "react-cookie";
import { useParams, useLocation, useHistory } from "react-router-dom";
import ContactEditor from "../Components/ContactEditor.js";

const EditContact = () => {
  const [cookies] = useCookies("userID");
  const {contactID} = useParams();
  const location = useLocation()
  const history = useHistory()

  console.log(contactID, location.state.contact);
    
    const handleCreateContact = async(newContact) =>
    {
      const result = await fetch('/API/updateContact.php', {
        method: 'POST',// tells server that we are sending an object
        headers: { "Content-Type": "application/json" }, // tells server what type of data is being sent
        body: JSON.stringify({...newContact, user_id: cookies.userID, contact_id: contactID})
      })
      let json;
      try {
        json = await result.json();
      } catch (e) {
        console.error(e);
        return "The response from the server could not be parsed.";
      }
      if (result.ok) {
        console.log('contact updated', json);
        history.push("/contacts");
      } else {
        console.error(json);
        return json.error;
      }
    }

    const reqEditContact = newContact => fetch('/API/updateContact.php', {
      method: 'POST',// tells server that we are sending an object
      headers: { "Content-Type": "application/json" }, // tells server what type of data is being sent
      body: JSON.stringify({...newContact, user_id: cookies.userID, contact_id: contactID})
    });

    return <ContactEditor onSubmit={handleCreateContact} reqOnSubmit={reqEditContact} initialContact={location.state.contact} submitText="Update Contact" />;
}

 
export default EditContact;