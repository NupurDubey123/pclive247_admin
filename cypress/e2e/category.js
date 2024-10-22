
//import 'cypress-file-upload';
describe('Admin Dashboard scenarios', () => {
   beforeEach(() => {
    cy.visit('https://qa-admin.pclive247.com/')
    cy.contains('LOGIN').should('be.visible')
    cy.login("tester@admin.com","Admin@123")
    cy.contains('Category').click()
    })

    it('ADD category with valid details',{ pageLoadTimeout: 120000 },() =>{
        cy.contains('Add category').click()
        cy.get('[placeholder="Title"]').click().type('Marvel')
        cy.get('[placeholder="Description"]').click().type('This category will include all Marvel(raw/slab) cards')
        cy.get('input[type="file"]').selectFile('C:\\Users\\Lenovo\\Desktop\\PCLive247\\Baseball\\Baseball 1.jpg',{force: true})
        cy.get('[type="button"]').eq(17).click()
        //cy.get(':nth-child(2) > .text-right > .MuiButton-contained')
             
   })
    it ('ADD category with existing details details',{ pageLoadTimeout: 120000 },() =>{
        
        cy.contains('Add category').click()
        cy.get('[placeholder="Title"]').click().type('CSK')
        cy.get('[placeholder="Description"]').click().type('This category will include all Marvel(raw/slab) cards')
        cy.get('[type="button"]').eq(17).click()
        cy.contains('A category with this name already exists.').should('be.visible')
    })

    it('Check validations while adding category',{ pageLoadTimeout: 120000 },() => {
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
        cy.get('input[type="file"]').selectFile('C:\\Users\\Lenovo\\Desktop\\PCLive247\\Baseball\\Baseball123.png',{force: true})
        cy.get('[type="button"]').eq(17).click()
        
    })
    it('Verify Cancel button working',{ pageLoadTimeout: 120000 },() => {
        cy.contains('Add category').click()
        cy.get('[type="button"]').eq(18).click()
                
    })

    it('Sorting of Name column when column header is clicked', () => {
        // Get the table column header and click to sort (e.g., sorting by 'Name' column)
        //cy.get('[class="sort-icon"]').eq(0).click();
        cy.wait(2000);
        cy.get('tr').find('td').first().invoke('text').then((expectedValue)=>{
        console.log(expectedValue)
        cy.get('[class="sort-icon"]').eq(0).click({force:true});
        cy.wait(2000);
        cy.get('tr').find('td').first().invoke('text').then((actualValue)=>{
            console.log(actualValue)
            expect(actualValue).to.not.equal(expectedValue);
            // Assert that the table is correctly sorted in ascending order
            expect(actualValue.substring(0, 1)).to.equal('A');
            
        
        })


    })

        // // Fetch all values from the column after sorting
        // cy.get('.thead-light > tr > :nth-child(1)').then(($cells) => {
        //   const textArray = [...$cells].map(cell => cell.innerText);
          
        //   // Create a sorted array for comparison
        //   const sortedArray = [...textArray].sort((a, b) => a.localeCompare(b));
    
        //   // Assert that the table is correctly sorted in ascending order
        //   expect(textArray).to.deep.equal(sortedArray);
       // });
      });
    
})
    
