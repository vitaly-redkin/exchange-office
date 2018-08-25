/**
 * The Redux store stuff for the currency state.
 */

import { Reducer } from 'redux';
import { AppThunkAction } from '.';
import { CurrencyInfo } from '../model/CurrencyInfo';
import * as CurrencyManager from '../model/CurrencyManager';
import { defaultCurrencies } from '../defaults/defaults';

/**
 * Interface for the currency info state.
 */
export interface ICurrencyState {
  currencies: CurrencyInfo[];
  lastUpdatedAt: string;
  lastError: string;
}

/**
 * Initial currency info state.
 */
export const initialState: ICurrencyState = {
  currencies: defaultCurrencies,
  lastError: '',
  lastUpdatedAt: ''
};

/**
 * Enumeration for the action type strings.
 */
export enum ActionTypeEnum {
  CurrencyUpdateAmount = '@@CURRENCY/UPDATE_AMOUNT',
  CurrencyUpdateExchangeRates = '@@URRENCY/UPDATE_EXCHANGE_RATES',
  ErrorSet = '@@ERROR/SET',
}

// -----------------
// ACTIONS

/**
 * Interface for the CurrencyUpdateAmount action.
 */
interface ICurrencyUpdateAmountAction {
  // tslint:disable
  type: ActionTypeEnum.CurrencyUpdateAmount;
  // tslint:enable
  currency: string;
  delta: number;
}

/**
 * Interface for the CurrencyUpdateExchangeRates action.
 */
interface ICurrencyUpdateExchangeRatesAction {
  // tslint:disable
  type: ActionTypeEnum.CurrencyUpdateExchangeRates;
  // tslint:enable
  updatedRates: CurrencyInfo[];
}

/**
 * Interface for the SetErrorAction
 */
interface IErrorSetAction {
  // tslint:disable
  type: ActionTypeEnum.ErrorSet;
  // tslint:enable
  error: string;
}

/**
 * Declare a 'discriminated union' type. This guarantees that all references
 * to 'type' properties contain one of the declared type strings
 * (and not any other arbitrary string).
 */
export type KnownAction = 
  ICurrencyUpdateAmountAction | ICurrencyUpdateExchangeRatesAction | IErrorSetAction;

/**
 * ACTION CREATORS.
 * These are functions exposed to UI components that will trigger a state transition.
 */
export const actionCreators = {
  updateCurrencyAmount: (currency: string, delta: number): AppThunkAction <KnownAction> =>
      (dispatch: (action: KnownAction) => void): void => {
    dispatch({ type: ActionTypeEnum.CurrencyUpdateAmount, currency, delta });
  },

  updateExchangeRates: (updatedRates: CurrencyInfo[]): AppThunkAction<KnownAction> =>
      (dispatch: (action: KnownAction) => void): void => {
    dispatch({ type: ActionTypeEnum.CurrencyUpdateExchangeRates, updatedRates });
  },

  setError: (error: string): AppThunkAction<KnownAction> =>
      (dispatch: (action: KnownAction) => void): void => {
    dispatch({ type: ActionTypeEnum.ErrorSet, error });
  },
};

/**
 * REDUCER - For a given state and action, returns the new state.
 *
 * @param state Current application state
 * @param incomingAction Dispatched Redux action
 *
 * @returns New application state
 */
export const reducer: Reducer<ICurrencyState> =
  (state: ICurrencyState, incomingAction: KnownAction): ICurrencyState => {
  switch (incomingAction.type) {
    case ActionTypeEnum.CurrencyUpdateAmount:
    {
      const action: ICurrencyUpdateAmountAction = incomingAction;
      const newCurrencies = CurrencyManager.updateAmount(
        state.currencies, action.currency, action.delta);

      return {...state, currencies: newCurrencies};
    }
    case ActionTypeEnum.CurrencyUpdateExchangeRates:
    {
      const action: ICurrencyUpdateExchangeRatesAction = incomingAction;
      const newCurrencies = CurrencyManager.updateExchangeRates(
        state.currencies, action.updatedRates);
      const now: string = new Date().toLocaleString('en-US');

      return {...state, currencies: newCurrencies, lastUpdatedAt: now, lastError: ''};
    }
    case ActionTypeEnum.ErrorSet:
    {
      const action: IErrorSetAction = incomingAction;

      return {...state, lastError: action.error};
    }
    default:
      // Do nothing - the final return will work
  }

  // For unrecognized actions (or in cases where actions have no effect), must return the existing state
  //  (or default initial state if none was supplied)
  return state || initialState;
};
