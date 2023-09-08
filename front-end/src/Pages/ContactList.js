const ContactList = ({contacts, title,handleDelete}) => {
    return ( 
        <div className="contact-list">
            <h2>{title}</h2>
            {contacts.map((contact) => (//maps each item in contacts based on 'id'
                <div className="contact-preview" key = {contact.id}>
                    <h2>{contact.userID}</h2>
                    <h3>{contact.firstName}{contact.lastName}</h3>
                    <h3>{contact.email}</h3>
                    <h3>{contact.phoneNumber}</h3>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            ))}
            <button onClick={handleDelete}>Delete</button>
        </div>
     );
}
 
export default ContactList;