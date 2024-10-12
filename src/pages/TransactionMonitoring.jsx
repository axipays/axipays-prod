import React, { useState } from "react";

// import * as XLSX from 'xlsx';

//css
import "../styles/pages.css";

//components
import Button from "../components/utilitis/Button";
import Input from "../components/utilitis/Input";
import TransactionTable from "../components/Table";
import ViewTransaction from "../pages/ViewTransaction";
import data from '../assets/testdata/data';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

//icon
import Icon from "../media/icon/icons";

const TransactionMonitoring = () => {
    const [showMoreOptions, setShowMoreOptions] = useState(false);
    const [filters, setFilters] = useState({
        mid: "",
        currency: "",
        country: "",
        cardType: "",
        paymentGateway: "",
        status: "",
        merchant: "",
    });
    const [activeQuickSearchbtn, setActiveQuickSearchbtn] = useState("");
    const [viewData, setViewData] = useState(null);
    const [totalAmount] = useState(0);
    const [currentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const [searchIds, setSearchIds] = useState("");
    const [fromDate,setfromDate] = useState("");
    const [toDate,settoDate] = useState("");
    const [searchedResult, setSearchedResult] = useState(null);
    const [setErrorMessage] = useState("");

    const handleViewClick = (data) => {
        setViewData(data);
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (!id) return;

        setFilters((prevFilters) => ({
            ...prevFilters,
            [id]: value,
        }));
        setActiveQuickSearchbtn('');
    };

    const handleQuickSearch = (period) => {
        setActiveQuickSearchbtn(period);

        const now = new Date();
        let fromDate, toDate;

        switch (period) {
            case "Today":
                fromDate = new Date(now.setHours(0, 0, 0, 0)).toISOString().slice(0, 16);
                toDate = new Date(now.setHours(23, 59, 59, 999)).toISOString().slice(0, 16);
                break;
            case "Yesterday":
                fromDate = new Date(now.setDate(now.getDate() - 1)).toISOString().slice(0, 16);
                toDate = new Date(now.setDate(now.getDate() - 1)).toISOString().slice(0, 16);
                break;
            case "This Week":
                const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay())).toISOString().slice(0, 16);
                const endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 6)).toISOString().slice(0, 16);
                fromDate = startOfWeek;
                toDate = endOfWeek;
                break;
            case "Last Week":
                const lastWeekStart = new Date(now.setDate(now.getDate() - now.getDay() - 7)).toISOString().slice(0, 16);
                const lastWeekEnd = new Date(now.setDate(now.getDate() - now.getDay() - 1)).toISOString().slice(0, 16);
                fromDate = lastWeekStart;
                toDate = lastWeekEnd;
                break;
            case "This Month":
                fromDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0, 16);
                toDate = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().slice(0, 16);
                break;
            case "Last Month":
                fromDate = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString().slice(0, 16);
                toDate = new Date(now.getFullYear(), now.getMonth(), 0).toISOString().slice(0, 16);
                break;
            case "This Year":
                fromDate = new Date(now.getFullYear(), 0, 1).toISOString().slice(0, 16);
                toDate = new Date(now.getFullYear(), 11, 31).toISOString().slice(0, 16);
                break;
            default:
                break;
        }

        // Update the filters with new from and to dates
        setFilters((prevFilters) => ({
            ...prevFilters,
            fromDate,
            toDate,
        }));

        setfromDate(fromDate);
        settoDate(toDate);
    };

    const handleSearch = () => {
        const { searchIds, status, merchant } = filters;

        const filteredData = data.filter(transaction => {
            const matchesId = searchIds.includes(transaction.TXN) ||
                searchIds.includes(transaction["Merchant Txn ID"]);

            const matchesStatus = status ? transaction.Status === status : true;

            const matchesMerchant = merchant ? transaction["Merchant Txn ID"] === merchant : true;

            return matchesId && matchesStatus && matchesMerchant;
        });

        if (filteredData.length > 0) {
            setSearchedResult(filteredData);
            setErrorMessage(''); // Clear any previous error message
        } else {
            setSearchedResult([]); // Clear results if no matches found
            setErrorMessage('No results found.'); // Set an error message
        }
    };


    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSearch();
        }
    };

    const handleClear = () => {
        setSearchIds("");
        setFilters({
            mid: "",
            currency: "",
            country: "",
            cardType: "",
            paymentGateway: "",
            status: "",
            merchant: ""
        });
        setSearchedResult(null);
        setActiveQuickSearchbtn(null);
    };

    const handleShowMore = () => {
        setShowMoreOptions(!showMoreOptions);
    };

    // const exportToCSV = () => {
    //     const worksheet = XLSX.utils.json_to_sheet(searchedResult);
    //     const workbook = XLSX.utils.book_new();
    //     XLSX.utils.book_append_sheet(workbook, worksheet, 'Transactions');
    //     XLSX.writeFile(workbook, 'transactions.xlsx');
    // };

    const FormInput = ({ label, id, placeholder, type = "text" }) => (
        <div className="id-input-div">
            <label className={`id-label ${filters[id] ? "filled-id-label" : ""}`} htmlFor={id}>
                {label}
            </label>
            <Input
                id={id}
                type={type}
                value={filters[id]}
                onChange={handleInputChange} 
                placeholder={placeholder}
                className="transaction-input"
            />
        </div>
    );

    const SelectInput = ({ label, id, options }) => (
        <div className="id-input-div">
            <label className={`id-label ${filters[id] ? "filled-id-label" : ""}`} htmlFor={id}>
                {label}
            </label>
            <select
                id={id}
                value={filters[id]} 
                onChange={handleInputChange} 
                className="select-div"
            >
                <option value="">Select {label}</option>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );


    return (
        <>
            <Header />
            <Sidebar />
            <div className="transaction-monitoring-main">
                <p className="transaction-monitoring-head">Transaction Monitoring</p>
                <div className="transaction-monitoring">

                    <div className="row-cards">
                        <div className="id-search-row-div">
                            <FormInput
                                label="Id"
                                id="searchIds"
                                value={searchIds}
                                onChange={(e) => setSearchIds(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Txn id / Merchant txn id"
                            />

                            <SelectInput
                                label="Status"
                                id="status"
                                options={["Pending", "Completed", "Failed"]}
                            />

                            <SelectInput
                                label="Merchant"
                                id="merchant"
                                options={["Merchant 1", "Merchant 2"]}
                            />

                            <Button onClick={handleSearch} className="btn-primary">
                                Search Now
                                <Icon
                                    name="search"
                                    width={20}
                                    height={20}
                                    color="#fff"
                                />
                            </Button>
                            <Button onClick={handleClear} className="btn-secondary">
                                Clear
                            </Button>

                        </div>

                        <div className="id-search-row-div ">
                            <label className='duration-lable'>
                                Duration
                            </label>
                            <FormInput
                                id="fromDate"
                                type="datetime-local"
                                value={fromDate}
                                onChange={(e) => setfromDate(e.target.value)}
                            />

                            <FormInput
                                id="toDate"
                                type="datetime-local"
                                value={toDate}
                                onChange={(e) => settoDate(e.target.value)}
                            />

                            <div className="quick-search">
                                <label className="id-label" htmlFor="searchIds">Quick Search:</label>
                                {["Today", "Yesterday", "This Week", "Last Week", "This Month", "Last Month", "This Year"].map((period) => (
                                    <button
                                        key={period}
                                        className={activeQuickSearchbtn === period ? "active-quick-search-btn" : "quick-search-btn"}
                                        onClick={() => handleQuickSearch(period)}
                                    >
                                        {period}
                                    </button>
                                ))}
                            </div>

                        </div>

                        <div className="show-more" onClick={handleShowMore}>
                                <div className="show-more-click">
                                    <Icon
                                        name="read_more"
                                        width={20}
                                        height={20}
                                        color="#000"
                                    />
                                   {showMoreOptions?("Show Less"):("Show More")}
                                </div>
                        </div>
                    </div>

                    {showMoreOptions && (
                        <>
                            <div className="id-search-row-div show-more-div">
                                <SelectInput
                                    label="MID"
                                    id="mid"
                                    options={["MID 1", "MID 2"]}
                                />
                                <SelectInput
                                    label="Payment Gateway"
                                    id="paymentGateway"
                                    options={["Stripe", "PayPal", "Square"]}
                                />
                                <SelectInput
                                    label="Currency"
                                    id="currency"
                                    options={["USD", "EUR", "AUD", "INR"]}
                                />
                            </div>
                            <div className="id-search-row-div show-more-div">
                                <SelectInput
                                    label="Country"
                                    id="country"
                                    options={["USA", "Canada", "UK"]}
                                />
                                <SelectInput
                                    label="Card Type"
                                    id="cardType"
                                    options={["Visa", "Mastercard"]}
                                />
                                <FormInput
                                    label="Card Number"
                                    id="cardNumber"
                                    placeholder="First 6 and Last 4 digits"
                                />
                            </div>
                        </>
                    )}
                </div>

                <div className="subtotal-export">
                    <div className="page-info">
                        <p className="page-info-text"> Subtotal</p> <p className="total-amount">{totalAmount}K</p>
                    </div>
                    <div className="filter-and-export">
                        <Icon
                            name="filter_list"
                            width={20}
                            height={20}
                            color="#000" />
                        <Button className="active-quick-search-btn export-btn" >
                            <Icon
                                name="down_cloud_line"
                                width={22}
                                height={22}
                                color="white"
                            />
                            Export
                        </Button>
                    </div>
                </div>

                <div className="transaction-monitoring-table-row">
                    {viewData ? (
                        <ViewTransaction data={viewData} onViewClick={setViewData} />
                    ) : (
                        <TransactionTable
                            headerLabels={["S.No", "Txn Id", "Merchant Txn Id", "Payment Gateway", "Status", "Message", "Transaction Date/Time"]}
                            data={searchedResult}
                            onViewClick={handleViewClick}
                            currentPage={currentPage}
                            itemsPerPage={itemsPerPage}
                        />
                    )}
                </div>


            </div>
        </>
    );
};

export default TransactionMonitoring;
