import { useCookies } from "react-cookie";
import ContactEditor from "../Components/ContactEditor.js"

const CreateContact = () => {

  const [cookies] = useCookies("userID");

    //const {isPending, setIsPending} = useState(false);
    //const history = useHistory();
    
    const handleCreateContact = async(newContact) =>
    {
      const result = await fetch('API/createContact.php', {// ****** need to enter API endpoint in order to post user/pw
        method: 'POST',// tells server that we are sending an object
        headers: { "Content-Type": "application/json" }, // tells server what type of data is being sent
        body: JSON.stringify({...newContact, user_id: cookies.userID})
      })
      const resultInJson = await result.json();
      console.log('new contact added', resultInJson);
    }

    return <ContactEditor onSubmit={handleCreateContact}/>;
}

 
export default CreateContact;