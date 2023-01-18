import React, { Component } from 'react';
import axios from 'axios';
import tuturu from '../sound/tuturu.mp3';
import saved from '../sound/saved.mp3';
import problem from '../sound/problem.mp3';
import loadVoice from '../sound/load.mp3';
import imgExpect from '../image/input_img1.webp';
import imgWhat from '../image/input_img2.webp';
import imgGood from '../image/input_img3.webp';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const MyContext = React.createContext();

class MyProvider extends Component {

    state = {
        searchBar: false,
        checkBox: false,
        spinner: false,
        ean: '',
        img: imgExpect,
        remarkBar: false,
        remarks: [],
        content: { eanNum: '', eanInfo: '' },
        imgLink: imgExpect,
        navbar_hidden: true,
        imgLogin: imgGood,
        loginMessage: 'Login',
        orderMode: false,
        editMode: false,
        editModeId: '',
        orderData: ''
    }

    handleUpdateEdit = (id, ean, product, quantity, sid, remark, delivery) => {
        axios.patch('/api/remark/order', { id, ean, product, quantity, sid, remark, delivery })
            .then(res => {
                // console.log(res.data);
                this.handleRemarks();
            })
            .catch(err => console.log(err));
    }

    handleEditSwitch = (onOff, id) => {
        // console.log(id)
        if (onOff === 'on') {
            axios.post('/api/remark/order', { id })
                .then(res => {
                    // console.log(res.data);
                    this.setState({ editMode: true, editModeId: id, orderData: res.data })
                })
                .catch(err => console.log(err))

        } else {
            this.setState({ editMode: false })
        }

    }

    handleSetOrderMode = (onOff) => {
        this.setState({ orderMode: onOff })
    }

    handleSubmitOrder = (ean, content, quantity, sid, remark) => {
        let date = new Date().toString();
        let time = new Date().getTime();
        // const delivery = 'Pending'
        axios.post('/api/remark/remarks', {
            ean,
            content,
            quantity,
            sid,
            remark,
            date,
            time
        })
            .then(res => {
                // console.log(res.data);
                this.handleRemarks();
            })
            .catch(err => console.log(err));
    }



    handleOnNavbar = () => {
        this.setState({ navbar_hidden: false });
    }

    handleOffNavbar = () => {
        this.setState({ navbar_hidden: true });
    }

    handleLogin = (user, password, cb) => {

        this.handleSpinner();

        axios.post('/api/user/auth/login', {
            userName: user,
            password: password
        })
            .then(res => {
                // console.log(res.data);
                if (res.data.message === 'login') {
                    this.setState({ navbar_hidden: false, imgLogin: imgGood, loginMessage: 'Login success', orderMode: false });

                    cb('/input', res.data.token)
                } else if (res.data.message === 'login_user') {
                    this.setState({ navbar_hidden: false, imgLogin: imgGood, loginMessage: 'Login success', orderMode: true });

                    cb('/order', res.data.token)
                } else {
                    this.setState({ navbar_hidden: true, imgLogin: imgWhat, loginMessage: 'Login failed', orderMode: false });
                    cb('/', 'no token')
                }
                this.handleSpinner();

            })
            .catch(err => {
                console.log('context/index.js handleLogin failed');
                console.log(err);
            })
    }


    handleNavbarHidden = () => {
        this.setState({ navbar_hidden: !this.state.navbar_hidden })
    }


    handleSetImgLink = (num) => {
        if (!Number(num) || num.length < 11) {
            this.setState({ imgLink: imgWhat })
        } else {
            this.setState({ imgLink: `https://www.phco.my/images/thumbs/products/${num}/0.jpg` })
        }
    }

    handleErrImgLink = () => {
        this.setState({ imgLink: imgWhat });
    }

    handleCheckBox = () => {
        this.setState({ checkBox: !this.state.checkBox })
    };

    handleUpdate = (ean, qty) => {
        this.handleSpinner();
        this.setState({ ean: ean });
        // '/api/update'
        axios.post('/api/stock/input', {
            ean: ean,
            onHandQty: qty
        })
            .then(res => {
                // console.log(res.data)
                this.setState({
                    content: {
                        eanNum: res.data.remarkContent.eanCode,
                        eanInfo: res.data.remarkContent.infoEan
                    }
                });
                this.handleSpinner();
                // console.log(res.data.status)
                return res;
            })
            .then(res => {
                this.handleSound(res.data.status);
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleSpinner = () => {
        this.setState({ spinner: !this.state.spinner });
    }

    handleSound = (status) => {
        const savedSound = new Audio(saved);
        const loadSound = new Audio(loadVoice);
        const problemSound = new Audio(problem);
        const remarkSound = new Audio(tuturu);

        switch (status) {
            case 'saved':
                savedSound.play();
                return;
            case 'updated':
                loadSound.play();
                return;
            case 'error':
                problemSound.play();
                return;

            case 'tuturu':
                remarkSound.play();
                return;

            default:
                break;
        }
    }


    handleSeachBar = (onOff) => {
        if (onOff === 'on') {
            this.setState({ searchBar: true })
        } else {
            this.setState({ searchBar: false })
        }

    }

    handleFoundUpdate = (ean, foundQty) => {
        axios.patch('/api/stock/list', { ean, foundQty })
            // .then(res => {
            //     return;
            //     // console.log(res.data);
            // })
            .catch(err => console.log(err));
    }

    handleRemove = (ean) => {
        // axios.delete('/api/stock/list', { ean })
        //     // .then(res => console.log(res.data))
        //     .catch(err => console.log(err));
        axios.delete('/api/stock/list', { data: { ean } })
            // .then(res => console.log(res.data))
            .catch(err => console.log(err));
    }

    handleSave = () => {

        let date = new Date();

        axios.post('/api/stock/list', { date: date.toString() })
            // .then(res => console.log(res.data))
            .catch(err => console.log(err));
    }

    handleRemarkBar = (onOff) => {
        if (onOff === 'on') {
            this.setState({ remarkBar: true })
        } else {
            this.setState({ remarkBar: false })
        }
    }

    handleRemarks = () => {
        axios.get('/api/remark/remarks')
            .then(res => {
                // console.log(res.data);
                this.setState({ remarks: [...res.data] })
            })
            .catch(err => console.log(err));
    }

    handleRemoveRemark = (id) => {
        axios.delete('/api/remark/remarks', { data: { ID: id } })
            .then(res => {
                // console.log(res.data);
                this.handleRemarks();
            })
            .catch(err => console.log(err));
    }

    handleInputInfo = (num) => {
        this.setState({
            content: {
                eanNum: num,
                eanInfo: ''
            }
        })
    }

    render() {
        return (
            <MyContext.Provider
                value={{
                    state: this.state,
                    checkBox: this.handleCheckBox,
                    update: this.handleUpdate,
                    spinner: this.handleSpinner,
                    searchBarSwitch: this.handleSeachBar,
                    foundUpdate: this.handleFoundUpdate,
                    remove: this.handleRemove,
                    save: this.handleSave,
                    remarkBarInput: this.handleRemarkBar,
                    addRemark: this.handleRemarks,
                    removeRemark: this.handleRemoveRemark,
                    inputInfo: this.handleInputInfo,
                    setImgLink: this.handleSetImgLink,
                    setErrImg: this.handleErrImgLink,
                    login: this.handleLogin,
                    // loginTesting: this.handleLoginTesting,
                    // handleNavbarHidden: this.navbarSwitch,
                    onNavbar: this.handleOnNavbar,
                    offNavbar: this.handleOffNavbar,
                    // getTokenCookie: this.handleGetTokenCookie,
                    // getAuthHeader: this.handleGetAuthHeader,
                    orderSubmit: this.handleSubmitOrder,
                    setOrderMode: this.handleSetOrderMode,
                    editSwitch: this.handleEditSwitch,
                    updateEdit: this.handleUpdateEdit

                }}
            >
                {this.props.children}
                <ToastContainer
                    position="top-left"
                    autoClose={2500}
                />
            </MyContext.Provider>
        )
    }
}

export { MyContext, MyProvider };