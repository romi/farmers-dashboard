const Get = async url => (await fetch(url, { method: 'GET' })).json();

// TODO: implement real randArr when the API was complete and more stable
// const randArr = arr => arr[Math.round(Math.random() * (arr.length - 1))]
const randArr = arr => arr[0];

let Romi = { farms: [], crops: [], scans: [] }

before(async () => {
  const farms = (await Get('https://db.romi-project.eu/api/farms')).map(({ id }) => id);
  const crops = [].concat(
    ...((await Promise.all(farms.map(async id => Get(`https://db.romi-project.eu/api/farms/${id}`))))
      .filter(({ crops }) => crops.length > 0)
      .map(({ crops }) => crops))
  ).map(({ id }) => id);
  const scans = [].concat(
    ...((await Promise.all(crops.map(async id => Get(`https://db.romi-project.eu/api/crops/${id}`))))
      .map(({ scans }) => scans))
  ).map(({ id }) => id);

  Romi = { farms, crops, scans };
})

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
    cy.visit(`/farm/${randArr(Romi.farms)}`);
    cy.get('#navbar-farm');
  });
});

describe('Routing Zone', () => {
  it('Test the navigation from a homepage', () => {
    cy.contains('Chatelain').click();
    cy.url().should('include', '/farm/');
    cy.contains('lettuce').click();
    cy.url().should('include', '/crop/');
    cy.get('#navbar-crop');
  });

  it('Test the navigation from farm page', () => {
    cy.visit(`/farm/${randArr(Romi.farms)}`);
    cy.contains('lettuce').click();
    cy.url().should('include', '/crop/');
    cy.get('#navbar-crop');
  });

  it('Test the navigation if you enter a wrong crop id on URL', () => {
    cy.visit('/crop/invalid');
    cy.contains('An invalid ID was provided');
  });

  it('Test the navigation if you enter a valid crop id URL', () => {
    cy.visit(`/crop/${randArr(Romi.crops)}`);
    cy.get('#navbar-crop');
  });
});

describe('Routing Plant', () => {
  it('Test the navigation if you enter a wrong plant id on URL', () => {
    cy.visit('/plant/invalid');
    cy.contains('An invalid ID was provided');
  });

  it('Test the navigation if you enter a valid plant id URL', () => {
    cy.visit(`/plant/${randArr(Romi.scans)}`);
    cy.get('#navbar-plant');
  });
});

describe('Routing From Navbar', () => {
  it('Test the navbar navigation: Plant to Crop', () => {
    cy.visit(`/plant/${randArr(Romi.scans)}`);
    cy.get('#navbar-plant').get('#nav-to-crop').click();
    cy.get('#navbar-crop');
  });

  it('Test the navbar navigation: Plant to Farm', () => {
    cy.visit(`/plant/${randArr(Romi.scans)}`);
    cy.get('#navbar-plant').get('#nav-to-farm').click();
    cy.get('#navbar-farm');
  });

  it('Test the navbar navigation: Plant to Homepage', () => {
    cy.visit(`/plant/${randArr(Romi.scans)}`);
    cy.get('#navbar-plant').get('#nav-to-home').click();
    cy.get('#homepage-logo');
  });

  it('Test the navbar navigation: Plant to Homepage (w/ invalid id)', () => {
    cy.visit('/plant/invalid');
    cy.get('#navbar').get('#nav-to-home').click();
    cy.get('#homepage-logo');
  });

  it('Test the navbar navigation: Crop to Farm', () => {
    cy.visit(`/crop/${randArr(Romi.crops)}`);
    cy.get('#navbar-crop').get('#nav-to-farm').click();
    cy.get('#navbar-farm');
  });

  it('Test the navbar navigation: Crop to Homepage', () => {
    cy.visit(`/crop/${randArr(Romi.crops)}`);
    cy.get('#navbar-crop').get('#nav-to-home').click();
    cy.get('#homepage-logo');
  });

  it('Test the navbar navigation: Crop to Homepage (w/ invalid id)', () => {
    cy.visit('/crop/invalid');
    cy.get('#navbar').get('#nav-to-home').click();
    cy.get('#homepage-logo');
  });

  it('Test the navbar navigation: Farm to Homepage', () => {
    cy.visit(`/farm/${randArr(Romi.farms)}`);
    cy.get('#navbar-farm').get('#nav-to-home').click();
    cy.get('#homepage-logo');
  });

  it('Test the navbar navigation: Farm to Homepage (w/ invalid id)', () => {
    cy.visit('/farm/invalid');
    cy.get('#navbar').get('#nav-to-home').click();
    cy.get('#homepage-logo');
  });
});
