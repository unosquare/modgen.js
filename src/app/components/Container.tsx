interface ContainerTypes {
    className?: string;
    children: React.JSX.Element[] | React.JSX.Element;
}

const Container = ({ children, className }: ContainerTypes) => {
    const classesName = `${className} min-h-full`;
    return <div className={classesName}>{children}</div>;
};

Container.defaultProps = {
    className: '',
};

export default Container;
