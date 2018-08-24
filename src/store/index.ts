/**
 * The root file of the Redux store.
 */

import * as CurrencyHandler from './CurrencyHandler';
import * as SettingsHandler from './SettingsHandler';

/**
 * Interface for the application state.
 */
export interface IApplicationState {
  currencies: CurrencyHandler.ICurrencyState;
  settings: SettingsHandler.ISettingsState;
}

/**
 * Inital application state.
 */
export const initialState: IApplicationState = {
  currencies: CurrencyHandler.initialState,
  settings: SettingsHandler.initialState
};

/**
 * Application reducers.
 */
export const reducers = {
  currencies: CurrencyHandler.reducer,
  settings: SettingsHandler.reducer
};

/**
 * This type can be used as a hint on action creators so that its 'dispatch' and
 * 'getState' params are correctly typed to match your store.
 */
export type AppThunkAction<TAction> = (
  dispatch: (action: TAction) => void,
  getState: () => IApplicationState) => void;
