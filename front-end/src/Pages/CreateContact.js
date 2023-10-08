import { useCookies } from "react-cookie";
import ContactEditor from "../Components/ContactEditor.js"

const CreateContact = () => {

  const [cookies] = useCookies(["userID"]);

    const reqCreateContact = newContact => fetch('API/createContact.php', {// ****** need to enter API endpoint in order to post user/pw
      method: 'POST',// tells server that we are sending an object
      headers: { "Content-Type": "application/json" }, // tells server what type of data is being sent
      body: JSON.stringify({...newContact, user_id: cookies.userID})
    });

    return <ContactEditor reqOnSubmit={reqCreateContact}/>;
}

 
export default CreateContact;