/**
 * A utility function that creates a number formatter using the Intl API to format a number with a fixed number of decimal places.
 * @function
 * @name numberFormatter
 * @returns {Intl.NumberFormat} The number formatter instance.
 * @example
 * // Returns "1,234.56"
 * numberFormatter.format(1234.56);
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat | Intl.NumberFormat documentation}
 */
export const numberFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
