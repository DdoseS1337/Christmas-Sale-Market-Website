import { Container } from "react-bootstrap";

const CartTotal = () => {
    return (
        <Container className="d-flex flex-column p-4 basket-border-total-card">
            <h2>Разом</h2>
            <span></span>
            <div className="basket-delimiter" />
        </Container>
    );
};

export default CartTotal;
