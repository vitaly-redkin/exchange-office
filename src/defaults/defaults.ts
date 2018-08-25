/**
 * Module to contain application defaults.
 */
import { CurrencyInfo } from '../model/CurrencyInfo';
import { Settings } from '../model/Settings';

/**
 * Default currency state.
 */
export const defaultCurrencies: CurrencyInfo[] = [
    {
        currency: 'USD',
        buyRate: 1,
        sellRate: 1,
        amount: 10000,
        warningThresholdAmount: 2500
    },
    {
        currency: 'EUR',
        buyRate: 1.14,
        sellRate: 1.15,
        amount: 1000,
        warningThresholdAmount: 250
    },
    {
        currency: 'GBP',
        buyRate: 1.3,
        sellRate: 1.35,
        amount: 1000,
        warningThresholdAmount: 250
    },
    {
        currency: 'CAD',
        buyRate: 0.8,
        sellRate: 0.9,
        amount: 1000,
        warningThresholdAmount: 250
    },
    {
        currency: 'AUD',
        buyRate: 0.85,
        sellRate: 0.95,
        amount: 1000,
        warningThresholdAmount: 250
    },
    {
        currency: 'CNY',
        buyRate: 6,
        sellRate: 7,
        amount: 1000,
        warningThresholdAmount: 250
    },
    {
        currency: 'SGD',
        buyRate: 0.65,
        sellRate: 0.75,
        amount: 1000,
        warningThresholdAmount: 250
    }
];

/**
 * Default settings.
 */
export const defaultSettings: Settings = {
    baseCurrency: 'USD',
    tradedCurrencies: ['EUR', 'GBP', 'CAD', 'AUD', 'CNY', 'SGD'],
    commissionPct: 2,
    surcharge: 1,
    minCommission: 3,
    marginPct: 10,
    rateRefreshInterval: 10
};
