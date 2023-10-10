import { Col, Row } from "react-bootstrap";

const HeaderContactsBar = () => {
    return (
        <Row style={{ marginLeft: "8rem" }}>
            <Col>
                <a href="https://uk.wikipedia.org/wiki/Telephone" target="_blank">
                    <img
                        src="./images/icons/telephone.png"
                        alt="telephone"
                        className="contact-icon"
                    />
                </a>
            </Col>
            <Col>
                <a href="https://www.viber.com/ua/" target="_blank">
                    <img
                        src="./images/icons/viber.png"
                        alt="telephone"
                        className="contact-icon"
                    />
                </a>
            </Col>
            <Col>
                <a href="https://www.google.com/intl/uk/gmail/about/" target="_blank">
                    <img
                        src="./images/icons/gmail.png"
                        alt="telephone"
                        className="contact-icon"
                    />
                </a>
            </Col>
            <Col>
                <span style={{ whiteSpace: "nowrap" }}>Зв'язатися з нами</span>
            </Col>
        </Row>
    );
};

export default HeaderContactsBar;
