import { Container } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <Container fluid className="justify-content-center text-center">
            <Image src="/images/pictures/pageNotFound.svg" fluid />
            <h2 className="mt-4">Упс! Сторінку не знайдено</h2>
            <h5 className="mt-3 text-secondary">
                Неправильно набрано адресу або такої сторінки на сайті більше не
                існує
            </h5>
            <Link to="/">
                <button className="mt-4 btn-red-theme p-2"> {/* ARROW BUTTON HERE*/}
                    Повернутись на головну
                </button>
            </Link>
        </Container>
    );
};

export default NotFoundPage;
