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
    cy.visit('/farm/2f536d58-7ef2-4543-8e58-f06a71f26a85');
    cy.get('#navbar-farm');
  });
});

describe('Routing Zone', () => {
  it('Test the navigation from farm page', () => {
    cy.visit('/farm/2f536d58-7ef2-4543-8e58-f06a71f26a85');
    cy.contains('lettuce').click();
    cy.url().should('include', '/crop/');
    cy.get('#navbar-crop');
  });
  it('Test the navigation if you enter a wrong zone id on URL', () => {
    cy.visit('/crop/123456789');
    cy.contains('An invalid ID was provided');
  });
  it('Test the navigation if you enter a valid zone id URL', () => {
    cy.visit('/zone/984d1e84-cc6d-4b42-b7bd-e7318c177ed8');
    cy.get('#navbar-crop');
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
