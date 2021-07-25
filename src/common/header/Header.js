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
//import { Link } from 'react-router-dom';
import { div } from 'prelude-ls';

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

const TabContainer = function(props){
    return(
        <Typography component="div" style={{padding: 0, textAlign: 'center'}}>
            {props.children}
        </Typography>
    );
}

TabContainer.prototype = {
    children: PropTypes.node.isRequired
}

class Header extends Component{
    constructor(){
        super();
        this.state = {
            modalIsOpen: false,
            value: 0,
            usercontact: "",
            password: "",
            userContactRequired: 'dispNone',
            passwordRequired: 'dispNone',
            firstname: "",
            lastname: "",
            email: "",
            passwordRegister: "",
            contact: ""

        };
    }
    openModalHandler = () => {
        this.setState({modalIsOpen: true})
        this.setState({value : 0})
        this.setState({userContactRequired : "dispNone"})
        this.setState({passwordRequired : "dispNone"})
        this.setState({firstNameRequired : "dispNone"})
        this.setState({lastNameRequired : "dispNone"})
        this.setState({emailRequired : "dispNone"})
        this.setState({passwordRegisterRequired : "dispNone"})
        this.setState({contactRequired : "dispNone"})

    }
    closeModalHandler = () => {
        this.setState({modalIsOpen: false})
    }
    tabChangeHandler = (e, value) => {
        this.setState({value});
    }
    buttonClickHandler = () => {
        this.state.usercontact === "" ? this.setState({userContactRequired: "dispBlock"}) : this.setState({userContactRequired: "dispNone"})
        this.state.password === "" ? this.setState({passwordRequired: "dispBlock"}) : this.setState({passwordRequired: "dispNone"})
        this.state.firstname === "" ? this.setState({firstNameRequired: "dispBlock"}) : this.setState({firstNameRequired: "dispNone"})
        this.state.lastname === "" ? this.setState({lastNameRequired: "dispBlock"}) : this.setState({lastNameRequired: "dispNone"})
        this.state.email === "" ? this.setState({emailRequired: "dispBlock"}) : this.setState({emailRequired: "dispNone"})
        this.state.passwordRegister === "" ? this.setState({passwordRegisterRequired: "dispBlock"}) : this.setState({passwordRegisterRequired: "dispNone"})
        this.state.contact === "" ? this.setState({contactRequired: "dispBlock"}) : this.setState({contactRequired: "dispNone"})
    }
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

    render(){
        return(
            <div>
                <header className="app-header">
                    <FastfoodIcon className="logo"></FastfoodIcon>
                    <FormControl className="search-formControl">
                        <Input id="finder"
                            startAdornment={
                            <InputAdornment position="end">
                            <SearchIcon className="search-icon" />
                            </InputAdornment>
                            }
                        />
                    </FormControl>
                    <div className="header-btn">
                    <Button variant="contained" color="default" startIcon={<AccountCircle />} onClick={this.openModalHandler} style={{marginRight: 20}}>Login</Button>
                    </div>
                </header>
                <Modal ariaHideApp={false} isOpen={this.state.modalIsOpen} contentLabel="Login" onRequestClose={this.closeModalHandler} style={customStyles}>
                    <Tabs className="modal-tabs" value={this.state.value} onChange={this.tabChangeHandler}>
                        <Tab label="Login"></Tab>
                        <Tab label="Signup"></Tab>
                    </Tabs>
                    {this.state.value === 0 &&
                    <TabContainer>
                    <FormControl required>
                        <InputLabel htmlFor="usercontact">Contact No :</InputLabel>
                        <Input type="text" id="usercontact" usercontact={this.state.usercontact} onChange={this.inputUserContactChangeHandler}></Input>
                        <FormHelperText className={this.state.userContactRequired}><span className="red">required*</span></FormHelperText>
                    </FormControl><br/><br/>
                    <FormControl required>
                        <InputLabel htmlFor="password">Password :</InputLabel>
                        <Input type="password" id="password" password={this.state.password} onChange={this.inputPasswordChangeHandler}></Input>
                        <FormHelperText className={this.state.passwordRequired}><span className="red">required*</span></FormHelperText>
                    </FormControl><br/><br/>
                    <Button variant="contained" color="primary" onClick={this.buttonClickHandler}>Login</Button>
                </TabContainer>}

                {this.state.value !== 0 &&
                <TabContainer>
                        <FormControl required>
                            <InputLabel htmlFor="firstname">First Name :</InputLabel>
                            <Input type="text" id="firstname" firstname={this.state.firstname} onChange={this.firstNameChangeHandler}></Input>
                            <FormHelperText className={this.state.firstNameRequired}><span className="red">required*</span></FormHelperText>
                        </FormControl><br/><br/>
                        <FormControl required>
                            <InputLabel htmlFor="lastname">Last Name :</InputLabel>
                            <Input type="text" id="lastname" lastname={this.state.lastname} onChange={this.lastNameChangeHandler}></Input>
                            <FormHelperText className={this.state.lastNameRequired}><span className="red">required*</span></FormHelperText>
                        </FormControl><br/><br/>
                        <FormControl required>
                            <InputLabel htmlFor="email">Email :</InputLabel>
                            <Input type="email" id="email" email={this.state.email} onChange={this.emailChangeHandler}></Input>
                            <FormHelperText className={this.state.emailRequired}><span className="red">required*</span></FormHelperText>
                        </FormControl><br/><br/>
                        <FormControl required>
                            <InputLabel htmlFor="passwordRegister">Password :</InputLabel>
                            <Input type="password" id="passwordRegister" passwordRegister={this.state.passwordRegister} onChange={this.passwordRegisterChangeHandler}></Input>
                            <FormHelperText className={this.state.passwordRegisterRequired}><span className="red">required*</span></FormHelperText>
                        </FormControl><br/><br/>
                        <FormControl required>
                            <InputLabel htmlFor="contact">Contact :</InputLabel>
                            <Input type="text" id="contact" contact={this.state.contact} onChange={this.contactChangeHandler}></Input>
                            <FormHelperText className={this.state.contactRequired}><span className="red">required*</span></FormHelperText>
                        </FormControl><br/><br/>
                        <Button variant="contained" color="primary" onClick={this.buttonClickHandler}>Register</Button>
                    </TabContainer>}
                </Modal>
            </div>
        )
    }
}
export default Header;