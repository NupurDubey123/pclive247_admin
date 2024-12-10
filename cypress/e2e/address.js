describe('Address Module', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.contains('LOGIN').should('be.visible')
        cy.login()
        cy.contains('Address').click({ force: true })
    })

    it('Add Address with valid details', () => {
        cy.wait(20000)
        cy.contains('Add Address').should('be.visible').click()
        cy.get('[id="input-postal-code"]').eq(0).click().type("Home")
        cy.get('[id="input-postal-code"]').eq(1).click().type("71 Saint Nicholas drive")
        cy.get('[class="custom-select form-control"]').eq(1).select('Alaska').should('have.value', 'AK')
        cy.get('[class="custom-select form-control"]').eq(2).select('North Pole')
        cy.get('[type="number"]').type("12345")
        cy.get('[type="button"]').contains('Save').click()
    })

    it('Add Address with invalid details', () => {
        cy.wait(20000)
        cy.contains('Add Address').should('be.visible').click()
        cy.get('[id="input-postal-code"]').eq(1).click().type("77 Imperia")
        cy.get('[class="custom-select form-control"]').eq(1).select('Alaska').should('have.value', 'AK')
        cy.get('[class="custom-select form-control"]').eq(2).select('North Pole')
        cy.get('[type="number"]').type("00000")
        cy.get('[type="button"]').contains('Save').click()
        cy.contains('Unable to find a valid ZIP code. Please check to see if your city, state and ZIP code is valid.')
            .should('be.visible')
        cy.get('[class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-1 css-1doag2i"]').click({ force: true })
    })

    it('Edit address with valid data', () => {
        cy.wait(20000) // 
        cy.get('table tr:first-child svg[data-testid="EditIcon"]').should('be.exist').click({ force: true })
        cy.get('[id="input-postal-code"]').eq(1).click().clear().type("77 Saint Nicholas drive")
        cy.get('[class="custom-select form-control"]').eq(1).select('Alaska').should('have.value', 'AK')
        cy.get('[class="custom-select form-control"]').eq(2).select('North Pole')
        cy.get('[type="number"]').click().clear().type("54321")
        cy.get('[type="button"]').contains('Save').click()

    })

    it('delete address', () => {
        cy.wait(20000)
        cy.get('table tr:first-child svg[data-testid="DeleteIcon"]').should('be.exist').click({ force: true })
        cy.contains('Are you sure you want to delete this address?').should('be.visible')
        cy.get('[type="button"]').contains('Yes').click()
        cy.contains('Cannot delete address as it is linked to cards in system.').should('be.visible')
    })

    it('Searching functionality', () => {
        cy.wait(20000)
        // Search by any name e.g city name
        cy.get('[id="outlined-size-small"]').click().type('North Pole')
        cy.get('[class="MuiButton-icon MuiButton-startIcon MuiButton-iconSizeMedium css-6xugel"]')
            .click()
        cy.contains('Reset All').click()
        // Search with invalid data
        cy.get('[id="outlined-size-small"]').click().type('Pune')
        cy.get('[class="MuiButton-icon MuiButton-startIcon MuiButton-iconSizeMedium css-6xugel"]')
            .click()
        cy.contains('No data found!').should('be.visible')
        cy.contains('Reset All').click()
        //search with verification to ensure correct result
        cy.get('[id="outlined-size-small"]').click().type('Home')
        cy.get('[class="MuiButton-icon MuiButton-startIcon MuiButton-iconSizeMedium css-6xugel"]')
            .click()
        const keyword = 'Home'; // Search the keyword you're looking for
        // Step 1: Iterate over the table rows and check for the keyword
        cy.get('table tbody tr').each(($row) => {
            // Step 2: Check if the row contains the keyword
            cy.wrap($row).contains(keyword).should('exist'); // Assertion to check if the keyword is found
        });

    })
})