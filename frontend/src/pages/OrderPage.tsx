import { Container } from "react-bootstrap";
import { OrderSection } from "../components/sections/order-section/OrderSection";

const OrderPage = () => {
  return (
    <Container className="d-flex">
      <OrderSection />
      <Container></Container>
    </Container>
  );
};

export default OrderPage;
