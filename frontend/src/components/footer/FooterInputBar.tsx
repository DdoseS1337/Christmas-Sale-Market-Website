import RoundedButton from "../common/RoundedButton";
import "../../styles/components/footer/rounded-input.css";
import "../../styles/components/footer/search-input.css";
import { classNames } from "primereact/utils";

interface IProps {
	className?: string;
}

const FooterInputBar = ({ className }: IProps) => {
	return (
		<div className={classNames("footer-input-bar", className)}>
			<input
				className="rounded-input"
				placeholder="Ваша пошта"
				type="email"
			/>
			<RoundedButton>Підписатися</RoundedButton>
		</div>
	);
};

export default FooterInputBar;
