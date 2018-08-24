/**
 * Settings class.
 */

export class Settings {
  /**
   * Constructor.
   * 
   * @param baseCurrency Base currency code
   * @param tradedCurrencies List of code for currencies with trade 
   * @param commissionPct Percent of the commission applied to the base currency amount
   * @param surcharge Fixed amount to add to the commission
   * @param minCommission Minimal commission amount to charge
   * @param marginPct Percent we use to calculate the margin between buying and selling rates
   * @param rateRefreshInterval Number of seconds to call an external API to refresh the currency rates
   */
  constructor(
    public readonly baseCurrency: string,
    public readonly tradedCurrencies: string[],
    public readonly commissionPct: number,
    public readonly surcharge: number,
    public readonly minCommission: number,
    public readonly marginPct: number,
    public readonly rateRefreshInterval: number
  ) {
  }
}
