import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from "../media/icon/icons";
import LoginAnimation from '../components/AuthAnimation.jsx';
import Company_Logo_short from '../media/image/companyLogo_short.webp';
import LoginLine from '../media/image/login-line.png';
import '../styles/pages.css';

const Auth = () => {
    const [activePage, setActivePage] = useState('login');
    const [passwordVisibility, setPasswordVisibility] = useState({
        create: false,
        confirm: false,
        login: false,
    });

    const [hasSwitched, setHasSwitched] = useState(false);

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

    return (
        <div className='body'>
            <div className='login-page'>
                <Link to='/' className='authBackBtn'>
                    <div className='backBtn-label'>
                       <div className='ic'>
                        <Icon
                                name="arrow_left"
                                width={25}
                                height={15}
                                color="#0066ff"
                                className="backBtn-label"
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
                                                    <input type="text" placeholder="Email Id" required />
                                                </div>
                                                <div className="input-group input-password">
                                                    <input
                                                        type={passwordVisibility.login ? "text" : "password"}
                                                        placeholder="Password"
                                                        required
                                                    />
                                                    <span className="password-icon" onClick={() => togglePasswordVisibility('login')}>
                                                        {passwordVisibility.login ? <Icon name="Hide" className="grey" /> : <Icon name="Hide" className="grey" />}
                                                    </span>
                                                </div>
                                            </span>
                                            <label className='forgotpassword-link'>Forgot Password?</label>
                                            <Link to='/home'>
                                                <button className='auth_btn' type='submit'>
                                                    <span>Log In</span>
                                                    <Icon
                                                        name="auth_btn_right_arrow"
                                                        width={25}
                                                        height={25}
                                                        color="#ffffff"
                                                    />
                                                </button>
                                            </Link>
                                        </form>
                                    </div>

                                    {/* Signup form */}
                                    <div className={`form-wrapper ${activePage === 'signup' ? 'auth-active' : 'inactive'}`}>
                                        <form className='signup-form'>
                                            <div>
                                                <div className="input-group">
                                                    <input type="text" placeholder="Full Name" required />
                                                </div>
                                                <div className="input-group">
                                                    <input type="text" placeholder="Email Id" required />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="input-group">
                                                    <input type="text" placeholder="Country" required />
                                                </div>
                                                <div className="input-group">
                                                    <input type="text" placeholder="Contact No." required />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="input-group">
                                                    <input type="text" placeholder="Company Name" required />
                                                </div>
                                                <div className="input-group">
                                                    <input type="text" placeholder="Company URL" required />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="input-group">
                                                    <input type="text" placeholder="Skype/Telegram" required />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="input-group input-password">
                                                    <input
                                                        type={passwordVisibility.create ? "text" : "password"}
                                                        placeholder="Create Password"
                                                        required
                                                    />
                                                    <span className="password-icon" onClick={() => togglePasswordVisibility('create')}>
                                                        {passwordVisibility.create ? <Icon name="Hide" className="grey" /> : <Icon name="Hide"className="grey" />}
                                                    </span>
                                                </div>
                                                <div className="input-group input-password">
                                                    <input
                                                        type={passwordVisibility.confirm ? "text" : "password"}
                                                        placeholder="Confirm Password"
                                                        required
                                                    />
                                                    <span className="password-icon" onClick={() => togglePasswordVisibility('confirm')}>
                                                        {passwordVisibility.confirm ? <Icon name="Hide" className="grey" /> : <Icon name="Hide" className="grey" />}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className='termspolicy'>
                                                <span><input type='checkbox' /></span>
                                                <span>
                                                    <label>I agree to <i>privacy policy and terms</i></label>
                                                </span>
                                            </div>
                                            <button className='auth_btn signup_btn' type='submit'>
                                                Sign Up
                                                <Icon
                                                    name="auth_btn_right_arrow"
                                                    width={25}
                                                    height={25}
                                                    color="#ffffff"
                                                />
                                            </button>
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
