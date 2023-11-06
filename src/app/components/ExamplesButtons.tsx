/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';

interface interfaceButtonsEx {
    classNameForButton: string;
    classNameForSend: string;
    handleDeleteAll: () => void;
    isLoading: boolean;
    disabled: boolean;
    onClickHandler: () => Promise<void> | void;
}

const ButtonsEx = ({
    classNameForButton,
    classNameForSend,
    handleDeleteAll,
    isLoading,
    disabled,
    onClickHandler,
}: interfaceButtonsEx) => (
    <div id='examples-btns' className='flex flex-row justify-start flex-initial basis-1/12'>
        <button
            type='button'
            className={`flex-initial  py-2 px-2 rounded mr-5 ${classNameForButton}`}
            onClick={handleDeleteAll}
            disabled={isLoading}
        >
            Delete all
        </button>
        <button
            onClick={onClickHandler}
            type='button'
            className={`flex-initial py-2 px-2 rounded ${classNameForSend}`}
            disabled={disabled}
        >
            Send
        </button>
    </div>
);
export default ButtonsEx;
