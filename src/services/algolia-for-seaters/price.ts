export interface Price {

  /**
   * Facial price is the price that's printed on the face of the ticket
   * example: "10.00"
   */
  facialPrice: string;

  /**
   * Formatted facial price is formatted with currency according to the venue's country
   * example: "€10.00"
   */
  formattedFacialPrice: string;

  /**
   * Total facial price is the facial price plus the fees
   * example: "10.00"
   */
  totalFacialPrice: string;

  /**
   * Formatted total facial price is formatted with currency according to the venue's country
   * example: "€10.00"
   */
  formattedTotalFacialPrice: string;

  /**
   * Fee exc vat is the fee total without VAT
   * example: "1.50"
   */
  feeExcVat: string;

  /**
   * Formatted fee exc vat is formatted with currency according to the venue's country
   * example: "€1.50"
   */
  formattedFeeExcVat: string;

  /**
   * Fee vat is the VAT charged on top of the fee, depending on the venue's country
   * example: "0.32"
   */
  feeVat: string;

  /**
   * Formatted fee vat is formatted with currency according to the venue's country
   * example: "€0.32"
   */
  formattedFeeVat: string;

  /**
   * Fee is the total of fees (including VAT)
   * example: "1.82"
   */
  fee: string;

  /**
   * Formatted fee is formatted with currency according to the venue's country
   * example: "€1.82"
   */
  formattedFee: string;

  /**
   * example: "11.82"
   */
  total: string;

  /**
   * example: "€11.82"
   */
  formattedTotal: string;

  /**
   * Original price of a single ticket
   * To be used when calculating the discount (done at backend side)
   */
  originalPrice: Price;

  /**
   * Discount amount
   */
  discountAmount: Price;

  /**
   * % discount based on price / discount price
   */
  discountPercentage: number;

  /**
   * Formatted original price
   */
  formattedOriginalPrice: string;

  /**
   * Formatted discount
   */
  formattedDiscountAmount: string;
}
