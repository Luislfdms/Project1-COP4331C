const ContactList = ({contacts, title,handleDelete, handleEdit}) => {
    return ( 
        <div className="contact-list">
            <h1>{title}</h1>
            {contacts && contacts.map((contact) => (//maps each item in contacts based on 'id'
                <div className="contact-preview" key = {contact.id}>
                    <h2>{contact.userID}</h2>
                    <p>{contact.firstName} {contact.lastName}</p>
                    <p>{contact.email}</p>
                    <p>{contact.phoneNumber}</p>
                    <button className="destructive" onClick={handleEdit}>Edit</button>
                    <button className="destructive" onClick={handleDelete}>Delete</button>
                </div>
            ))}
            <button className="destructive" onClick={handleDelete}>Delete All</button>
        </div>
     );
}
 
export default ContactList;