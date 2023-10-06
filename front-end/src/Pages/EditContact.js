import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import ContactEditor from "../Components/ContactEditor.js";

const EditContact = () => {
  const [cookies] = useCookies("userID");
  const {contactID} = useParams();

    
    const handleCreateContact = async(newContact) =>
    {
      const result = await fetch('/API/updateContact.php', {
        method: 'POST',// tells server that we are sending an object
        headers: { "Content-Type": "application/json" }, // tells server what type of data is being sent
        body: JSON.stringify({...newContact, user_id: cookies.userID, contact_id: contactID})
      })
      const resultInJson = await result.json();
      console.log('contact updated', resultInJson);
    }

    return <ContactEditor onSubmit={handleCreateContact} initialContact={window.history.state.contact} />;
}

 
export default EditContact;