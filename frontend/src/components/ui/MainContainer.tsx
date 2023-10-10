interface Props {
    children: React.ReactNode;
}

const MainContainer = (prop: Props) => {
    return <div>{prop.children}</div>;
};

export default MainContainer;
