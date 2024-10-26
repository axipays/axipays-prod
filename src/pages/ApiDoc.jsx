import React from 'react';
import { useNavigate } from "react-router-dom";

import Header from '../components/Header.jsx';
import Sidebar from '../components/Sidebar.jsx';

import Icon from '../media/icon/icons.jsx';

function ApiDoc() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <>
            <Header />
            <Sidebar />
            <div className='ApiDoc'>
                <div className="transaction-monitoring-main-head">
					<div className="back-to-previous">
						<Icon
							name="back_arrow"
							color="#00478f"
							onClick={handleBack}
							width={18}
							height={18}
						/>
					</div>
					<h4>API Documantation</h4>
				</div>
                <p>Axipays Api Documantation</p>
            </div>
        </>
    )
}

export default ApiDoc