import { Col, Container, Row } from "react-bootstrap";

const HeaderLogo = () => {
    return (
        <div className="d-flex  justify-content-end christmas-text pe-5">
            <div className="logo-icon"></div>
            <h2 className="align-self-center" style={{ margin: 0, padding: 0 }}>
                Christmas Market
            </h2>
        </div>
    );
};

export default HeaderLogo;
