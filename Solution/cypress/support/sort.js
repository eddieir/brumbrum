
/**
 * Sorts the car listings by the highest price first.
 */
export function sortByHighestPrice() {
    // Sort by highest price first
    cy.get('select[data-qa="sort-dropdown"]').select('price_desc');
    cy.wait(2000); // Wait for sorting to complete
    cy.screenshot('sort-by-price-desc');
  }
  