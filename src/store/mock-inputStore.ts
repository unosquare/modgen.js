import { create } from 'zustand';

import { type ArrInterface, userInputsArrCreator } from './mock-store-creator';

export const useInputArrStore = create<ArrInterface>()(userInputsArrCreator);
