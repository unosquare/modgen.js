interface ContainerTypes{
    className?: string;
    children: React.ReactNode
}

function  Container({ children, className }:ContainerTypes){
    const classesName = `${className} flex-auto flex flex-col flex-initial 
                                    bg-gray-400 px-5 py-3 h-3/4
                                    rounded-lg bg-opacity-20 
                                    backdrop-blur-lg
                                    hover:shadow-lg hover:shadow-blue-950`;
    return (
        <div className={classesName}>
            {children}
        </div>
    )
}

export default Container;