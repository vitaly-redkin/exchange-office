/**
 * The Redux store stuff for the settings state.
 */

import { Reducer } from 'redux';
import { AppThunkAction } from '.';
import { Settings } from '../model/Settings';
import { defaultSettings } from '../defaults/defaults';

/**
 * Interface for the settings state.
 */
export interface ISettingsState {
  settings: Settings;
}

/**
 * Initial settings state.
 */
export const initialState: ISettingsState = {
  settings: defaultSettings,
};

/**
 * Enumeration for the action type strings.
 */
export enum ActionTypeEnum {
  SettingsUpdate = '@@SETTINGS/UPDATE',
}

// -----------------
// ACTIONS

/**
 * Interface for the SettingsUpdate action.
 */
interface ISettingsUpdateAction {
  // tslint:disable
  type: ActionTypeEnum.SettingsUpdate;
  // tslint:enable
  newSettings: Settings;
}

/**
 * Declare a 'discriminated union' type. This guarantees that all references
 * to 'type' properties contain one of the declared type strings
 * (and not any other arbitrary string).
 */
export type KnownAction = ISettingsUpdateAction;

/**
 * ACTION CREATORS.
 * These are functions exposed to UI components that will trigger a state transition.
 */
export const actionCreators = {
  updateSettings: (newSettings: Settings): AppThunkAction <KnownAction> =>
      (dispatch: (action: KnownAction) => void): void => {
    dispatch({ type: ActionTypeEnum.SettingsUpdate, newSettings });
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
export const reducer: Reducer<ISettingsState> =
  (state: ISettingsState, incomingAction: KnownAction): ISettingsState => {
  switch (incomingAction.type) {
    case ActionTypeEnum.SettingsUpdate:
    {
      return {...state, settings: incomingAction.newSettings};
    }
    default:
      // Do nothing - the final return will work
  }

  // For unrecognized actions (or in cases where actions have no effect), must return the existing state
  //  (or default initial state if none was supplied)
  return state || initialState;
};
