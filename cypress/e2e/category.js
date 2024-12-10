
//import 'cypress-file-upload';
describe('Admin Dashboard scenarios', () => {
    beforeEach(() => {
        cy.visit('https://qa-admin.pclive247.com/')
        cy.contains('LOGIN').should('be.visible')
        cy.login("tester@admin.com", "Admin@123")
        cy.contains('Category').click()
    })

    it('ADD category with valid details', { pageLoadTimeout: 120000 }, () => {
        cy.contains('Add category').click()
        cy.get('[placeholder="Title"]').click().type('Marvel')
        cy.get('[placeholder="Description"]').click().type('This category will include all Marvel(raw/slab) cards')
        cy.get('input[type="file"]').selectFile('C:\\Users\\Lenovo\\Desktop\\PCLive247\\Baseball\\Baseball 1.jpg', { force: true })
        cy.get('[type="button"]').eq(17).click()

    })
    it('ADD category with existing details details', { pageLoadTimeout: 120000 }, () => {

        cy.contains('Add category').click()
        cy.get('[placeholder="Title"]').click().type('CSK')
        cy.get('[placeholder="Description"]').click().type('This category will include all Marvel(raw/slab) cards')
        cy.get('[type="button"]').eq(17).click()
        cy.contains('A category with this name already exists.').should('be.visible')
    })

    it('Check validations while adding category', { pageLoadTimeout: 120000 }, () => {
        cy.contains('Add category').click()
        cy.get('[placeholder="Title"]').click().type('test')
        cy.get('[type="button"]').eq(17).click()
        cy.contains('Please enter description')
        /// verify when title kept empty
        cy.get('[placeholder="Title"]').click().clear()
        cy.get('[placeholder="Description"]').click().type('This category will include all Marvel(raw/slab) cards')
        cy.get('[type="button"]').eq(17).click()
        cy.contains('Please enter title').should('be.visible')
        /// Verify when incorrect image got upload
        cy.get('[placeholder="Title"]').click().type('Marvel')
        cy.get('[placeholder="Description"]').click().type('This category will include all Marvel(raw/slab) cards')
        //incorrect filepath will lead to failed TC
    })
    it('Verify Cancel button working', { pageLoadTimeout: 120000 }, () => {
        cy.contains('Add category').click()
        cy.get('[type="button"]').eq(18).click()

    })

    it('Sorting of Name column when column header is clicked', () => {
        // Get the table column header and click to sort (e.g., sorting by 'Name' column)
        cy.wait(2000);
        cy.get('tr').find('td').first().invoke('text').then((expectedValue) => {
            console.log(expectedValue)
            cy.get('[class="sort-icon"]').eq(0).click({ force: true });
            cy.wait(2000);
            cy.get('tr').find('td').first().invoke('text').then((actualValue) => {
                console.log(actualValue)
                expect(actualValue).to.not.equal(expectedValue);
                // Assert that the table is correctly sorted in ascending order
                expect(actualValue.substring(0, 1)).to.equal('A');

            })


        })

    });
    it('Sorting of Number of orders', () => {
        cy.wait(2000);
        cy.get('tr').find('td').eq(3).invoke('text').then((expectedValue) => {
            console.log(expectedValue)
            cy.get('[class="sort-icon"]').eq(1).click({ force: true });
            cy.wait(2000);
            cy.get('tr').find('td').eq(3).invoke('text').then((actualValue) => {
                console.log(actualValue)
                expect(actualValue).to.equal(expectedValue);
                // Assert that the table is correctly sorted in ascending order
                expect(actualValue.substring(0, 1)).to.equal('0');
            })
        })
    })
    //Actions on category
    it('Edit actions on category', () => {
        cy.get('[data-testid="EditIcon"]').eq(0).click()
        cy.get('[id="input-postal-code"]').clear().type('Marvel Cards')
        cy.get('[placeholder="Description"]').clear().type('ALL Marvel cards')
        cy.get('[data-testid="CancelIcon"]').click()
        cy.get('input[type="file"]').selectFile('C:\\Users\\Lenovo\\Desktop\\PCLive247\\Marvel-CaptainAmerica.webp', { force: true })
        cy.contains('Update').click()
        cy.contains('Category updated successfully !!').should('be.visible')
        // Verify 'Cancel' button is clickable
        cy.get('[data-testid="EditIcon"]').eq(0).click()
        cy.contains('Cancel').click()
    })

    it('Inactivate category which is not used by any cards', () => {
        cy.wait(2000)
        cy.get('[type="checkbox"]').eq(0).click({ force: true })
        cy.contains('Category deactivated successfully !!').should('be.visible')
        cy.wait(2000)
        cy.get('[type="checkbox"]').eq(0).click({ force: true })
        cy.contains('Category activated successfully !!').should('be.visible')
    })
    it('Delete category with no cards', () => {
        cy.wait(2000)
        cy.get(':nth-child(1) > :nth-child(5) > .actionIconsContainer > [data-testid="DeleteIcon"] > path', { timeout: 10000 })
            .click({ force: true });
        cy.get('[type="button"]').contains('Yes').click()
        cy.contains('Category deleted successfully !!').should('be.visible')
    })
    // Filters working
    it('Filters - category status', () => {
        cy.wait(5000)
        cy.get('[class="multilevel-dropdown-container"]').click()
      cy.get('[class="Item_item__azkIp"]').realHover()
        // Active Category 
        cy.get('[class="MuiTypography-root MuiTypography-body1 MuiFormControlLabel-label css-9l3uo3"]').eq(0).click()
        cy.get('[class="apply"]').click()
        // Inactive Category
        cy.get('[class="MuiTypography-root MuiTypography-body1 MuiFormControlLabel-label css-9l3uo3"]').eq(0).click()         // Active Category 
        cy.get('[class="MuiTypography-root MuiTypography-body1 MuiFormControlLabel-label css-9l3uo3"]').eq(1).click()
        cy.get('[class="apply"]').click()
        cy.contains('Reset All').click()

    })

    //Search category with valid data
    it('Search category with valid data', () => {
        cy.wait(2000)
        cy.get('[type="text"]').type('CSK')
        cy.get('[id="Search"]').click({ force: true })
        cy.contains('Reset All').click()
    })
    //Search category with invalid data
    it('Search category with valid data', () => {
        cy.wait(2000)
        cy.get('[type="text"]').type('Accesories')
        cy.get('[id="Search"]').click({ force: true })
        cy.contains('No data found!').should('be.visible')
        cy.contains('Reset All').click()
    })

})


