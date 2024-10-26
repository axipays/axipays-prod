import React, { useState, useEffect } from 'react';
import Fr from "../../media/image/flag/france.png";
import De from "../../media/image/flag/germany.png";
import Jp from "../../media/image/flag/japan.png";
import Es from "../../media/image/flag/spain.png";
import En from "../../media/image/flag/us.png";

const Footer = () => {
	const [selectedLanguage, setSelectedLanguage] = useState("en");
	const [isMobileView, setIsMobileView] = useState(false);

	const languages = [
		{ code: "en", name: "English", flag: En },
		{ code: "es", name: "Español", flag: Es },
		{ code: "fr", name: "Français", flag: Fr },
		{ code: "de", name: "Deutsch", flag: De },
		{ code: "jp", name: "日本語", flag: Jp },
	];

	useEffect(() => {
		const checkMobileView = () => {
			setIsMobileView(window.innerWidth <= 768);
		};

		checkMobileView();
		window.addEventListener("resize", checkMobileView);

		return () => window.removeEventListener("resize", checkMobileView);
	}, []);

	const handleLanguageChange = (event) => {
		setSelectedLanguage(event.target.value);
	};

	return (
		<section id="footer">
			<div className="footer">
				<h2 className="company-footer-name">axipays</h2>
				<div className="footer-content">
					{isMobileView ? (
						<>
							<div className="right-content">
								<div className="company-information">
									<p>
									With our cutting-edge global payment gateway, you can seamlessly process transactions worldwide.
									Expand your reach and offer secure, reliable card payment solutions to your business partners across the globe.
									</p>
								</div>
								<div className="language-convertor">
									<img
										src={languages.find((lang) => lang.code === selectedLanguage)?.flag}
										alt="Flag Icon"
										className="flag-icon"
									/>
									<select value={selectedLanguage} onChange={handleLanguageChange}>
										{languages.map((language) => (
											<option key={language.code} value={language.code}>
												{language.name}
											</option>
										))}
									</select>
								</div>
							</div>
							<div className="left-content">
								<div className="col-one">
									<ul>
										<p>Community</p>
										<li>Developer Blog</li>
										<li>Social Media</li>
										<li>Community Guidelines</li>
									</ul>
									<ul>
										<p>Open Source</p>
										<li>GitHub Repository</li>
										<li>License Information</li>
										<li>API Documentation</li>
										<li>Bug Tracker</li>
									</ul>
								</div>
								<div>
								<ul>
										<p>Service</p>
										<li>Customer Support</li>
										<li>FAQs</li>
										<li>Integration Guides</li>
										<li>Pricing Plans</li>
										<li>Service Status</li>
										<li>Contact Us</li>
									</ul>									
								</div>
								<div>
								<ul>
										<p>About Us</p>
										<li>Terms of Service</li>
										<li>Leadership Team</li>
										<li>Privacy Policy</li>
										<li>Press & Media</li>
										<li>Our Story</li>
										<li>Careers</li>
										<li>Blog</li>
									</ul>
								</div>
							</div>
						</>
					) : (
						<>
							<div className="left-content">
								<div className="col-one">
									<ul>
										<p>Community</p>
										<li>Developer Blog</li>
										<li>Social Media</li>
										<li>Community Guidelines</li>
									</ul>
									<ul>
										<p>Open Source</p>
										<li>GitHub Repository</li>
										<li>License Information</li>
										<li>API Documentation</li>
										<li>Bug Tracker</li>
									</ul>
								</div>
								<div className="col-two">
									<ul>
										<p>Service</p>
										<li>Customer Support</li>
										<li>FAQs</li>
										<li>Integration Guides</li>
										<li>Pricing Plans</li>
										<li>Service Status</li>
										<li>Contact Us</li>
									</ul>
								</div>
								<div className="col-two">
									<ul>
										<p>About Us</p>
										<li>Our Story</li>
										<li>Leadership Team</li>
										<li>Careers</li>
										<li>Press & Media</li>
										<li>Blog</li>
										<li>Privacy Policy</li>
										<li>Terms of Service</li>
									</ul>
								</div>
							</div>
							<div className="right-content">
								<div className="language-convertor">
									<img
										src={languages.find((lang) => lang.code === selectedLanguage)?.flag}
										alt="Flag Icon"
										className="flag-icon"
									/>
									<select value={selectedLanguage} onChange={handleLanguageChange}>
										{languages.map((language) => (
											<option key={language.code} value={language.code}>
												{language.name}
											</option>
										))}
									</select>
								</div>
								<div className="company-information">
									<p>
									With our cutting-edge global payment gateway, you can seamlessly process transactions worldwide.
									Expand your reach and offer secure, reliable card payment solutions to your business partners across the globe.
									</p>
								</div>
							</div>
						</>
					)}
				</div>
				<div className="bottom-tag-line">
					<p>&copy; 2024 Axipays. All rights reserved.</p>
				</div>
			</div>
		</section>
	);
};

export default Footer;
