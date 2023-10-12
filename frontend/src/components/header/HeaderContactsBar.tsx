import { Col, Row } from "react-bootstrap";

const HeaderContactsBar = () => {
    return (
        <Row>
            <Col>
                <a href="tel:+1234567890" rel="noreferrer">
                    <img
                        src="/images/icons/telephone.png"
                        alt="telephone"
                        className="contact-icon"
                    />
                </a>
            </Col>
            <Col>
                <a
                    href="https://www.viber.com/ua/"
                    target="_blank"
                    rel="noreferrer"
                >
                    <img
                        src="/images/icons/viber.png"
                        alt="telephone"
                        className="contact-icon"
                    />
                </a>
            </Col>
            <Col>
                <a
                    href="mailto:example@gmail.com"
                    target="_blank"
                    rel="noreferrer"
                >
                    <img
                        src="/images/icons/gmail.png"
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
