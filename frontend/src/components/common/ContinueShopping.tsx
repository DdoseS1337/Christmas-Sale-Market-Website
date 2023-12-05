import { Alert, Button } from "react-bootstrap";
import IContinueShopping from "../../interfaces/ContinueShopping";
import { Link } from "react-router-dom";
import { ArrowLeft } from "react-bootstrap-icons";
import "../../styles/components/adaptivity/continue-shopping-adaptivity.css";

const ContinueShopping = ({ show, onHide }: IContinueShopping) => {
    return (
        <Alert
            show={show}
            variant="success"
            className="position-fixed text-success z-3"
            style={{ right: 10, top: 15 }}
        >
            <Alert.Heading>Ви успішно додали товар до кошику!</Alert.Heading>
            <p>
                Бажаєте продовжити шопінг чи перейти до оформлення замовлення?
            </p>
            <hr />
            <div className="d-flex justify-content-between">
                <Button onClick={onHide} variant="outline-success">
                    <span id="continue-shopping-adaptivity-hide">
                        Продовжити шопінг
                    </span>
                    <span
                        id="continue-shopping-adaptivity-show"
                        className="d-none"
                    >
                        Продовжити
                    </span>
                    <ArrowLeft
                        size={20}
                        id="continue-shopping-adaptivity-arrow"
                        className="d-none"
                    />
                </Button>
                <Link
                    to={"/basket"}
                    className="btn btn-success"
                    onClick={() => window.scrollTo(0, 0)}
                >
                    Оформити замовлення
                </Link>
            </div>
        </Alert>
    );
};

export default ContinueShopping;
