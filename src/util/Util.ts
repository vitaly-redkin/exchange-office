/**
 * Some application-wide utility functions.
 */

import { ChangeEvent } from 'react';

/**
 * Converts event target alue to float.
 * 
 * @param e Event arguments to extract the value from
 */
export function asFloat(e: ChangeEvent<HTMLInputElement>) {
    return parseFloat(e.target.value.trim());
}

/**
 * Converts event target alue to int.
 * 
 * @param e Event arguments to extract the value from
 */
export function asInt(e: ChangeEvent<HTMLInputElement>) {
    return parseInt(e.target.value.trim(), 10);
}

/**
 * Formats exchange rate for UI.
 * 
 * @param value Value to format
 */
export function formatRate(value: number) {
    return Intl.NumberFormat(
        'en-US', 
        { style: 'decimal', minimumFractionDigits: 4, maximumFractionDigits: 4 })
        .format(value);
}

/**
 * Formats amount for UI.
 * 
 * @param value Value to format
 */
export function formatAmount(value: number) {
    return Intl.NumberFormat(
        'en-US', 
        { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 })
        .format(value);
}

/**
 * Formats percent for UI.
 * 
 * @param value Value to format
 */
export function formatPct(value: number) {
    return Intl.NumberFormat(
        'en-US', 
        { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 })
        .format(value);
}
