describe('My First Test', () => {
    it('example', () => {
      cy.visit('/test')
      cy.contains('404 Error Not Found')
    })
})
