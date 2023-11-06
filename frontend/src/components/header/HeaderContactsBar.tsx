import { Col, Row } from "react-bootstrap";
import { CONTACTS } from "../../common";

const HeaderContactsBar = () => {
    return (
        <Row>
            <Col>
                <a href={"tel:" + CONTACTS.telephone} rel="noreferrer">
                    <img
                        src="/images/icons/telephone.png"
                        alt="telephone"
                        className="contact-icon"
                    />
                </a>
            </Col>
            <Col>
                <a href={CONTACTS.viber} target="_blank" rel="noreferrer">
                    <img
                        src="/images/icons/viber.png"
                        alt="telephone"
                        className="contact-icon"
                    />
                </a>
            </Col>
            <Col>
                <a
                    href={"mailto:" + CONTACTS.email}
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
