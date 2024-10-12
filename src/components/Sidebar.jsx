import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/component.css';

import Icon from "../media/icon/icons.jsx";
import AxipaysFull_log from '../media/image/axipays-full-logo.webp';

function Sidebar() {
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
                    name: "Manage User", icon: "group", link: "/home", dropdown: true, submenu: [
                        { name: "Add User", link: "/home" },
                        { name: "Edit User", link: "/home" },
                        { name: "Delete User", link: "/home" },
                        { name: "Update User", link: "/home" },
                        { name: "User Activity", link: "/home" }
                    ]
                },
                { name: "Manage Settlement", icon: "checkbook", link: "/home", },
                { name: "Manage API Doc", icon: "apk_document", link: "/home" }
            ]
        },
        {
            section: "Transactions",
            items: [
                { name: "Payment Gateway", icon: "paymentgateway", link: "/home" },
                { name: "Transaction Monitoring", icon: "id_card", link: "/transactionmonitoring" },
                { name: "Report", icon: "report", link: "/home" }
            ]
        },
        {
            section: "Others",
            items: [
                { name: "AQ Test", icon: "apps", link: "/home" },
                { name: "Master Setting", icon: "master_settings", link: "/home" }
            ]
        }
    ];

    const SidebarItem = ({ item }) => (
        <Link to={item.link} className={`sidebar-item ${item.dropdown ? "expandable" : ""} ${activeItem === item.name ? "active" : ""}`} onClick={() => handleItemClick(item.name)}>
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

export default Sidebar;
