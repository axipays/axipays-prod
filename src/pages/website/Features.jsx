import React, { useState, useEffect } from 'react';

// icons 
import internet from "../../media/image/internet.webp";
import safe from "../../media/icon/safe.webp";
import secure from "../../media/icon/secure.webp";
import reliable from "../../media/icon/reliable.webp";
import analyticFeature from "../../media/image/analytics.webp";
import apiFeature from "../../media/image/api.webp";
import controlFeature from "../../media/image/controls.webp";
import globalFeature from "../../media/image/global.webp";
import Icon from '../../media/icon/icons';

const Feature = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <section id="feature">
            <div className="feature full_page">
                <div className="feature-section feature-left-section">
                    <div className="feature-left-section-content">
                        {isMobile ? (<div className="feature-left-section-head">
                            <h1>
                                Turning innovative ideas into amazing 
                                <span className="arrow-div1">
                                    <Icon name="arrow_right" color="white" className='arrow'/>
                                </span>
                                solutions
                            </h1>

                        </div>) : (<div className="feature-left-section-head">
                            <h1>Turning innovative ideas into amazing</h1>
                            <div>
                                <div className="arrow-div1">
                                    {/* <img src={whiteRightArrow} alt="arrow" /> */}
                                    <Icon name="arrow_right" color="white" />
                                </div>
                                <h1>solutions</h1>
                            </div>
                        </div>)}

                        <p className="feature-left-section-subhead">
                            Unlocking the Power of Innovation: Feature-rich solutions
                            for seamless and secure payment processing
                        </p>
                        <button className="feature-button">Discover More</button>
                        <div className="feature-left-section-bottom">
                            <img src={internet} alt="globe" />
                            {/* <Icon name="arrow_right" color="white"/> */}
                            <h3>
                                Global Payments, Securely Delivered
                                <br /> with Reliability You Can Trust
                            </h3>
                            <p>
                                Designed for global reach, our secure infrastructure ensures
                                reliable and safe payment processing, empowering you to
                                scale confidently and without boundaries.
                            </p>
                            <div className="features-bottom-tab">
                                <div>
                                    <img src={safe} alt="safe" />
                                    <h3>Safe</h3>
                                </div>
                                <div>
                                    <img src={secure} alt="secure" />
                                    <h3>Secure</h3>
                                </div>
                                <div>
                                    <img src={reliable} alt="reliable" />
                                    <h3>Reliable</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    {isMobile ? (
                <div className="feature-right-section">
                        <div className="feature-right-infograph">

                            <div className="feature-div feature-div-first-card">
                            <img src={apiFeature} alt="api" />
                                <div>
                                    <h2>One API, Infinite Possibilities</h2>
                                    <p>
                                        Transform your business with our single API, connecting
                                        you to diverse payment methods,and multiple currencies,
                                        simplifying payments and empowering limitless growth.
                                    </p>
                                </div>
                            </div>
                            <div className="feature-div feature-div-second-card">
                                <div>
                                    <h2>
                                        Live Analytics, Actionable Insights
                                    </h2>
                                    <p>
                                        Monitor transactions live and access data-driven
                                        analytics, gaining valuable insights to optimize your
                                        business performance.
                                    </p>
                                </div>
                                <img src={analyticFeature} alt="analytics" />
                            </div>
                            <div className="feature-div feature-controls-gradient">
                            <img src={controlFeature} alt="controls" />
                                    
                                    <div>
                                        <h2>Personalized, Flexible Controls</h2>
                                        <p>
                                            Customize your dashboard, manage agents, and create a
                                            payment experience that fits your unique needs.
                                        </p>
                                    </div>
                                </div>
                                <div className="feature-div feature-global-div">
                                    <div>
                                        <h2>Global Payments, Securely Delivered</h2>
                                        <p>
                                            Reach customers worldwide with our payment gateway,
                                            operating globally. Expand your global footprint with our
                                            secure and reliable payment solutions.
                                        </p>
                                    </div>
                                    <img src={globalFeature} alt="global" />
                                </div>
                            </div>
                            </div>
                    ) : (
                    <div className=" feature-section feature-right-section">
                        <div className="feature-right-infograph">
                            <div className="feature-vertical-div feature-analytics-gradient">
                                <div className="feature-analytics-div">
                                    <div className="feature-div-content">
                                        <h2>
                                            Live Analytics,
                                            <br /> Actionable Insights
                                        </h2>
                                        <p>
                                            Monitor transactions live and access data-driven
                                            analytics, gaining valuable insights to optimize your
                                            business performance.
                                        </p>
                                    </div>
                                    <img src={analyticFeature} alt="analytics" />
                                </div>
                            </div>
                            <div className="feature-horizontal-div feature-api-div">
                                <div className="feature-div-content">
                                    <h2>One API, Infinite Possibilities</h2>
                                    <p>
                                        Transform your business with our single API, connecting
                                        you to diverse payment methods,and multiple currencies,
                                        simplifying payments and empowering limitless growth.
                                    </p>
                                </div>
                                <img src={apiFeature} alt="api" />
                            </div>
                            <div className="feature-vertical-div feature-controls-gradient">
                                <div className="feature-controls-div">
                                    <img src={controlFeature} alt="controls" />
                                    <div className="feature-div-content feature-controls-div-content">
                                        <h2>Personalized, Flexible Controls</h2>
                                        <p>
                                            Customize your dashboard, manage agents, and create a
                                            payment experience that fits your unique needs.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="feature-horizontal-div feature-global-div">
                                <div className="feature-div-content">
                                    <h2>Global Payments, Securely Delivered</h2>
                                    <p>
                                        Reach customers worldwide with our payment gateway,
                                        operating globally. Expand your global footprint with our
                                        secure and reliable payment solutions.
                                    </p>
                                </div>
                                <img src={globalFeature} alt="global" />
                            </div>
                        </div>
                        </div>
                    )}
      
            </div>
        </section>
    );
};

export default Feature;
