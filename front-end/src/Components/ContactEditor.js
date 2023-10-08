import {useState} from "react";
import { useHistory } from "react-router-dom";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const CreateContact = ({onSubmit, reqOnSubmit, submitText="Create Contact", initialContact={}}) => {
    const [firstName, setFirstName] = useState(initialContact.first_name || "");
    const [lastName, setLastName] = useState(initialContact.last_name || "");
    const [email, setEmail] = useState(initialContact.email || "");
    const [phoneNumber, setPhoneNumber] = useState(initialContact.phone_number || "");
    const [isPending, setIsPending] = useState(false);// variable to display is pending message
    const [error, setError] = useState("");
    const history = useHistory();
    
    const handleCreateContact = async(e) => {
      e.preventDefault();
      const newContact = {first_name: firstName, last_name: lastName, email, phone_number: phoneNumber};
      const request = reqOnSubmit(newContact);
      if (!request) {
        setError("Something went wrong.");
        return;
      }
      setIsPending(true);
      const response = await request;
      let json;
      try {
        json = await response.json();
      } catch (e) {
        console.error(e);
        setError("The response from the server could not be parsed.");
      }
      if (response.ok) {
        console.log('contact updated', json);
        history.push("/contacts");
        return;
      } else {
        console.error(json);
        setError(json.error)
      }
      setIsPending(false);
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

            <label>Email</label>
            <input 
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            
            <label>Phone Number</label>
            <PhoneInput 
              country={'us'}
              required
              value={phoneNumber}
              onChange={phone => setPhoneNumber(phone)}
            />
            <input type="submit" value={submitText} disabled={isPending} />
            {isPending && <div className="pending">Pending...</div> }
            {error && <div className="error">{error}</div>}
          </form>
        </div>
     );
}

 
export default CreateContact;