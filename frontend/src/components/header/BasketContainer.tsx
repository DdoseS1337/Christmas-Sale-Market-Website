import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Basket from "./Basket";

const BasketContainer = () => {
    return (
        <Container className="d-flex justify-content-center">
            <Link to="/basket" className="link-settings">
                <Basket />
            </Link>
        </Container>
    );
};

export default BasketContainer;
