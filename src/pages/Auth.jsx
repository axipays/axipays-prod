import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// icons
import Icon from "../media/icon/icons";

// icon-images
import Company_Logo_short from '../media/image/companyLogo_short.webp';
import LoginLine from '../media/image/login-line.png';

// css
import '../styles/pages.css';

// components
import Button from "../components/utilitis/Button.jsx";
import Input from "../components/utilitis/Input.jsx";
import LoginAnimation from '../components/AuthAnimation.jsx';

const Auth = () => {
    const [activePage, setActivePage] = useState('login');
    const [passwordVisibility, setPasswordVisibility] = useState({
        create: false,
        confirm: false,
        login: false,
    });

    const [hasSwitched, setHasSwitched] = useState(false);

    // Manage multiple fields with a single useState hook
    const [fields, setFields] = useState({});

    // Dynamic handler for input changes
    const handleInputChange = (field, value) => {
        setFields((prevFields) => ({
            ...prevFields,
            [field]: value,
        }));
    };

    const togglePasswordVisibility = (field) => {
        setPasswordVisibility((prevState) => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };

    const handlePageSwitch = (page) => {
        setActivePage(page);
        setHasSwitched(true);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const { email, password, name } = fields;
        console.log("Email:", email);
        console.log("Password:", password);
        console.log("Name:", name);
    };

    return (
        <div className='body'>
            <div className='login-page'>
                <Link to='/' className='authBackBtn'>
                    <div className='backBtn-label'>
                        <div className='favicon'>
                            <Icon
                                name="arrow_left"
                                width={25}
                                height={15}
                                color="#0066ff"
                            />
                        </div>
                        <p>Back</p>
                    </div>
                </Link>

                <div className='wrap'>
                    <div className='login-left'>
                        <div className='container'>
                            <div className='login-left-header'>
                                <img src={Company_Logo_short} alt='company logo' />
                                <h2>Welcome to <i>Axipays</i></h2>
                                <p>Your Gateway to Effortless Management.</p>
                            </div>
                            <div className='login-left-body'>
                                <LoginAnimation />
                            </div>
                            <div className='login-left-footer'>
                                <p className='firstLine'>Seamless Collaboration</p>
                                <img src={LoginLine} alt='login line' />
                                <p className='lastLine'>Effortlessly work together with your team in real-time.</p>
                            </div>
                        </div>
                    </div>

                    <div className='login-right'>
                        <div className='auth-form'>
                            <div className='form-container'>
                                <div className={`auth-pages ${activePage === 'signup' ? 'signup-active' : 'login-active'} ${hasSwitched ? 'with-animation' : ''}`}>
                                    <button
                                        onClick={() => handlePageSwitch('login')}
                                        className={activePage === 'login' ? 'auth-active' : ''}
                                    >
                                        Login
                                    </button>
                                    <button
                                        onClick={() => handlePageSwitch('signup')}
                                        className={activePage === 'signup' ? 'auth-active' : ''}
                                    >
                                        Sign up
                                    </button>
                                </div>

                                <div className='auth-form-container'>
                                    <div className={`form-wrapper ${activePage === 'login' ? 'auth-active' : 'inactive'}`}>
                                        <form className='login-form'>
                                            <span>
                                                <div className="input-group">
                                                    <Input
                                                        type="email"
                                                        value={fields.email}
                                                        placeholder="Email Id"
                                                        onChange={(value) => handleInputChange('email', value)}
                                                        isRequired="true"
                                                    />
                                                </div>
                                                <div className="input-group input-password">
                                                    <Input
                                                        type={passwordVisibility.login ? "text" : "password"}
                                                        value={fields.password}
                                                        placeholder="Password"
                                                        onChange={(value) => handleInputChange('password', value)}
                                                        isRequired="true"
                                                    />
                                                    <span className="password-icon" onClick={() => togglePasswordVisibility('login')}>
                                                        {passwordVisibility.login ? <Icon name="Hide" /> : <Icon name="Hide" className="grey" />}
                                                    </span>
                                                </div>
                                            </span>
                                            <label className='forgotpassword-link'>Forgot Password?</label>
                                            <Link to='/home'>
                                                <Button className='auth_btn' type='submit' onClick={handleLogin}>
                                                    <span>Log In</span>
                                                    <Icon
                                                        name="auth_btn_right_arrow"
                                                        width={25}
                                                        height={25}
                                                        color="#ffffff"
                                                    />
                                                </Button>
                                            </Link>
                                        </form>
                                    </div>

                                    {/* Signup form */}
                                    <div className={`form-wrapper ${activePage === 'signup' ? 'auth-active' : 'inactive'}`}>
                                        <form className='signup-form'>
                                            <div>
                                                <div className="input-group">
                                                    <Input 
                                                        type="text" 
                                                        placeholder="Full Name" 
                                                        onChange={(value) => handleInputChange('name', value)} 
                                                        required="true"
                                                    />
                                                </div>
                                                <div className="input-group">
                                                    <Input 
                                                        type="text" 
                                                        placeholder="Email Id"
                                                        onChange={(value) => handleInputChange('email', value)}
                                                        required="true" 
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="input-group">
                                                    <Input 
                                                        type="text" 
                                                        placeholder="Country" 
                                                        onChange={(value) => handleInputChange('country', value)}
                                                        required="true" 
                                                    />
                                                </div>
                                                <div className="input-group">
                                                    <Input 
                                                        type="text" 
                                                        placeholder="Contact No." 
                                                        onChange={(value) => handleInputChange('contact', value)}
                                                        required="true" 
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="input-group">
                                                    <Input 
                                                        type="text" 
                                                        placeholder="Company Name" 
                                                        onChange={(value) => handleInputChange('companyName', value)}
                                                        required="true" 
                                                    />
                                                </div>
                                                <div className="input-group">
                                                    <Input 
                                                        type="text" 
                                                        placeholder="Company URL" 
                                                        onChange={(value) => handleInputChange('companyURL', value)}
                                                        required="true" 
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="input-group">
                                                    <Input 
                                                        type="text" 
                                                        placeholder="Skype/Telegram" 
                                                        onChange={(value) => handleInputChange('povID', value)}
                                                        required="true" 
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="input-group input-password">
                                                    <Input
                                                        type={passwordVisibility.create ? "text" : "password"}
                                                        placeholder="Create Password"
                                                        onChange={(value) => handleInputChange('new_password', value)}
                                                        required="true" 
                                                    />
                                                    <span className="password-icon" onClick={() => togglePasswordVisibility('create')}>
                                                        {passwordVisibility.create ? <Icon name="Hide" className="grey" /> : <Icon name="Hide" className="grey" />}
                                                    </span>
                                                </div>
                                                <div className="input-group input-password">
                                                    <Input
                                                        type={passwordVisibility.confirm ? "text" : "password"}
                                                        placeholder="Confirm Password"
                                                        onChange={(value) => handleInputChange('new_confirm', value)}
                                                        required="true" 
                                                    />
                                                    <span className="password-icon" onClick={() => togglePasswordVisibility('confirm')}>
                                                        {passwordVisibility.confirm ? <Icon name="Hide" className="grey" /> : <Icon name="Hide" className="grey" />}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className='termspolicy'>
                                                <div>
                                                    <Input type='checkbox' className="type-checkbox" />
                                                    <p>I agree to <i>privacy policy and terms</i></p>
                                                </div>

                                                <div>
                                                    <Input type='checkbox' />
                                                    <p>Make this email account as root</p>
                                                </div>
                                            </div>
                                            <Button className='auth_btn signup_btn' onClick={handleLogin}>
                                                Sign Up
                                                <Icon
                                                    name="auth_btn_right_arrow"
                                                    width={25}
                                                    height={25}
                                                    color="#ffffff"
                                                />
                                            </Button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;