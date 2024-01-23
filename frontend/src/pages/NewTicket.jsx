import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {createTicket, reset} from '../features/tickets/ticketSlice';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';

function NewTicket() {
    const {user} = useSelector((state) => state.auth);
    const {isLoading, isError, isSuccess, message} = useSelector(
        (state) => state.tickets
        );

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name] = useState(user.name);
    const [email] = useState(user.email);
    const [product, setProduct] = useState('iPhone');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if(isError) {
            toast.error(message);
        }

        if(isSuccess) {
            dispatch(reset())
            navigate('/tickets')
        }

        dispatch(reset())
    }, [dispatch, isError, isSuccess, navigate, message]);

    if(isLoading) {
        return <Spinner />
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(createTicket({product, description}))
    }


  return (
    <>
    <BackButton url='/' />
    <section className="heading">
        <h1>Create a New Ticket</h1>
        <p>Please fill out the form below.</p>
    </section>

    <section className="form">
        <div className="form-group">
            <label htmlFor="name">Customer Name</label>
            <input type="text" value={name} disabled className="formControl" />
        </div>
        <div className="form-group">
            <label htmlFor="name">Customer Name</label>
            <input type="text" value={name} disabled className="formControl" />
        </div>
        <form onSubmit={onSubmit}>
            <div className="form-group">
            <label htmlFor="product">Product</label>
            <select name="product" id="product" value={product} onChange={(e) => setProduct(e.target.value)}>
                <option value="IPhone">IPhone</option>
                <option value="Macbook Pro">Macbook Pro</option>
                <option value="iMac">I Mac</option>
                <option value="iPad">iPad</option>
            </select>
            </div>
            <div className="form-group">
                <label htmlFor="description">Description of the Issue</label>
                <textarea name="" id="description" className="form-control" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
            <div className="form-group">
                <button className="btn btn-block">Submit</button>
            </div>
        </form>
    </section>
    </>

  )
}

export default NewTicket