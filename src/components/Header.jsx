import React from 'react';
import Icon from "../media/icon/icons.jsx";

import '../styles/component.css';

function Header() {
    return (
        <div className='portal-header'>
            <div className='input-grp'>
               <div className='ic'>
                <Icon
                            name="search"
                            width={22}
                            height={22}
                            color="black"
                        />
               </div>
                <input type='text' placeholder='Search' />
                <div className='ic'>
                    <Icon
                            name="commandline"
                            width={25}
                            height={25}
                            color="black"
                            className='ic'
                        />
                </div>
            </div>
            <div className='header-functionality'>
                <div className='header-notification'>
                   <div className='ic'>
                        <Icon
                            name="bell"
                            width={25}
                            height={25}
                            color="black"
                        />
                   </div>
                </div>
                <div className='profileSection'>
                    <div className='img-section'></div>
                    <div className='details-section'>
                        <p className='userName'>Axipays</p>
                        <p className='userRole'>admin</p>
                    </div>
                    <div className='dropDown-section'>
                        <div className='ic'>
                            <Icon
                                name="arrow_down"
                                width={25}
                                height={25}
                                color="black"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header