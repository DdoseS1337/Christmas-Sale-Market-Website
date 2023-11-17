import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import {
	ValidatorContextOptions,
	ValidatorProvider,
} from "react-class-validator";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/primereact.css"; // core css
import "./styles/theme.css"; // theme
import "./styles/index.css"; // global css
import { classNames } from "primereact/utils";
import { DropdownPassThroughMethodOptions } from "primereact/dropdown";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

const validationContextOptions: ValidatorContextOptions = {
	onErrorMessage: (error) =>
		Object.keys(error.constraints!).map((key) => error.constraints![key]),
};

root.render(
	<PrimeReactProvider
		value={{
			ripple: true,
			pt: {
				button: {
					root: {
						className: classNames(
							"py-2 px-4",
							"outline-none outline-offset-0 border-0"
						),
					},
					label: {
						className: classNames("my-1"),
					},
				},
				dropdown: {
					root: ({ props }: DropdownPassThroughMethodOptions) => ({
						className: classNames("opacity-100", {
							"bg-slate-300": props.disabled,
						}),
					}),
					list: {
						className: classNames("p-2 m-0"),
					},
					item: {
						className: classNames("mb-0"),
					},
					filterInput: {
						className: classNames("w-full"),
					},
					header: {
						className: classNames("p-2 pb-0"),
					},
				},
				galleria: {
					thumbnailContainer: {
						className: classNames("bg-transparent"),
					},
				},
			},
		}}
	>
		<ValidatorProvider options={validationContextOptions}>
			<React.StrictMode>
				<App />
			</React.StrictMode>
		</ValidatorProvider>
	</PrimeReactProvider>
);
