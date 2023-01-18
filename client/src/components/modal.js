import React, { useContext, useState, useRef } from 'react';
import { MyContext } from '../context';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import '../css/modal.css';

const Modal = () => {

    const defaultText = 'This page will be reset after saving.';
    const context = useContext(MyContext);
    const [text, setText] = useState(defaultText)
    const { save, state, orderSubmit, updateEdit, removeRemark, searchBarSwitch  } = context;

    let navigate = useNavigate();

    let ean = useRef();
    let content = useRef();
    let quantity = useRef();
    let sid = useRef();
    let remark = useRef();

    let eanUpdate = useRef();
    let contentUpdate = useRef();
    let quantityUpdate = useRef();
    let sidUpdate = useRef();
    let remarkUpdate = useRef();



    // eanUpdate.current.value = state.orderData.data.ean;

    const saveButton = () => {
        axios.get('/api/stock/list/check')
            .then(res => {
                let arrLenght = res.data.dataLength;
                if (arrLenght > 0) {
                    save();
                    document.querySelector('.modal-btn-close').click();
                    searchBarSwitch('off');
                    navigate("/");
                } else {
                    setText('Unable to save data.')
                    setTimeout(() => {
                        document.querySelector('.modal-btn-close').click();
                        setText(defaultText);
                    }, 1500)

                }
            })
    }

    const orderSubmitHandler = (event) => {
        event.preventDefault();


        if (sid.current.value === '') {
            toast.error('Staff ID must be filled out');
        } else {
            orderSubmit(ean.current.value, content.current.value, quantity.current.value, sid.current.value, remark.current.value);
            ean.current.value = '';
            content.current.value = '';
            quantity.current.value = '';
            sid.current.value = '';
            remark.current.value = '';
            document.querySelector('.modal-btn-close').click();
        }


   
    }

    const uploadOrderData = () => {
        eanUpdate.current.value = state.orderData.data.ean;
        contentUpdate.current.value = state.orderData.data.content;
        quantityUpdate.current.value = state.orderData.data.quantity;
        sidUpdate.current.value = state.orderData.data.sid;
        remarkUpdate.current.value = state.orderData.data.remark;
        document.getElementById('delivery').value = state.orderData.data.delivery;
        // deliveryUpdate.current.value = state.orderData.data.delivery;
    }

    const updateOrder = (e) => {
        e.preventDefault();
        //(id, ean, product, quantity, sid, remark, delivery)
        updateEdit(state.editModeId,
            eanUpdate.current.value,
            contentUpdate.current.value,
            quantityUpdate.current.value,
            sidUpdate.current.value,
            remarkUpdate.current.value,
            document.getElementById('delivery').value
        )

        document.querySelector('.modal-btn-close').click();

    }

    const remarkBarAndEditToggle = () => {



        if (state.editMode === false) {



            return (
                state.remarkBar ?
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Order</h5>
                                {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                            </div>

                            <form onSubmit={orderSubmitHandler}>
                                <div className="modal-body">

                                    <div className="d-flex flex-column flex-wrap input-area" >
                                        <input ref={ean} className="form-control me-2 order-input" type="text" placeholder="Ean Code" />
                                        <input ref={content} className="form-control me-2 order-input" type="text" placeholder="Product Name" />
                                        <input ref={quantity} className="form-control me-2 order-input" type="number" placeholder="Quantity" />
                                        <input ref={sid} maxLength={7} required className="form-control me-2 order-input" type="number" placeholder="Staff ID" />
                                        <textarea maxLength={100} ref={remark} className="form-control" placeholder="Remark (Character limit of 100)" id="floatingTextarea2" style={{ height: '80px' }}></textarea>


                                    </div>


                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary modal-btn-close" data-bs-dismiss="modal">Close</button>
                                    <button type='submit' className="btn btn-primary" onClick={orderSubmitHandler}>Order</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    :
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Do you want to save it?</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <p>{text}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary modal-btn-close" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={saveButton}>Save changes</button>
                            </div>
                        </div>
                    </div>
            )
        } else {

            if(state.searchBar === false) {
                setTimeout(() => {
                    uploadOrderData();
                }, 10)
    
                return (
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">EDIT</h5>
                            </div>
    
                            <form onSubmit={updateOrder}>
                                <div className="modal-body">
    
                                    <div className="d-flex flex-column flex-wrap input-area" >
                                        <div>
                                            <input ref={eanUpdate} className="form-control me-2 order-input" type="text" placeholder="Ean Code" />
                                            <input ref={contentUpdate} className="form-control me-2 order-input" type="text" placeholder="Product Name" />
                                            <input ref={quantityUpdate} className="form-control me-2 order-input" type="number" placeholder="Quantity" />
                                            <input ref={sidUpdate} maxLength={7} required className="form-control me-2 order-input" type="number" placeholder="Staff ID" />
                                            {/* <input ref={deliveryUpdate} maxLength={20} required className="form-control me-2 order-input" type="text" placeholder="Delivery" /> */}
    
    
                                            <textarea maxLength={100} ref={remarkUpdate} className="form-control" placeholder="Remark (Character limit of 100)" id="floatingTextarea2" style={{ height: '80px' }}></textarea>
                                        </div>
    
                                        {/* <label for="delivery">Delivery Status:</label> */}
    
                                        <select id="delivery" className="form-select form-select-lg mb-3" aria-label="Default select example" style={{ marginTop: '10PX' }}>
                                            <option value="Pending">Pending</option>
                                            <option value="Packed">Packed</option>
                                            <option value="Departed">Departed</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
    
                                    </div>
    
    
                                </div>
                                <div className="modal-footer" style={{justifyContent: "space-around"}}>
                                    <button type="button" name={state.editModeId} onClick={removeButton} className="btn btn-danger">Delete</button>
                                    <button type="button" className="btn btn-outline-secondary modal-btn-close" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-outline-primary" onClick={updateOrder}>Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
     
        }
    }

    const removeButton = (e) => {
        const id = e.target.name;
        removeRemark(id);
        document.querySelector('.modal-btn-close').click();
    }


    return (

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">

            {
                remarkBarAndEditToggle()
                // state.remarkBar ?
                //     <div className="modal-dialog">
                //         <div className="modal-content">
                //             <div className="modal-header">
                //                 <h5 className="modal-title" id="exampleModalLabel">Order</h5>
                //                 {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                //             </div>

                //             <form onSubmit={orderSubmitHandler}>
                //                 <div className="modal-body">

                //                     <div className="d-flex flex-column flex-wrap input-area" >
                //                         <input ref={ean} className="form-control me-2 order-input" type="text" placeholder="Ean Code" />
                //                         <input ref={content} className="form-control me-2 order-input" type="text" placeholder="Product Name" />
                //                         <input ref={quantity} className="form-control me-2 order-input" type="number" placeholder="Quantity" />
                //                         <input ref={sid} maxLength={7} required className="form-control me-2 order-input" type="text" placeholder="Staff ID" />
                //                         <textarea maxLength={100} ref={remark} className="form-control" placeholder="Remark (Character limit of 100)" id="floatingTextarea2" style={{ height: '80px' }}></textarea>


                //                     </div>


                //                 </div>
                //                 <div className="modal-footer">
                //                     <button type="button" className="btn btn-secondary modal-btn-close" data-bs-dismiss="modal">Close</button>
                //                     <button type="button" className="btn btn-primary" onClick={orderSubmitHandler}>Order</button>
                //                 </div>
                //             </form>
                //         </div>
                //     </div>
                //     :
                //     <div className="modal-dialog">
                //         <div className="modal-content">
                //             <div className="modal-header">
                //                 <h5 className="modal-title" id="exampleModalLabel">Do you want to save it?</h5>
                //                 <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                //             </div>
                //             <div className="modal-body">
                //                 <p>{text}</p>
                //             </div>
                //             <div className="modal-footer">
                //                 <button type="button" className="btn btn-secondary modal-btn-close" data-bs-dismiss="modal">Close</button>
                //                 <button type="button" className="btn btn-primary" onClick={saveButton}>Save changes</button>
                //             </div>
                //         </div>
                //     </div>
            }
        </div>
    )
}

export default Modal;