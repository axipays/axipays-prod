import React, { useState, useEffect} from "react";
import "../styles/component.css";
import Icon from "../media/icon/icons";
import nodata from "../media/image/no-data.webp"

const TransactionTable = ({ headerLabels = [],tableData=[],onViewClick,isCopy = false, onTotalAmountChange}) => {
    const [expandedRows, setExpandedRows] = useState([]);
    const [activeOptionRow, setActiveOptionRow] = useState(null);
    const [filterText] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [menuPosition, setMenuPosition] = useState('below');
    

    const filteredData = Array.isArray(tableData)
        ? tableData.filter((row) =>
            Object.values(row).some((val) =>
                val && String(val).toLowerCase().includes(filterText.toLowerCase())
            ) 
        )
        : [];

    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);
    
    const totalAmount = paginatedData.reduce((acc, row) => {
        const amount = parseFloat(row.amount); // Adjust according to your data structure
        return acc + (isNaN(amount) ? 0 : amount);
    }, 0);

    useEffect(() => {
        onTotalAmountChange(totalAmount);
    }, [totalAmount, onTotalAmountChange]);

    const toggleRowExpand = (index) => {
        setExpandedRows((prevExpandedRows) =>
            prevExpandedRows.includes(index)
                ? prevExpandedRows.filter((rowIndex) => rowIndex !== index)
                : [...prevExpandedRows, index]
        );
    };

    const toggleOptions = (index, event) => {
        if (activeOptionRow === index) {
            setActiveOptionRow(null);
        } else {
            const rowRect = event.target.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const menuHeight = 200;

            if (windowHeight - rowRect.bottom < menuHeight) {
                setMenuPosition('above');
            } else {
                setMenuPosition('below');
            }

            setActiveOptionRow(index);
        }
    };

    const closemenuOption = () => {
        setActiveOptionRow(false)
    }

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

    const handleCopy = (text) => {
        if (isCopy) {
            navigator.clipboard.writeText(text).then(
                () => {
                    alert(`Copied: ${text}`);
                },
                (err) => {
                    console.error('Failed to copy text: ', err);
                }
            );
        } else {
            alert("Copy action is disabled");
        }
    };

    return (
        <div className="transaction-table-container">
            <table className="transaction-table">
                <thead>
                    <tr>
                        {headerLabels.slice(0, 8).map((item, index) => (
                            <th key={index}>{item.heading}</th>
                        ))}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.length > 0 ? (
                        paginatedData.map((row, index) => (
                            <React.Fragment key={index}>
                                <tr className={expandedRows.includes(index) ? "expanded-parent" : ""}>
                                    {headerLabels.slice(0, 8).map((item, colIndex) => {
                                        if (colIndex === 0) {
                                            // Display s.no as the continuous serial number
                                            return <td key={item.label} onClick={() => handleCopy(row[item.label])}>{startIndex + index + 1}</td>;
                                        }
                                        if (colIndex === 5) {
                                            const statusClass =
                                                row[item.label].toLowerCase() === "success"
                                                    ? "status-success"
                                                    : row[item.label].toLowerCase() === "fail"
                                                        ? "status-failed"
                                                        : "status-pending";

                                            return (
                                                <td key={item.label} onClick={() => handleCopy(row[item.label])}>
                                                    <div className={`status-column ${statusClass}`}>
                                                        <div className={`bullet ${statusClass}`}></div> {row[item.label]}
                                                    </div>
                                                </td>
                                            );
                                        }
                                        return (
                                            <td key={item.label} className={expandedRows.includes(index) ? "remover" : ""} onClick={() => handleCopy(row[item.label])}>
                                                {row[item.label]}
                                            </td>
                                        );
                                    })}
                                    <td>
                                        <div className="more-options">
                                        <span className="icon-options" onClick={() => toggleRowExpand(index)} >
                                            {expandedRows.includes(index) ? (
                                                <Icon
                                                    name="keyboard_arrow_up"
                                                    width={20}
                                                    height={20}
                                                    color="#000000"
                                                />
                                            ) : (
                                                <Icon
                                                    name="keyboard_arrow_down"
                                                    width={20}
                                                    height={20}
                                                    color="#000000"
                                                />
                                            )}
                                        </span>
                                            <span
                                                className="icon-options"
                                                onClick={(event) => toggleOptions(index, event)}
                                            >
                                                <Icon
                                                    name="vertical_dots"
                                                    width={20}
                                                    height={20}
                                                    color="#000000"
                                                />
                                            </span>
                                        </div>

                                        {activeOptionRow === index && (
                                            <div className="options-menu active-option" style={{
                                                top: menuPosition === 'below' ? '100%' : 'auto',
                                                bottom: menuPosition === 'above' ? '100%' : 'auto',
                                            }}>
                                                <div className="options-menu-head">More
                                                    <Icon name="close_fill"
                                                        width={20}
                                                        height={20}
                                                        color="#03386c"
                                                        onClick={closemenuOption}></Icon></div>
                                                <ul>
                                                    <li onClick={() => alert("Edit action")}>
                                                        <Icon name="checkbook"
                                                            width={20}
                                                            height={20}
                                                            color="#03386c"
                                                            className="list-icon">
                                                        </Icon>Edit</li>
                                                    <li onClick={() => alert("Delete action")}>
                                                        <Icon name="person_remove"
                                                            width={20}
                                                            height={20}
                                                            color="#03386c">
                                                        </Icon>Delete</li>
                                                    <li onClick={() => onViewClick(row)}>
                                                        <Icon name="view_more"
                                                            width={20}
                                                            height={20}
                                                            color="#03386c"></Icon>View More</li>
                                                </ul>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                                {expandedRows.includes(index) && (
                                    <tr className="expanded-row">
                                        <td colSpan={headerLabels.length + 1}>
                                            <div className="expanded-content">
                                                <div className="expanded-content-row">
                                                    <div className="expanded-left">
                                                        {headerLabels.slice(8, 11).map((item, index) => (
                                                            <div key={index} className="expand-item">
                                                                <div className="expanded-details"> <span className="expand-text">{item.heading}</span>
                                                                    <span className="expand-value" onClick={() => handleCopy(row[item.label])}>{row[item.label]}</span></div>
                                                                {(index === 0 || index === 1) && <div className="divider-div"></div>}
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="expanded-center">
                                                        {headerLabels.slice(11).map((item, index) => (
                                                            <React.Fragment key={index}>
                                                                <span className={`cards-row ${index === 2 ? 'amount-row' : index === 3 ? 'amount-row currency-row' : ''}`}>
                                                                    <span className="expand-value" onClick={() => handleCopy(row[item.label])}>{row[item.label]}</span>
                                                                </span>
                                                                {index < headerLabels.slice(11).length - 1 && index !== 2 && index !== 3 && (
                                                                    <div className="divider-div"></div>
                                                                )}
                                                            </React.Fragment>
                                                        ))}
                                                    </div>
                                                    <div className="expanded-right">
                                                        <button className="btn-primary" onClick={() => onViewClick(row)}>
                                                            View More
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))
                    ) : (
                        <tbody>
                            <div className="no-data-aviliable">
                                <img src={nodata} alt="No data available" />
                            </div>
                        </tbody>
                    )}
                </tbody>
            </table>

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

export default TransactionTable;
