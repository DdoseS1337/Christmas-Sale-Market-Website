import { Dash, Plus } from "react-bootstrap-icons";

export const addToBasketIcon = (
    <>
        <Plus style={{ width: 25, height: 25 }} className="me-2" />
        <span style={{ whiteSpace: "nowrap" }}>Додати до кошику</span>
    </>
);
export const removeFromBasketIcon = (
    <>
        <Dash style={{ width: 25, height: 25 }} className="me-2" />
        <span style={{ whiteSpace: "nowrap" }}>Видалити з кошика</span>
    </>
);