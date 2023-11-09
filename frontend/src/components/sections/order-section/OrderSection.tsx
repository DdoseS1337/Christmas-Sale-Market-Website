import "../../../styles/components/sections/order-section/order-section.css";
import { Container, Form } from "react-bootstrap";
import RoundedButton from "../../common/RoundedButton";

export const OrderSection = () => {
  return (
    <Container
      fluid
      className="d-flex align-items-start justify-content-around"
    >
      <div className="d-block">
        <h1>Платіжна інформація</h1>
        <div className="mb-3 d-flex">
          <Form.Group className="me-3" controlId="First Name">
            <Form.Label>Ім'я*</Form.Label>
            <Form.Control type="text" placeholder="Ваше ім'я" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Last Name">
            <Form.Label>Прізвище*</Form.Label>
            <Form.Control type="text" placeholder="Ваше прізвище" />
          </Form.Group>
        </div>
        <div className="mb-3 d-flex">
          <Form.Group className="mb-3" controlId="ChooseYourCity">
            <Form.Label>Місто*</Form.Label>
            <Form.Control type="text" placeholder="Обери своє місто" />
          </Form.Group>
        </div>
        <div className="mb-3 d-flex">
          <Form.Group className="mb-3" controlId="ChooseYourPost">
            <Form.Label>Відділення Нової Пошти*</Form.Label>
            <Form.Control type="text" placeholder="Нова Пошта. Відділення." />
          </Form.Group>
        </div>
        <div className="mb-3 d-flex">
          <Form.Group className="me-3" controlId="EmailAdress">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" placeholder="example@gmail.com" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Phone">
            <Form.Label>Телефон*</Form.Label>
            <Form.Control type="text" placeholder="(+380)00-000-00-00" />
          </Form.Group>
        </div>
        <hr className="divide" />
        <div className="mb-3">
          <h1>Додаткова інформація</h1>
          <Form.Group className="mb-3" controlId="Order Notes">
            <Form.Label>Примітки до замовлення</Form.Label>
            <Form.Control
              id="additional-info-textbox"
              as="textarea"
              placeholder="Примітки щодо вашого замовлення, напр. спеціальні примітки для доставки"
            />
          </Form.Group>
        </div>
      </div>

      <div className="order-summary">
        <h3 className="order-sum">Підсумок Замовлення</h3>
        <ul className="product-basket">
          <li className="product-listing">
            Green Capsicum x5{" "}
            <span>
              <b>$70.00</b>
            </span>
          </li>
          <li className="product-listing">
            Red Capsicum x1{" "}
            <span>
              <b>$14.00</b>
            </span>
          </li>
        </ul>
        <div>
          <p className="subtotal">
            Проміжний підсумок:{" "}
            <span>
              <b>$84.00</b>
            </span>
          </p>
          <hr className="divide" />
          <p className="total">
            Повна сума :{" "}
            <span>
              <b>$84.00</b>
            </span>
          </p>
        </div>
        <div className="payment-method">
          <h4 className="order-pay">Спосіб оплати</h4>
          <label className="mb-5">
            <input type="radio" name="payment" /> Оплата при отриманні
          </label>
        </div>

        <RoundedButton className="d-flex justify-content-center">
          Замовити товар
        </RoundedButton>
      </div>
    </Container>
  );
};
