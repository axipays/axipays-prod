import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/pages.css";
import Icon from "../media/icon/icons";
import { apiRequest } from '../services/apiService';

const MerchantTable = () => {
	const [filteredMerchants, setFilteredMerchants] = useState([]);
	const [filterText, setFilterText] = useState("");
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const [loading, setLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState('');

	const apiEndpoint = 'api/v1/client';

	const fetchMerchants = async () => {
		try {
			const response = await apiRequest(apiEndpoint, 'GET');
			if (response && response.status === 'success') {
				setFilteredMerchants(response.data);
			} else {
				setErrorMessage('Failed to retrieve merchants.');
			}
		} catch (error) {
			setErrorMessage('Failed to fetch merchants. Please try again.');
			console.error('Fetch error:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchMerchants();
	}, []);

	const handleFilterChange = (event) => {
		setFilterText(event.target.value.toLowerCase());
	};

	const handleRowsPerPageChange = (event) => {
		setRowsPerPage(Number(event.target.value));
		setCurrentPage(1);
	};

	const handleNextPageClick = () => {
		if (currentPage * rowsPerPage < filteredData.length) {
			setCurrentPage((prev) => prev + 1);
		}
	};
	const handlePrevPageClick = () => {
		if (currentPage > 1) {
			setCurrentPage((prev) => prev - 1);
		}
	};
	const filteredData = filteredMerchants.filter((row) =>
		Object.values(row).some((val) =>
			String(val).toLowerCase().includes(filterText)
		)
	);

	const startIndex = (currentPage - 1) * rowsPerPage;
	const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

	const headers = ["company_name", "status", "email", "skype_id", "website_url"];

	return (
		<div className="merchanttable-container">
			<div className="search-container">
				<Icon name="search" width={22} height={22} color="black" className="search-icon" />
				<input
					className="inputFeild search-input"
					type="text"
					placeholder="Search"
					onChange={handleFilterChange}
					value={filterText}
				/>
			</div>

			<div className="table-Body">
				<table>
					<thead>
						<tr className="tableheader">
							<th className="p1">S. No.</th>
							{headers.map((key) => (
								<th key={key} className="p1">
									{key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')}
								</th>
							))}
							<th className="p1">Details</th>
						</tr>
					</thead>
					<tbody>
						{paginatedData.length > 0 ? (
							paginatedData.map((row, index) => (
								<tr key={row.id || index} className="p2">
									<td>{startIndex + index + 1}</td>
									{headers.map((key) => (
										<td key={key}>
											{key === "status" ? (
												<span
													className={`status-column ${row.status.toLowerCase() === "active"
														? "status-success"
														: "status-failed"
														}`}
												>
													<div
														className={`bullet ${row.status.toLowerCase() === "active"
															? "status-success"
															: "status-failed"
															}`}
													></div>
													{row.status}
												</span>
											) : key === "skype_id" || key === "website_url" ? (
												<span className="copyable">
													{row[key]}
													<span
														className="copy-icon"
														onClick={() => navigator.clipboard.writeText(row[key])}
													>
														<Icon name="copy" width={16} height={16} />
													</span>
												</span>
											) : (
												row[key]
											)}
										</td>
									))}
									<td>
										<Link to="/viewmerchant">
											<Icon
												name="user_fill"
												width={50}
												height={35}
												color="#00264c"
												className="ic detail-icon"
											/>
										</Link>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan={headers.length + 2}>
									<div className="search-result-head">
										<h4>Oops...</h4>
										<p className="p2">We couldn't find what you are looking for.</p>
									</div>
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			<div className="pagination-info">
				<div className="page-info">
					<p className="page-info-text">Showing</p>{" "}
					<p>{Math.min(currentPage * rowsPerPage, filteredData.length)}</p>{" "}
					<p className="page-info-text">from</p>{" "}
					<p>{filteredData.length}</p> <p className="page-info-text">items</p>
				</div>

				<div className="pagination-buttons">
					<select
						className="rows-dropdown"
						onChange={handleRowsPerPageChange}
						value={rowsPerPage}
					>
						{[10, 20, 50, 100].map((rows) => (
							<option key={rows} value={rows}>
								{rows} rows
							</option>
						))}
					</select>

					<button
						className="btn-pagination"
						onClick={() => setCurrentPage(1)}
						disabled={currentPage === 1}
					>
						<Icon name="double_arrow_left" width={20} height={20} color="#000" />
					</button>

					<button
						className="btn-pagination"
						onClick={handlePrevPageClick}
						disabled={currentPage === 1}
					>
						<Icon name="arrow_left" width={20} height={20} color="#000" />
					</button>

					<button
						className="btn-pagination"
						onClick={handleNextPageClick}
						disabled={currentPage * rowsPerPage >= filteredData.length}
					>
						<Icon name="arrow_right" width={20} height={20} color="#000" />
					</button>

					<button
						className="btn-pagination"
						onClick={() =>
							setCurrentPage(Math.ceil(filteredData.length / rowsPerPage))
						}
						disabled={currentPage * rowsPerPage >= filteredData.length}
					>
						<Icon name="double_arrow_right" width={20} height={20} color="#000" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default MerchantTable;