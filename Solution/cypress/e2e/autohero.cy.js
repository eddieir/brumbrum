import 'cypress-xpath';
describe('Autohero Audi A3 Search and Purchase', () => {
  it('should search for Audi A3, sort by highest price, and click buy now on the 3rd car', () => {
    // Visit the Autohero website
    cy.visit('https://www.autohero.com/it/');

    // Prevent Cypress from failing the test on uncaught exceptions
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });

    // Accept cookies if the popup appears
    cy.get('button[data-qa-selector="cookie-consent-accept-all"]').click();
    cy.get('body').screenshot('accept-cookies');

    // Press "Trova la tua auto"
    cy.get('a[data-qa-selector="cta-button"]').click();
    cy.get('body').screenshot('entered_trova_auto');  // Take screenshot after entering

    // Open filter
    cy.get('button[data-qa-selector="all-filters-button"]').eq(0).click();
    cy.get('div[data-qa-selector="ah-collapse-header"]').eq(0).click();

    // Search for Audi A3
    cy.get('label[data-qa-selector-value="Audi"]').eq(0).click();
    cy.get('label[data-qa-selector="input-box"][data-qa-selector-value="A3"]').click();
    cy.get('button[data-qa-selector="hide-filters-counter"]').click();
    cy.wait(3000);
    cy.get('body').screenshot('search_audi_a3');  // Take screenshot after search

    // Sort by highest price
    cy.get('select[data-qa-selector="sort-by-select-hidden"]').eq(0).select(3);
    cy.get('body').screenshot('sorted_by_highest_price');  // Take screenshot after sorting

    // Check the 3rd car
    cy.get('button[data-qa-selector="see-car"]').eq(2).click();
    cy.get('body').screenshot('third_car_selected');  // Take screenshot after selecting the 3rd car

    // Buy the car
    cy.get('button[data-qa-selector="buy-now"]').click();
    cy.get('body').screenshot('buy_now_clicked');  // Take screenshot after clicking "Buy Now"

    cy.xpath("//button[@id='guide-order-next-button']").click();
    cy.get('body').screenshot('iniziamo');
  });
});
