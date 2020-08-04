describe('My First Test', () => {
    it('example', () => {
      cy.visit('/')
      cy.contains('Farmers Dashboard')
    })
})
