import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import lottie from "lottie-web";

interface NotFound {
    link: string;
    title: string;
    description: string;
    buttonTitle: string;
}

const AnimatedEmptyPage = (props: NotFound) => {
    const [isAnimationLoaded, setIsAnimationLoaded] = useState(false);

    useEffect(() => {
        const container = document.getElementById("lottie-container");

        if (container && !isAnimationLoaded) {
            container.innerHTML = "";
            const animationDiv = document.createElement("div");
            animationDiv.style.width = "60rem";
            animationDiv.style.marginTop = "-30px";
            container.appendChild(animationDiv);
            lottie.loadAnimation({
                container: animationDiv as Element,
                renderer: "canvas" as any,
                loop: true,
                autoplay: true,
                path: "/images/pictures/basket.json",
            });
            setIsAnimationLoaded(true);
        }
    }, [isAnimationLoaded]);

    return (
        <Container className="text-center">
            <Container
                fluid
                id="lottie-container"
                className="d-flex justify-content-center"
            />
            <h2 className="mt-3">{props.title}</h2>
            <h5 className="mt-3 text-secondary">{props.description}</h5>
            <Link to={props.link} className="link-settings">
                <button className="arrow-button mx-auto mt-4 arrow-button-red-theme">
                    <span className="arrow"></span>
                    {props.buttonTitle}
                </button>
            </Link>
        </Container>
    );
};

export default AnimatedEmptyPage;
