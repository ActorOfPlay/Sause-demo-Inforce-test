import { faker } from '@faker-js/faker';

const errorMessageText = 'Username and password do not match any user in this service';

describe('Login page', () => {
  beforeEach('Visit the page', () => {
    cy.visit('/');
  });

  it('should display the authentification form', () => {
    cy.assertPageUrl('https://www.saucedemo.com/');

    cy.assertThePageTitle('Swag Labs');

    cy.assertThePasible();

    cy.asserTheUsernameIsVisible();
  });

  it('should autheser if credentials are valid', () => {
    cy.populateTheUsernameField('standard_user');

    cy.populateThePasswordField('secret_sauce');

    cy.clickTheLoginButton();

    cy.assertPageUrl('https://www.saucedemo.com/inventory.html');
  });

  it('should not authentificate user if credentials don\'t match', () => {
    cy.populateTheUsernameField(faker.internet.userName());

    cy.populateThePasswordField(faker.internet.password());

    cy.clickTheLoginButton();

    cy.assertErrorMessageAppeare(errorMessageText);

    cy.assertPageUrl('https://www.saucedemo.com/');
  });
});
