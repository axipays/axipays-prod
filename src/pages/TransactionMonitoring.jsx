import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import * as XLSX from 'xlsx';

import "../styles/pages.css";

// utilities
import Button from "../components/utilitis/Button";
import { Input, Select } from "../components/utilitis/Input";
// import Calendar from "../components/utilitis/Calendar";
import TransactionTable from "../components/Table";
import ViewTransaction from "../pages/ViewTransaction";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { apiRequest } from "../services/apiService";

//icon
import Icon from "../media/icon/icons";
import Loader from "../components/utilitis/Loader";

const TransactionMonitoring = () => {
	const role = localStorage.getItem("role");
	
	const apiEndpoint = "api/v1/search_txn";
	const fetchDistinctValuesEndpoint =
		"https://api.vancipay.com/api/v1/fetch_distinct_values?column=";

	const navigate = useNavigate();
	const [showMoreOptions, setShowMoreOptions] = useState(false);
	const [filters, setFilters] = useState({
		searchIds: "",
		mid: "",
		currency: "",
		country: "",
		cardType: "",
		paymentGateway: "",
		status: "",
		merchant: "",
		fromDate: "",
		toDate: "",
		cardNumber: "",
		name: "",
		email: "",
	});

	const [midOptions, setMidOptions] = useState([]);
	const [countryOptions, setCountryOptions] = useState([]);
	const [currencyOptions, setCurrencyOptions] = useState([]);
	const [statusOptions, setStatusOptions] = useState([]);
	const [merchantOptions, setMerchantOptions] = useState([]);
	const [paymentgatewayOptions, setPaymentgatewayOptions] = useState([]);
	const [cardtypeOptions, setCardtypeOptions] = useState([]);
	const [ids, setIds] = useState([]);
	const [showDropdown, setShowDropdown] = useState(false);

	const [headerLabels] = useState([
		{ heading: "S.No", label: "sno" },
		{ heading: "Txn ID", label: "txnid" },
		{ heading: "Merchant Txn ID", label: "merchantTxnId" },
		{ heading: "Merchant", label:"merchant"},
		{ heading: "Payment Gateway", label: "paymentgateway" },
		{ heading: "Status", label: "Status" },
		{ heading: "Message", label: "message" },
		{ heading: "Transaction Date", label: "transactiondate" },
		{ heading: "Order No", label: "orderNo" },
		{ heading: "Customer Name", label: "cname" },
		{ heading: "Email", label: "email" },
		{ heading: "Country", label: "country" },
		{ heading: "Cary Type", label: "cardtype" },
		{ heading: "Amount", label: "amount" },
		{ heading: "currency", label: "currency" },
	]);

	const [activeQuickSearchbtn, setActiveQuickSearchbtn] = useState("");
	const [viewData, setViewData] = useState(null);
	
	const [searchedResult, setSearchedResult] = useState(null);
	const [errorMessage, setErrorMessage] = useState("");
	const [sortOrder, setSortOrder] = useState("ascending");
	const [sortedData, setSortedData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [overallTotal, setOverallTotal] = useState(0);
	const [totalAmount, setTotalAmount] = useState(0);

	const handleTotalAmountChange = (amount) => {
		setTotalAmount(amount);
	};

	const sortData = (data) => {
		if (!Array.isArray(data)) {
			return [];
		}
		return [...data].sort((a, b) => {
			const dateA = new Date(a.transactiondate);
			const dateB = new Date(b.transactiondate);
			return sortOrder === "ascending" ? dateA - dateB : dateB - dateA;
		});
	};

	useEffect(() => {
		const loadOptionsAndSortData = async () => {
			const midValues = await fetchDistinctValues("m_id");
			setMidOptions(midValues || []);

			const countryValues = await fetchDistinctValues("country");
			setCountryOptions(countryValues || []);

			const currencyValues = await fetchDistinctValues("currency");
			setCurrencyOptions(currencyValues || []);

			const statusValues = await fetchDistinctValues("status");
			setStatusOptions(statusValues || []);

			const merchantValues = await fetchDistinctValues("merchant");
			setMerchantOptions(merchantValues || []);

			const paymentgatewayValues = await fetchDistinctValues("payment_gateway");
			setPaymentgatewayOptions(paymentgatewayValues || []);

			const cardtypeValues = await fetchDistinctValues("card_type");
			setCardtypeOptions(cardtypeValues || []);

			const sorted = sortData(searchedResult);
			setSortedData(sorted);
		};

		loadOptionsAndSortData();
	}, [searchedResult, sortOrder]);

	const handleIconClick = () => {
		setShowDropdown(!showDropdown);
	};

	const handleSortToggle = () => {
		setSortOrder((prevOrder) =>
			prevOrder === "ascending" ? "descending" : "ascending"
		);
	};

	const handleViewClick = (data) => {
		setViewData(data);
	};

	const handleBackClick = () => {
		setViewData(null);
	};

	const handleBack = () => {
		navigate(-1);
	};

	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			event.preventDefault();
			handleSearch();
		}
	};

	const handleShowMore = () => {
		setShowMoreOptions(!showMoreOptions);
	};

	const handleInputChange = (filtersKey, value) => {
		if (filtersKey === 'searchIds') {
			const newIds = value
				.trim()
				.split(/\s+/)
				.filter((id) => id);
			setIds(newIds);

			if (newIds.length <= 1) {
				setShowDropdown(false);
			}

			setFilters((prevData) => ({
				...prevData,
				[filtersKey]: value,
			}));
		} else {
			setFilters((prevData) => ({
				...prevData,
				[filtersKey]: value,
			}));
		}
	};

	const handleQuickSearch = (period) => {
		setActiveQuickSearchbtn(period);

		const now = new Date();
		let fromDate, toDate;

		switch (period) {
			case "Today":
				fromDate = new Date(now.setHours(0, 0, 0, 0))
					.toISOString()
					.slice(0, 16);
				toDate = new Date(now.setHours(23, 59, 59, 999))
					.toISOString()
					.slice(0, 16);
				break;
			case "Yesterday":
				fromDate = new Date(now.setDate(now.getDate() - 1))
					.toISOString()
					.slice(0, 16);
				toDate = new Date(now.setDate(now.getDate() - 1))
					.toISOString()
					.slice(0, 16);
				break;
			case "This Week":
				const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()))
					.toISOString()
					.slice(0, 16);
				const endOfWeek = new Date(
					now.setDate(now.getDate() - now.getDay() + 6)
				)
					.toISOString()
					.slice(0, 16);
				fromDate = startOfWeek;
				toDate = endOfWeek;
				break;
			case "Last Week":
				const lastWeekStart = new Date(
					now.setDate(now.getDate() - now.getDay() - 7)
				)
					.toISOString()
					.slice(0, 16);
				const lastWeekEnd = new Date(
					now.setDate(now.getDate() - now.getDay() - 1)
				)
					.toISOString()
					.slice(0, 16);
				fromDate = lastWeekStart;
				toDate = lastWeekEnd;
				break;
			case "This Month":
				fromDate = new Date(now.getFullYear(), now.getMonth(), 1)
					.toISOString()
					.slice(0, 16);
				toDate = new Date(now.getFullYear(), now.getMonth() + 1, 0)
					.toISOString()
					.slice(0, 16);
				break;
			case "Last Month":
				fromDate = new Date(now.getFullYear(), now.getMonth() - 1, 1)
					.toISOString()
					.slice(0, 16);
				toDate = new Date(now.getFullYear(), now.getMonth(), 0)
					.toISOString()
					.slice(0, 16);
				break;
			case "This Year":
				fromDate = new Date(now.getFullYear(), 0, 1).toISOString().slice(0, 16);
				toDate = new Date(now.getFullYear(), 11, 31).toISOString().slice(0, 16);
				break;
			default:
				break;
		}

		setFilters((prevFilters) => ({
			...prevFilters,
			fromDate,
			toDate,
		}));
	};

	const handleSearch = async () => {
		const searchedIds = filters.searchIds
			.split(/[\s,]+/)
			.map((id) => id.trim())
			.filter((id) => id);

		const searchedData = {
			txnid: searchedIds.length > 0 ? searchedIds : undefined,
			status: filters.status,
			merchant: filters.merchant,
			fromDate: filters.fromDate,
			toDate: filters.toDate,
			mid: filters.mid,
			paymentgateway: filters.paymentGateway,
			currency: filters.currency,
			country: filters.country,
			cardtype: filters.cardType,
			cardnumber: filters.cardNumber,
			name: filters.name,
			email: filters.email
		};
		setLoading(true);

		try {
			const response = await apiRequest(apiEndpoint, "POST", searchedData);

			console.log("API response:", response);

			if (response && response.data) {
				const transactions = response.data;

				let filteredTransactions = transactions;
				if (searchedIds.length > 0) {
					filteredTransactions = transactions.filter((transaction) =>
						searchedIds.includes(transaction.txnid)
					);
				}
				const totalAmount = filteredTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
        		setOverallTotal(totalAmount); 
				setSearchedResult(filteredTransactions);
				setErrorMessage("");
			} else {
				setErrorMessage("No transactions found for the given criteria.");
				setOverallTotal(0);
			}
		} catch (error) {
			setErrorMessage("Failed to fetch search results. Please try again.");
			console.error("Search error:", error);
			setOverallTotal(0);
		} finally {
			setLoading(false);
		}
	};

	const fetchDistinctValues = async (column) => {
		try {
			const response = await fetch(`${fetchDistinctValuesEndpoint}${column}`);
			const data = await response.json();
			if (data.status === "success") {
				return data.data;
			} else {
				setErrorMessage("Failed to fetch distinct values.");
			}
		} catch (error) {
			console.error("Fetch distinct values error:", error);
			setErrorMessage("Failed to fetch distinct values.");
		}
	};

	const handleClear = () => {
		setFilters({
			mid: "",
			searchIds: "",
			currency: "",
			country: "",
			cardType: "",
			paymentGateway: "",
			status: "",
			merchant: "",
			cardNumber: "",
			fromDate: "",
			toDate: "",
			name: "",
			email: ""
		});
		setOverallTotal(0);
		setSearchedResult(null);
		setActiveQuickSearchbtn(null);
	};

	const downloadCSV = () => {
		const formattedData = searchedResult.map((row, index) => ({
			...row,
		}));
		const headers = headerLabels.map((label, index) => {
			return label.label === "sno" ? "S.No." : label.label;
		});
		const worksheet = XLSX.utils.json_to_sheet(formattedData, { header: headers });

		for (let i = 0; i < formattedData.length; i++) {
			worksheet[`A${i + 2}`] = { v: i + 1, t: 'n' };
		}

		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");

		XLSX.writeFile(workbook, "transactions.xlsx");
	};

	if (role === "admin") {
		return (
			<>
				<Header />
				<Sidebar />
				<div className="transaction-monitoring-main">
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
						<h4>Transaction Monitoring  </h4>
					</div>
					<div className="transaction-monitoring">
						<div className="row-cards">
							<div className="id-search-row-div">
								<Input
									label="Id"
									id="searchIds"
									value={filters.searchIds}
									onChange={(value) => handleInputChange('searchIds', value)}
									onKeyDown={handleKeyDown}
									placeholder="Txn id / Merchant txn id"
								/>
								<div>
									{ids.length > 1 && (
										<span className="dropdown-icon" onClick={handleIconClick}>
											<Icon
												name={showDropdown ? "zoom_out" : "hide"}
												width={18}
												height={18}
												color="#dedddd"
											/>
										</span>
									)}
									{showDropdown && (
										<div className="dropdown">
											{ids.map((id, index) => (
												<div key={index} className="dropdown-item">
													{id}
												</div>
											))}
										</div>
									)}
								</div>

								<Select
									label="Status"
									id="status"
									options={statusOptions}
									value={filters.status}
									onChange={(value) => handleInputChange('status', value)}
									onKeyDown={handleKeyDown}
								/>

								<Select
									label="Merchant"
									id="merchant"
									options={merchantOptions}
									value={filters.merchant}
									onChange={(value) => handleInputChange('merchant', value)}
									onKeyDown={handleKeyDown}
								/>

								<Button onClick={handleSearch} className="btn-primary">
									Search Now
									{loading ? (
										<Loader strokeColor="#fafafa" width={20} height={20} />
									) : (
										<>
											<Icon name="search" width={20} height={20} color="#fff" />
										</>
									)}
								</Button>
								<Button onClick={handleClear} className="btn-secondary">
									Clear
								</Button>
							</div>

							<div className="id-search-row-div ">
								<div className="duration-input">
									<label className="duration-lable">Duration</label>
									<Input
										className="dateInpute"
										id="fromDate"
										type="datetime-local"
										value={filters.fromDate}
										onChange={(value) => handleInputChange('fromDate', value)}
										onKeyDown={handleKeyDown}
									/>

									<Input
										className="dateInpute"
										id="toDate"
										type="datetime-local"
										value={filters.toDate}
										onChange={(value) => handleInputChange('toDate', value)}
										onKeyDown={handleKeyDown}
									/>
								</div>

								<div className="quick-search">
									<label className="id-label" htmlFor="searchIds">
										Quick Search:
									</label>
									{[
										"Today",
										"Yesterday",
										"This Week",
										"Last Week",
										"This Month",
										"Last Month",
										// "This Year",
									].map((period) => (
										<button
											key={period}
											className={
												activeQuickSearchbtn === period
													? "active-quick-search-btn"
													: "quick-search-btn"
											}
											onClick={() => handleQuickSearch(period)}
											onKeyDown={handleKeyDown}
										>
											{period}
										</button>
									))}
								</div>
							</div>

							<div className="show-more" onClick={handleShowMore}>
								<div className="show-more-click">
									<Icon name="read_more" width={20} height={20} color="#000" />
									{showMoreOptions ? "Show Less" : "Show More"}
								</div>
							</div>
						</div>

						{showMoreOptions && (
							<>
								<div className="id-search-row-div show-more-div">
									<Input
										className="showMore-input"
										label="Name"
										id="name"
										value={filters.name}
										onChange={(value) => handleInputChange('name', value)}
										onKeyDown={handleKeyDown}
										placeholder="Name"
									/>
									<Input
										className="showMore-input"
										label="Email"
										id="email"
										value={filters.email}
										onChange={(value) => handleInputChange('email', value)}
										onKeyDown={handleKeyDown}
										placeholder="Email"
									/>
									<Select
										className="showMore-input"
										label="MID"
										id="mid"
										options={midOptions}
										value={filters.mid}
										onChange={(value) => handleInputChange('mid', value)}
										onKeyDown={handleKeyDown}
									/>
									<Select
										className="showMore-input"
										label="Payment Gateway"
										id="paymentGateway"
										options={paymentgatewayOptions}
										value={filters.paymentGateway}
										onChange={(value) => handleInputChange('paymentGateway', value)}
										onKeyDown={handleKeyDown}
									/>
								</div>
								<div className="id-search-row-div show-more-div">
									<Select 
										className="showMore-input"
										label="Currency"
										id="currency"
										options={currencyOptions}
										value={filters.currency}
										onChange={(value) => handleInputChange('currency', value)}
										onKeyDown={handleKeyDown}
									/>
									<Select
										className="showMore-input"
										label="Country"
										id="country"
										options={countryOptions}
										value={filters.country}
										onChange={(value) => handleInputChange('country', value)}
										onKeyDown={handleKeyDown}
									/>
									<Select
										className="showMore-input"
										label="Card Type"
										id="cardType"
										options={cardtypeOptions}
										value={filters.cardType}
										onChange={(value) => handleInputChange('cardType', value)}
										onKeyDown={handleKeyDown}
									/>
									<Input
										className="showMore-input"
										label="Card Number"
										id="cardNumber"
										value={filters.cardNumber}
										onChange={(value) => handleInputChange('cardNumber', value)}
										onKeyDown={handleKeyDown}
										placeholder="First 6 and Last 4 digits"
									/>
								</div>
							</>
						)}
					</div>

					<div className="subtotal-export">
						<div className="page-info-head">
							<div className="page-info">
								<p className="page-info-text"> Subtotal:</p>{" "}
								<p className="total-amount">{totalAmount.toFixed(2)}</p>
							</div>
							<div className="page-info">
								<p className="page-info-text"> Total:</p>{" "}
								<p className="total-amount">{overallTotal.toFixed(2)}</p>
							</div>
						</div>
						<div className="filter-and-export">
							<div onClick={handleSortToggle}>
								<Icon
									name={
										sortOrder === "ascending"
											? "filter_list"
											: "filter_list_opposite"
									}
									width={20}
									height={20}
									color="#000"
								/>
							</div>
							<div className="active-quick-search-btn export-btn" onClick={downloadCSV}>
								<Icon
									name="down_cloud_line"
									width={22}
									height={22}
									color="white"
								/>
								Export
							</div>
						</div>
					</div>

					<div className="transaction-monitoring-table-row">
						{viewData ? (
							<ViewTransaction data={viewData} onBackClick={handleBackClick} />
						) : (
							<TransactionTable
								headerLabels={headerLabels}
								onViewClick={handleViewClick}
								tableData={searchedResult}
								isCopy={true}
								onTotalAmountChange={handleTotalAmountChange}
							/>
						)}
					</div>
				</div>
			</>
		);
	}
	if (role === "merchant") {
		return (
			<>
				<Header />
				<Sidebar />
				<div className="transaction-monitoring-main">
					<p className="transaction-monitoring-head">Transaction Monitoring</p>
					<div className="transaction-monitoring">
						<div className="row-cards">
							<div className="id-search-row-div">
								<Input
									label="Id"
									id="searchIds"
									value={filters.searchIds}
									onChange={(value) => handleInputChange('searchIds', value)}
									onKeyDown={handleKeyDown}
									placeholder="Txn id / Merchant txn id"
								/>
								<div>
									{ids.length > 1 && (
										<span className="dropdown-icon" onClick={handleIconClick}>
											<Icon
												name={showDropdown ? "zoom_out" : "hide"}
												width={18}
												height={18}
												color="#dedddd"
											/>
										</span>
									)}
									{showDropdown && (
										<div className="dropdown">
											{ids.map((id, index) => (
												<div key={index} className="dropdown-item">
													{id}
												</div>
											))}
										</div>
									)}
								</div>

								<Select
									label="Status"
									id="status"
									options={statusOptions}
									value={filters.status}
									onChange={(value) => handleInputChange('status', value)}
									onKeyDown={handleKeyDown}
								/>

								<Button onClick={handleSearch} className="btn-primary">
									Search Now
									<Icon name="search" width={20} height={20} color="#fff" />
								</Button>
								<Button onClick={handleClear} className="btn-secondary">
									Clear
								</Button>
							</div>

							<div className="id-search-row-div ">
								<label className="duration-lable">Duration</label>
								<Input
									id="fromDate"
									type="datetime-local"
									value={filters.fromDate}
									onChange={(value) => handleInputChange('fromDate', value)}
								/>

								<Input
									id="toDate"
									type="datetime-local"
									value={filters.toDate}
									onChange={(value) => handleInputChange('toDate', value)}
								/>

								<div className="quick-search">
									<label className="id-label" htmlFor="searchIds">
										Quick Search:
									</label>
									{[
										"Today",
										"Yesterday",
										"This Week",
										"Last Week",
										"This Month",
										"Last Month",
										"This Year",
									].map((period) => (
										<button
											key={period}
											className={
												activeQuickSearchbtn === period
													? "active-quick-search-btn"
													: "quick-search-btn"
											}
											onClick={() => handleQuickSearch(period)}
										>
											{period}
										</button>
									))}
								</div>
							</div>

							<div className="show-more" onClick={handleShowMore}>
								<div className="show-more-click">
									<Icon name="read_more" width={20} height={20} color="#000" />
									{showMoreOptions ? "Show Less" : "Show More"}
								</div>
							</div>
						</div>

						{showMoreOptions && (
							<>
								<div className="id-search-row-div show-more-div">
									<Select
										label="MID"
										id="mid"
										options={midOptions}
										value={filters.mid}
										onChange={(value) => handleInputChange('mid', value)}
										onKeyDown={handleKeyDown}
									/>
									<Input
										label="Name"
										id="name"
										value={filters.cardNumber}
										onChange={(value) => handleInputChange('name', value)}
										onKeyDown={handleKeyDown}
										placeholder="Name"
									/>
									<Input
										label="Email"
										id="email"
										value={filters.cardNumber}
										onChange={(value) => handleInputChange('email', value)}
										onKeyDown={handleKeyDown}
										placeholder="Email"
									/>
								</div>
							</>
						)}
					</div>

					<div className="subtotal-export">
						<div className="page-info">
							<p className="page-info-text"> Subtotal</p>{" "}
							<p className="total-amount">{totalAmount}</p>
						</div>
						<div className="filter-and-export">
							<div onClick={handleSortToggle}>
								<Icon
									name={
										sortOrder === "ascending"
											? "filter_list"
											: "filter_list_opposite"
									}
									width={20}
									height={20}
									color="#000"
								/>
							</div>
							<div className="active-quick-search-btn export-btn">
								<Icon
									name="down_cloud_line"
									width={22}
									height={22}
									color="white"
								/>
								Export
							</div>
						</div>
					</div>

					<div className="transaction-monitoring-table-row">
						{viewData ? (
							<ViewTransaction data={viewData} onViewClick={setViewData} />
						) : (
							<TransactionTable
								headerLabels={headerLabels}
								onViewClick={handleViewClick}
								tableData={sortedData}
								isCopy={true}
								onTotalAmountChange={0}
							/>
						)}
					</div>
				</div>
			</>
		);
	}
	if (role === "employee") {
		return (
			<>
				<Header />
				<Sidebar />
				<div className="transaction-monitoring-main">
					<p className="transaction-monitoring-head">Transaction Monitoring</p>
					<div className="transaction-monitoring">
						<div className="row-cards">
							<div className="id-search-row-div">
								<Input
									label="Id"
									id="searchIds"
									value={filters.searchIds}
									onChange={(value) => handleInputChange('searchIds', value)}
									onKeyDown={handleKeyDown}
									placeholder="Txn id / Merchant txn id"
								/>
								<div>
									{ids.length > 1 && (
										<span className="dropdown-icon" onClick={handleIconClick}>
											<Icon
												name={showDropdown ? "zoom_out" : "hide"}
												width={18}
												height={18}
												color="#dedddd"
											/>
										</span>
									)}
									{showDropdown && (
										<div className="dropdown">
											{ids.map((id, index) => (
												<div key={index} className="dropdown-item">
													{id}
												</div>
											))}
										</div>
									)}
								</div>

								<Select
									label="Status"
									id="status"
									options={statusOptions}
									value={filters.status}
									onChange={(value) => handleInputChange('status', value)}
									onKeyDown={handleKeyDown}
								/>

								<Select
									label="Merchant"
									id="merchant"
									options={merchantOptions}
									value={filters.merchant}
									onChange={(value) => handleInputChange('merchant', value)}
									onKeyDown={handleKeyDown}
								/>

								<Button onClick={handleSearch} className="btn-primary">
									Search Now
									<Icon name="search" width={20} height={20} color="#fff" />
								</Button>
								<Button onClick={handleClear} className="btn-secondary">
									Clear
								</Button>
							</div>

							<div className="id-search-row-div ">
								<label className="duration-lable">Duration</label>
								<Input
									id="fromDate"
									type="datetime-local"
									value={filters.fromDate}
									onChange={(value) => handleInputChange('fromDate', value)}
								/>

								<Input
									id="toDate"
									type="datetime-local"
									value={filters.toDate}
									onChange={(value) => handleInputChange('toDate', value)}
								/>

								<div className="quick-search">
									<label className="id-label" htmlFor="searchIds">
										Quick Search:
									</label>
									{[
										"Today",
										"Yesterday",
										"This Week",
										"Last Week",
										"This Month",
										"Last Month",
										"This Year",
									].map((period) => (
										<button
											key={period}
											className={
												activeQuickSearchbtn === period
													? "active-quick-search-btn"
													: "quick-search-btn"
											}
											onClick={() => handleQuickSearch(period)}
										>
											{period}
										</button>
									))}
								</div>
							</div>

							<div className="show-more" onClick={handleShowMore}>
								<div className="show-more-click">
									<Icon name="read_more" width={20} height={20} color="#000" />
									{showMoreOptions ? "Show Less" : "Show More"}
								</div>
							</div>
						</div>

						{showMoreOptions && (
							<>
								<div className="id-search-row-div show-more-div">
									<Select
										label="MID"
										id="mid"
										options={midOptions}
										value={filters.mid}
										onChange={(value) => handleInputChange('mid', value)}
										onKeyDown={handleKeyDown}
									/>
									<Select
										label="Payment Gateway"
										id="paymentGateway"
										options={paymentgatewayOptions}
										value={filters.paymentGateway}
										onChange={(value) => handleInputChange('paymentGateway', value)}
										onKeyDown={handleKeyDown}
									/>
									<Select
										label="Currency"
										id="currency"
										options={currencyOptions}
										value={filters.currency}
										onChange={(value) => handleInputChange('currency', value)}
										onKeyDown={handleKeyDown}
									/>
								</div>
								<div className="id-search-row-div show-more-div">
									<Select
										label="Country"
										id="country"
										options={countryOptions}
										value={filters.country}
										onChange={(value) => handleInputChange('country', value)}
										onKeyDown={handleKeyDown}
									/>
									<Select
										label="Card Type"
										id="cardType"
										options={cardtypeOptions}
										value={filters.cardType}
										onChange={(value) => handleInputChange('cardType', value)}
										onKeyDown={handleKeyDown}
									/>
									<Input
										label="Card Number"
										id="cardNumber"
										value={filters.cardNumber}
										onChange={(value) => handleInputChange('cardNumber', value)}
										onKeyDown={handleKeyDown}
										placeholder="First 6 and Last 4 digits"
									/>
								</div>
							</>
						)}
					</div>

					<div className="subtotal-export">
						<div className="page-info">
							<p className="page-info-text"> Subtotal</p>
							<p className="total-amount">{totalAmount}</p>
						</div>
						<div className="filter-and-export">
							<div onClick={handleSortToggle}>
								<Icon
									name={
										sortOrder === "ascending"
											? "filter_list"
											: "filter_list_opposite"
									}
									width={20}
									height={20}
									color="#000"
								/>
							</div>
							<div className="active-quick-search-btn export-btn">
								<Icon
									name="down_cloud_line"
									width={22}
									height={22}
									color="white"
								/>
								Export
							</div>
						</div>
					</div>

					<div className="transaction-monitoring-table-row">
						{viewData ? (
							<ViewTransaction data={viewData} onViewClick={setViewData} />
						) : (
							<TransactionTable
								headerLabels={headerLabels}
								onViewClick={handleViewClick}
								tableData={sortedData}
								isCopy={true}
								onTotalAmountChange={0}
							/>
						)}
					</div>
				</div>
			</>
		);
	}
};

export default TransactionMonitoring;