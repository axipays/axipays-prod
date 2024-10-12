import React from "react";

import "../styles/pages.css";

import Icon from "../media/icon/icons";

import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";

import LineChart from "../components/LineChart";

//Importing components
import StackedBarChart from "../components/StackedBarChart.jsx";
import CountryMap from "../components/CountryMap.jsx";
import Table from "../components/Table.jsx";

function Dashboard() {
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
                    <Icon name="sales" width={22} height={22} color="000" />
                  </div>
                  <h5>Total Volume</h5>
                </div>
                <h2>$ 26,039</h2>
              </div>
              <div className="today-stats-values">
                <div className="today-stats-value-row">
                  <div className="no-hover-icon-head">
                    <div className="no-hover-icon">
                      <Icon name="dollar" width={20} height={20} color="000" />
                    </div>
                    <h6>USD</h6>
                  </div>
                  <div className="no-hover-icon-head">
                    <p>$13,000</p>
                    <div className="percent-div">
                      <p>15%</p>
                    </div>
                  </div>
                </div>

                <div className="today-stats-value-row">
                  <div className="no-hover-icon-head">
                    <div className="no-hover-icon">
                      <Icon name="euro" width={20} height={20} color="000" />
                    </div>
                    <h6>EUR</h6>
                  </div>
                  <div className="no-hover-icon-head">
                    <p>$13,000</p>
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
                    <Icon name="traffic" width={22} height={22} color="000" />
                  </div>
                  <h5>Traffic Status</h5>
                </div>
                <h2>50,000</h2>
              </div>
              <div className="today-stats-values">
                <div className="today-stats-value-row">
                  <div className="no-hover-icon-head">
                    <div className="no-hover-icon">
                      <Icon name="dollar" width={20} height={20} color="000" />
                    </div>
                    <h6>USD</h6>
                  </div>
                  <div className="no-hover-icon-head">
                    <p>13,000</p>
                    <div className="percent-div">
                      <p>25%</p>
                    </div>
                  </div>
                </div>

                <div className="today-stats-value-row">
                  <div className="no-hover-icon-head">
                    <div className="no-hover-icon">
                      <Icon name="euro" width={20} height={20} color="000" />
                    </div>
                    <h6>EUR</h6>
                  </div>
                  <div className="no-hover-icon-head">
                    <p>15,000</p>
                    <div className="percent-div">
                      <p>25%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="glance-show-more-div">
              <Icon name="vertical_dots" width={22} height={22} color="000" />
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
                    <Icon name="sales" width={22} height={22} color="000" />
                  </div>
                  <h5>Overview</h5>
                </div>
                <Icon
                  name="right_diagonal_up_arrow"
                  width={22}
                  height={22}
                  color="#0066ff"
                />
              </div>
              <div className="stacked-bar-chart">
                {" "}
                <StackedBarChart />
              </div>
            </div>

            <div className="approvals-div">
              <div className="today-stats-head">
                <div className="no-hover-icon-head">
                  <div className="no-hover-icon">
                    <Icon name="sales" width={22} height={22} color="000" />
                  </div>
                  <h5>Approval Ratio</h5>
                </div>
                <Icon
                  name="right_diagonal_up_arrow"
                  width={22}
                  height={22}
                  color="#0066ff"
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
                    <Icon name="sales" width={22} height={22} color="000" />
                  </div>
                  <h5>Overview</h5>
                </div>
                <Icon
                  name="right_diagonal_up_arrow"
                  width={22}
                  height={22}
                  color="#0066ff"
                />
              </div>
              <div className="country-stats">
                {" "}
                <div className="country-map">
                  <CountryMap />
                </div>
                <div className="country-right"></div>
              </div>
            </div>
            <div className="details-show-more-div"></div>
          </div>
        </div>

        {/* Table showing latest transactions */}
        <div className="db-table">
          <Table
            headerLabels={["S.No", "TXN", "Merchant Txn ID", "Payment Gateway", "Status", "Message", "Transaction Date/Time"]}
          />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
