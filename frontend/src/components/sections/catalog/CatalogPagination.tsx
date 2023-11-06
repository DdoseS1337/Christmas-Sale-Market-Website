import { SetURLSearchParams } from "react-router-dom";
import { IFilterPagination } from "../../../interfaces/FilterPage";
import RoundedButton from "../../common/RoundedButton";

interface IProps {
	setQueryParameters: SetURLSearchParams;
	pagination?: IFilterPagination;
}

export const CatalogPagination = ({
	setQueryParameters,
	pagination,
}: IProps) => {
	const changePage = (page: number) => {
		setQueryParameters((oldParameters) => {
			oldParameters.set("page", page.toString());
			return oldParameters;
		});
	};

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
					backgroundIsGray
					onClick={() => changePage(pagination?.page - 1)}
				>
					prev
				</RoundedButton>
			)}

			<RoundedButton isCircle>{pagination?.page}</RoundedButton>

			{pagination?.page != null &&
				pagination?.page < pagination?.numberOfPages && (
					<RoundedButton
						backgroundIsGray
						onClick={() => changePage(pagination?.page + 1)}
					>
						next
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
};
