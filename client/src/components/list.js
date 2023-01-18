import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { MyContext } from '../context';
import errorImg from '../image/404_img.webp';
import {useNavigate} from 'react-router-dom';
import '../css/list.css';

const List = () => {

    const context = useContext(MyContext);
    const [dataArr, setDataArr] = useState([]);
    const [switchAdnormal, setSwitchAdnormal] = useState(true)
    const [foundValue, setFoundValue] = useState('');

    let navigate = useNavigate();

    const { foundUpdate, remove, onNavbar, offNavbar, searchBarSwitch } = context;

    useEffect(() => {
        onNavbar();
        searchBarSwitch('on');
        axios.get('/api/verify/tokenpass')
        .then(res => {     
            if(res.data.message === 'authenticate failed') {
                navigate('/');
                offNavbar();
            }
          
            
        })
        .catch(err => console.log(err))

        renderList();
        
    }, [navigate, onNavbar, offNavbar, searchBarSwitch])







    const updateFound = (event) => {
        // console.log(event.target.value)
        setFoundValue(event.target.value);
    }
    const renderList = () => {
        // console.log('renderList')
        axios.get('/api/stock/list')
            .then(res => {
                setDataArr([...res.data]);
            })
            .catch(err => console.log(err))
    }

    const updateListQty = (event) => {
        event.preventDefault();
        let ean = event.target.name;
        foundUpdate(ean, Number(foundValue));
        setFoundValue('');

        axios.get('/api/stock/list')
            .then(res => {
                renderList();
                clearInput(ean);
            })
            .then(res => {
                renderList();
            })
            .catch(err => console.log(err))


    }

    const clearInput = (ean) => {
        document.getElementById(ean).value = '';
    }

    const switchAdnormalFn = () => {
        if(switchAdnormal) {
            smallToBig();
            setSwitchAdnormal(false)
        } else {
            bigToSmall();
            setSwitchAdnormal(true);
        }
    }

    function smallToBig() {
        var table, rows, switching, i, x, y, shouldSwitch;
        table = document.getElementById("myTable");
        switching = true;

        while (switching) {

            switching = false;
            rows = table.rows;


            for (i = 1; i < (rows.length - 1); i++) {
                shouldSwitch = false;

                x = rows[i].getElementsByTagName("TD")[5];
                y = rows[i + 1].getElementsByTagName("TD")[5];

                if (Number(x.innerHTML) > Number(y.innerHTML)) {
                    shouldSwitch = true;
                    break;
                }

            }
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
            }
        }

    }

    function bigToSmall() {
        var table, rows, switching, i, x, y, shouldSwitch;
        table = document.getElementById("myTable");
        switching = true;

        while (switching) {

            switching = false;
            rows = table.rows;


            for (i = 1; i < (rows.length - 1); i++) {
                shouldSwitch = false;

                x = rows[i].getElementsByTagName("TD")[5];
                y = rows[i + 1].getElementsByTagName("TD")[5];

                if (Number(x.innerHTML) < Number(y.innerHTML)) {
                    shouldSwitch = true;
                    break;
                }

            }
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
            }
        }

    }



    return (


        <table className="table" id='myTable'>
            <thead>
                <tr>
                    <th scope="col">No.</th>
                    <th scope="col">EAN</th>
                    <th scope="col">IMAGE</th>
                    <th scope="col">ONHAND QTY</th>
                    <th scope="col">LIST QTY</th>
                    <th scope="col">FOUND</th>
                    <th scope="col" onClick={switchAdnormalFn}>
                        <button type="button" className="btn btn-outline-dark">ABNORMAL</button>
                        
                    </th>
                    <th scope="col">REMOVE</th>
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
                                <td style={{ width: '9rem' }} >
                                    <form onSubmit={updateListQty}>
                                        <div className="input-group">
                                            <input id={item.ean} onChange={updateFound} placeholder='0' type="number" className="form-control" aria-describedby="button-addon2" />
                                            <button type='submit' className="btn btn-outline-secondary" id="button-addon2" name={item.ean} onClick={updateListQty}>Add</button>
                                        </div>
                                    </form>
                                </td>
                                <td>
                                    {item.onHand - item.found}
                                </td>

                                <td>
                                    <button onClick={event => {
                                        remove(event.target.name);
                                        setTimeout(() => {
                                            renderList()
                                        }, 100);
                                    }
                                    } name={item.ean} type="button" className="btn btn-danger">REMOVE</button>
                                </td>

                            </tr>
                        )
                    })
                }


            </tbody>
        </table>

    )
}

export default List;