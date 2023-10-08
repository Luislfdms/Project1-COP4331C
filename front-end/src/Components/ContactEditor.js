import {useState} from "react";
import { useHistory } from "react-router-dom";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const CreateContact = ({reqOnSubmit, submitText="Create Contact", initialContact={}}) => {
    const [firstName, setFirstName] = useState(initialContact.first_name || "");
    const [lastName, setLastName] = useState(initialContact.last_name || "");
    const [email, setEmail] = useState(initialContact.email || "");
    const [formattedPhoneNumber, setFormattedPhoneNumber] = useState(initialContact.phone_number || "")
    const [phoneNumber, setPhoneNumber] = useState(formattedPhoneNumber.replace(/[^0-9]/g, "") || null);
    const [isPending, setIsPending] = useState(false);// variable to display is pending message
    const [error, setError] = useState("");
    const history = useHistory();
    
    const handleCreateContact = async(e) => {
      e.preventDefault();
      if (!formattedPhoneNumber) {
        setError("Please enter a valid phone number.");
        return;
      }
      const newContact = {first_name: firstName, last_name: lastName, email, phone_number: formattedPhoneNumber};
      const request = reqOnSubmit(newContact);
      if (!request) {
        setError("Something went wrong.");
        return;
      }
      setError("");
      setIsPending(true);
      const response = await request;
      let json;
      try {
        json = await response.json();
      } catch (e) {
        console.error(e);
        setError("The response from the server could not be parsed.");
        setIsPending(false);
        return;
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
            <label>First Name
            <input 
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            </label>

            <label>Last Name
            <input 
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            </label>

            <label>Email
            <input 
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            </label>
            
            <label>Phone Number
            <PhoneInput 
              country={'us'}
              required
              value={phoneNumber}
              onChange={(phone, country, e, formattedPhone) => {
                setPhoneNumber(phone);
                const isValid = true; //country?.format?.replace(/[^.]/g,"").length === phone.length
                setFormattedPhoneNumber(isValid ? formattedPhone : "");
              }}
              inputProps={{required: true}}
            />
            </label>
            <input type="submit" value={submitText} disabled={isPending} />
            {isPending && <div className="pending">Pending...</div> }
            {error && <div className="error">{error}</div>}
          </form>
        </div>
     );
}

 
export default CreateContact;