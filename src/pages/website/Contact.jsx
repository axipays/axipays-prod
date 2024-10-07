import React from 'react';
import { Link } from 'react-router-dom';

import Company_Logo_short from '../media/image/companyLogo_short.png';
import Contact_circularlines from "../media/image/contact-half-images.png";

import visa from "../media/image/visa.png";
import mastercard from "../media/image/mastercard.png";
import discover from "../media/image/discover.png";
import unionpay from "../media/image/unionpay.png";

import linkedin from "../media/icon/linkedin.png";
import skype from "../media/icon/skype.png";
import telegram from "../media/icon/telegram.png";
import mail from "../media/icon/google.png";

import jcb from "../media/image/jcb.png";
import pci from "../media/image/pci-dss.png";
import ssl from "../media/image/ssl.png";

const Contact = () => {
  return (
    <section id="contact">
      <div className="contact full_page">
        <div className="contact-left">
          <div className="contact-left-header">
            <img
              className="company_logo"
              src={Company_Logo_short}
              alt="Axipays brand logo"
            />
            <h3>Axipays</h3>
          </div>

          <div className="contact-left-body">
            <img
              src={Contact_circularlines}
              alt="contact circular lines "
            />
          </div>

          <div className="contact-left-footer">
            <div className="social-handles">
              <div>
                <img src={linkedin} alt="linkedin"></img>
                <Link to="https://linkedin.com">@axipays-linkedin</Link>
              </div>
              <div>
                <img src={skype} alt="skype"></img>
                <a href="www.skype.com">@axipays-skype</a>
              </div>

              <div>
                <img src={telegram} alt="telegram"></img>
                <a href="www.telegram.com">@axipays-telegram</a>
              </div>
              <div>
                <img src={mail} alt="gmail"></img>
                <a href="www.gmail.com">@axipays-gmail</a>
              </div>
            </div>
          </div>
        </div>
        <div className="contact-right">
          <div className="contact-right-content">
            <div className="head">
              <h2>Let’s simplify your payments world.</h2>
              <p>Reach out and we'll get in touch within 24 hours.</p>
            </div>
            <div className="form">
              <form>
                <div className="name-fields">
                  <div className="input-label-div">
                    <label>First Name</label>
                    <input type="text" placeholder="First Name"></input>
                  </div>
                  <div className="input-label-div">
                    <label>Last Name</label>
                    <input type="text" placeholder="Last Name"></input>
                  </div>
                </div>
                <div className="input-label-div wrapper">
                  <label>Email</label>
                  <input type="text" placeholder="Email Address"></input>
                </div>
                <div className="input-label-div wrapper">
                  <label>Skype/Telegram Id</label>
                  <input
                    type="text"
                    placeholder="Skype/Telegram Id"
                  ></input>
                </div>
                <div className="input-label-div wrapper">
                  <label>Message</label>
                  <textarea
                    rows={5}
                    placeholder="Leave us a message..."
                    style={{ resize: "none" }}
                  ></textarea>
                </div>
                <button className="contact-btn" type="submit">
                  Send Message
                </button>
              </form>
            </div>
            <div className="contact-right-footer">
              <div className="cards">
                <img src={visa} alt="visa" />
                <img
                  src={mastercard}
                  alt="mastercard"
                  className="mastercard"
                />
                <img src={discover} alt="discover" />
                <img src={unionpay} alt="unionpay" />
                <img src={jcb} alt="jcb" />
              </div>
              <div className="certificates">
                <img src={pci} alt="pci" />
                <img src={ssl} alt="ssl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
