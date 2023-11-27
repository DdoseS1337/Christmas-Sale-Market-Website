import { Container } from "react-bootstrap";
import ScrollButton from "../main/ScrollButton";
import "../../styles/components/scrollButton.css";
import MediaQuery from "react-responsive";

interface Props {
    children: React.ReactNode;
}

const MainContainer = (prop: Props) => {
    return (
        <Container fluid className="p-0 position-relative">
            <MediaQuery minWidth={432}>
                <ScrollButton />
            </MediaQuery>
            <MediaQuery minWidth={1698}>
                <img
                    src="/images/pictures/santa-chimney.png"
                    alt="santa-chimney"
                    className="position-absolute bottom-0 ms-4"
                    style={{ width: "14rem", pointerEvents: "none" }}
                />
            </MediaQuery>
            <div className="w-100 pt-5 pb-5">{prop.children}</div>
        </Container>
    );
};

export default MainContainer;
