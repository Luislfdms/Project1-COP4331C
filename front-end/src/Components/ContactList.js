import ContactPreview from "./ContactPreview.js";


const ContactList = ({contacts, setContacts, userID, title, onDelete, handleDeleteAll=null, handleCreate=null, fallback="(No contacts yet.)"}) => {
    return ( 
        <div className="contact-list">
            <div className="contact-list-header">
                <div className="contact-list-buttons">
                    {handleCreate && <button onClick={handleCreate}>Create</button>}
                    {/* {handleDeleteAll && <button className="destructive" onClick={handleDeleteAll} disabled={!contacts?.length}>Delete All</button>} */}
                </div>
                <div className="contact-list-buttons-fix" />
                <h1 className="contact-list-title">{title}</h1>
            </div>
            <div className="contact-list-body">
                {contacts && contacts.length ? contacts.map((contact) => (//maps each item in contacts
                    <ContactPreview contact={contact} onDelete={onDelete} />
                )) : fallback}
            </div>
        </div>
     );
}
 
export default ContactList;