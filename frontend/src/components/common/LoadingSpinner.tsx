import Spinner from "react-bootstrap/Spinner";

interface LoadingSpinnerProps {
    variant?: string;
}

const LoadingSpinner = ({ variant }: LoadingSpinnerProps) => {
    return (
        <div className="text-center">
            <Spinner
                animation="border"
                variant={variant}
                style={{ width: "6rem", height: "6rem" }}
            />
        </div>
    );
};

export default LoadingSpinner;
