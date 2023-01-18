import React, { useContext, useRef, useEffect } from 'react';
import { MyContext } from '../context';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
// import { useCookies } from 'react-cookie';
import axios from 'axios';
import '../css/input.css';


const Auth = () => {

    const context = useContext(MyContext);
    const userName = useRef();
    const userPassword = useRef();

    const { login, state, onNavbar } = context;

    let navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/verify/tokenpass')
        .then(res => {     
            if(res.data.message === 'token pass') {
                navigate('/input');
                onNavbar();
            }
            
        })
        .catch(err => console.log(err))
    }, [navigate, onNavbar])



    // const [cookies, setCookie] = useCookies(['auth'])


    const handleLogin = (event) => {

        event.preventDefault();
        login(userName.current.value, userPassword.current.value, (path, token) => {
            // console.log(token)

            // setCookie('auth', token)

            navigate(path);
        });


        // console.log(userName.current.value, userPassword.current.value);
        userName.current.value = '';
        userPassword.current.value = '';

    }






    return (

        <main className="form-signin">
            <form onSubmit={handleLogin}>
                {state.spinner ? <Spinner className="mb-3" animation="border" style={{ width: '100px', height: '100px' }} /> :
                    <img className="mb-4" src={state.imgLogin} alt="" width="200" height="200" />
                }
                <h1 className="h3 mb-3 fw-normal">{state.loginMessage}</h1>
    

                <div className="form-floating">
                    <input ref={userName} required="required" type="text" className="form-control ean-input" id="floatingInput" placeholder="User Name" />
                    <label htmlFor="floatingInput">User Name</label>
                </div>
                <div className="form-floating">
                    <input ref={userPassword} required="required" type="password" className="form-control quantity-input" id="floatingPassword" placeholder="Password" />
                    <label htmlFor="floatingPassword">Password</label>
                </div>



        
                <button type="submit" className='w-100 btn btn-lg btn-primary'>
                    Login
                </button>
                <p className="mt-5 mb-3 text-muted">&copy; STOCK COUNT · 点货 – 2021</p>
            </form>
        </main>

    )
}

export default Auth;