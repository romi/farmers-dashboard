describe('Home Routing', () => {
    it('Test the presence of a homepage', () => {
      cy.get('#homepage-logo')
    })
});

describe('Routing Farm', () => {
  it('Test the navigation from a homepage', () => {
    cy.contains('Chatelain').click();
    cy.url().should('include', '/farm/');
    cy.get('#navbar-farm');
  });
  it('Test the navigation if you enter a wrong farm id on URL', () => {
    cy.visit('/farm/123456789');
    cy.contains('An invalid ID was provided');
  });
  it('Test the navigation if you enter a valid farm id URL', () => {
    cy.visit('/farm/55d24ee2-4d44-443e-ae98-c8f2f69938cc');
    cy.contains('testzone_rails');
    cy.get('#navbar-farm');
  });
});

describe('Routing Zone', () => {
  it('Test the navigation from farm page', () => {
    cy.visit('/farm/55d24ee2-4d44-443e-ae98-c8f2f69938cc');
    cy.contains('testzone_rails').click();
    cy.url().should('include', '/zone/');
    cy.get('#navbar-zone');
  });
  it('Test the navigation if you enter a wrong zone id on URL', () => {
    cy.visit('/zone/123456789');
    cy.contains('An invalid ID was provided');
  });
  it('Test the navigation if you enter a valid zone id URL', () => {
    cy.visit('/zone/3c4f00bb-4687-48a5-9f9e-b23b72e02d60');
    cy.get('#navbar-zone');
  });
});

describe('Routing Plant', () => {
  it('Test the navigation if you enter a wrong zone id on URL', () => {
    cy.visit('/plant/123456789');
    cy.contains('An invalid ID was provided');
  });
  it('Test the navigation if you enter a valid zone id URL', () => {
    cy.visit('/plant/b207e6a0-78cc-4c89-8a23-968b4475f34f');
    cy.get('#navbar-plant');
  });
});
