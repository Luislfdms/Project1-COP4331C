import { useEffect, useState } from "react";
import{useNavigate} from 'react-router-dom';
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const EditContact = () => {
    const {id} = useParams();
    const [contact , setContact] = useState({
        id: id, 
        firstname: '',
        lastname: '',
        name:'',
        email: '',
        phoneNumber: ''
    })
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:3000/users/'+id)
        .then(result => setContact({...contact, firstname: result.data.firstname,lastname: result.data.lastname,email:result.data.email,phoneNumber:result.data.phoneNumber }))
        .catch(err => console.log(err))
    },[])

    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:3000/users/'+id,contact)
        .then(result => {
            navigate('/');
        })
        .catch(err => console.log(err))
    }

    return ( 
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name</label>
                    <input type="text" name = 'first name' placeholder="enter first name"
                    value={contact.firstname} onChange={e => setContact({...contact,firstname:e.target.value})}/>
                </div>
                <div>
                    <label>Last Name</label>
                    <input type="text" name = 'last name' placeholder="enter last name"
                    value={contact.lastname} onChange={e => setContact({...contact,lastname:e.target.value})}/>
                </div>
                <div>
                    <label>Email</label>
                    <input type="text" name = 'email' placeholder="enter email"
                    value={contact.email} onChange={e => setContact({...contact,email:e.target.value})}/>
                </div>
                <div>
                    <label>Phone Number</label>
                    <input type="text" name = 'phone number' placeholder="enter phone number"
                    value={contact.phoneNumber} onChange={e => setContact({...contact,phoneNumber:e.target.value})}/>
                </div>
                <button className="btn btn-info">Update</button>
            </form>
        </div>
         );
}
 
export default EditContact;