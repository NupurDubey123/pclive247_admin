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

Cypress.Commands.add('logout', () => {
   cy.get('.align-items-center.media').last().click({ force: true })
   cy.get('.dropdown-menu-arrow').contains('Logout').click({ force: true })
   cy.contains('LOGIN').should('exist')
})
// Corporate Module - Searching functionality
Cypress.Commands.add('search', () => {
   cy.wait(2000)
   cy.get('[id="outlined-size-small"]').click().type('nupur')
   cy.get('[class="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-colorPrimary MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-colorPrimary search-action css-j9olmy"]')
      .click()
   cy.get('[class="table-responsive"]').eq(1).then(() => {
      if (cy.contains('nupur')) {
         cy.contains('Reset All').click()
      } else {
         cy.contains('No data found!').should('be.visible')
      }
   })
   cy.contains('Reset All').click()
   cy.get('[id="outlined-size-small"]').click().type('Myntra')
   cy.get('.search-input-container > .MuiButton-root').click()
   cy.contains('No data found!').should('be.visible')
})


// Corporate Module - Sorting
Cypress.Commands.add('sorting', () => {
   cy.wait(2000)
   //sort ID column in ascending order
   cy.get('[class="sort-icon"]').click()
   //sort ID column in descending order
   cy.get('[class="sort-icon-dark"]').click()
   //Sort Updated at in ascending order 
   cy.get('[class="sort-icon"]').click()
   //sort Updated at in descending order
   cy.get('[class="sort-icon-dark"]').click
})

Cypress.Commands.add('actions', () => {
   cy.wait(2000)
   //Approve request
   cy.get('[class="buttons-container"]').eq(3).contains('Approve').click({ force: true })
   cy.get('[class="text-center  MuiBox-root css-0"]').contains('Yes, approve request').click()
   cy.contains('Request state updated successfully').should('be.visible')
   cy.get('[class="buttons-container"]').eq(3).contains('Decline').click({ force: true })
   cy.get('[class="text-center  MuiBox-root css-0"]').contains('Yes, decline request').click()
   cy.contains('Request state updated successfully').should('be.visible')
   cy.wait(2000)
   // cy.get('[data-testid="MoreVertIcon"]').scrollIntoView()
   // cy.get('[data-testid="MoreVertIcon"]').eq(3).click({ fource: true })
   // //[class="shadow card"]
   // cy.contains('History').click()

})
Cypress.Commands.add('filters', () => {
   cy.get('[class="calender-container"]').click()
   // Filter by upload type 
   cy.get('[class="Dropdown_dropdown__ZbOaq"]').contains('Upload Type').realHover()
   // Select Normal upload
   cy.contains('Normal').click({ force: true })
   cy.get('[class="apply"]').contains('Apply').click({ force: true })
   const commonText = 'NORMAL';
   // Loop through the first 10 rows (or up to the actual number of rows)
   cy.get('[class="table-responsive"]').eq(1).each(($row, index) => {
      // Stop after 10 rows
      if (index = 10) {
         cy.get('[data-testid="NavigateNextIcon"]').click()
         return false; // Break the loop after 10 iterations
      }
      // Find the 3rd column (City) in the current row and check if it matches the common text
      cy.wrap($row).find('td').eq(2)  // Index 2 corresponds to the 'Upload type' column
         .should('have.text', commonText);  // Check if the column text is 'Normal'
   });
   //cy.wait(5000)
   cy.get('[class="calender-container"]').click()
   cy.get('[class="Dropdown_dropdown__ZbOaq"]').contains('Upload Type').realHover()
   // Select Bulk upload
   cy.contains('Normal').click({ fource: true })
   cy.contains('Bulk').click()
   cy.get('[class="apply"]').contains('Apply').click()
   cy.get('[class="Dropdown_dropdown__ZbOaq"]').contains('Upload Type').realHover()
   // Select CSV upload
   cy.contains('Bulk').click()
   cy.contains('CSV').click()
   cy.get('[class="apply"]').contains('Apply').click()
})

Cypress.Commands.add('addressfilters', () => {
   cy.wait(2000)
   cy.get('[class="Dropdown_dropdown__ZbOaq"]').contains('Pickup Address').realHover()
   cy.contains('71 Saint Nicholas Dr, North Pole, 99705').click()
   cy.get('[class="apply"]').contains('Apply').click({ force: true })
   cy.contains('Reset All').click()
})

Cypress.Commands.add('moreHistory', () => {
   cy.wait(2000)
   cy.get('table tr:first-child svg[data-testid="MoreVertIcon"]').should('be.exist').click({ force: true })
   cy.get('.actionButton ').contains('History').should('be.exist').click({ force: true })
   cy.wait(2000)
   cy.get('[data-testid="ArrowBackIcon"]').click()
})