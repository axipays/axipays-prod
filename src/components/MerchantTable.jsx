import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/pages.css";
import Icon from "../media/icon/icons";

const MerchantTable = ({ filteredMerchants = [] }) => {
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

  const handleNextPageClick = () => setCurrentPage((prev) => prev + 1);
  const handlePrevPageClick = () => setCurrentPage((prev) => prev - 1);

  const filteredData = filteredMerchants.filter((row) =>
    Object.values(row).some((val) =>
      String(val).toLowerCase().includes(filterText)
    )
  );

  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  const headers = Object.keys(filteredMerchants[0] || {}).filter(
    (key) => key !== "details"
  );

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
              {headers.map((header) => (
                <th key={header} className="p1">
                  {header.charAt(0).toUpperCase() + header.slice(1)}
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
                  {headers.map((header) => (
                    <td key={header}>
                      {header === "status" ? (
                        <span className={`status-column ${row.status.toLowerCase() === "active" ? "status-success" : "status-failed"}`}>
                          <div className={`bullet ${row.status.toLowerCase() === "active" ? "status-success" : "status-failed"}`}></div>
                          {row.status}
                        </span>
                      ) : header === "skype" || header === "url" ? (
                        <span className="copyable">
                          {row[header]}
                          <span
                            className="copy-icon"
                            onClick={() => navigator.clipboard.writeText(row[header])}
                          >
                            <Icon name="copy" width={16} height={16} />
                          </span>
                        </span>
                      ) : (
                        row[header]
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
            {[10, 20, 50, 100].map((rows) => (
              <option key={rows} value={rows}>
                {rows} rows
              </option>
            ))}
          </select>

          <button
            className="btn-pagination"
            onClick={handlePrevPageClick}
            disabled={currentPage === 1}
          >
            <Icon name="double_arrow_left" width={20} height={20} color="#000" />
          </button>

          {["arrow_left", "arrow_right"].map((direction, index) => (
            <button key={index} className="btn-pagination">
              <Icon name={direction} width={20} height={20} color="#000" />
            </button>
          ))}

          <button
            className="btn-pagination"
            onClick={handleNextPageClick}
            disabled={currentPage * rowsPerPage >= filteredMerchants.length}
          >
            <Icon name="double_arrow_right" width={20} height={20} color="#000" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default MerchantTable;