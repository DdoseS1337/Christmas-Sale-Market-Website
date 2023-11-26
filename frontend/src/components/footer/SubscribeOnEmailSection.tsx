import "../../styles/components/footer/email-section.css";
import FooterInputBar from "./FooterInputBar";
import { Section } from "../common/Section";

const SubscribeOnEmailSection = () => {
	return (
		<Section
			className="email-section"
			unPadded
			pt={{ inner: { className: "email-section__container" } }}
		>
			<div>
				<h3>Підпишіться на оновлення</h3>
				<p className="email-section__description">
					Отримуйте унікальні пропозиції та акції.
				</p>
			</div>
			<div>
				<FooterInputBar className="email-section__input" />
			</div>
			<img
				className="email-section__tree-icon"
				src="/images/pictures/tree-presents.png"
				alt="christmas-tree-with-presents"
			/>
		</Section>
	);
};

export default SubscribeOnEmailSection;
