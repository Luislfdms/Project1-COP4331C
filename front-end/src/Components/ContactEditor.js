import {useState} from "react";

const CreateContact = ({onSubmit, submitText="Create Contact", initialContact={}}) => {
    const [firstName, setFirstName] = useState(initialContact.firstName || "");
    const [lastName, setLastName] = useState(initialContact.lastName || "");
    const [email, setEmail] = useState(initialContact.email || "");
    const [phoneNumber, setPhoneNumber] = useState(initialContact.phoneNumber || "");
    const [isPending, setIsPending] = useState(false);// variable to display is pending message
    
    const handleCreateContact = async(e) => {
      e.preventDefault();
      const newContact = {first_name: firstName, last_name: lastName, email, phone_number: phoneNumber};
      setIsPending(true);
      await onSubmit(newContact);
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
            <input type="submit" value={submitText} disabled={isPending} />
            {isPending && <div className="pending">Pending...</div> }
          </form>
        </div>
     );
}

 
export default CreateContact;