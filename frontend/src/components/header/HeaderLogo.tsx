import MediaQuery from "react-responsive";

const HeaderLogo = ({ minWidth }: { minWidth?: number } = {}) => {
    return (
        <div className="d-flex align-items-center">
            <div className="logo-icon me-2" />
            {minWidth ? (
                <MediaQuery minWidth={minWidth}>
                    <h2
                        className="christmas-text"
                        style={{ margin: 0, padding: 0 }}
                    >
                        Christmas Market
                    </h2>
                </MediaQuery>
            ) : (
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
