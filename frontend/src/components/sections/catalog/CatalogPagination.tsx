import { useSearchParams } from "react-router-dom";
import { IFilterPagination } from "../../../interfaces/FilterPage";
import RoundedButton from "../../common/RoundedButton";
import { ArrowLeft, ArrowRight } from "react-bootstrap-icons";

interface IProps {
	pagination?: IFilterPagination;
}

export const CatalogPagination = ({ pagination }: IProps) => {
	const [, setQueryParameters] = useSearchParams();

	return (
		<div className="catalog__pagination">
			{pagination?.page != null && pagination?.page > 2 && (
				<RoundedButton
					backgroundIsGray
					isCircle
					onClick={() => changePage(1)}
				>
					1
				</RoundedButton>
			)}
			{pagination?.page != null && pagination?.page > 1 && (
				<RoundedButton
					isCircle
					backgroundIsGray
					onClick={() => changePage(pagination?.page - 1)}
				>
					<ArrowLeft />
				</RoundedButton>
			)}

			<RoundedButton isCircle inactive>
				{pagination?.page}
			</RoundedButton>

			{pagination?.page != null &&
				pagination?.page < pagination?.numberOfPages && (
					<RoundedButton
						isCircle
						backgroundIsGray
						onClick={() => changePage(pagination?.page + 1)}
					>
						<ArrowRight />
					</RoundedButton>
				)}
			{pagination?.page != null &&
				pagination?.page < pagination?.numberOfPages - 1 && (
					<RoundedButton
						backgroundIsGray
						isCircle
						onClick={() => changePage(pagination?.numberOfPages)}
					>
						{pagination?.numberOfPages}
					</RoundedButton>
				)}
		</div>
	);

	function changePage(page: number) {
		setQueryParameters((oldParameters) => {
			oldParameters.set("page", page.toString());
			return oldParameters;
		});
		window.scrollTo(0, 0);
	}
};
