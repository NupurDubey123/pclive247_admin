describe('Login flow with positive negative scenarios', () => {
    // beforeEach(() => {
         
    // })
     it ('Login flow with positive negative scenarios',{ pageLoadTimeout: 120000 },() =>{
         cy.visit('https://qa-admin.pclive247.com/')
         cy.contains('LOGIN').should('be.visible')
         
         //TC 1 : Verify login fields 
         cy.get('[type="email"]').should('be.visible')
         cy.get('[type="password"]').should('be.visible')

         //TC 2 : Verify when no credentials entered
         cy.get('[type="button"]').contains('Sign in').click()

        //TC 3 : Verify Login with invalid email & invalid password
        cy.reload()
        cy.get('[type="email"]').type('test@admin')
        cy.get('[type="password"]').type('Admin')
        cy.get('[type="button"]').contains('Sign in').click()
        cy.contains('Please enter valid registered email ID').should('be.visible')
       
        //TC 4 : Verify Login with valid email & invalid password
        cy.reload()  
        cy.get('[type="email"]').type('tester@admin.com')
        cy.get('[type="password"]').type('Admin')
        cy.get('[type="button"]').contains('Sign in').click()
         
        //TC 5 : Verify Login with invalid email & valid password
        cy.reload()
        cy.get('[type="email"]').type('tester@admin.in')
        cy.get('[type="password"]').type('Admin@123')
        cy.get('[type="button"]').contains('Sign in').click()

        //TC 6 : Verify when Authoried Admin logged in with valid credentials
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
         //cy.get('.collapse > .navbar-nav > :nth-child(1) > .nav-link')
     })
    })