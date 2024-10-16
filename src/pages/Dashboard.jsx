import React, { useState,useEffect } from "react";

import "../styles/pages.css";

import Icon from "../media/icon/icons";
import france from "../media/image/flag/france.png";
import germany from "../media/image/flag/germany.png";
import spain from "../media/image/flag/spain.png";
import italy from "../media/image/flag/us.png"

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

import LineChart from "../components/LineChart";

//Importing components
import StackedBarChart from "../components/StackedBarChart";
import CountryMap from "../components/CountryMap";
import Table from "../components/Table";

function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const countryData = [
    { name: 'France', percentage: 60, image: france },
    { name: 'Germany', percentage: 30, image: germany },
    { name: 'Spain', percentage: 80, image: spain },
    { name: 'Italy', percentage: 50, image: italy },
  ];

  const iconMap = {
    merchant: 'assignment_ind', 
    acquirer: 'person_book', 
    usd: 'dollar',
    from: 'calendar', 
    to: 'calendar', 
  };

  const toggleBox = () => {
    if (isOpen) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(false);
        setIsOpen(false);
      }, 500);
    } else {
      setIsOpen(true);
      setIsAnimating(false);
    }
  };

  const toggleExpand = (label) => {
    setExpandedItems((prev) => (prev === label ? null : label));
  };

  useEffect(() => {
    const today = new Date();
    const last7Days = new Date(today);
    last7Days.setDate(today.getDate() - 6);

    setFromDate(last7Days.toISOString().split('T')[0]);
    setToDate(today.toISOString().split('T')[0]);
  }, []);

  const handleDateChange = (label, date) => {
    if (label === 'from') setFromDate(date);
    else if (label === 'to') setToDate(date);
  };

  return (
    <>
      <Header />
      <Sidebar />
      <div className="main-screen dashboard">
        <p>Dashboard</p>

        {/* Cards showing stats about volume and traffic for a single day for each currency*/}

        <div className="db-glance">
          <div className="db-glance-date-selector">
            <p>Today</p>
            <Icon name="arrow_down" width={22} height={22} color="black" />
          </div>
          <div className="db-glance-top">
            <h3>Welcome back, Admin</h3>
            <p>Here are the latest updates for Today</p>
          </div>
          <div className="db-glance-bottom">
            <div className="today-stats-div">
              <div className="today-stats-head">
                <div className="no-hover-icon-head">
                  <div className="no-hover-icon">
                    <Icon name="sales" width={22} height={22} color="#002966" />
                  </div>
                  <h5 className="db-div-head">Total Volume</h5>
                </div>
                <h2 className="total-amount">$ 26,039</h2>
              </div>
              <div className="today-stats-values">
                <div className="today-stats-value-row">
                  <div className="no-hover-icon-head">
                    <div className="no-hover-icon">
                      <Icon name="dollar" width={20} height={20} color="#002966" />
                    </div>
                    <h6 className="db-div-head">USD</h6>
                  </div>
                  <div className="no-hover-icon-head">
                    <p className="total-counts">$13,000</p>
                    <div className="percent-div">
                      <p>15%</p>
                    </div>
                  </div>
                </div>

                <div className="today-stats-value-row">
                  <div className="no-hover-icon-head">
                    <div className="no-hover-icon">
                      <Icon name="euro" width={20} height={20} color="#002966" />
                    </div>
                    <h6 className="db-div-head">EUR</h6>
                  </div>
                  <div className="no-hover-icon-head">
                    <p className="total-counts">$13,000</p>
                    <div className="percent-div">
                      <p>15%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="today-stats-div">
              <div className="today-stats-head">
                <div className="no-hover-icon-head">
                  <div className="no-hover-icon">
                    <Icon name="traffic" width={22} height={22} color="#002966" />
                  </div>
                  <h5 className="db-div-head">Traffic Status</h5>
                </div>
                <h2>50,000</h2>
              </div>
              <div className="today-stats-values">
                <div className="today-stats-value-row">
                  <div className="no-hover-icon-head">
                    <div className="no-hover-icon">
                      <Icon name="dollar" width={20} height={20} color="#002966" />
                    </div>
                    <h6 className="db-div-head">USD</h6>
                  </div>
                  <div className="no-hover-icon-head">
                    <p className="total-counts">13,000</p>
                    <div className="percent-div">
                      <p>25%</p>
                    </div>
                  </div>
                </div>

                <div className="today-stats-value-row">
                  <div className="no-hover-icon-head">
                    <div className="no-hover-icon">
                      <Icon name="euro" width={20} height={20} color="#002966" />
                    </div>
                    <h6 className="db-div-head">EUR</h6>
                  </div>
                  <div className="no-hover-icon-head">
                    <p className="total-counts">15,000</p>
                    <div className="percent-div traffic-percent-div">
                      <p>25%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="glance-show-more-div">
              <Icon name="vertical_dots" width={22} height={22} color="#002966" />
            </div>
          </div>
        </div>

        {/* {Filters} */}

        <div className="db-filters">
          <div className="db-filters-head">
            <h4>Customization</h4>
          </div>
          <div className="db-filters-button">
            {isOpen && (
              <div className={`box-row ${isAnimating ? 'close' : 'open'}`}>
                {['merchant', 'acquirer', 'usd', 'from', 'to'].map((label, index) => (
                  <div className={`box-content ${label === 'from' || label === 'to' ? 'tofrominput' : ''}`} key={index}>
                    <p className="db-filter-icons">
                      <Icon name={iconMap[label]} width={22} height={22} color="#002966" />
                      {label.charAt(0).toUpperCase() + label.slice(1)}
                    </p>
                    <Icon
                      name="arrow_down"
                      width={23}
                      height={23}
                      color="#002966"
                      className="icon-cursor"
                      onClick={() => toggleExpand(label)}
                    />
                    {expandedItems === label && (
                       <div className="dropdown-content">
                       {label === 'from' || label === 'to' ? (
                         <input
                           type="date"
                           onChange={(e) => handleDateChange(label, e.target.value)}
                         />
                       ) : (
                         <p>Dropdown content for {label}</p>
                       )}
                     </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            <div className="no-hover-icon no-hover-filter-icon" onClick={toggleBox}>
              <Icon name={isOpen ? 'close_fill' : 'dashboard_customize'} width={22} height={22} color="#002966" />
            </div>

          </div>

        </div>

        {/* Cards showing stats about volume, traffic and approvals for a selected range of 7 days*/}

        <div className="db-details">
          <div className="db-details-approvals">
            <div className="approvals-div">
              <div className="today-stats-head">
                <div className="no-hover-icon-head">
                  <div className="no-hover-icon">
                    <Icon name="piechart" width={22} height={22} color="#002966" />
                  </div>
                  <h5 className="db-div-head">Overview</h5>
                </div>
                <Icon
                  name="right_diagonal_up_arrow"
                  width={22}
                  height={22}
                  color="#0066ff"
                  className="icon-cursor"
                />
              </div>

              <div className="stackedbar-info">
                <div className="stacked-bar-status-info">
                  {[
                    { label: 'Success', amount: '$1234324', bulletColor: '#005CB8' },
                    { label: 'Failed', amount: '$1234324', bulletColor: '#247CFF' },
                    { label: 'Incomplete', amount: '$1234324', bulletColor: '#D6EBFF' },
                  ].map(({ label, amount, bulletColor }) => (
                    <div className="status-head" key={label}>
                      <div>
                        <span className="status-bullet" style={{ backgroundColor: bulletColor }}></span>
                        {label}
                      </div>
                      <span>{amount}</span>
                    </div>
                  ))}
                </div>

                <div className="percent-div view-more">
                  <p>View More</p>
                </div>
              </div>
              <div className="stacked-bar-chart">
                {" "}
                <StackedBarChart fromDate={fromDate} toDate={toDate} />
              </div>
            </div>

            <div className="approvals-div">
              <div className="today-stats-head">
                <div className="no-hover-icon-head">
                  <div className="no-hover-icon">
                    <Icon name="sales" width={22} height={22} color="#002966" />
                  </div>
                  <h5 className="db-div-head">Approval Ratio</h5>
                </div>
                <Icon
                  name="right_diagonal_up_arrow"
                  width={22}
                  height={22}
                  color="#0066ff"
                  className="icon-cursor"
                />
              </div>
              <div className="stacked-bar-chart">
                {" "}
                <LineChart />
              </div>
            </div>
          </div>

          <div className="db-details-country">
            <div className="country-div">
              <div className="today-stats-head">
                <div className="no-hover-icon-head">
                  <div className="no-hover-icon">
                    <Icon name="map" width={22} height={22} color="#002966" />
                  </div>
                  <h5 className="db-div-head">Performance Across Regions</h5>
                </div>
                <Icon
                  name="right_diagonal_up_arrow"
                  width={22}
                  height={22}
                  color="#0066ff"
                  className="icon-cursor"
                />
              </div>
              <div className="country-stats">
                {" "}
                <div className="country-map">
                  <CountryMap />
                </div>
                <div className="country-right">
                  {countryData.map((country, index) => (
                    <div key={index} className="country-cards">
                      <img
                        src={country.image}
                        width={20}
                        height={20}
                        alt={country.name}
                      />
                      <div className="country-info">
                        {country.name}
                        <div className="country-bar-wrapper">
                          <span
                            className="country-percent-bar"
                            style={{ width: `${country.percentage}%` }}
                          ></span>
                        </div>
                      </div>
                      <span>{country.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="details-show-more-div"></div>
          </div>
        </div>

        {/* Table showing latest transactions */}
        <div className="db-table">
          <Table
            headerLabels={["S.No", "Txn Id", "Merchant Txn Id", "Payment Gateway", "Status", "Message", "Transaction Date/Time"]}
          />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
