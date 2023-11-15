import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
    XCircle,
    DashCircle,
    DashCircleFill,
    PlusCircle,
    PlusCircleFill,
} from "react-bootstrap-icons";
import Image from "react-bootstrap/Image";
import { CartService } from "../../../services/basketService";
import { Link } from "react-router-dom";
import ItemCardProps from "../../../interfaces/ItemCardProps";
import useHoverStates from "./AmountChangeHooks";
import ConfirmRemoveFromBasketModal from "../../common/ConfirmRemoveFromBasketModal";
import "../../../styles/components/basket.css";
import '../../../styles/components/adaptivity/basket-adaptivity.css'

const ItemCard = ({ item, onItemRemoved, onAmountChanged }: ItemCardProps) => {
    const [amount, setAmount] = useState(item.amount);
    const {
        isMinusHovered,
        isPlusHovered,
        handleMinusMouseEnter,
        handleMinusMouseLeave,
        handlePlusMouseEnter,
        handlePlusMouseLeave,
    } = useHoverStates();
    const [modalShow, setModalShow] = useState(false);

    const amountChange = (operation: string) => {
        if (operation === "+") {
            const newAmount = amount + 1;
            setAmount(newAmount);
            CartService.updateCartItem(item.id, { amount: newAmount });
            onAmountChanged(CartService.getTotalPrice());
        } else if (operation === "-") {
            const newAmount = amount - 1;
            if (newAmount >= 1) {
                setAmount(newAmount);
                CartService.updateCartItem(item.id, { amount: newAmount });
                onAmountChanged(CartService.getTotalPrice());
            } else {
                setModalShow(true);
            }
        }
    };

    const handleRemoveItem = () => {
        onItemRemoved(item.id);
    };

    return (
        <>
            <ConfirmRemoveFromBasketModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                onRemove={() => onItemRemoved(item.id)}
            />
            <Row className="text-center align-items-center" id="basket-row">
                <Col xs={5} id="basket-item-name">
                    <Link
                        to={`/catalog/${item.id}`}
                        className="text-decoration-none text-black d-flex align-items-center"
                        onClick={() => window.scroll(0, 0)}
                    >
                        <Image
                            src={item.picture[0]}
                            alt={item.name}
                            className="basket-product-image"
                        />
                        <span className="ms-4">{item.name}</span>
                    </Link>
                </Col>
                <Col
                    xs={1}
                    className="white_theme d-flex justify-content-center"
                >
                    <div className="basket-storage">1</div>
                </Col>
                <Col xs={3} className="d-flex justify-content-center">
                    <span hidden id="basket-hidden-adaptivity">
                        Кількість:
                    </span>
                    <Container
                        className="d-flex justify-content-between p-2 border rounded-pill align-items-center"
                        style={{ minWidth: "80px", width: "7rem" }}
                    >
                        {isMinusHovered ? (
                            <DashCircleFill
                                className="basket-btn-quantity"
                                onMouseLeave={handleMinusMouseLeave}
                                onClick={() => amountChange("-")}
                            />
                        ) : (
                            <DashCircle
                                className="basket-btn-quantity"
                                onMouseEnter={handleMinusMouseEnter}
                            />
                        )}
                        <span>{amount}</span>
                        {isPlusHovered ? (
                            <PlusCircleFill
                                className="basket-btn-quantity"
                                onMouseLeave={handlePlusMouseLeave}
                                onClick={() => amountChange("+")}
                            />
                        ) : (
                            <PlusCircle
                                className="basket-btn-quantity"
                                onMouseEnter={handlePlusMouseEnter}
                            />
                        )}
                    </Container>
                </Col>
                <div
                    hidden
                    id="basket-hidden-adaptivity"
                    className="white_theme mb-2"
                >
                    <span className="text-black">Склад:</span>
                    <div className="basket-storage ms-3">1</div>
                </div>
                <Col xs={2}>
                    <div className="d-flex p-0 m-0 justify-content-center align-items-center">
                        <span hidden id="basket-hidden-adaptivity">
                            Всього:
                        </span>
                        <h5 className="m-0">{item.newPrice * amount} ₴</h5>
                    </div>

                    <span
                        onClick={()=>{setModalShow(true)}}
                        className="text-secondary"
                        style={{ borderBottom: "dashed grey 1px", paddingTop:'7px' }}
                        id="basket-hidden-adaptivity"
                        hidden
                    >
                        Видалити товар
                    </span>
                </Col>
                <Col className="d-flex justify-content-center">
                    <XCircle
                        className="basket-close-btn"
                        onClick={handleRemoveItem}
                    />
                </Col>
            </Row>
            <div className="basket-delimiter" />
        </>
    );
};

export default ItemCard;
