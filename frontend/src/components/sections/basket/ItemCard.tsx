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
import { CartItem, CartService } from "../../../services/basketService";
import useHoverStates from "./AmountChangeHooks";

interface ItemCardProps {
    item: CartItem;
    onItemRemoved: (itemId: string) => void;
    onAmountChanged: (newAmount: number) => void;
}

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
            }
        }
    };

    const handleRemoveItem = () => {
        onItemRemoved(item.id);
    };

    return (
        <>
            <Row className="text-center align-items-center">
                <Col xs={4} className="d-flex align-items-center">
                    <Image
                        src={item.picture[0]}
                        alt={item.name}
                        className="basket-product-image"
                    />
                    <span className="ms-4">{item.name}</span>
                </Col>
                <Col
                    xs={2}
                    className="white_theme d-flex justify-content-center"
                >
                    <div className="basket-storage">1</div>
                </Col>
                <Col xs={3} className="d-flex justify-content-center">
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
                <Col xs={2}>
                    <h5>{item.newPrice * amount} ₴</h5>
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
