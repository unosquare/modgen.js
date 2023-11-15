import { userInputsArr } from '@/store/inputStore';
import Shots from './Shots';

// examples are built with one user input and result
const Examples = ({ modeUp }: { modeUp: boolean }) => {
    const [examples] = userInputsArr((state) => [state.examples]);

    const examplesClassName = modeUp ? 'opacity-50' : '';

    return (
        <div className={`flex flex-col h-full grow border border-gray-700`}>
            <h1 className='basis-[2%] ml-2'>Examples</h1>
            <div className={`basis-[98%] bg-white text-black overflow-y-auto grow ${examplesClassName}`}>
                <Shots examples={examples} />
            </div>
        </div>
    );
};

export default Examples;
