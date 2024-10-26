import React, { useRef, useEffect, useState } from 'react';

// icons
// import diagonalarrow from "../media/icon/north_east.svg";
import serviceimg from "../../media/image/servicePageCenterImage.webp";
import servicesAnimation from "../../media/image/servicesection.webp"

const Service = () => {
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const wrapperRef = useRef(null);
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

  useEffect(() => {
    const section1 = section1Ref.current;
    const section2 = section2Ref.current;
    const wrapper = wrapperRef.current;

    const etalonHeight = section1.offsetHeight;
    let isInView = false;
    let isFixed = false;

    // Update the margin of the second section relative to the first
    section2.style.marginTop = `${etalonHeight}px`;

    const handleScroll = () => {
      const wrapperRect = wrapper.getBoundingClientRect();
      const section1Rect = section1.getBoundingClientRect();

      const windowHeight = window.innerHeight;

      // Check if the wrapper is in view
      isInView = wrapperRect.top <= 0 && wrapperRect.bottom > windowHeight;

      if (isInView) {
        const section1Rect = section1.getBoundingClientRect();
        const section2Rect = section2.getBoundingClientRect();

        if (section1Rect.top <= 0 && section1Rect.bottom >= 0) {
          section1.classList.add('fixed');
          section2.style.marginTop = `${section1Rect.height}px`;
          isFixed = true;
        } else {
          section1.classList.remove('fixed');
          section2.style.marginTop = '0';
          isFixed = true;
        }

        if (!isFixed && section1Rect.bottom < 0 && section2Rect.top <= 0 && section2Rect.bottom > 0) {
          section2.classList.add('fixed');
          section1.classList.remove('fixed');
        } else if (section2Rect.bottom <= 0) {
          // Once the second section is fully out of view, unfix it
          section2.classList.add('fixed');
        }
      } else {
        // Reset everything if the wrapper is out of view
        section1.classList.remove('fixed');
        section2.style.marginTop = '0';
      }

      if (section1Rect.top > 0) {
        section1.classList.remove('fixed');
        section2.style.marginTop = '0';

      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="service-wrapper" ref={wrapperRef}>
      <section ref={section1Ref} id="section1" className="section">
        <div className="full-front-page">
          {isMobile ? (
            <>
              <div className="service-front-page-content">
                <h1>
                  BEYOND PAYMENTS:
                  <br /> SOLUTIONS THAT PROPEL
                </h1>
                <p>
                  We go beyond the transaction. Our innovative solutions are
                  designed to simplify, optimize, and accelerate your payment
                  processes. Propel your business forward with tools that do
                  more than process payments—they create possibilities.
                </p>
                <button className="contact-btn">Explore Solutions</button>
                <div className='servicesAnimation-image'>
                  <img src={servicesAnimation} alt="Serv/ices" ></img>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="service-front-page-content">
                <h1>
                  BEYOND PAYMENTS:
                  <br /> SOLUTIONS THAT PROPEL
                </h1>
                <p>
                  We go beyond the transaction. Our innovative solutions are
                  designed to simplify, optimize, and accelerate your payment
                  processes. Propel your business forward with tools that do
                  more than process payments—they create possibilities.
                </p>
                <button className="contact-btn">Explore Solutions</button>
              </div>
              <div className='servicesAnimation-image'>
                <img src={servicesAnimation} alt="Serv/ices" ></img>
              </div>
            </>
          )}

        </div>
      </section>

      <section ref={section2Ref} id="section2" className="section">

        <div className="service-scrolled-page">
          <h1>Our Innovative Solutions for Seamless Payments</h1>
          {isMobile ? (
            <div className="service-scrolled-page-formoblie-view">

              <div className="row2-card service-img-div cardofservice">
                <img src={serviceimg} alt="arrow" />
                <p>
                  Accept payments from customers worldwide with our robust
                  and dependable credit and debit card processing. Easily
                  integrate into your online store and enjoy advanced fraud
                  protection.
                </p>
              </div>

              <div className="row1-card row2-card">
                <h2>Credit & Debit Card Processing</h2>
                <h3>- Global Payments Made Easy</h3>
                <p>
                  Redefine how your business handles payments with seamless,
                  intuitive solutions. Designed to adapt and evolve with
                  your needs, we remove barriers, enhance flexibility, and
                  drive growth.{" "}
                </p>
                <div className="service-learn-more">
                  <div className="service-learn-more-div">
                    <span>Learn More</span>
                    <div className="service-arrow-div">
                      {/* <img
                      src={diagonalarrow} alt="arrow"
                      className="service-arrow"
                    ></img> */}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row1-card row2-card">
                <h2>Alternate Payment Methods</h2>
                <h3>- Expand Your Payment Options</h3>
                <p>
                  Offer a wider range of payment methods to cater to diverse
                  preferences. Our seamless integration makes it easy to
                  accept alternative payments, boosting your sales and
                  satisfaction.
                </p>
                <div className="service-learn-more">
                  <div className="service-learn-more-div">
                    <span>Learn More</span>
                    <div className="service-arrow-div">
                      {/* <img
                      src={diagonalarrow} alt="arrow"
                      className="service-arrow"
                    ></img> */}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row2-card">
                <h2> White Label Payment Gateway</h2>
                <h3>- Power Your Business</h3>
                <p>
                  Our white label solution offers a flexible and scalable
                  approach tailored to your specific needs.
                </p>
                <div className="service-learn-more">
                  <div className="service-learn-more-div">
                    <span>Learn More</span>
                    <div className="service-arrow-div">
                      {/* <img
                      src={diagonalarrow} alt="arrow"
                      className="service-arrow"
                    ></img> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row2-card">
                <h2> White Label Payment Gateway</h2>
                <h3>- Power Your Business</h3>
                <p>
                  Our white label solution offers a flexible and scalable
                  approach tailored to your specific needs. Enjoy branding
                  customization, and advanced protection features to drive
                  your business growth.
                </p>
                <div className="service-learn-more">
                  <div className="service-learn-more-div">
                    <span>Learn More</span>
                    <div className="service-arrow-div">
                      {/* <img
                      src={diagonalarrow} alt="arrow"
                      className="service-arrow"
                    ></img> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row2-card">
                <h2>Cashier Platform</h2>
                <h3>- Several cashiers using a single integration</h3>
                <p>
                  Centralise your cashier operations with our user-friendly
                  platform. Our unified interface streamlines transactions,
                  enhances security, regardless of the cashier handling
                  their order.
                </p>
                <div className="service-learn-more">
                  <div className="service-learn-more-div">
                    <span>Learn More</span>
                    <div className="service-arrow-div">
                      {/* <img
                      src={diagonalarrow} alt="arrow"
                      className="service-arrow"
                    ></img> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="service-scrolled-page-content">
              <div className="service-scrolled-page-content-row1">
                <div className="row1-card card">
                  <h2>Credit & Debit Card Processing</h2>
                  <h3>- Global Payments Made Easy</h3>
                  <p>
                    Redefine how your business handles payments with seamless,
                    intuitive solutions. Designed to adapt and evolve with
                    your needs, we remove barriers, enhance flexibility, and
                    drive growth.{" "}
                  </p>
                  <div className="service-learn-more">
                    <div className="service-learn-more-div">
                      <span>Learn More</span>
                      <div className="service-arrow-div">
                        {/* <img
                        src={diagonalarrow} alt="arrow"
                        className="service-arrow"
                      ></img> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row1-card row1-card2">
                  <img src={serviceimg} alt="arrow" className="service-image" />
                  <p>
                    Accept payments from customers worldwide with our robust
                    and dependable credit and debit card processing. Easily
                    integrate into your online store and enjoy advanced fraud
                    protection.
                  </p>
                </div>
                <div className="row1-card card">
                  <h2>Alternate Payment Methods</h2>
                  <h3>- Expand Your Payment Options</h3>
                  <p>
                    Offer a wider range of payment methods to cater to diverse
                    preferences. Our seamless integration makes it easy to
                    accept alternative payments, boosting your sales and
                    satisfaction.
                  </p>
                  <div className="service-learn-more">
                    <div className="service-learn-more-div">
                      <span>Learn More</span>
                      <div className="service-arrow-div">
                        {/* <img
                        src={diagonalarrow} alt="arrow"
                        className="service-arrow"
                      ></img> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="service-scrolled-page-content-row2">
                <div className="row2-card">
                  <h2> White Label Payment Gateway</h2>
                  <h3>- Power Your Business</h3>
                  <p>
                    Our white label solution offers a flexible and scalable
                    approach tailored to your specific needs.
                  </p>
                  <div className="service-learn-more">
                    <div className="service-learn-more-div">
                      <span>Learn More</span>
                      <div className="service-arrow-div">
                        {/* <img
                        src={diagonalarrow} alt="arrow"
                        className="service-arrow"
                      ></img> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row2-card">
                  <h2> White Label Payment Gateway</h2>
                  <h3>- Power Your Business</h3>
                  <p>
                    Our white label solution offers a flexible and scalable
                    approach tailored to your specific needs. Enjoy branding
                    customization, and advanced protection features to drive
                    your business growth.
                  </p>
                  <div className="service-learn-more">
                    <div className="service-learn-more-div">
                      <span>Learn More</span>
                      <div className="service-arrow-div">
                        {/* <img
                        src={diagonalarrow} alt="arrow"
                        className="service-arrow"
                      ></img> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row2-card">
                  <h2>Cashier Platform</h2>
                  <h3>- Several cashiers using a single integration</h3>
                  <p>
                    Centralise your cashier operations with our user-friendly
                    platform. Our unified interface streamlines transactions,
                    enhances security, regardless of the cashier handling
                    their order.
                  </p>
                  <div className="service-learn-more">
                    <div className="service-learn-more-div">
                      <span>Learn More</span>
                      <div className="service-arrow-div">
                        {/* <img
                        src={diagonalarrow} alt="arrow"
                        className="service-arrow"
                      ></img> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
          }
        </div>
      </section >
    </div >
  );
}

export default Service;
