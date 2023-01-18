import React, {useEffect, useContext} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { MyContext } from '../context';
import errorImg from '../image/404_img.webp';


const Remark = () => {

    const context = useContext(MyContext);
    const {state, addRemark, removeRemark, onNavbar, offNavbar} = context;

    let navigate = useNavigate();


    useEffect(() => {
        onNavbar();
        axios.get('/api/verify/tokenpass')
        .then(res => {
            if(res.data.message === 'authenticate failed') {
                offNavbar();
                navigate('/');
            }           
        })
        .catch(err => console.log(err));
       
        addRemark();
    }, [navigate, onNavbar, offNavbar, addRemark])


    const removeButton = (e) => {
        const id = e.target.name;
        removeRemark(id);
    }


    return (
        <table className="table" id='myTable'>
        <thead>
            <tr>
                <th scope="col">No.</th>
                <th scope="col">EAN</th>
                <th scope="col">IMAGE</th>
                <th scope="col">REMARK</th>
                <th scope="col">REMOVE</th>
            </tr>
        </thead>
        <tbody>
            {
                state.remarks.length === 0 ? null : state.remarks.map((item, i) => {
                    return (
                        <tr key={i}>
                            <th scope="row">{i + 1}</th>
                            <td>{item.ean}</td>
                            <td>
                                <img onError={e => e.target.src = errorImg} src={`https://www.phco.my/images/thumbs/products/${item.ean}/0.jpg`} alt="img" width="100" height="100" />
                            </td>
                            <td>{item.content}</td>
                            <td>
                                <button type="button" name={item._id} onClick={removeButton} className="btn btn-danger">REMOVE</button>
                            </td>

                        </tr>
                    )
                })
            }


        </tbody>
    </table>
    )
}

export default Remark;