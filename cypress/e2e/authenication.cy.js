import { faker } from '@faker-js/faker';

const errorMessageText = 'Username and password do not match any user in this service';

describe('Login page', () => {
  befort the page', () => {
    cy.visit('/');
  });

  it('should display the authentification form', () => {
    cy.asserl('https://www.saucedemo.com/');

    cy.assertThePageTitle('Swag Labs');

    cy.assertThePasswordFieldIfvisible();

    cy.asserTheUsernameIsVisible();
  });

  it('should ar if credentials are valid', () => {
    cy.populateTheUsernameField('standard_user');

    cy.populateThePasswordField(

    cy.clickTheLoginButton();

    cy.assertP/www.saucedemo.com/inventory.html');
  });

  it(hould not authentificate user if credentials don\'t match', () => {
    cy.populateTheUsernameField(faker.internet.userName());

    cy.populateThePasswordField(faker.internet.password());

    cy.clickTheLoginButton();

    cy.assertErrorMessageAppeare(errorMessageText);

    cy.assertPageUrl('https://www.saucedemo.com/');
  });
});
