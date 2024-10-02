import React from 'react';

// styles
import '../styles/pages.css';

// images
import AxipaysFull_log from '../media/image/Logo-stroke.webp';
import Door from "../media/image/404-door.webp";

function CenteredImage() {
    return (
        <>
            <div className='logo'>
                <img src={AxipaysFull_log} alt='Axipays full logo' />
            </div>
            <div className='error-head'>
                <h1>
                    <div className='rectangle rectangle-1'></div>
                    <div className='rectangle rectangle-2'></div>
                    <div className='rectangle rectangle-3'></div>
                    <div className='rectangle rectangle-4'></div>
                    <div className='rectangle rectangle-5'></div>
                    <div className='rectangle rectangle-6'></div>
                    <div className='rectangle rectangle-7'></div>
                    <div className='rectangle rectangle-8'></div>
                    <div className='rectangle rectangle-9'></div>
                    <div className='digit'>4</div>
                    <div className='digit door'>
                        <img src={Door} alt='Axipays full logo' />
                    </div>
                    <div className='digit'>4</div>
                </h1>
                <div className='digit-shadow1'></div>
                <div className='digit-shadow2'></div>
                <div className='overlay'>
                    <div className='digit-shadow'></div>
                    <div className='error-text'>
                        <h1>We can't seem to find the page you are looking for.</h1>
                        <p>Please consider entering a valid URL.</p>
                        <p>This page does not exist.</p>
                    </div>
                    <button className='primary-btn-bright'>Back to Home Page</button>
                    <div className='line'></div>
                </div>
            </div>
        </>
    );
}

export default CenteredImage;