import React, { useContext, useRef, useEffect } from 'react';
import { MyContext } from '../context';
import { Spinner } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import '../css/input.css';
import axios from 'axios';


const Input = () => {

    const context = useContext(MyContext);
    const eanInput = useRef();
    const qtyInput = useRef();

    const { checkBox, state, update, inputInfo, setImgLink, setErrImg, onNavbar, offNavbar } = context;

    let navigate = useNavigate();


    useEffect(() => {
        onNavbar();

        axios.get('/api/verify/tokenpass')
        .then(res => {     
            if(res.data.message === 'authenticate failed') {
                navigate('/');
                offNavbar();
            }
            
        })
        .catch(err => console.log(err))
    }, [navigate, onNavbar, offNavbar])

    


    const colorBtn = () => {
        if (!state.checkBox) {
            return 'btn-primary'
        } else {
            return 'btn-warning'
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!state.checkBox) {
            update(eanInput.current.value, qtyInput.current.value);
            eanInput.current.value = '';
            qtyInput.current.value = '';
        } else {
            update(eanInput.current.value, 1);
            eanInput.current.value = '';
        }
        eanInput.current.focus();
    }

    const handleOnChange = () => {
        inputInfo(eanInput.current.value);
        setImgLink(eanInput.current.value)
    }





    return (

        <main className="form-signin">
            <form onSubmit={handleSubmit}>
                {state.spinner ? <Spinner className="mb-3" animation="border" style={{ width: '100px', height: '100px' }} /> :
                    <img className="mb-4" src={state.imgLink} alt="" width="200" height="200" onError={() => setErrImg()} />

                }
                <h1 className="h3 mb-3 fw-normal">{state.content.eanNum}</h1>
                <h1 className="h4 mb-3 fw-normal">{state.content.eanInfo}</h1>

                <div className="form-floating">
                    <input onChange={() => handleOnChange()} required="required" ref={eanInput} type="text" className={state.checkBox ? "form-control" : "form-control ean-input"} id="floatingInput" placeholder="EAN Code" />
                    <label htmlFor="floatingInput">EAN Code</label>
                </div>

                {
                    state.checkBox ? null : (
                        <div className="form-floating">
                            <input required="required" ref={qtyInput} type="number" className="form-control quantity-input" id="floatingPassword" placeholder="Quantity" />
                            <label htmlFor="floatingPassword">Quantity</label>
                        </div>
                    )

                }


                <div className="checkbox mb-3 checkbox-space">
                    <label>
                        <input type="checkbox" checked={state.checkBox} onChange={checkBox} onClick={() => eanInput.current.focus()} /> Count
                    </label>
                </div>
                <button className={`w-100 btn btn-lg ${colorBtn()}`} type="submit">
                    {state.checkBox ? 'Count' : 'Submit Quantity'}
                </button>
                <p className="mt-5 mb-3 text-muted">&copy; STOCK COUNT · 点货 – 2021</p>
            </form>
        </main>

    )
}

export default Input;