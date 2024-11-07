describe('inventory module',() => {
    beforeEach(() => {
        cy.visit('/')
        cy.contains('LOGIN').should('be.visible')
        cy.login("tester@admin.com","Admin@123")
        cy.contains('Inventory tag').click()
    })
    it('Add inventory',{ pageLoadTimeout: 120000 },()=>{
       cy.wait(2000)
       cy.get('[type="button"]').contains('Add inventory tag').click()
       // Add inventory with valid data
       cy.get('[id="input-postal-code"]').type('ABC')
       cy.get('[class="text-right mt-3"]').contains('Add').click()
       cy.contains('Inventory tag added successfully.').should('be.visible')
       //
    })

    it('Add inventory with invalid data', ()=>{
        cy.wait(2000);
        cy.get('[type="button"]').contains('Add inventory tag').click()
       // Add inventory with invalid data
       cy.get('[id="input-postal-code"]').type('Inventory#Test')
       cy.get('[class="text-right mt-3"]').contains('Add').click()
       cy.contains('The tag name must consist of 3 to 20 alphanumeric characters without any spaces.').should('be.visible')
    })
    
    it('Add inventory with existing inventory name',()=>{
        cy.wait(2000);
        cy.get('[type="button"]').contains('Add inventory tag').click()
        // Add inventory with already existing data
        cy.get('[id="input-postal-code"]').type('InventoryTest')
        cy.get('[class="text-right mt-3"]').contains('Add').click()
        cy.contains('Inventory tag already exist in system.').should('be.visible')        
    })

    it('Check cancel button functionality',()=>{
        cy.wait(2000);
        cy.get('[type="button"]').contains('Add inventory tag').click()
        // Check cancel button working
        cy.get('[class="text-right mt-3"]').contains('Cancel').click()
    })
    
    it('Search with valid data',()=>{
        cy.wait(5000);
        cy.get('[id="outlined-size-small"]').click().type('InventoryTest')
        cy.get('[class="MuiButton-icon MuiButton-startIcon MuiButton-iconSizeMedium css-6xugel"]').click()
        
    })

    it('Search with invalid data',()=>{
        cy.wait(2000);
        cy.get('[id="outlined-size-small"]').click().type('12345')
        cy.get('[class="MuiButton-icon MuiButton-startIcon MuiButton-iconSizeMedium css-6xugel"]').click()
        cy.contains('No data found!').should('be.visible')
    })
    
    it('Sorting of Tagname',()=>{
        cy.wait(2000);
        //Sort Tagname in ascending order
        cy.get('[class="sort-icon"]').click()
        //Sort Tagname in descending order 
        cy.get('[class="sort-icon"]').click()

    })

    it('Sorting of Tagname',()=>{
        cy.wait(2000);
        //Sort Created at in ascending order
        cy.get('[class="sort-icon-dark"]').click()
        //Sort Created at in descending order 
        cy.get('[class="sort-icon-dark"]').click()

    })

    it('Edit Action on Inventory with invalid data',()=>{
        cy.wait(2000);
        cy.get('[data-testid="EditIcon"]').eq(0).click()
        cy.get('[id="input-postal-code"]').clear().type('#1_test')
        cy.get('[class="text-right mt-3"]').contains('Update').click()
        cy.contains('The tag name must consist of 3 to 20 alphanumeric characters without any spaces.').should('be.visible')
        
    })

    it('Edit Action on Inventory with valid data',()=>{
        cy.wait(2000);
        cy.get('[data-testid="EditIcon"]').eq(0).click()
        cy.get('[id="input-postal-code"]').clear().type('BCA')
        cy.get('[class="text-right mt-3"]').contains('Update').click()
        cy.contains('Inventory tag updated successfully.').should('be.visible')
    })

    it('Delete Action on Inventory',()=>{
        cy.wait(2000);
        cy.get('[data-testid="DeleteIcon"]').eq(0).click()
        cy.get('[type="button"]').contains('Yes').click()
        cy.contains('Inventory tag deleted successfully').should('be.visible')
    })
    
})
