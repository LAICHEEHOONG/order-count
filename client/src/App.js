import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Navbar from './components/navbar';
import Input from './components/input';
import List from './components/list';
import History from './components/history';
// import Remark from './components/remark';
import Order from './components/order';
import './css/app.css';
import Auth from './components/auth';
import Scroll from './components/scroll';


const App = () => {




    return (

        <BrowserRouter>

            <Scroll />
            <Navbar />
            <Routes>

                <Route path='/' element={<Auth />} />
                <Route path='/input' element={<Input />} />
                <Route path='/list' element={<List />} />
                <Route path='/history' element={<History />} />
                {/* <Route path='/remark' element={<Remark />} /> */}
                <Route path='/order' element={<Order />} />
                <Route
                    path="*"
                    element={
                        <main style={{ padding: "1rem" }}>
                            <p>There's nothing here!</p>
                        </main>
                    }
                />
            </Routes>


        </BrowserRouter>
    )
}

export default App;
