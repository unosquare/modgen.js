import { twMerge } from 'tailwind-merge';

interface ContainerTypes {
    className?: string;
    children: React.JSX.Element[] | React.JSX.Element;
}

const Container = ({ children, className }: ContainerTypes) => {
    const classesName = twMerge('min-h-full', className);
    return <div className={classesName}>{children}</div>;
};

Container.defaultProps = {
    className: '',
};

export default Container;
