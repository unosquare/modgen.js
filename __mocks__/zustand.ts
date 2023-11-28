/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// __mocks__/zustand.ts
// __mocks__/zustand.ts
import * as zustand from 'zustand';
import { afterEach, jest } from '@jest/globals';
import { act } from '@testing-library/react';

const { create: actualCreate, createStore: actualCreateStore } = jest.requireActual<typeof zustand>('zustand');

// a variable to hold reset functions for all stores declared in the app
export const storeResetFns = new Set<() => void>();

const createUncurried = <T>(stateCreator: zustand.StateCreator<T>) => {
    const store = actualCreate(stateCreator);
    const initialState = store.getState();
    storeResetFns.add(() => {
        store.setState(initialState, true);
    });
    return store;
};

// when creating a store, we get its initial state, create a reset function and add it in the set
export const create = (<T>(stateCreator: zustand.StateCreator<T>) => {
    console.log('zustand create mock');

    // to support curried version of create
    return typeof stateCreator === 'function' ? createUncurried(stateCreator) : createUncurried;
}) as typeof zustand.create;

const createStoreUncurried = <T>(stateCreator: zustand.StateCreator<T>) => {
    const store = actualCreateStore(stateCreator);
    const initialState = store.getState();
    storeResetFns.add(() => {
        store.setState(initialState, true);
    });
    return store;
};

// when creating a store, we get its initial state, create a reset function and add it in the set
export const createStore = (<T>(stateCreator: zustand.StateCreator<T>) => {
    console.log('zustand createStore mock');

    // to support curried version of createStore
    return typeof stateCreator === 'function' ? createStoreUncurried(stateCreator) : createStoreUncurried;
}) as typeof zustand.createStore;

// reset all stores after each test run
afterEach(() => {
    act(() => {
        storeResetFns.forEach((resetFn) => {
            resetFn();
        });
    });
});
