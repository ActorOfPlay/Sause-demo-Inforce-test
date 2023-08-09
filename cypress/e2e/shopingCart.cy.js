import { faker } from '@faker-js/faker';

const completedOrderText = 'Thank you for your order!';

describe('User should', () => {
  beforeEach('Setting cookies', () => {
    cy.visit('/');
    cy.LoginToSauce('standard_user', 'secret_sauce');
    cy.clearLocalStorage();
  });

  it('be able to add multiple items to cart', () => {
    cy.AddItemsToCart(2).as('itemsDetails');

    cy.asserTooltipItemsNumber('@itemsDetails');
  });

  it('be proceed to checkout with the correct number and titles of items', () => {
    cy.AddItemsToCart(2).as('itemsDetails');

    cy.clickTheShoppingCartIcon();

    cy.assertTheNumberOfItemsInCart('@itemsDetails');

    cy.assertItemsTitle('@itemsDetails');
  });

  it('be redirected to populated Checkout page after clicking the [Checkout]', () => {
    cy.AddItemsToCart(2);

    cy.clickTheShoppingCartIcon();

    cy.clickTheCheckoutButton();

    cy.assertTheFirstNameFieldIsPopulated('standard');

    cy.asserTheLastNameFieldIsPopulated('user');
  });

  it('be able to checkout with items correct number and price', () => {
    cy.AddItemsToCart(2).as('itemsDetails');

    cy.clickTheShoppingCartIcon();

    cy.clickTheCheckoutButton();

    cy.populateTheFirstNameField(faker.name.firstName());

    cy.populateTheLastNameField(faker.name.lastName());

    cy.populateTheZipCodeField(faker.address.zipCode());

    cy.clickTheContinueToCheckoutButton();

    cy.assertTheNumberOfItemsInCart('@itemsDetails');

    cy.assertItemsTitle('@itemsDetails');

    cy.countItemsTotal().as('itemsSubtotal');

    cy.assertItemsSubtotalIsCorrect('@itemsSubtotal');

    cy.assertTotalPriceWitTaxIsCorrect('@itemsSubtotal');

    cy.clickTheFinishButton();

    cy.assertOrderIsComleted(completedOrderText);
  });

  it('be able to logout after proceeding with the order', () => {
    cy.AddItemsToCart(2).as('itemsDetails');

    cy.clickTheShoppingCartIcon();

    cy.clickTheCheckoutButton();

    cy.populateTheCheckoutForm();

    cy.clickTheContinueToCheckoutButton();

    cy.clickTheFinishButton();

    cy.clickTheBackToHomeButton();

    cy.logoutFromSause();

    cy.assertPageUrl('https://www.saucedemo.com/');
  });
});
