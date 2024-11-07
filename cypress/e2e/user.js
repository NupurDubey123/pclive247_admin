
describe('Admin Dashboard scenarios', () => {
    
    it ('Login flow with positive negative scenarios',{ pageLoadTimeout: 120000 },() =>{
        cy.visit('https://qa-admin.pclive247.com/')
        cy.contains('LOGIN').should('be.visible')
        cy.login("tester@admin.com","Admin@123")
        cy.contains('Users').click()
// Search user by Name
        cy.wait(2000)
        cy.contains('Select Column').click()
        cy.get('[type="radio"]').eq(0).click()
        cy.get('[id="outlined-size-small"]').click()
        cy.get('[id="outlined-size-small"]').click().type('Nupur')
        cy.get('[class="MuiButton-icon MuiButton-startIcon MuiButton-iconSizeMedium css-6xugel"]').click()
        cy.contains('Reset All').click()
// Search user by Username
        cy.wait(2000)
        cy.contains('Select Column').click()
        cy.get('[type="radio"]').eq(1).click()
        cy.get('[id="outlined-size-small"]').click()
        cy.get('[id="outlined-size-small"]').click().type('test')
        cy.get('[class="MuiButton-icon MuiButton-startIcon MuiButton-iconSizeMedium css-6xugel"]').click()
        cy.contains('Reset All').click()     
// Search user by Email
        cy.wait(2000)
        cy.contains('Select Column').click()
        cy.get('[type="radio"]').eq(2).click()
        cy.get('[id="outlined-size-small"]').click()
        cy.get('[id="outlined-size-small"]').click().type('rcb@yopmail.com')
        cy.get('[class="MuiButton-icon MuiButton-startIcon MuiButton-iconSizeMedium css-6xugel"]').click()
        cy.contains('Reset All').click()                 
// Search user by phone with valid data
        cy.wait(2000)
        cy.contains('Select Column').click()
        cy.get('[type="radio"]').eq(3).click()
        cy.get('[id="outlined-size-small"]').click()
        cy.get('[id="outlined-size-small"]').click().type('7798739491')
        cy.get('[class="MuiButton-icon MuiButton-startIcon MuiButton-iconSizeMedium css-6xugel"]').click()
        cy.contains('Reset All').click()
// Search user by Phone with invalid data
        cy.wait(2000)
        cy.contains('Select Column').click()
        cy.get('[type="radio"]').eq(2).click()
        cy.get('[id="outlined-size-small"]').click()
        cy.get('[id="outlined-size-small"]').click().type('ABCD')
        cy.get('[class="MuiButton-icon MuiButton-startIcon MuiButton-iconSizeMedium css-6xugel"]').click()
        cy.contains('No data found!').should('be.visible')
        cy.contains('Reset All').click()

// Date range Filter  - Past 7 days
     
        cy.wait(2000)
        //cy.get('[class="dropdown-element"]').first().click()
        cy.contains('Date Range').click()
        cy.contains('Past 7 days').click()

// Date range Filter  - Past 30 days
     
        cy.wait(2000)
        cy.contains('Date Range').click()
        cy.contains('Past 30 days').click()      
  
//  // Date range Filter  - Custom date
     
         cy.wait(2000)
         cy.contains('Date Range').click()
         cy.contains('Custom dates').click()
         cy.get('[type="text"]').eq(1).click()
         const currentDate = new Date();
         const currentDay = currentDate.getDate(); 
         console.log(currentDay);
         cy.get('.react-datepicker__month').find('div').contains('1').click({force:true})
         cy.get('.react-datepicker__month').find('div').contains(currentDay).click({force:true})
         cy.wait(2000)
         cy.contains('Reset All').click()

 // Filter - Filter by Status (Active)
        cy.wait(2000)
        cy.contains("Filter by").click()
        cy.contains("Status").realHover()
       // cy.get('[Submenu_submenu__RtC6b Submenu_left__HuihD submenu-class]').should("be.visible")
        cy.wait(500)
        cy.get('[class="Item_item__azkIp itemClass"]').eq(0).realHover()
        cy.contains('Active').click()
        cy.wait(500)
        cy.contains('Apply').click()
        cy.get('[class="top-container"]').click()
        cy.wait(500)
        cy.contains('Reset All').click()

        // Filter by Status (Inactive)
        cy.wait(2000)
        cy.contains("Filter by").click()
        cy.contains("Status").realHover()
        cy.wait(500)
        cy.get('[class="Item_item__azkIp itemClass"]').eq(1).realHover()
        cy.contains('Inactive').click()
        cy.wait(500)
        cy.contains('Apply').click()        
        cy.get('[class="top-container"]').click()
        cy.wait(500)
        cy.contains('Reset All').click()

// //Filters - Filter by User type
        // Seller  
        cy.wait(2000)
        cy.contains("Filter by").click()
        cy.contains("User Type").realHover()
        //cy.wait(500)
        cy.get('[class="Item_item__azkIp itemClass"]').eq(2).realHover()
        cy.contains('Seller').click()
        cy.wait(500)
       // cy.get('[class="apply"]').find('div').eq(1).click()
       cy.get('.Submenu_left__HuihD').find('div').contains('Apply').click({force:true});
        cy.contains('Apply').click()        
        cy.get('[class="top-container"]').click()
        cy.wait(500)
        cy.contains('Reset All').click()
        // Buyer
        cy.wait(2000)
        cy.contains("Filter by").click()
        cy.contains("User Type").realHover()
        cy.wait(500)
        cy.get('[class="Item_item__azkIp itemClass"]').eq(3).realHover()
        cy.contains('Buyer').click()
        cy.wait(500)
        cy.contains('Apply').click()        
        cy.get('[class="top-container"]').click()
        cy.wait(500)
        cy.contains('Reset All').click()

//Filters - Filters by Verification    
        cy.wait(2000)
        cy.contains("Filter by").click()
        cy.contains("Verification").realHover()
        cy.wait(500)
        cy.get('[class="Item_item__azkIp itemClass"]').eq(4).realHover()
        cy.contains('Buyer Verified').click()
        cy.wait(500)
        cy.contains('Apply').click()
        cy.get('[class="top-container"]').click()
        cy.wait(500)
        cy.contains('Reset All').click()
        

    })


})