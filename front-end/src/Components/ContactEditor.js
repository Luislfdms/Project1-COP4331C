import {useState, useEffect} from "react";
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
    
    const [fNameDirtied, setFNameDirtied] = useState(false);
    const [lNameDirtied, setLNameDirtied] = useState(false);
    const [emailDirtied, setEmailDirtied] = useState(false);
    const [emailValid, setEmailValid] = useState(email !== "");
    const [phoneDirtied, setPhoneDirtied] = useState(false); 
    const [phoneOkay, setPhoneOkay] = useState(phoneNumber != null);
    
    //useEffect(() => setFNameDirtied(true), [firstName]);
    //useEffect(() => setLNameDirtied(true), [lastName]);
    //useEffect(() => setEmailDirtied(true), [email]);
    //useEffect(() => setPhoneDirtied(true), [phoneNumber]);
    useEffect(() => {
      if (firstName && lastName && emailValid && phoneNumber) setError("");
    }, [firstName, lastName, email, phoneNumber]);
    
    const handleInvalid = e => {
      e.preventDefault();
      setFNameDirtied(true);
      setLNameDirtied(true);
      setEmailDirtied(true);
      setPhoneDirtied(true);
      const missing = [!firstName && "first name", !lastName && "last name", !email ? "email" : !emailValid && "valid email", !phoneNumber && "phone number"].filter(i=>i);
      if (e.target.type === "submit")
        setError(missing.length ? `Please enter a ${missing.length > 2 ? missing.slice(0, -1).join(", ") + ", and " + missing[missing.length - 1] : missing.join(" and ")}.` : "");
    }
    
    const handleCreateContact = async(e) => {
      e.preventDefault();
      setFNameDirtied(true);
      setLNameDirtied(true);
      setEmailDirtied(true);
      setPhoneDirtied(true);
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
        <form className="signup form" onSubmit={handleCreateContact}> 
          <h2>Enter Contact Information</h2>
            <label>First Name
            <input 
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              onBlur={e => setFNameDirtied(true)}
              maxLength={50}
              className={fNameDirtied && !firstName ? "invalid" : ""}
            />
            </label>

            <label>Last Name
            <input 
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              onBlur={e => setLNameDirtied(true)} 
              maxLength={50}
              className={lNameDirtied && !lastName ? "invalid" : ""}
            />
            </label>

            <label>Email
            <input 
              type="email"
              required
              value={email}
              onChange={(e) => {setEmail(e.target.value); setEmailValid(e.target.checkValidity())}}
              onBlur={e => setEmailDirtied(true)}
              maxLength={100}
              className={emailDirtied && !emailValid ? "invalid" : ""}
            />
            </label>
            
            <label>Phone Number
            <PhoneInput 
              country={'us'}
              required
              value={phoneNumber}
              onChange={(phone, country, e, formattedPhone) => {
                setPhoneNumber(phone);
                const isValid = country?.format?.replace(/[^.]/g,"").length === phone.length;
                setFormattedPhoneNumber(formattedPhone);
                setPhoneOkay(isValid);
              }}
              onBlur={e => setPhoneDirtied(true)}
              inputProps={{required: true}}
              containerClass={phoneDirtied && !phoneNumber ? "invalid" : phoneDirtied && !phoneOkay ? "likely-invalid" : ""}
            />
            </label>
            <input type="submit" value={submitText} disabled={isPending} className={firstName && lastName && emailValid && phoneNumber ? "primary" : ""} onClick={e => e.target.className === "primary" || handleInvalid(e)} />
            {isPending && <div className="pending">Pending...</div> }
            {error && <div className="error">{error}</div>}
            <button type="button" className="secondary" onClick={e => history.go(-1)}>Cancel</button>
        </form>
     );
}

 
export default CreateContact;