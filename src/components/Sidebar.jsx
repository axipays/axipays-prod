import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/component.css';

import Icon from "../media/icon/icons.jsx";
import AxipaysFull_log from '../media/image/axipays-full-logo.webp';

function Sidebar() {
    const role = localStorage.getItem('role');
    const [activeItem, setActiveItem] = useState("Overview");
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

    const handleItemClick = (itemName, isSubmenuItem = false) => {
        const submenuElement = document.querySelector('.submenu');

        if (isSubmenuItem) {
            setActiveItem(itemName);
        } else {
            if (activeItem === itemName && itemName === "Manage User") {
                setIsUserDropdownOpen((prev) => {
                    if (prev && submenuElement) {
                        submenuElement.style.maxHeight = '0';
                    } else if (!prev && submenuElement) {
                        submenuElement.style.maxHeight = `${submenuElement.scrollHeight}px`;
                    }
                    return !prev;
                });
            } else {
                if (submenuElement && isUserDropdownOpen) {
                    submenuElement.style.maxHeight = '0';
                    setIsUserDropdownOpen(false);
                }
                setActiveItem(itemName);

                if (itemName === "Manage User") {
                    setTimeout(() => {
                        if (submenuElement) {
                            submenuElement.style.maxHeight = `${submenuElement.scrollHeight}px`;
                        }
                        setIsUserDropdownOpen(true);
                    }, 10);
                }
            }
        }
    };

    const sidebarItems = [
        {
            section: "Dashboard",
            items: [{ name: "Overview", icon: "overview", link: "/home" }]
        },
        {
            section: "Management",
            items: [
                { name: "Manage Merchant", icon: "person_book", link: "/managemerchant" },
                {
                    name: "Manage User", icon: "group", disabled: true, dropdown: false, submenu: [
                        { name: "Add User", link: "", disabled: true },
                        { name: "Edit User", link: "", disabled: true },
                        { name: "Delete User", link: "", disabled: true },
                        { name: "Update User", link: "", disabled: true },
                        { name: "User Activity", link: "", disabled: true }
                    ]
                },
                { name: "Manage Settlement", icon: "checkbook",link: "/home", disabled: true },
                { name: "Manage API Doc", icon: "apk_document",link: "/home", disabled: true }
            ]
        },
        {
            section: "Transactions",
            items: [
                { name: "Payment Gateway", icon: "paymentgateway", link: "/home", disabled: true },
                { name: "Transaction Monitoring", icon: "id_card", link: "/transactionmonitoring" },
                { name: "Report", icon: "report", link: "/home", disabled: true }
            ]
        },
        {
            section: "Others",
            items: [
                { name: "AQ Test", icon: "apps", link: "/home", disabled: true },
                { name: "API Doc", icon: "master_settings", link: "/api", disabled: false },
                { name: "Master Setting", icon: "master_settings", link: "/home", disabled: true }
            ]
        }
    ];

    const sidebarItems_merchant = [
        {
            section: "Dashboard",
            items: [{ name: "Overview", icon: "overview", link: "/home" }]
        },
        {
            section: "Management",
            items: [
                { name: "Setting", icon: "person_book", link: "/viewmerchant" },
            ]
        },
        {
            section: "Transactions",
            items: [
                { name: "Transaction Monitoring", icon: "id_card", link: "/transactionmonitoring" },
                { name: "Report", icon: "report", link: "/home", disabled: true }
            ]
        },
        {
            section: "Others",
            items: [
                { name: "AQ Test", icon: "apps", link: "/home", disabled: true },
            ]
        }
    ];


    const SidebarItem = ({ item }) => {
        const handleClick = () => {
            if (!item.disabled) {
                handleItemClick(item.name);
            }
        };

        return item.disabled ? (
            <span className={`sidebar-item disabled`}>
                <i className="icon">
                    <Icon name={item.icon} width={22} height={22} color="grey" />
                </i>
                <span>{item.name}</span>
            </span>
        ) : (
            <Link to={item.link} className={`sidebar-item ${item.dropdown ? "expandable" : ""} ${activeItem === item.name ? "active" : ""}`} onClick={handleClick}>
                <i className="icon">
                    <Icon name={item.icon} width={22} height={22} color="black" />
                </i>
                <span>{item.name}</span>
                {item.dropdown && (
                    <i className="icon icon2">
                        <Icon name={isUserDropdownOpen ? "arrow_downward" : "arrow_right"} width={22} height={22} color="black" />
                    </i>
                )}
                {activeItem === item.name && !item.dropdown && <div className='sidebar-active'></div>}
            </Link>
        );
    };

    const SidebarItem_Merchant = ({ item }) => {
        const handleClick = () => {
            if (!item.disabled) {
                handleItemClick(item.name);
            }
        };

        return item.disabled ? (
            <span className={`sidebar-item disabled`}>
                <i className="icon">
                    <Icon name={item.icon} width={22} height={22} color="black" />
                </i>
                <span>{item.name}</span>
            </span>
        ) : (
            <Link to={item.link} className={`sidebar-item ${item.dropdown ? "expandable" : ""} ${activeItem === item.name ? "active" : ""}`} onClick={handleClick}>
                <i className="icon">
                    <Icon name={item.icon} width={22} height={22} color="black" />
                </i>
                <span>{item.name}</span>
                {item.dropdown && (
                    <i className="icon icon2">
                        <Icon name={isUserDropdownOpen ? "arrow_downward" : "arrow_right"} width={22} height={22} color="black" />
                    </i>
                )}
                {activeItem === item.name && !item.dropdown && <div className='sidebar-active'></div>}
            </Link>
        );
    };

    if(role === "admin"){
        return (
            <div className='sidebar'>
                <div className='sidebar-header'>
                    <img src={AxipaysFull_log} alt='Axipays full logo' />
                </div>
    
                <div className='sidebar-body'>
                    <div className='scrollable-content'> 
                        {sidebarItems.map(section => (
                            <div key={section.section} className="sidebar-section">
                                <h4 className="section-title">{section.section}</h4>
                                {section.items.map(item => (
                                    <div key={item.name}>
                                        <SidebarItem item={item} />
                                        {item.dropdown && (
                                            <div className={`submenu ${isUserDropdownOpen && activeItem === item.name ? 'open' : ''}`}>
                                                {item.submenu.map(subItem => (
                                                    <Link
                                                        key={subItem.name}
                                                        to={subItem.link}
                                                        className={`submenu-item ${activeItem === subItem.name ? "active" : ""}`}
                                                        onClick={() => handleItemClick(subItem.name, true)} 
                                                    >
                                                        <span>{subItem.name}</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
    
                <div className='sidebar-footer'></div>
            </div>
        );
    }
    if(role === "merchant"){
        return (
            <div className='sidebar'>
                <div className='sidebar-header'>
                    <img src={AxipaysFull_log} alt='Axipays full logo' />
                </div>
    
                <div className='sidebar-body'>
                    <div className='scrollable-content'> 
                        {sidebarItems_merchant.map(section => (
                            <div key={section.section} className="sidebar-section">
                                <h4 className="section-title">{section.section}</h4>
                                {section.items.map(item => (
                                    <div key={item.name}>
                                        <SidebarItem_Merchant item={item} />
                                        {item.dropdown && (
                                            <div className={`submenu ${isUserDropdownOpen && activeItem === item.name ? 'open' : ''}`}>
                                                {item.submenu.map(subItem => (
                                                    <Link
                                                        key={subItem.name}
                                                        to={subItem.link}
                                                        className={`submenu-item ${activeItem === subItem.name ? "active" : ""}`}
                                                        onClick={() => handleItemClick(subItem.name, true)} 
                                                    >
                                                        <span>{subItem.name}</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
    
                <div className='sidebar-footer'></div>
            </div>
        );
    }
    if(role === "emplyee"){
        <>
            <div>No Options</div>
        </>
    }
}

export default Sidebar;
