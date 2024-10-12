import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/pages.css";
import Icon from "../media/icon/icons";

const Table = ({ filteredMerchants = [] }) => {
  const [filterText, setFilterText] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterChange = (event) => {
    setFilterText(event.target.value.toLowerCase());
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handleNextPageClick = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPageClick = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const filteredData = filteredMerchants.filter((row) =>
    Object.values(row).some((val) =>
      String(val).toLowerCase().includes(filterText)
    )
  );

  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="merchanttable-container">
      <div className="search-container">
        {/* <Icon
          name="search"
          width={22}
          height={22}
          color="black"
          className="search-icon"
        /> */}
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
              <th className="p1">Client</th>
              <th className="p1">Status</th>
              <th className="p1">Email ID</th>
              <th className="p1">Skype ID</th>
              <th className="p1">URL</th>
              <th className="p1">Details</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, index) => (
                <tr key={row.id} className="p2">
                  <td>{startIndex + index + 1}</td>
                  <td>{row.client}</td>
                  <td>
                    <span
                      className={`status-badge ${row.status === "Active" ? "active-status" : "inactive-status"
                        }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td>{row.email}</td>
                  <td className="copyable">{row.skype}
                    <span className="copy-icon" onClick={() => navigator.clipboard.writeText(row.skype)}>
                      <Icon name="copy" width={16} height={16} />
                    </span>
                  </td>
                  <td className="copyable">
                
                      {row.url}
                      <span className="copy-icon" onClick={() => navigator.clipboard.writeText(row.url)}>
                        <Icon name="copy" width={16} height={16} />
                      </span>
                 
                  </td>
                  <td>
                    <Link to="/viewmerchant">
                      <Icon
                        name="user_fill"
                        width={25}
                        height={25}
                        color="#00264c"
                        className="ic detail-icon"
                      />
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>
                  <div>
                    <div className="search-result-head">
                      <div>
                        <h4>Oops...</h4>
                      </div>
                      <p className="p2">We couldn't find what you are looking for.</p>
                    </div>
                    <div className="search-result-img"></div>
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
          <p>{Math.min(currentPage * rowsPerPage, filteredMerchants.length)}</p>{" "}
          <p className="page-info-text">from</p>{" "}
          <p>{filteredMerchants.length}</p> <p className="page-info-text">items</p>
        </div>
        <div className="pagination-buttons">
          <select
            className="rows-dropdown"
            onChange={handleRowsPerPageChange}
            value={rowsPerPage}
          >
            <option value={10}>10 rows</option>
            <option value={20}>20 rows</option>
            <option value={50}>50 rows</option>
            <option value={100}>100 rows</option>
          </select>

          <div
            className="btn-pagination"
            onClick={handlePrevPageClick}
            disabled={currentPage === 1}
          >
            <Icon name="double_arrow_left" width={20} height={20} color="#000" />
          </div>

          <div className="btn-pagination">
            <Icon name="arrow_left" width={20} height={20} color="#000" />
          </div>
          <div className="btn-pagination">
            <Icon name="arrow_right" width={20} height={20} color="#000" />
          </div>

          <div
            className="btn-pagination"
            onClick={handleNextPageClick}
            disabled={currentPage * rowsPerPage >= filteredMerchants.length}
          >
            <Icon name="double_arrow_right" width={20} height={20} color="#000" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
