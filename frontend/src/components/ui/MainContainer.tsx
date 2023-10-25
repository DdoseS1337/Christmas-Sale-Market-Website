import { Container } from "react-bootstrap";
import ScrollButton from "../main/ScrollButton";
import "../../styles/components/scrollButton.css";
import MediaQuery from "react-responsive";

interface Props {
    children: React.ReactNode;
}

const MainContainer = (prop: Props) => {
    return (
        <Container fluid className="p-0 pt-5 pb-5 position-relative">
            <MediaQuery minWidth={1224}>
                <img
                    src="/images/pictures/santa-chimney.png"
                    alt="santa-chimney"
                    className="position-absolute bottom-0 ms-4"
                    style={{ width: "14rem", pointerEvents: "none" }}
                />
            </MediaQuery>

            <ScrollButton />
            {prop.children}
        </Container>
    );
};

export default MainContainer;
