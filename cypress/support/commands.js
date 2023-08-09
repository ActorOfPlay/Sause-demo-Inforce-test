import { faker } from '@faker-js/faker';

Cypress.Commands.add('LoginToSauce', (userName, password) => {
  cy.get('[data-test="username"]').type(userName);
  cy.get('[data-test="password"]').type(password);
  cy.get('[data-test="login-button"]').click();
});

Cypress.Commands.add('assertPageUrl', (pageUrl) => {
  cy.url().should('be.equal', pageUrl);
});

Cypress.Commands.add('asserTheUsernameIsVisible', () => {
  cy.get('[data-test="username"]')
    .should('be.visible');
});

Cypress.Commands.add('populateTheUsernameField', (username) => {
  cy.get('[data-test="username"]')
    .type(username);
});

Cypress.Commands.add('populateThePasswordField', (password) => {
  cy.get('[data-test="password"]')
    .type(password);
});

Cypress.Commands.add('clickTheLoginButton', () => {
  cy.get('[data-test="login-button"]')
    .click();
});

Cypress.Commands.add('asserTooltipItemsNumber', (itemsDetailsAlias) => {
  cy.get(itemsDetailsAlias).then((itemsDetails) => {
    cy.log(itemsDetails);
    cy.get('[class="shopping_cart_badge"]')
      .should('contain.text', itemsDetails.numberOfItems);
  });
});

Cypress.Commands.add('assertTheNumberOfItemsInCart', (itemsDetailsAlias) => {
  cy.get(itemsDetailsAlias).then((itemsDetails) => {
    cy.get('[class="cart_quantity"]').then((quantity) => {
      const numberOfItemsInCart = quantity.length;
      expect(itemsDetails.numberOfItems).to.eq(numberOfItemsInCart);
    });
  });
});

Cypress.Commands.add('clickTheCheckoutButton', () => {
  cy.get('[data-test="checkout"]')
    .click();
});

Cypress.Commands.add('populateTheFirstNameField', (firstName) => {
  cy.get('[data-test="firstName"]')
    .type(firstName);
});

Cypress.Commands.add('populateTheLastNameField', (lastName) => {
  cy.get('[data-test="lastName"]')
    .type(lastName);
});

Cypress.Commands.add('clickTheContinueToCheckoutButton', () => {
  cy.get('[data-test="continue"]')
    .click();
});

Cypress.Commands.add('populateTheZipCodeField', (zipCode) => {
  cy.get('[data-test="postalCode"]')
    .type(zipCode);
});

Cypress.Commands.add('asserTheLastNameFieldIsPopulated', (lastName) => {
  cy.get('[data-test="lastName"]')
    .should('contain.text', lastName);
});

Cypress.Commands.add('assertTheFirstNameFieldIsPopulated', (firstName) => {
  cy.get('[data-test="firstName"]')
    .should('contain.text', firstName);
});

Cypress.Commands.add('clickTheShoppingCartIcon', () => {
  cy.get('[class="shopping_cart_link"]')
    .click();
});

Cypress.Commands.add('assertErrorMessageAppeare', (errorMessage) => {
  cy.get('[data-test="error"]')
    .should('contain.text', errorMessage);
});

Cypress.Commands.add('assertThePasswordFieldIfvisible', () => {
  cy.get('[data-test="password"]')
    .should('be.visible');
});

Cypress.Commands.add('assertThePageTitle', (pageTitle) => {
  cy.get('[class="login_logo"]')
    .should('contain.text', pageTitle);
});

Cypress.Commands.add('AddItemsToCart', (numberOfItems) => {
  const itemDetails = {
    numberOfItems,
    itemsName: [],
  };

  for (let i = 1; i <= numberOfItems; i++) {
    cy.get('[data-test*="add-to-cart-sauce-labs"]')
      .first()
      .parent()
      .siblings()
      .find('[class="inventory_item_name"]')
      .invoke('text')
      .then((text) => {
        itemDetails.itemsName.push(text.trim());
      });

    cy.get('[data-test*="add-to-cart-sauce-labs"]')
      .first()
      .click();
  }

  return cy.wrap(itemDetails).then(() => itemDetails);
});

Cypress.Commands.add('assertItemsTitle', (itemsDetailsAlias) => {
  cy.get(itemsDetailsAlias).then((itemDetails) => {
    cy.get('[id*="item"]').each((cartItemTitle) => {
      cy.wrap(cartItemTitle).invoke('text').then((text) => {
        expect(itemDetails.itemsName).to.contain(text);
      });
    });
  });
});

Cypress.Commands.add('countItemsTotal', () => {
  let itemsTotal = 0;

  cy.get('[class="cart_quantity"]').each((item) => {
    cy.wrap(item).invoke('text').then((numberOfItems) => {
      cy.wrap(item).parents('.cart_item').find('[class="inventory_item_price"]')
        .invoke('text')
        .then((price) => {
          const extractedPrice = parseFloat(price.replace(/[^\d.-]/g, ''));
          itemsTotal += extractedPrice * +numberOfItems;
        });
    });
  }).then(() => itemsTotal);
});

Cypress.Commands.add('assertItemsSubtotalIsCorrect', (subtotalAlias) => {
  cy.get(subtotalAlias).then((subtotal) => {
    cy.get('[class="summary_subtotal_label"]')
      .should('contain.text', subtotal);
  });
});

Cypress.Commands.add('assertTotalPriceWitTaxIsCorrect', (subtotalAlias) => {
  cy.get(subtotalAlias).then((subtotal) => {
    cy.get('[class="summary_tax_label"]')
      .invoke('text').then((taxes) => {
        const taxAmount = parseFloat(taxes.match(/\d+\.\d+/)[0]);
        const totalWithTaxes = taxAmount + subtotal;

        return totalWithTaxes;
      }).then((total) => {
        cy.get('[class="summary_info_label summary_total_label"]')
          .should('contain', total);
      });
  });
});

Cypress.Commands.add('clickTheFinishButton', () => {
  cy.get('[data-test="finish"]')
    .click();
});

Cypress.Commands.add('assertOrderIsCompleted', (completedOrderText) => {
  cy.get('[class="complete-header"]')
    .should('contain.text', completedOrderText);
});

Cypress.Commands.add('populateTheCheckoutForm', () => {
  cy.populateTheFirstNameField(faker.name.firstName());

  cy.populateTheLastNameField(faker.name.lastName());

  cy.populateTheZipCodeField(faker.address.zipCode());
});

Cypress.Commands.add('clickTheBackToHomeButton', () => {
  cy.get('[data-test="back-to-products"]')
    .click();
});

Cypress.Commands.add('logoutFromSause', () => {
  cy.get('[class="bm-burger-button"]')
    .click();

  cy.get('[id="logout_sidebar_link"]')
    .click();
});
