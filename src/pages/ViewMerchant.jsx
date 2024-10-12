import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Icon from "../media/icon/icons.jsx";
import UserProfile from "../media/image/UserProfile.webp";

function ViewMerchant() {
    const [activeTab, setActiveTab] = useState("Business Details");

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    return (
        <>
            <div>
                <Header />
                <Sidebar />
            </div>
            <div className="viewmerchant">
                <div className="viewmerchant-title">
                 <Link to="/managemerchant">   <Icon
                        name="back_arrow"
                        width={20}
                        height={20}
                        color="#00264c"
                        className='ic back-button'
                    /></Link>
                    <h1>Delasports-bellona</h1>
                </div>
                <div className="viewmerchant-card1">
                    <h4>Profile Details</h4>
                    <div className="profiledetails">
                        <img src={UserProfile} alt="Profile" className="profile-image" />
                        <p>Delasports-bellona</p>
                        <div className="profile-status">
                            <p>Active</p>
                        </div>
                        <div className="profiledetails-right">
                            <button className="suspend-button">
                                <p>Suspend</p>
                            </button>
                            <button className="edit-details">
                                <Icon
                                    name="edit"
                                    width={20}
                                    height={20}
                                    color="#fafafa"
                                    className='ic edit-icon'
                                />
                                <p>Edit Details</p>
                            </button>
                        </div>
                    </div>
                    <div className="about-section">
                        <p>About</p>
                        <div className="about-content">
                            <div className="about-left">
                                <p>Username</p>
                                <p>Merchant ID</p>
                                <p>Website URL</p>
                                <p>Industry</p>
                            </div>
                            <div className="about-right">
                                <p>delasportsbellona_user</p>
                                <p>930</p>
                                <p>https://www.delasportsbellona.com</p>
                                <p>Gaming</p>
                            </div>
                        </div>
                    </div>
                    <div className="contact-section">
                        <p>Contact Details</p>
                        <div className="contact-content">
                            <div className="contact-left">
                                <p>Phone No.</p>
                                <p>Email ID</p>
                                <p>Skype ID</p>
                            </div>
                            <div className="contact-right">
                                <p>1234567890</p>
                                <p>delasportsbellona@gmail.com</p>
                                <p>liv.cid: 123654789</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="viewmerchant-card2">
                    <h4>Overview</h4>
                    <div className="total-volume">
                        <Icon
                            name="dollar"
                            width={40}
                            height={40}
                            color="#00264c"
                            className='ic dollar-total-volume'
                        />
                        <p>Total Volume</p>
                    </div>
                    <div className="total-vol">
                        <p>$60.5K</p>
                    </div>
                    <div className="total-volume">
                        <Icon
                            name="dollar"
                            width={40}
                            height={40}
                            color="#00264c"
                            className='ic dollar-total-volume'
                        />
                        <p>Settled Volume</p>
                    </div>
                    <div className="total-vol">
                        <p>$47.4K</p>
                    </div>
                    <div className="total-volume">
                        <Icon
                            name="overview"
                            width={35}
                            height={35}
                            color="#00264c"
                            className='ic dollar-total-volume'
                        />
                        <p>Approval Ratio</p>
                    </div>
                    <div className="total-vol">
                        <p>47%</p>
                    </div>
                </div>
                <div className="viewmerchant-card3">
                    <div className="viewmerchant-tabs">
                        <div
                            className={`tab ${activeTab === "Business Details" ? "active" : ""}`}
                            onClick={() => handleTabClick("Business Details")}
                        >
                                <Icon
                                    name="building"
                                    width={20}
                                    height={20}
                                    color="#00264c"
                                    className="ic building"
                                />
                                <p>Business Details</p>
                        </div>
                        <div
                            className={`tab ${activeTab === "Rates" ? "active" : ""}`}
                            onClick={() => handleTabClick("Rates")}
                        >
                            <Icon
                                name="rates"
                                width={20}
                                height={20}
                                color="#00264c"
                                className="ic building"
                            />
                            <p>Rates</p>
                        </div>
                        <div
                            className={`tab ${activeTab === "Settlements" ? "active" : ""}`}
                            onClick={() => handleTabClick("Settlements")}
                        >
                            <Icon
                                name="checkbook"
                                width={20}
                                height={20}
                                color="#00264c"
                                className="ic building"
                            />
                            <p>Settlements</p>
                        </div>
                        <div
                            className={`tab ${activeTab === "Secrets" ? "active" : ""}`}
                            onClick={() => handleTabClick("Secrets")}
                        >
                            <Icon
                                name="secrets"
                                width={20}
                                height={20}
                                color="#00264c"
                                className="ic building"
                            />
                            <p>Secrets</p>
                        </div>
                    </div>

                    {activeTab === "Business Details" && (
                        <>
                            <h4>Business Details</h4>
                            <div className="businessinfo-section">
                                <p>Business Info</p>
                                <div className="businessinfo-content">
                                    <div className="businessinfo-left">
                                        <p>Type</p>
                                        <p>Category</p>
                                        <p>Sub Category</p>
                                        <p>Registered On</p>
                                        <p>Industries ID</p>
                                    </div>
                                    <div className="businessinfo-right">
                                        <p>Example</p>
                                        <p>Example</p>
                                        <p>Example</p>
                                        <p>NA</p>
                                        <p>1234567</p>
                                    </div>
                                </div>
                            </div>
                            <div className="businessinfo2-section">
                                <div className="businessinfo2-content">
                                    <div className="businessinfo2-left">
                                        <p>Pay In</p>
                                        <p>Pay Out</p>
                                        <p>Settlement Charge</p>
                                        <p>Turnover</p>
                                        <p>Expected Chargeback Percentage</p>
                                    </div>
                                    <div className="businessinfo2-right">
                                        <p>Bank Transfer</p>
                                        <p>Pay Pal</p>
                                        <p>10</p>
                                        <p>$100000</p>
                                        <p>5%</p>
                                    </div>
                                </div>
                            </div>
                            <div className="directorinfo-section">
                                <p>Director's Info</p>
                                <div className="directorinfo-content">
                                    <div className="directorinfo-left">
                                        <p>First Name</p>
                                        <p>Last Name</p>
                                    </div>
                                    <div className="directorinfo-right">
                                        <p>John</p>
                                        <p>Doe</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === "Rates" && (
                        <>
                            <div className="rates-title">
                                <h4>Current Prices</h4>
                                <button className="edit-details rates-button">
                                    <Icon
                                        name="edit"
                                        width={20}
                                        height={20}
                                        color="#fafafa"
                                        className='ic edit-icon'
                                    />
                                    <p>Edit Details</p>
                                </button>
                            </div>
                            <div className="rates-table-container">
                                <table>
                                    <thead>
                                        <tr className="tableheader">
                                            <th className="p1">S. No.</th>
                                            <th className="p1">Charging Rates</th>
                                            <th className="p1">Rates/Amounts</th>
                                            <th className="p1">Remarks</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="p2">
                                            <td>1</td>
                                            <td>MDR</td>
                                            <td>$10</td>
                                            <td>Standard Rate</td>
                                        </tr>
                                        <tr className="p2">
                                            <td>2</td>
                                            <td>Transactions Approved</td>
                                            <td>$20</td>
                                            <td>Additional Fees May Apply</td>
                                        </tr>
                                        <tr className="p2">
                                            <td>3</td>
                                            <td>Transactions Declined</td>
                                            <td>2.5%</td>
                                            <td>Applied Per Transaction</td>
                                        </tr>
                                        <tr className="p2">
                                            <td>4</td>
                                            <td>Refund Fee</td>
                                            <td>$5</td>
                                            <td> - </td>
                                        </tr>
                                        <tr className="p2">
                                            <td>5</td>
                                            <td>Chargeback Fee</td>
                                            <td>$5</td>
                                            <td> - </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                    {activeTab === "Settlements" && <div>Settlements Content</div>}
                    {activeTab === "Secrets" && (
                        <>
                            <div className="rates-title">
                                <h4>API Key List and Access</h4>
                                <button className="edit-details generate-button">
                                    <p>Generate Key</p>
                                </button>
                            </div>
                            <div className="secrets-card1">
                                <div className="api-access">
                                    <p>Public Key</p>
                                </div>
                                <h4>API Key</h4>
                                <p className="api-key">**********************</p>
                            </div>
                            <div className="secrets-card2">
                                <div className="api-access2">
                                    <p>Private Key</p>
                                </div>
                                <h4>Secret Key</h4>
                                <p className="secret-key">**********************</p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default ViewMerchant;