import React, {Component} from 'react';
import './Header.css';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import Modal from 'react-modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';
import { withRouter } from 'react-router-dom';
import {div} from 'prelude-ls';
import axios from 'axios'
import {Divider, Menu, MenuItem} from '@material-ui/core';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'

    }
}

const TabContainer = function (props) {
    return (
        <Typography component="div" style={{padding: 0, textAlign: 'center'}}>
            {props.children}
        </Typography>
    );
}

TabContainer.prototype = {
    children: PropTypes.node.isRequired
}

class Header extends Component {
    constructor() {
        super();
        this.state = {
            modalIsOpen: false,
            openMenu: false,
            value: 0,
            usercontact: "",
            password: "",
            userContactRequired: 'dispNone',
            passwordRequired: 'dispNone',
            firstname: "",
            lastname: "",
            email: "",
            passwordRegister: "",
            contact: "",
            registrationSuccess: false,
            loggedIn: false,
            snackBarOpen: false
        };
    }

    openModalHandler = () => {
        this.setState({modalIsOpen: true})
        this.setState({value: 0})
        this.setState({userContactRequired: "dispNone"})
        this.setState({passwordRequired: "dispNone"})
        this.setState({firstNameRequired: "dispNone"})
        this.setState({lastNameRequired: "dispNone"})
        this.setState({emailRequired: "dispNone"})
        this.setState({passwordRegisterRequired: "dispNone"})
        this.setState({contactRequired: "dispNone"})

    }
    closeModalHandler = () => {
        this.setState({modalIsOpen: false})
    }

    menuCloseHandler = () => {
        this.setState({
            openMenu: false
        })
    }

    menuOpenHandler = () => {
        this.setState({
            openMenu: true
        })
    }

    // Profile/Account click handler
    myAccountClickHandler = () => {
        let path = '/profile';
        this.props.history.push(path);
    }

    logoutClickHandler = () => {
        this.setState({
            loggedIn:false,
            openMenu:false
        })
        sessionStorage.clear()
        console.log("Logout success !!")
    }

    tabChangeHandler = (e, value) => {
        this.setState({value});
    }

    registerButtonClickHandler = () => {
        this.state.firstname === "" ? this.setState({firstNameRequired: "dispBlock"}) : this.setState({firstNameRequired: "dispNone"})
        this.state.lastname === "" ? this.setState({lastNameRequired: "dispBlock"}) : this.setState({lastNameRequired: "dispNone"})
        this.state.email === "" ? this.setState({emailRequired: "dispBlock"}) : this.setState({emailRequired: "dispNone"})
        this.state.passwordRegister === "" ? this.setState({passwordRegisterRequired: "dispBlock"}) : this.setState({passwordRegisterRequired: "dispNone"})
        this.state.contact === "" ? this.setState({contactRequired: "dispBlock"}) : this.setState({contactRequired: "dispNone"})

        let dataSignup = JSON.stringify({
            "email_address": this.state.email,
            "first_name": this.state.firstname,
            "last_name": this.state.lastname,
            "contact_number": this.state.contact,
            "password": this.state.passwordRegister
        });

        let url = "http://localhost:8080/api/customer/signup";
        let requestConfig = {
            url: url,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            },
            method: "post",
            data: dataSignup
        };
        // Call Post Api call for customer sign up
            axios(requestConfig)
                .then(response => {
                    if (response.statusText === "CREATED" || response.status === 201) {
                        this.setState({
                            modalIsOpen: false,
                            snackBarOpen: true
                        })
                        console.log("CUSTOMER SUCCESSFULLY REGISTERED !!")
                    }
                }).catch(function (error) {
                console.log("error occurred", error);
            });

        }

    loginButtonClickHandler = () => {
        this.state.usercontact === "" ? this.setState({userContactRequired: "dispBlock"}) : this.setState({userContactRequired: "dispNone"})
        this.state.password === "" ? this.setState({passwordRequired: "dispBlock"}) : this.setState({passwordRequired: "dispNone"})

        if (this.state.usercontact != "" && this.state.password != "") {
            let signInUrl = "http://localhost:8080/api/customer/login";
            let requestConfig = {
                url: signInUrl,
                headers: {
                    authorization: "Basic " + btoa(this.state.usercontact + ":" + this.state.password),
                    'Content-Type': 'application/json;charset=UTF-8',
                },
                method: "post",
                data: {}
            };
            axios(requestConfig)
                .then(response => {
                    if (response.statusText === "OK" || response.status === 200) {
                        this.setState({
                            loggedIn: true,
                            modalIsOpen: false,
                            firstname: response.data["first_name"],
                            snackBarOpen: true
                        })
                        console.log("login successful !!")
                        sessionStorage.setItem("access-token", response.headers['access-token']);
                        sessionStorage.setItem("loggedIn", this.state.loggedIn);
                    }
                })
                .catch(function (error) {
                    console.log("error occurred", error);
                });
        }
    };


    inputUserContactChangeHandler = (e) => {
        this.setState({usercontact: e.target.value})
    }
    inputPasswordChangeHandler = (e) => {
        this.setState({password: e.target.value})
    }
    firstNameChangeHandler = (e) => {
        this.setState({firstname: e.target.value})
    }
    lastNameChangeHandler = (e) => {
        this.setState({lastname: e.target.value})
    }
    emailChangeHandler = (e) => {
        this.setState({email: e.target.value})
    }
    passwordRegisterChangeHandler = (e) => {
        this.setState({passwordRegister: e.target.value})
    }
    contactChangeHandler = (e) => {
        this.setState({contact: e.target.value})
    }

    render() {

        return (
            <div>
                <header className="app-header">
                    <FastfoodIcon className="logo"></FastfoodIcon>
                    <FormControl className="search-formControl">
                        <Input id="finder"
                               startAdornment={
                                   <InputAdornment position="end">
                                       <SearchIcon className="search-icon"/>
                                   </InputAdornment>
                               }
                               placeholder={"Search By Restaurant Name"}
                        />
                    </FormControl>
                    <div className="header-btn">
                        {
                            this.state.loggedIn === true ?
                                <div>

                                    <div className={"loggedInProfile"}>
                                        <AccountCircle className={"account-circle"} onClick={this.menuOpenHandler}/>
                                        <Typography>
                                            {this.state.firstname}
                                        </Typography>
                                    </div>


                                    <Menu open={this.state.openMenu}
                                          onClose={this.menuCloseHandler}
                                          anchorEl={this.state.anchorEl}
                                          getContentAnchorEl={null}
                                          keepMounted={false}
                                          anchorOrigin={{vertical: "bottom", horizontal: "right"}}

                                          PaperProps={{
                                              style: {
                                                  transform: 'translateX(10px) translateY(-670px)',
                                              }
                                          }}>
                                        {
                                            this.props.showMyAccount ? // This prop would be passed from Home.js for enabling My Account option.
                                                <MenuItem onClick={this.myAccountClickHandler}>
                                                    <Typography>My Profile</Typography>
                                                    <Divider variant="middle"/>
                                                </MenuItem>
                                                : null
                                        }
                                        <MenuItem
                                            onClick={this.logoutClickHandler}><Typography>Logout</Typography>
                                        </MenuItem>
                                    </Menu>
                                </div> :
                                <div>
                                    <Button variant="contained" color="default" startIcon={<AccountCircle/>}
                                            onClick={this.openModalHandler} style={{marginRight: 20}}>Login</Button>
                                </div>
                        }

                    </div>
                </header>
                <Modal ariaHideApp={false} isOpen={this.state.modalIsOpen} contentLabel="Login"
                       onRequestClose={this.closeModalHandler} style={customStyles}>
                    <Tabs className="modal-tabs" value={this.state.value} onChange={this.tabChangeHandler}>
                        <Tab label="Login"></Tab>
                        <Tab label="Signup"></Tab>
                    </Tabs>
                    {this.state.value === 0 &&
                    <TabContainer>
                        <FormControl required>
                            <InputLabel htmlFor="usercontact">Contact No :</InputLabel>
                            <Input type="text" id="usercontact" usercontact={this.state.usercontact}
                                   onChange={this.inputUserContactChangeHandler}></Input>
                            <FormHelperText className={this.state.userContactRequired}><span
                                className="red">required*</span></FormHelperText>
                        </FormControl><br/><br/>
                        <FormControl required>
                            <InputLabel htmlFor="password">Password :</InputLabel>
                            <Input type="password" id="password" password={this.state.password}
                                   onChange={this.inputPasswordChangeHandler}></Input>
                            <FormHelperText className={this.state.passwordRequired}><span
                                className="red">required*</span></FormHelperText>
                        </FormControl><br/><br/>
                        {this.state.loggedIn === true &&
                        <FormControl>
                                    <span className="successText">
                                        Login Successful!
                                    </span>
                        </FormControl>
                        }
                        <br/><br/>
                        <Button variant="contained" color="primary"
                                onClick={this.loginButtonClickHandler}>Login</Button>
                    </TabContainer>}

                    {this.state.value !== 0 &&
                    <TabContainer>
                        <FormControl required>
                            <InputLabel htmlFor="firstname">First Name :</InputLabel>
                            <Input type="text" id="firstname" firstname={this.state.firstname}
                                   onChange={this.firstNameChangeHandler}></Input>
                            <FormHelperText className={this.state.firstNameRequired}><span
                                className="red">required*</span></FormHelperText>
                        </FormControl><br/><br/>
                        <FormControl required>
                            <InputLabel htmlFor="lastname">Last Name :</InputLabel>
                            <Input type="text" id="lastname" lastname={this.state.lastname}
                                   onChange={this.lastNameChangeHandler}></Input>
                            <FormHelperText className={this.state.lastNameRequired}><span
                                className="red">required*</span></FormHelperText>
                        </FormControl><br/><br/>
                        <FormControl required>
                            <InputLabel htmlFor="email">Email :</InputLabel>
                            <Input type="email" id="email" email={this.state.email}
                                   onChange={this.emailChangeHandler}></Input>
                            <FormHelperText className={this.state.emailRequired}><span
                                className="red">required*</span></FormHelperText>
                        </FormControl><br/><br/>
                        <FormControl required>
                            <InputLabel htmlFor="passwordRegister">Password :</InputLabel>
                            <Input type="password" id="passwordRegister" passwordRegister={this.state.passwordRegister}
                                   onChange={this.passwordRegisterChangeHandler}></Input>
                            <FormHelperText className={this.state.passwordRegisterRequired}><span
                                className="red">required*</span></FormHelperText>
                        </FormControl><br/><br/>
                        <FormControl required>
                            <InputLabel htmlFor="contact">Contact :</InputLabel>
                            <Input type="text" id="contact" contact={this.state.contact}
                                   onChange={this.contactChangeHandler}></Input>
                            <FormHelperText className={this.state.contactRequired}><span
                                className="red">required*</span></FormHelperText>
                        </FormControl><br/><br/>
                        {this.state.registrationSuccess === true &&
                        <FormControl>
                                    <span className="successText">
                                        Registration Successful. Please Login!
                                      </span>
                        </FormControl>
                        }
                        <br/><br/>
                        <Button variant="contained" color="primary"
                                onClick={this.registerButtonClickHandler}>Register</Button>
                    </TabContainer>}
                </Modal>
            </div>
        )
    }
}

export default withRouter(Header);
