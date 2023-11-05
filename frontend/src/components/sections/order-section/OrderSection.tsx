import "../../../styles/components/sections/order-section/order-section.css";
import { Container, Form } from "react-bootstrap";

export const OrderSection = () => {
  return (
    <Container>
      <h1>Платіжна інформація</h1>
      <div className="mb-3 d-flex">
        <Form.Group className="me-3" controlId="First Name">
          <Form.Label>Ім'я</Form.Label>
          <Form.Control type="text" placeholder="Ваше ім'я" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Last Name">
          <Form.Label>Фамілія</Form.Label>
          <Form.Control type="text" placeholder="Ваше прізвище" />
        </Form.Group>
      </div>
      <div className="mb-3 d-flex">
        <Form.Group className="mb-3" controlId="ChoostYourCity">
          <Form.Label>Місто</Form.Label>
          <Form.Control type="text" placeholder="Обери своє місто" />
        </Form.Group>
      </div>
      <div className="mb-3 d-flex">
        <Form.Group className="mb-3" controlId="ChooseYourPost">
          <Form.Label>Відділення Нової Пошти</Form.Label>
          <Form.Control type="text" placeholder="Нова Пошта. Відділення." />
        </Form.Group>
      </div>
      <div className="mb-3 d-flex">
        <Form.Group className="me-3" controlId="EmailAdress">
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" placeholder="example@gmail.com" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Phone">
          <Form.Label>Телефон</Form.Label>
          <Form.Control type="text" placeholder="(+380)00-000-00-00" />
        </Form.Group>
      </div>
      <div className="mb-3">
        <h1>Додаткова інформація</h1>
        <Form.Group className="mb-3" controlId="Order Notes">
          <Form.Label>Додаткова інформація</Form.Label>
          <Form.Control
            id="additional-info-textbox"
            as="textarea"
            placeholder="Примітки щодо вашого замовлення, напр. спеціальні примітки для доставки"
          />
        </Form.Group>
      </div>
    </Container>
  );
};
