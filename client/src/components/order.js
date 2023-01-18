import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../context';
import errorImg from '../image/404_img.webp';
import '../css/order.css';


const Order = () => {

    const context = useContext(MyContext);
    // const { state, addRemark, removeRemark, onNavbar, offNavbar, remarkBarInput, setOrderMode, editSwitch } = context;
    const { state, addRemark, onNavbar, offNavbar, remarkBarInput, setOrderMode, editSwitch } = context;

    // console.log(state.remarks)

    let navigate = useNavigate();


    useEffect(() => {
        onNavbar();
        remarkBarInput('on');
        axios.get('/api/verify/tokenpass/order')
            .then(res => {
                // console.log(res.data)//laicheehoong === message = toke pass
                console.log(res.data)
                if (res.data.role === 'user') {
                    setOrderMode(true);
                }
                if (res.data.message === 'authenticate failed') {
                    offNavbar();
                    navigate('/');
                }
            })
            .catch(err => console.log(err));

        addRemark();
    }, [navigate, onNavbar, offNavbar, addRemark, remarkBarInput, setOrderMode])


    // const removeButton = (e) => {
    //     const id = e.target.name;
    //     removeRemark(id);
    // }

    const editButton = (e) => {
        const id = e.target.name;
    
        editSwitch('on', id)
    }

    return (
        <table className="table table-hover" id='myTable_order'>
            <thead className='sticky-top table-dark' style={{opacity: '0.8'}}>
                <tr>
                    <th scope="col">No.</th>
                    <th scope="col">EAN</th>
                    <th scope="col">IMAGE</th>
                    <th scope="col">PRODUCT</th>
                    <th scope="col">QTY</th>
                    <th scope="col">SID</th>
                    <th scope="col">REMARK</th>
                    <th scope="col">DELIVERY</th>
                    <th scope="col">DATE</th>
                    <th scope="col">EDIT</th>
                </tr>
            </thead>
            <tbody>
                {
                    state.remarks.length === 0 ? null : state.remarks.map((item, i) => {
                        return (
                            <tr key={i}>
                                <th scope="row" className='num'>{i + 1}</th>
                                <td className='ean-code'>{item.ean}</td>
                                <td>
                                    <img onError={e => e.target.src = errorImg} src={`https://www.phco.my/images/thumbs/products/${item.ean}/0.jpg`} alt="img" width="100" height="100" />
                                </td>
                                <td className='product-area'>{item.content.length > 20 ? `${item.content.slice(0, 100)}...` : item.content}</td>
                                <td className='qty'>{item.quantity}</td>
                                <td className='sid'>{item.sid}</td>
                                <td className='remark-area' >{item.remark.length > 20 ? `${item.remark.slice(0, 100)}...`: item.remark}</td>
                                <td className={`${item.delivery}-color delivery`}>{item.delivery}</td>
                                <td className='date'>{item.date.slice(0, 10)}</td>
                                <td>
                                    <button onClick={editButton} name={item._id}  data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-outline-primary" type="button">
                                        EDIT
                                    </button>

                                </td>

                            </tr>
                        )
                    })
                }


            </tbody>
        </table>
    )
}

export default Order;