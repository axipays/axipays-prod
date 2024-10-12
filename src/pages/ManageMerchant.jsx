import React, { useState } from "react";
import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Table from "../components/MerchantTable.jsx";
import Icon from "../media/icon/icons.jsx";
import merchantData from "../assets/testdata/merchantData.jsx";

function ManageMerchant() {
  const [filterStatus, setFilterStatus] = useState("all");
  const [activeCard, setActiveCard] = useState(null); 

  const handleCardClick = (status) => {
    setFilterStatus(status);
    setActiveCard(status); 
  };

  const filteredMerchants = filterStatus === "all"
    ? merchantData
    : merchantData.filter((merchant) => merchant.status === filterStatus);

  return (
    <>
      <div>
        <Header />
        <Sidebar />
      </div>
      <div className="managemerchant">
        <p>Manage Merchant</p>

        <div className="main-screen-rows settlement-first-row">
          <div
            className={`row-cards merchant-card ${activeCard === "all" ? "active-card" : ""}`}
            onClick={() => handleCardClick("all")}
          >
            <div className="merchant-card-top">
              <div className="merchant-card-left">
                <div className="creditcard-div total">
                  <Icon
                    name="total_users"
                    width={25}
                    height={25}
                    color="#0066ff"
                    className='ic'
                  />
                </div>
              </div>
              <div className="merchant-card-right">
                <p className="p2">Total</p>
                <h4>{merchantData.length}</h4>
              </div>
            </div>
            <div className="merchant-card-bottom">
              <div className="bottom-block merchant">Merchants</div>
              <div className="bottom-block">52</div>
              <div className="bottom-block merchant">PSPs</div>
              <div className="bottom-block">12</div>
            </div>
          </div>

          <div
            className={`row-cards merchant-card ${activeCard === "Active" ? "active-card" : ""}`}
            onClick={() => handleCardClick("Active")}
          >
            <div className="merchant-card-top">
              <div className="merchant-card-left">
                <div className="creditcard-div active">
                  <Icon
                    name="person_check"
                    width={25}
                    height={25}
                    color="#339900"
                    className='ic'
                  />
                </div>
              </div>
              <div className="merchant-card-right">
                <p className="p2">Active</p>
                <h4>{merchantData.filter(item => item.status === "Active").length}</h4>
              </div>
            </div>
            <div className="merchant-card-bottom">
              <div className="bottom-block merchant">Merchants</div>
              <div className="bottom-block">52</div>
              <div className="bottom-block merchant">PSPs</div>
              <div className="bottom-block">12</div>
            </div>
          </div>

          <div
            className={`row-cards merchant-card ${activeCard === "Inactive" ? "active-card" : ""}`}
            onClick={() => handleCardClick("Inactive")}
          >
            <div className="merchant-card-top">
              <div className="merchant-card-left">
                <div className="creditcard-div inactive">
                  <Icon
                    name="person_cancel"
                    width={25}
                    height={25}
                    color="#ff3333"
                    className='ic'
                  />
                </div>
              </div>
              <div className="merchant-card-right">
                <p className="p2">Inactive</p>
                <h4>{merchantData.filter(item => item.status === "Inactive").length}</h4>
              </div>
            </div>
            <div className="merchant-card-bottom">
              <div className="bottom-block merchant">Merchants</div>
              <div className="bottom-block">52</div>
              <div className="bottom-block merchant">PSPs</div>
              <div className="bottom-block">12</div>
            </div>
          </div>

          <div
            className={`row-cards merchant-card ${activeCard === "Pending" ? "active-card" : ""}`}
            onClick={() => handleCardClick("Pending")}
          >
            <div className="merchant-card-top">
              <div className="merchant-card-left">
                <div className="creditcard-div pending">
                  <Icon
                    name="deployed_code_account"
                    width={25}
                    height={25}
                    color="#ffcc33"
                    className='ic'
                  />
                </div>
              </div>
              <div className="merchant-card-right">
                <p className="p2">Pending</p>
                <h4>{merchantData.filter(item => item.status === "Pending").length}</h4>
              </div>
            </div>
            <div className="merchant-card-bottom">
              <div className="bottom-block merchant">Merchants</div>
              <div className="bottom-block">52</div>
              <div className="bottom-block merchant">PSPs</div>
              <div className="bottom-block">12</div>
            </div>
          </div>

          <div
            className={`row-cards merchant-card ${activeCard === "temp" ? "active-card" : ""}`}
            onClick={() => handleCardClick("temp")}
          >
            <div className="merchant-card-top">
              <div className="merchant-card-left">
                <div className="creditcard-div temp">
                  <Icon
                    name="person_alert"
                    width={25}
                    height={25}
                    color="#373737"
                    className='ic'
                  />
                </div>
              </div>
              <div className="merchant-card-right">
                <p className="p2">Temp - Users</p>
                <h4>{merchantData.filter(item => item.status === "temp").length}</h4>
              </div>
            </div>
            <div className="merchant-card-bottom">
              <div className="bottom-block merchant">Merchants</div>
              <div className="bottom-block">52</div>
              <div className="bottom-block merchant">PSPs</div>
              <div className="bottom-block">12</div>
            </div>
          </div>
        </div>

        <Table filteredMerchants={filteredMerchants} />
      </div>
    </>
  );
}

export default ManageMerchant;
