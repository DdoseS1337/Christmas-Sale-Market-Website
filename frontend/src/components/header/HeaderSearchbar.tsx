import { Form, InputGroup } from "react-bootstrap";
import { useFetchData } from "../../hooks/FetchDataHook";
import christmasTreeApi from "../../services/christmas-tree.api";
import { useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { DataView } from "primereact/dataview";
import classNames from "classnames";
import "../../styles/components/header/header.css";
import { useClickOutside } from "primereact/hooks";
import { FILTER_CONST } from "../../common";
import { IOffer } from "../../interfaces/Offer";

const HeaderSearchBar = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [queryParameters, setQueryParameters] = useSearchParams();

	const [searchingName, setSearchingName] = useState<string>(
		queryParameters.get(FILTER_CONST.QUERY_PARAMETERS.SEARCH) ?? ""
	);

	const { items: filteredOffers } = useFetchData({
		callApi: () => christmasTreeApi.getOffersByIncludeName(searchingName),
		dependencies: [searchingName],
	});

	const [searchDropdownVisibility, setSearchDropdownVisibility] =
		useState<boolean>();
	const searchRef = useRef<HTMLDivElement>(null);

	useClickOutside(searchRef, () => {
		setSearchDropdownVisibility(false);
	});

	return (
		<div ref={searchRef}>
			<InputGroup
				className="searchbar__input-group"
				onClick={() => setSearchDropdownVisibility(true)}
			>
				<InputGroup.Text className="search_loop">
					<search className="text-light" />
				</InputGroup.Text>

				<Form.Control
					placeholder="Я шукаю..."
					aria-label="Search"
					aria-describedby="basic-addon2"
					className="searchbar__input red_theme bold_text search-form"
					value={searchingName}
					onChange={(e) =>
						setSearchingName(e.target.value.toLowerCase())
					}
					onKeyDown={(e) =>
						e.key === "Enter" && search(searchingName)
					}
				/>

				<button
					className="bold_text white_theme btn_white_theme btn_sizer"
					onClick={() => search(searchingName)}
				>
					Знайти
				</button>
			</InputGroup>
			<div
				className={classNames("searchbar__dropdown", {
					"searchbar__dropdown--opened":
						searchingName.length != 0 && searchDropdownVisibility,
				})}
			>
				<DataView
					value={filteredOffers}
					itemTemplate={(item: IOffer) => (
						<span
							className="searchbar__searched-name"
							onClick={() => search(item.name)}
						>
							{item.name}
						</span>
					)}
					pt={{
						grid: {
							className: "searchbar__offers",
						},
						emptyMessage: {
							className: "searchbar__empty-message",
						},
					}}
					emptyMessage="0 результатів"
				/>
			</div>
		</div>
	);

	async function search(searchingName: string) {
		setSearchingName(searchingName);
		setSearchDropdownVisibility(false);

		const filteredOffers = await christmasTreeApi.getOffersByIncludeName(
			searchingName
		);

		if (filteredOffers?.length === 1) {
			navigate(`/catalog/${filteredOffers[0].id}`);
			return;
		}

		if (location.pathname === "/catalog") {
			setQueryParameters((old) => {
				old.set("search", searchingName);
				return old;
			});
		} else {
			navigate(`/catalog?search=${searchingName}`);
		}
	}
};

export default HeaderSearchBar;
