/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { Dispatch, SetStateAction, useState } from 'react';
import { ShotsTypes, userInputsArr } from '../../store/inputStore';

interface toolBarInter {
    isLoading: boolean;
    send: (examples: ShotsTypes[], userInputs: string) => Promise<void>;
    changeModeUp: Dispatch<SetStateAction<boolean>>;
    modeUp: boolean;
}

export const ToolBar = ({ isLoading, send, changeModeUp, modeUp }: toolBarInter) => {
    const [
        updateUserInputArr,
        userInput,
        updateUserInput,
        userResults,
        updateUserResults,
        examples,
        deleteUserInputArr,
        loadDefaultExample,
    ] = userInputsArr((state) => [
        state.updateUserInputArr,
        state.userInputs,
        state.updateUserInput,
        state.userResults,
        state.updateUserResults,
        state.examples,
        state.deleteUserInputArr,
        state.loadDefaultExample,
    ]);

    const [mode, useMode] = useState(true);

    const buttonClassName = isLoading ? ' text-gray-400' : ' hover:bg-slate-600';

    const disabledSendRequest = !(
        (examples.length >= 1 && userInput !== '' && !isLoading) ||
        (modeUp && userInput !== '')
    );
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

    const onModeClick = (bol: boolean) => {
        useMode(bol);
    };

    return (
        <div className=' flex flex-row basis-1/12 justify-between grow'>
            <div className='flex flex-row gap-3 ml-10'>
                {mode ? (
                    <>
                        <button
                            type='button'
                            className={`px-3 rounded ${buttonClassName}`}
                            onClick={loadDefaultExample}
                            disabled={isLoading}
                        >
                            Load example
                        </button>
                        <button
                            type='button'
                            className={`px-3 rounded ${buttonClassName}`}
                            onClick={() => clickedAdd()}
                            disabled={isLoading}
                        >
                            Add example
                        </button>
                    </>
                ) : (
                    <button
                        onClick={onClickHandler}
                        type='button'
                        className={`px-3 mr-[141px] rounded ${classNameForSend}`}
                        disabled={disabledSendRequest}
                    >
                        Send request
                    </button>
                )}

                <div className='flex flex-col gap-3 items-center'>
                    <h4>Input mode</h4>
                    <div className='flex flex-row gap-4'>
                        <button
                            className={`px-3 rounded ${
                                mode && !modeUp ? ' bg-yellow-200 text-black ' : ''
                            } hover:bg-yellow-100 hover:text-black`}
                            type='button'
                            onClick={() => {
                                onModeClick(true);
                                changeModeUp(false);
                            }}
                            disabled={isLoading}
                        >
                            Example
                        </button>
                        <button
                            className={`px-3 rounded ${
                                !mode && !modeUp ? ' bg-blue-200 text-black ' : ''
                            } hover:bg-blue-100 hover:text-black`}
                            type='button'
                            onClick={() => {
                                onModeClick(false);
                                changeModeUp(false);
                            }}
                            disabled={isLoading}
                        >
                            Request
                        </button>
                        <button
                            className={`px-3 rounded ${
                                !mode && modeUp ? ' bg-pink-200 text-black ' : ''
                            } hover:bg-pink-100 hover:text-black`}
                            type='button'
                            onClick={() => {
                                onModeClick(false);
                                changeModeUp(true);
                            }}
                            disabled={isLoading}
                        >
                            Review
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
