import {useState} from "react";
import {useHistory} from "react-router-dom"

const CreateContact = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userID, setUserID] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isPending, setIsPending] = useState(false);// variable to display is pending message

    //const {isPending, setIsPending} = useState(false);
    //const history = useHistory();
    
    const handleCreateContact = (e) =>
    {
        const newContact = {firstName, lastName,userID,email,phoneNumber};
        e.preventDefault();
    
        setIsPending(true);
    
        fetch('http://localhost:3000/users/', {// ****** need to enter API endpoint in order to post user/pw
          method: 'POST',// tells server that we are sending an object
          headers: { "Content-Type": "application/json" }, // tells server what type of data is being sent
        }).then(() => {
          console.log('new user added');
          setIsPending(false);
         // history.go(-1); goes back one page
        })
    }

    return ( 
        <div className="signup form"> 
          <h2>Enter Contact Information</h2>
          <form onSubmit={handleCreateContact}>
            <label>First Name</label>
            <input 
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <label>Last Name</label>
            <input 
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

            <label>User Identification Number</label>
            <input 
              type="text"
              required
              value={userID}
              onChange={(e) => setUserID(e.target.value)}
            />

            <label>Email</label>
            <input 
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            
            <label>Phone Number</label>
            <input 
              type="text"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />

            <input type="submit" value="Create Contact" /> 
          </form>
        </div>
     );
}

 
export default CreateContact;