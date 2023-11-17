import { Skeleton } from "primereact/skeleton";
import { ICity } from "../../../interfaces/NovaPoshta";

export const GetCityDropdownItem = (city: ICity, isLoaded: boolean) => {
	if (isLoaded)
		return (
			<Skeleton
				width={5 + Math.floor(Math.random() * 3) + "rem"}
				borderRadius="16px"
			/>
		);
	return <CityDropdownItem {...city} />;
};

export const CityDropdownItem = (city: ICity) => {
	return <span>{city!.name}</span>;
};
