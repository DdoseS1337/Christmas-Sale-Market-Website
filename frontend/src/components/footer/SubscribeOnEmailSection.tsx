import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../styles/components/footer/email-section.css";
import FooterInputBar from "./FooterInputBar";

const SubscribeOnEmailSection = () => {
    return (
        <div className="footer-email-section">
            <Container>
                <Row className="d-flex align-items-center" xs={2}>
                    <Col xs={5} className="me-5">
                        <h3>Підпишіться на оновлення</h3>
                        <p className="text-body-tertiary">
                            Отримуйте унікальні пропозиції та акції.
                        </p>
                    </Col>
                    <Col>
                        <FooterInputBar />
                    </Col>
                </Row>
                <img
                    className="footer-email-section__tree-icon"
                    src="images/pictures/tree-presents.png"
                    alt="christmas-tree-with-presents"
                />
            </Container>
        </div>
    );
};

export default SubscribeOnEmailSection;
