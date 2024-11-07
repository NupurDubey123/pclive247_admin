// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//--- Auto-suggestions  for cypress
///< referance types ="Cypress"/>
require("cypress-real-events")
Cypress.Commands.add("login", () => {
    cy.get('[type="email"]').type('tester@admin.com')
         cy.get('[type="password"]').type('Admin@123')
         cy.get('[type="button"]').contains('Sign in').click()
         cy.contains('OTP sent on tester@admin.com').should('be.visible')
         cy.contains('Verify account').should('be.visible')
         const values = ['1', '2', '3', '4', '5', '6'];
         cy.get('[inputmode="text"]').each(($input, index) => {
         cy.wrap($input).type(values[index]);
    });
    cy.get('[type="button"]').contains('Submit').click()
  });

  Cypress.Commands.add('logout', ()=>{
     cy.get('.align-items-center.media').last().click({force:true})
     cy.get('.dropdown-menu-arrow').contains('Logout').click({force:true})
     cy.contains('LOGIN').should('exist')
  })