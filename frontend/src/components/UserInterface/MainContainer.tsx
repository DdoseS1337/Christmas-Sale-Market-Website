interface Props {
    children: React.ReactNode;
}

function MainContainer(prop: Props) {
    return( <div>{prop.children}</div>)
}

export default MainContainer;
