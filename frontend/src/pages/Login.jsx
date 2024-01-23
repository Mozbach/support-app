import {useState, useEffect} from 'react';
import {toast} from 'react-toastify';
import {FaSignInAlt} from 'react-icons/fa';
import {useSelector, useDispatch} from 'react-redux';
import { login, reset } from '../features/auth/authSlice';
import {useNavigate} from 'react-router-dom';
import Spinner from '../components/Spinner';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const {name, email, password, password2} = formData;

    const {user, isLoading, isSuccess, message, isError} = useSelector(state => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        // Redirect when logged in
        if(isSuccess || user) {
            navigate('/');
        }

        dispatch(reset());
    }, [isError, isSuccess, user, message, navigate, dispatch]);

    

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            email,
            password
        }

        dispatch(login(userData));
    }

    if(isLoading) {
        return <Spinner />
    }

  return (
    <>
    <section className="heading">
        <h1><FaSignInAlt /> Sign In</h1>
        <p>Please Sign In</p>
    </section>

    <section className="form">
        <form onSubmit={onSubmit}>

            <div className="form-group">
                <input
                    name="email"
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={onChange}
                    placeholder="Enter your email"
                    required
                />
            </div>
            <div className="form-group">
                <input
                    name="password"
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={onChange}
                    placeholder="Enter your password"
                    required
                />
            </div>
            <div className="form-group">
                <button className="btn btn-block">Submit</button>
            </div>
        </form>
    </section>
    </>
  )
}

export default Login