import { Modal } from "react-bootstrap";
import ConfirmDeleteFromBasket from "../../interfaces/ConfirmDeleteFromBasket";
import { CartX } from "react-bootstrap-icons";
import RoundedButton from "./RoundedButton";

const ConfirmRemoveFromBasketModal = ({
    show,
    onHide,
    onRemove,
}: ConfirmDeleteFromBasket) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Body className="text-center">
                <CartX size={100} color="#c93f4f" />
                <p className="mt-4 fw-bold">
                    Ви дійсно хочете видалити товар з кошика?
                </p>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-around">
                <RoundedButton onClick={onRemove} backgroundIsGray>
                    Так
                </RoundedButton>
                <RoundedButton onClick={onHide}>Ні</RoundedButton>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmRemoveFromBasketModal;
