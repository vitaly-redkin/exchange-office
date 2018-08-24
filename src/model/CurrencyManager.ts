/**
 * Module to contain all currency-related operations.
 */

import { CurrencyInfo } from './CurrencyInfo';

/**
 * Updates the given currency amount.
 * 
 * @param allCurrencies list of all CurrencyInfo objects to update
 * @param currency Code of the currency to upate
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
