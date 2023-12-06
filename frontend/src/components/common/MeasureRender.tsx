import { Component, ReactNode, useEffect } from "react";

interface IProps {
	name: string;
	children: ReactNode;
}

export const MeasureRender = ({ name, children }: IProps) => {
	useEffect(() => {
		window.performance.mark(`${name}MountEnd`);
		window.performance.measure(
			`${name}Mount`,
			`${name}MountStart`,
			`${name}MountEnd`
		);
	}, []);

	window.performance.mark(`${name}MountStart`);
	return <>{children}</>;
};
