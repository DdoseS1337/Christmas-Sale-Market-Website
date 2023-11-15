import { Col, Container, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import {
    Envelope,
    TelephoneOutbound,
    EnvelopeFill,
    TelephoneOutboundFill,
} from "react-bootstrap-icons";
import { useState } from "react";
import { CONTACTS } from "../common";
import "animate.css";
import "../styles/components/contacts.css";
import "../styles/components/adaptivity/contacts-adaptivity.css"

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
        <Container className="contacts-container w-50 animate__animated animate__slideInLeft" id='contacts-container'>
            <Container>
                <Row className="align-items-center text-center">
                    <Col>
                        <div
                            className="contact-container-icon mx-auto"
                            onMouseEnter={() => handleIconMouseEnter("viber")}
                            onMouseLeave={handleIconMouseLeave}
                        >
                            <a
                                href={CONTACTS.viber}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Image
                                    src={`/images/icons/viber${
                                        hoveredIcon === "viber" ? "-fill" : ""
                                    }.svg`}
                                    alt="viber-icon"
                                    className="contact-icons"
                                />
                            </a>
                        </div>
                        <p className="m-0 p-0 mt-2">Viber</p>
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
                                href={"mailto:" + CONTACTS.email}
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

                        <p
                            className="m-0 p-0 mt-2"
                            style={{ overflowWrap: "break-word" }}
                        >
                            {CONTACTS.email}
                        </p>
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
                            <a
                                href={"tel:" + CONTACTS.telephone}
                                rel="noreferrer"
                            >
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
                        <p className="m-0 mt-3 p-0">{CONTACTS.telephone}</p>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
};

export default ContactsPage;
