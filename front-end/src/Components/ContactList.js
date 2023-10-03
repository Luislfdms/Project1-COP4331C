const ContactList = ({contacts, title, handleDelete, handleEdit, handleDeleteAll=null, handleCreate=null}) => {
    return ( 
        <div className="contact-list">
            <div className="contact-list-header">
                <div className="contact-list-buttons">
                    {handleCreate && <button onClick={handleCreate}>Create</button>}
                    {handleDeleteAll && <button className="destructive" onClick={handleDeleteAll} disabled={!contacts?.length}>Delete All</button>}
                </div>
                <div className="contact-list-buttons-fix" />
                <h1 className="contact-list-title">{title}</h1>
            </div>
            <div className="contact-list-body">
                {contacts?.length ? contacts.map((contact) => (//maps each item in contacts based on 'id'
                    <div className="contact-preview" key = {contact.id}>
                        <h2>{contact.firstName} {contact.lastName}</h2>
                        <p>{contact.email}</p>
                        <p>{contact.phoneNumber}</p>
                        <Link to ={ '/update/${{d.id}'}>Edit</Link>
                        <button className="destructive" onClick={() => handleDelete(contact.id)}>Delete</button>
                    </div>
                )) : "(No contacts yet.)"}
            </div>
        </div>
     );
}
 
export default ContactList;