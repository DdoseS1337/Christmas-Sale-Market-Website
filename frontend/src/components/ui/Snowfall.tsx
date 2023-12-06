import MediaQuery from "react-responsive";

const Snowfall = () => {
    return (
        <MediaQuery minWidth={1094}>
            <div className="snow_wrap">
                <div className="snow"></div>
            </div>
        </MediaQuery>
    );
};

export default Snowfall;
