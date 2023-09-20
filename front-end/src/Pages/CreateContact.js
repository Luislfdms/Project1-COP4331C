import useState from "react";
import {useHistory} from "react-router-dom"

const CreateContact = () => {

    //const {isPending, setIsPending} = useState(false);
    //const history = useHistory();
    
    const handleCreateContact = () =>
    {
        fetch('http://localhost:3000/users/', {// ****** need to enter API endpoint in order to post user/pw
        method: 'POST',// tells server that we are sending an object
        headers: { "Content-Type": "application/json" }, // tells server what type of data is being sent
      }).then(() => {
        console.log('new contact added');
        //setIsPending(false);
       // history.go(-1); //goes back one page
       //history.push('/');// takes us back to home page usin its route
      })
    }

    return ( 
        <div> CreateContact </div>
     );
}
 
export default CreateContact;