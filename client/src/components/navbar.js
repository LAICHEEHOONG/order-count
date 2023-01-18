import React, { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MyContext } from '../context';
import Modal from './modal';
import { useCookies } from 'react-cookie';
import {Form } from 'react-bootstrap';
import {tableSearch_order} from './utils/tools';
import unitedStateFlag from '../image/united-states.png';
import '../css/navbar.css';



const Navbar = () => {

    const context = useContext(MyContext);
    const { state, searchBarSwitch, remarkBarInput, navbarSwitch, editSwitch } = context;

    const [cookies, setCookie, removeCookie] = useCookies(['auth']);

    let searchField = useRef();


    const tableSearch = () => {
        const input = document.getElementById('myInput');
        const filter = input.value.toUpperCase();
        const table = document.getElementById('myTable');
        const tr = table.getElementsByTagName('tr');

        for (let i = 0; i < tr.length; i++) {
            let td = tr[i].getElementsByTagName("td")[0];
            if (td) {
                let txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }


    }

    const removeTokenCookie = () => {
        removeCookie('auth');
        removeCookie('auth_user');
    };

    const logoutFn = () => {
        removeTokenCookie();
        navbarSwitch();

    }

    

    return (
        <>
            <Modal />
            <nav className="navbar navbar-expand-lg navbar-light bg-light" style={state.navbar_hidden ? { display: "none" } : { display: "flex" }}>
                <div className="container-fluid">

                    {
                        !state.orderMode ?
                            <>
                                <Link className="nav-item nav-link navbar-brand" to='/input' onClick={() => { searchBarSwitch('off'); remarkBarInput('off'); }} >INPUT</Link>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                            </>
                            : null
                    }


                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {
                                !state.orderMode ?
                                    <>
                                        <Link className="nav-item nav-link" to='/list' onClick={() => { searchBarSwitch('on'); remarkBarInput('off'); editSwitch('off')}} >LIST</Link>
                                        <Link className="nav-item nav-link" to='/history' onClick={() => { searchBarSwitch('off'); remarkBarInput('off'); }} >HISTORY</Link>
                                        {/* <Link className="nav-item nav-link" to='/remark' onClick={() => { searchBarSwitch('off'); remarkBarInput('on'); }} >REMARK</Link> */}
                                        <Link className="nav-item nav-link" to='/order' onClick={() => { searchBarSwitch('off'); remarkBarInput('on'); }} >ORDER</Link>
                                    </>
                                    : null
                            }



                            <Link className="nav-item nav-link" to='/' onClick={() => {
                                searchBarSwitch('off');
                                remarkBarInput('off');
                                logoutFn();
                            }} >LOGOUT</Link>
                            {/* <a href='https://dianhuo-unitedstates.herokuapp.com/'>
                                <img className="flag" src={unitedStateFlag} alt="euro-img" />
                            </a> */}


                        </ul>

                        {!state.searchBar ? null :
                            <div className="d-flex">
                                <input id='myInput' onKeyUp={tableSearch} autoFocus className="form-control me-2" type="text" placeholder="Search" aria-label="Search" />
                                <button data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-outline-success" type="button">Save</button>

                            </div>
                        }

{
                            !state.remarkBar ? null :
                                <>
                                    <Form className='filter-form'>
                                        <input
                                            id='myInput_order'
                                            ref={searchField}
                                            onKeyUp={() => tableSearch_order(searchField.current.value)}
                                            placeholder={'Filter'} aria-label="Filter" type="text" className="form-control filter" />
                                    </Form>
                                    <button onClick={() => editSwitch('off')} data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-outline-success" type="button">
                                        Add
                                    </button>
                                </>
                        }

               


                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;