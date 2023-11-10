/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from 'react';
import { ShotsTypes, userInputsArr } from '../../store/inputStore';

interface toolBarInter {
    isLoading: boolean;
    send: (examples: ShotsTypes[], userInputs: string) => Promise<void>;
}

export const ToolBar = ({ isLoading, send }: toolBarInter) => {
    const [
        updateUserInputArr,
        userInput,
        updateUserInput,
        userResults,
        updateUserResults,
        examples,
        deleteUserInputArr,
    ] = userInputsArr((state) => [
        state.updateUserInputArr,
        state.userInputs,
        state.updateUserInput,
        state.userResults,
        state.updateUserResults,
        state.examples,
        state.deleteUserInputArr,
    ]);

    const [mode, useMode] = useState(true);

    const buttonClassName = isLoading ? ' text-gray-400' : ' hover:bg-slate-600';

    const disabledSendRequest = !(examples.length >= 1 && userInput !== '' && !isLoading);
    const classNameForSend = disabledSendRequest ? ' text-gray-400' : ' hover:bg-yellow-800';
    const classNameForButton = isLoading ? ' text-gray-400' : ' hover:bg-red-900';

    const clickedAdd = () => {
        if (userInput.trim() !== '' && userResults.trim() !== '') {
            updateUserInputArr({ input: userInput, result: userResults });
            updateUserInput('');
            updateUserResults('');
        }
    };

    const handleDeleteAll = () => {
        deleteUserInputArr();
        updateUserInput('');
        updateUserResults('');
    };

    const onClickHandler = async () => {
        await send(examples, userInput);
    };

    const useModeOnExample = () => {
        useMode(true);
    };
    const useModeOnRequest = () => {
        useMode(false);
    };

    return (
        <div className=' flex flex-row basis-1/12 justify-between grow'>
            <div className='flex flex-row gap-3 ml-28'>
                {mode ? (
                    <button
                        type='button'
                        className={`px-3 rounded ${buttonClassName}`}
                        onClick={() => clickedAdd()}
                        disabled={isLoading}
                    >
                        Add example
                    </button>
                ) : (
                    <button
                        onClick={onClickHandler}
                        type='button'
                        className={`px-3 rounded ${classNameForSend}`}
                        disabled={disabledSendRequest}
                    >
                        Send request
                    </button>
                )}

                <div className='flex flex-col gap-3 items-center'>
                    <h4>Input mode</h4>
                    <div className='flex flex-row gap-4'>
                        <button
                            className='px-3 rounded hover:bg-yellow-100 hover:text-black'
                            type='button'
                            onClick={useModeOnExample}
                            disabled={isLoading}
                        >
                            Example
                        </button>
                        <button
                            className='px-3 rounded hover:bg-blue-200 hover:text-black'
                            type='button'
                            onClick={useModeOnRequest}
                            disabled={isLoading}
                        >
                            Request
                        </button>
                    </div>
                </div>
            </div>

            <button
                type='button'
                className={`px-3 rounded ${classNameForButton}`}
                onClick={handleDeleteAll}
                disabled={isLoading}
            >
                Delete everything
            </button>
        </div>
    );
};

export default ToolBar;
