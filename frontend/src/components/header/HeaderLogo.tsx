import { useMediaQuery } from "react-responsive";
import { BREAKPOINTS } from "../../common";

const HeaderLogo = () => {
    const isTablet = useMediaQuery({
        minWidth: BREAKPOINTS.TABLET.HEADER.LOGO,
    });

    return (
        <div className="d-flex">
            <div className="logo-icon me-2"></div>
            {isTablet && (
                <h2
                    className="christmas-text"
                    style={{ margin: 0, padding: 0 }}
                >
                    Christmas Market
                </h2>
            )}
        </div>
    );
};

export default HeaderLogo;
