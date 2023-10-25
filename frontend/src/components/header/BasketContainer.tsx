import { Link } from "react-router-dom";
import Basket from "./Basket";

const BasketContainer = () => {
	return (
		<Link to="/basket" className="link-settings d-inline-flex">
			<Basket />
		</Link>
	);
};

export default BasketContainer;
