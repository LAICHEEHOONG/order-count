import React, { useEffect, useState, useContext } from 'react';
import { MyContext } from '../context';
import axios from 'axios';
import errorImg from '../image/404_img.webp';
import { useNavigate } from 'react-router-dom';

const History = () => {

    const [historyData, setHistoryData] = useState([]);
    const [changeTable, setChangeTable] = useState([false, []]);

    let navigate = useNavigate();

    const context = useContext(MyContext);

    const {onNavbar, offNavbar} = context;

    useEffect(() => {
        onNavbar();
        axios.get('/api/verify/tokenpass')
        .then(res => {
            if(res.data.message === 'authenticate failed') {
                offNavbar();
                navigate('/');

            }
        })
        .catch(err => console.log(err))
        
        handleHistory();
    }, [navigate, onNavbar, offNavbar])

    const handleHistory = () => {
        axios.get('/api/history/historys')
            .then(res => {

                setHistoryData([...res.data])


            })
            .catch(err => console.log(err))
    }

    const deleteHistory = (event) => {
        let ID = event.target.id
        axios.delete('/api/history/historys', { data: { id: ID } })
            .then(res => {
                // console.log(res.data);
                setTimeout(() => {
                    handleHistory();
                }, 1)
            })
            .catch(err => console.log(err))
    }

    const showTable = (ID) => {
        axios.post('/api/history/historys/child', { id: ID })
            .then(res => {
                setChangeTable([true, [...res.data]])
            })
            .catch(err => console.log(err));
    }

    return (
        <>
            {
                changeTable[0] ? HistorySingleTable(changeTable[1]) : HistoryListTable(historyData, deleteHistory, showTable)
            }

        </>

    )
}

const HistoryListTable = (historyArrData, cb1, cb2) => {
    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">NO</th>
                    <th scope="col">DATE</th>
                    <th scope="col">OPEN</th>
                    <th scope="col">REMOVE</th>
                </tr>
            </thead>
            <tbody>

                {
                    historyArrData === 0 ? null : historyArrData.map((obj, i) => {
                        return (
                            <tr key={obj._id} >
                                <th scope="row">{i + 1}</th>
                                <td>{obj.date}</td>
                                <td>
                                    <button onClick={(e) => cb2(e.target.id)} type="button" id={obj._id} className="btn btn-success">OPEN</button>
                                </td>
                                <td>
                                    <button onClick={cb1} type="button" id={obj._id} className="btn btn-danger">DELETE</button>
                                </td>
                            </tr>
                        )
                    })
                }


            </tbody>
        </table>
    )
}

const HistorySingleTable = (dataArr) => {

    return (
        <table className="table table-hover" id='myTable'>
            <thead>
                <tr>
                    <th scope="col">No.</th>
                    <th scope="col">EAN</th>
                    <th scope="col">IMAGE</th>
                    <th scope="col">ONHAND QTY</th>
                    <th scope="col">LIST QTY</th>
                    {/* <th scope="col">FOUND</th> */}
                    <th scope="col">ABNORMAL</th>
                    {/* <th scope="col">REMOVE</th> */}
                </tr>
            </thead>
            <tbody>
                {
                    dataArr.length === 0 ? null : dataArr.map((item, i) => {
                        return (
                            <tr key={i} className={item.tableColor}>
                                <th scope="row">{i + 1}</th>
                                <td>{item.ean}</td>
                                <td>
                                    <img onError={e => e.target.src = errorImg} src={`https://www.phco.my/images/thumbs/products/${item.ean}/0.jpg`} alt="img" width="100" height="100" />
                                </td>
                                <td>{item.onHand}</td>
                                <td>{item.found}</td>
                                {/* <td style={{width: '9rem'}} >
                                <form onSubmit={updateListQty}>
                                <div className="input-group">
                                    <input id={item.ean} onChange={updateFound} placeholder='0' type="number" className="form-control"  aria-describedby="button-addon2" />
                                    <button  type='submit' className="btn btn-outline-secondary"  id="button-addon2" name={item.ean} onClick={updateListQty}>Add</button>
                                </div>
                                </form>
                            </td> */}
                                <td>
                                    {item.found - item.onHand}
                                </td>

                                {/* <td>
                                <button onClick={event => remove(event.target.name)} name={item.ean} type="button" className="btn btn-danger">REMOVE</button>
                            </td> */}

                            </tr>
                        )
                    })
                }


            </tbody>
        </table>
    )
}

export default History;