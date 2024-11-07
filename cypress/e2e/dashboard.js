describe('Admin Dashboard scenarios', () => {
    
     it ('Login flow with positive negative scenarios',{ pageLoadTimeout: 120000 },() =>{
         cy.visit('/')
         cy.contains('LOGIN').should('be.visible')
         // Pre-requisite Setep :Admin logged in with valid credentials
         cy.reload()
         cy.get('[type="email"]').type('tester@admin.com')
         cy.get('[type="password"]').type('Admin@123')
         cy.get('[type="button"]').contains('Sign in').click()
         cy.contains('OTP sent on tester@admin.com').should('be.visible')
         cy.contains('Verify account').should('be.visible')
         const values = ['1', '2', '3', '4', '5', '6'];
         cy.get('[inputmode="text"]').each(($input, index) => {
         cy.wrap($input).type(values[index]);})
         cy.get('[type="button"]').contains('Submit').click()
         cy.contains("Dashboard").should('be.visible')
        
         // TC 1 : Verify dashboard details
         cy.contains('Select date').should('be.visible')
         cy.contains('Total product sold').should('be.visible')
         cy.contains('Total Orders').should('be.visible')
         cy.contains('Total Users').should('be.visible')
         cy.contains('Existing Users').should('be.visible')
         cy.contains('Cards Status by date').should('be.visible') 
         cy.contains('New & Existing Users').should('be.visible')
         cy.contains('Total orders').should('be.visible') 
         cy.contains('Total Earnings').should('be.visible') 
          
         // TC 2 : Verify tooltip information
         cy.get('[data-testid="InfoIcon"]').eq(0).trigger('mouseover')
         cy.contains('No. of products with successful payment').should('be.visible')
         cy.get('[data-testid="InfoIcon"]').eq(1).trigger('mouseover')
         cy.contains('No. of successful bid placed').should('be.visible')
         cy.get('[data-testid="InfoIcon"]').eq(2).trigger('mouseover')
         cy.contains('No. of users resgistered').should('be.visible')
         cy.get('[data-testid="InfoIcon"]').eq(3).trigger('mouseover')
         cy.contains('New users registered within selected days').should('be.visible')
         cy.get('[data-testid="InfoIcon"]').eq(4).trigger('mouseover')
         cy.contains('No. of users registered before selected days').should('be.visible')
         cy.get('[data-testid="InfoIcon"]').eq(5).trigger('mouseover')
         cy.contains('Showing comparision of sold and uploaded cards').should('be.visible')
         cy.get('[data-testid="InfoIcon"]').eq(6).trigger('mouseover')
         cy.contains('Showing comparision of new and existing users').should('be.visible')
         cy.get('[data-testid="InfoIcon"]').eq(7).trigger('mouseover')
         cy.contains('Showing No. of bids placed on selected timeline').should('be.visible')
         cy.get('[data-testid="InfoIcon"]').eq(8).trigger('mouseover')
         cy.contains('Showing total earnings on selected timeline').should('be.visible')

         // TC 3 : Verify date filter options 
         cy.get('[class="custom-select form-control"]').select('Past 30 days')

                        
         //TC 4 : Verify when past 30 days filters gets applied
         cy.get('[class="custom-select form-control"]').select('Custom date')
         cy.get('[type="text"]').click() 
         const currentDate = new Date();
         const currentDay = currentDate.getDate(); 
         console.log(currentDay);
         cy.get('.react-datepicker__month').find('div').contains('1').click({force:true})
         cy.get('.react-datepicker__month').find('div').contains(currentDay).click({force:true})

        
     })
    })