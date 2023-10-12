import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Basket from "./Basket";

const BasketContainer = () => {
	return (
		<Link to="/basket" className="link-settings d-flex justify-content-end">
			<Basket />
		</Link>
	);
};

export default BasketContainer;
