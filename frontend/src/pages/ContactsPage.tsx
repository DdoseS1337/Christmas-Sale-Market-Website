import { Col, Container, Row } from "react-bootstrap";
import {
	Envelope,
	TelephoneOutbound,
	EnvelopeFill,
	TelephoneOutboundFill,
} from "react-bootstrap-icons";
import { useState } from "react";
import "animate.css";
import "../styles/components/contacts.css";

const ContactsPage: React.FC = () => {
	const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

	const handleIconMouseEnter = (iconName: string) => {
		setHoveredIcon(iconName);
	};

	const handleIconMouseLeave = () => {
		setHoveredIcon(null);
	};

	const getIcon = (icon: JSX.Element, iconFill: JSX.Element) => {
		return hoveredIcon === icon.key ? iconFill : icon;
	};

	return (
		<Container className="contacts-container w-50 animate__animated animate__slideInLeft">
			<Container>
				<Row className="align-items-center text-center">
					<Col>
						<div
							className="contact-container-icon mx-auto"
							onMouseEnter={() => handleIconMouseEnter("viber")}
							onMouseLeave={handleIconMouseLeave}
						>
							<a
								href="https://www.viber.com/ua/"
								target="_blank"
								rel="noreferrer"
							>
								<img
									src={`/images/icons/viber${
										hoveredIcon === "viber" ? "-fill" : ""
									}.svg`}
									alt="viber-icon"
									className="contact-icons"
								/>
							</a>
						</div>
						<p className="m-0 p-0">Viber</p>
					</Col>
					<Col xs={1} className="d-flex justify-content-center">
						<div className="contact-line"></div>
					</Col>
					<Col>
						<div
							onMouseEnter={() =>
								handleIconMouseEnter("envelope")
							}
							onMouseLeave={handleIconMouseLeave}
							className="contact-container-icon mx-auto"
						>
							<a
								href="mailto:example@gmail.com"
								target="_blank"
								rel="noreferrer"
							>
								{getIcon(
									<Envelope
										key="envelope"
										className="contact-icons"
									/>,
									<EnvelopeFill
										key="envelope-fill"
										className="contact-icons"
									/>
								)}
							</a>
						</div>

						<p className="m-0 p-0">example@gmail.com</p>
					</Col>
					<Col xs={1} className="d-flex justify-content-center">
						<div className="contact-line"></div>
					</Col>
					<Col>
						<div
							onMouseEnter={() =>
								handleIconMouseEnter("telephone")
							}
							onMouseLeave={handleIconMouseLeave}
							className="contact-container-icon mx-auto"
						>
							<a href="tel:+1234567890" rel="noreferrer">
								{getIcon(
									<TelephoneOutbound
										key="telephone"
										className="contact-icons"
									/>,
									<TelephoneOutboundFill
										key="telephone-fill"
										className="contact-icons"
									/>
								)}
							</a>
						</div>
						<p className="m-0 mt-2 p-0">(063) 555-35-55</p>
					</Col>
				</Row>
			</Container>
		</Container>
	);
};

export default ContactsPage;
