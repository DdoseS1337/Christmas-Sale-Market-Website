import { Link } from "react-router-dom";
import HeaderLogo from "./HeaderLogo";
import { BREAKPOINTS } from "../../common";

const HeaderLogoContainer = () => {
	return (
		<div className="d-flex align-items-center h-100 pe-5">
			<Link to="/" className="link-settings">
				<HeaderLogo minWidth={BREAKPOINTS.TABLET.HEADER.LOGO}/>
			</Link>
		</div>
	);
};

export default HeaderLogoContainer;
