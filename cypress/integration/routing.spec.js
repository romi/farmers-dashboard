describe('Home Routing', () => {
    it('Test the presence of a homepage', () => {
      cy.get('#homepage-logo');
    })
});

describe('Routing Farm', () => {
  it('Test the navigation from a homepage', () => {
    cy.contains('Chatelain').click();
    cy.url().should('include', '/farm/');
    cy.get('#navbar-farm');
  });

  it('Test the navigation if you enter a wrong farm id on URL', () => {
    cy.visit('/farm/invalid');
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

  it('Test the navigation if you enter a wrong crop id on URL', () => {
    cy.visit('/crop/invalid');
    cy.contains('An invalid ID was provided');
  });

  it('Test the navigation if you enter a valid crop id URL', () => {
    cy.visit('/crop/984d1e84-cc6d-4b42-b7bd-e7318c177ed8');
    cy.get('#navbar-crop');
  });
});

describe('Routing Plant', () => {
  it('Test the navigation if you enter a wrong plant id on URL', () => {
    cy.visit('/plant/invalid');
    cy.contains('An invalid ID was provided');
  });
  
  it('Test the navigation if you enter a valid plant id URL', () => {
    cy.visit('/plant/442fbf27-97ca-40f5-acff-c1cb5e7e9452');
    cy.get('#navbar-plant');
  });
});

describe('Routing From Navbar', () => {
  it('Test the navbar navigation: Plant to Crop', () => {
    cy.visit('/plant/442fbf27-97ca-40f5-acff-c1cb5e7e9452');
    cy.get('#navbar-plant').get('#nav-to-crop').click();
    cy.get('#navbar-crop');
  });

  it('Test the navbar navigation: Plant to Farm', () => {
    cy.visit('/plant/442fbf27-97ca-40f5-acff-c1cb5e7e9452');
    cy.get('#navbar-plant').get('#nav-to-farm').click();
    cy.get('#navbar-farm');
  });

  it('Test the navbar navigation: Plant to Homepage', () => {
    cy.visit('/plant/442fbf27-97ca-40f5-acff-c1cb5e7e9452');
    cy.get('#navbar-plant').get('#nav-to-home').click();
    cy.get('#homepage-logo');
  });

  it('Test the navbar navigation: Plant to Homepage (w/ invalid id)', () => {
    cy.visit('/plant/invalid');
    cy.get('#navbar').get('#nav-to-home').click();
    cy.get('#homepage-logo');
  });

  it('Test the navbar navigation: Crop to Farm', () => {
    cy.visit('/crop/984d1e84-cc6d-4b42-b7bd-e7318c177ed8');
    cy.get('#navbar-crop').get('#nav-to-farm').click();
    cy.get('#navbar-farm');
  });

  it('Test the navbar navigation: Crop to Homepage', () => {
    cy.visit('/crop/984d1e84-cc6d-4b42-b7bd-e7318c177ed8');
    cy.get('#navbar-crop').get('#nav-to-home').click();
    cy.get('#homepage-logo');
  });

  it('Test the navbar navigation: Crop to Homepage (w/ invalid id)', () => {
    cy.visit('/crop/invalid');
    cy.get('#navbar').get('#nav-to-home').click();
    cy.get('#homepage-logo');
  });

  it('Test the navbar navigation: Farm to Homepage', () => {
    cy.visit('/farm/2f536d58-7ef2-4543-8e58-f06a71f26a85');
    cy.get('#navbar-farm').get('#nav-to-home').click();
    cy.get('#homepage-logo');
  });

  it('Test the navbar navigation: Farm to Homepage (w/ invalid id)', () => {
    cy.visit('/farm/invalid');
    cy.get('#navbar').get('#nav-to-home').click();
    cy.get('#homepage-logo');
  });
});
