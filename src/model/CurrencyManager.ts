/**
 * Module to contain all currency-related operations.
 */

import { CurrencyInfo } from './CurrencyInfo';
import { Settings } from './Settings';

/**
 * Updates the given currency amount.
 * 
 * @param allCurrencies list of all CurrencyInfo objects to update
 * @param currency Code of the currency to update
 * @param delta Amount to update the existing currency amount by
 * @returns New list with the CurrencyInfo objects
 */
export function updateAmount(
    allCurrencies: CurrencyInfo[], 
    currency: string, 
    delta: number
): CurrencyInfo[] {
    return allCurrencies.map(c => 
        (c.currency === currency ? {...c, amount: c.amount + delta} : c)
    );
}

/**
 * Updates the given currency amount.
 * 
 * @param allCurrencies list of all CurrencyInfo objects to update
 * @param newRates list of all CurrencyInfo ogjects with new rates
 * @returns New list with the CurrencyInfo objects
 */
export function updateExchangeRates(
    allCurrencies: CurrencyInfo[], 
    newRates: CurrencyInfo[] 
): CurrencyInfo[] {
    return allCurrencies.map(c => {
        const rates: CurrencyInfo | undefined = newRates.find(r => r.currency === c.currency);
        
        return (rates ? {...c, buyRate: rates.buyRate, sellRate: rates.sellRate} : c);
    });
}

/**
 * Finds CurrencyInfo object by the currency code.
 * 
 * @param allCurrencies list of all CurrencyInfo objects to search in
 * @param currency Code of the currency to search by
 */
export function getCurrencyInfo(
    allCurrencies: CurrencyInfo[], 
    currency: string
): CurrencyInfo | undefined {
    return allCurrencies.find(c => c.currency === currency);
}

/**
 * Imports fetched exchange rates into the application.
 * 
 * @param rates JSON objecs with fetched rates
 * @param currencies Application currencies
 * @param settings Application settings
 * @param storeActionCreator Redux action creator to call
 */
export function importFetchedExchangeRates(
    rates: IFetchedRates, 
    currencies: CurrencyInfo[],
    settings: Settings,
    storeActionCreator: Function
): void {
    const updatedRates: CurrencyInfo[] = currencies.map((c: CurrencyInfo): CurrencyInfo => {
        if (c.currency !== settings.baseCurrency && c.currency in rates.rates) {
            let {rate}: IFetchedRate = rates.rates[c.currency];
            rate = Math.round(10000 / rate) / 10000;
            let buyRate: number = applyMargin(rate, settings.marginPct, -1);
            let sellRate: number = applyMargin(rate, settings.marginPct, 1);

            // If new rates are the same as old ones add/subtract some random to make things look lively
            if (buyRate === c.buyRate && sellRate === c.sellRate) {
                rate *= (100 + (10 * Math.random() * Math.sign(0.5 - Math.random()))) / 100;
                buyRate = applyMargin(rate, settings.marginPct, -1);
                sellRate = applyMargin(rate, settings.marginPct, 1);
            }

            return {...c, buyRate: buyRate, sellRate: sellRate};
        } else {
            return c;
        }
    });
    storeActionCreator(updatedRates);
}

function applyMargin(rate: number, marginPct: number, direction: number) {
    return Math.round(rate * (1 + direction * marginPct / 200) * 10000) / 10000;
}

/**
 * Interface for the fetched JSON object.
 */
export interface IFetchedRates {
    rates: object;
}

/**
 * Interface for the rate in the fecthed JSON object.
 */
interface IFetchedRate {
    currency: string;
    rate: number;
}
