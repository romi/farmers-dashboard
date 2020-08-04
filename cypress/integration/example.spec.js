describe('My First Test', () => {
    it('example button', () => {
      cy.visit('/')
      cy.get('#btn').contains('0');
      for (let i = 0; i != 10; i ++) cy.get('#btn').click()
      cy.get('#btn').contains('10');
    })
})
