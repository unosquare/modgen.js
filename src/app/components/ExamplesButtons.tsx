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
    <div id='examples-btns' className='flex flex-row basis-1/12'>
        <button
            type='button'
            className={`rounded ${classNameForButton}`}
            onClick={handleDeleteAll}
            disabled={isLoading}
        >
            Delete all
        </button>
        <button onClick={onClickHandler} type='button' className={`rounded ${classNameForSend}`} disabled={disabled}>
            Send
        </button>
    </div>
);
export default ButtonsEx;
