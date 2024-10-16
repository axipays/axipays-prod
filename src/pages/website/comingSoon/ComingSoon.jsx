import React, { useState, useEffect, lazy, Suspense } from "react";
import { Link } from "react-router-dom";

// services 
import {apiRequest} from "../../../services/apiService.jsx"; 
import "../../../services/i18n"; 
import { useTranslation, Trans } from 'react-i18next';

// css
import "../../../styles/coming-soon.css";

// components
import Button from "../../../components/utilitis/Button.jsx";
import Input from "../../../components/utilitis/Input.jsx";

// icons
import Icon from "../../../media/icon/icons.jsx";

// icon-images
import aboutIcon from "../../../media/icon/aboutus.png";
import serviceIcon from "../../../media/icon/services.png";
import congratsIcon from "../../../media/icon/congrats.png";
import errorIcon from "../../../media/icon/error.png";
import oopsIcon from "../../../media/icon/oops.png";
import faqIcon from "../../../media/icon/faq2.png";
import Footer_left_img from "../../../media/image/footer-abstract.webp";
import Axipays_mono_logo from "../../../media/image/companyLogo_short.webp";
import Axipays_mono_logo_White from "../../../media/image/axipays-mono-logo-white.webp";
import Europe from "../../../media/image/Europe.webp";
import Africa from "../../../media/image/Africa.webp";
import Asia from "../../../media/image/Asia.webp";
import Fr from "../../../media/image/flag/france.png";
import De from "../../../media/image/flag/germany.png";
import Jp from "../../../media/image/flag/japan.png";
import Es from "../../../media/image/flag/spain.png";
import En from "../../../media/image/flag/us.png";

// Lazy Load Components
const ComingSoonVideo = lazy(() => import("../../../components/ComingSoonBackground.jsx"));
const Modal = lazy(() => import("../../../components/modals/ComingSoonModal.jsx"));
const ComingSoonFaq = lazy(() => import("../../../components/modals/ComingSoonFaq.jsx"));

function ComingSoon() {
    //states
    const { t, i18n } = useTranslation();
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [icon, setIcon] = useState("");
    const [header, setHeader] = useState("");
    const [body, setBody] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("en");
   
    const languages = [
        { code: "en", name: "English", flag: En },
        { code: "es", name: "Español", flag: Es },
        { code: "fr", name: "Français", flag: Fr },
        { code: "de", name: "Deutsch", flag: De },
        { code: "jp", name: "日本語", flag: Jp },
    ];

    // Modal open function
    const handleModalOpen = (item) => {
        let icon, head, bod;
        switch (item) {
            case "about":
                icon = aboutIcon;
                head = "About Us";
                bod =
                    "Axipays is a smart payment choice. At axipays, we empower businesses to grow globally with our advanced payment gateway solutions. Serving a diverse array of industries—from traditional sectors to innovative fields—we offer unparalleled security, flexibility, and expertise. Our commitment is to help clients successfully navigate complex payment landscapes and achieve their goals.";
                break;

            case "services":
                icon = serviceIcon;
                head = "Our Services";
                bod =
                    "Discover a world of payment possibilities with Axipays. A platform that brings together cards, cash, and alternative payment options, all at your fingertips. Experience seamless transactions and flexible solutions, all while putting your brand in the spotlight. The future of payments is just around the corner.";
                break;

            case "faq":
                icon = faqIcon;
                head = "FAQ's";
                bod = <ComingSoonFaq />;
                break;

            case "email-yes":
                icon = congratsIcon;
                head = "Congratulations!";
                bod = "Thank you for subscribing!";
                break;

            case "email-no":
                icon = errorIcon;
                head = "Response";
                bod = "Failed to subscribe. Please try again later.";
                break;

            default:
                icon = oopsIcon;
                head = "Opss!";
                bod = "Something went wrong!";
        }

        // Set the header and body state
        setIcon(icon);
        setHeader(head);
        setBody(bod);
        setIsModalOpen(true);
    };

    // Modal close function
    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    // Manages the laguage change by user
    const handleLanguageChange = (event) => {
        const selectedLang = event.target.value;
        setSelectedLanguage(selectedLang);
        i18n.changeLanguage(selectedLang); 
    };

    // Manages the email input
    const handleInputChange = (value) => {
        setEmail(value);
    };

    // Validate email and call's contact-us API
    const handleSubmit = async (event) => {
        event.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            setMessage("Please enter email!");
            clearMessageAfterTimeout();
            return;
        }

        if (!emailRegex.test(email)) {
            setMessage("Please enter a valid email!");
            clearMessageAfterTimeout();
            return;
        }

        try {
            await apiRequest("axipays/contact-us", "POST", { email });
            handleModalOpen("email-yes");
            setEmail("");
        } catch (error) {
            console.error("Subscription failed:", error);
            handleModalOpen("email-no");
            setEmail("");
        }
    };

    // clear email waring automaticaly after 2s.
    const clearMessageAfterTimeout = () => {
        setTimeout(() => {
            setMessage("");
            setEmail("");
        }, 2000);
    };

    // Hook to manage page title to ensure that is swaps with defaut and customise in every 2s.
    useEffect(() => {
        // Set up an interval to alternate between two titles
        const blinkInterval = setInterval(() => {
            document.title = document.title === "Coming Soon - Stay Tuned!"
                ? "Axipays"
                : "Coming Soon - Stay Tuned!";
        }, 2000);

        // Cleanup interval on component unmount
        return () => clearInterval(blinkInterval);
    }, []);

    // Renders the contact Page
    return (
        <div className="comingsoon">
            <div className="comingsoon_Video">
                <Suspense fallback={<div>Loading...</div>}>
                    <div className="background_video">
                        <ComingSoonVideo />
                    </div>
                </Suspense>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onConfirm={handleModalClose}
                icon={icon}
                header={header}
                body={body}
            />

            <div className="comingsoon_container">
                <div className="comingsoon_header">
                    <div className="comingsoon_header-logo">
                        <img src={Axipays_mono_logo} alt="Company Logo" />
                        <h2>AXIPAYS</h2>
                    </div>
                    <nav className="comingsoon_header-navbar">
                        <ul>
                            <li onClick={() => handleModalOpen("about")}>{t('about_us')}</li>
                            <li onClick={() => handleModalOpen("services")}>{t('services')}</li>
                            <li onClick={() => handleModalOpen('faq')}>{t('faq')}</li>
                        </ul>
                    </nav>
                    <div className="comingsoon_header-btn">
                        <div className="comingsoon_header-mobile_btn"></div>
                        <div className="comingsoon_header-laptop_btn">
                            <Link to="https://www.linkedin.com/company/axipays/" className="desktopHeaderBtn">
                                <Button className="primary-btn-dark" label="Goto LinkedIn">
                                    {t('connect_us')}
                                    <Icon
                                        name="arrow_up_right"
                                        width={25}
                                        height={25}
                                        color="white"
                                    />
                                </Button>
                            </Link>

                            <Link to="https://www.linkedin.com/company/axipays/" className="mobileHeaderBtn">
                                <Button className="primary-btn-dark" label="Goto LinkedIn">
                                    {t('connect_us')}
                                    <Icon
                                        name="arrow_up_right"
                                        width={15}
                                        height={15}
                                        color="white"
                                    />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="comingsoon_body">
                    <h1>{t('coming_soon')}</h1>
                    <p>{t('get_notified')}</p>
                    <div className="notify-input">
                        <Input
                            value={email}
                            placeholder={t('email_placeholder')}
                            onChange={handleInputChange}
                            className="notify-input-large"
                        />
                        <span className="notify-btn">
                            <Button className="primary-btn-dark" onClick={handleSubmit} label="Notify Me">
                                {t('notify_me')}
                            </Button>
                        </span>
                    </div>
                    {message && (
                        <p
                            style={{
                                color: "#DC0000",
                                marginTop: "-10px",
                                fontWeight: "500",
                            }}
                        >
                            {message}
                        </p>
                    )}
                </div>
            </div>
            <div className="comingsoon_footer">
                <section id="comingsoon-footer">
                    <div className="footer-for-comingsoon">
                        <div className="comingsoon-footer-left-img">
                            <img src={Footer_left_img} alt="footer abstract art" />
                        </div>
                        <div className="footer-content">
                            <div className="comingsoon_header-logo">
                                <img src={Axipays_mono_logo_White} alt="Company Logo" />
                                <h2>AXIPAYS</h2>
                            </div>
                            <div className="right-content">
                                <div className="language-convertor">
                                    <img
                                        src={
                                            languages.find((lang) => lang.code === selectedLanguage)
                                                ?.flag
                                        }
                                        alt="Flag Icon"
                                        className="flag-icon"
                                    />
                                    <select
                                        value={selectedLanguage}
                                        onChange={handleLanguageChange}
                                    >
                                        {languages.map((language) => (
                                            <option key={language.code} value={language.code}>
                                                {language.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="company-information">
                                    <p>
                                        <Trans i18nKey="footer_text">
                                            <i>Axipays</i> is a <i>Licensed Payment Gateway</i> serving a diverse range of industries, from <i>Everyday Transactions To Creative Ventures</i>.
                                            <br /> We are dedicated to delivering <i>Secure</i> and <i>Efficient Payment Solutions</i>. Stay tuned for exciting updates on our upcoming services.
                                            <br /> For inquiries or support, please contact us at <i className="email">support@axipays.com</i>. We appreciate your patience and look forward to serving you.
                                        </Trans>
                                    </p>
                                </div>
                                <div className="registred-licence">
                                    <p>{t('licensed_regions')}</p>
                                    <div className="regions">
                                        <div>
                                            <img src={Europe} alt="europe region" />
                                            <p>Europe</p>
                                        </div>
                                        <div>
                                            <img className="" src={Asia} alt="Asia region" />
                                            <p>Asia</p>
                                        </div>
                                        <div>
                                            <img src={Africa} alt="Africa region" />
                                            <p>Africa</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="comingsoon-footer-right-img">
                            <img src={Footer_left_img} alt="footer abstract art" />
                        </div>
                    </div>
                    <div className="bottom-tag-line-for-comingsoon">
                        <div className="left-div"></div>
                            <p>&copy; {t('footer_copyright')}</p>
                        <div className="right-div"></div>
                    </div>
                </section>
            </div>
        </div>
    );
}
export default ComingSoon;