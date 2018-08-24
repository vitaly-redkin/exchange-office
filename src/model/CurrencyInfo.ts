/**
 * Class to contain currency information (code, exchange rates, amount in stock).
 */

export class CurrencyInfo {
  /**
   * Constructor.
   * 
   * @param currency Currency code
   * @param buyRate Rate of exchange we use to buy the currency
   * @param sellRate Rate of exchange we use to sell the currency
   * @param amount Amount of the currency we have in stock
   */
  constructor(
    public readonly currency: string,
    public readonly buyRate: number,
    public readonly sellRate: number,
    public readonly amount: number
  ) {
  }
}
