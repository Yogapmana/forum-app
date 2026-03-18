describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should display login page correctly', () => {
    // assert
    cy.get('h1').contains('Login').should('be.visible');
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button[type="submit"]').contains('Login').should('be.visible');
  });

  it('should display alert when email is empty', () => {
    // action
    cy.get('button[type="submit"]').click();

    // assert
    cy.get('input[type="email"]').invoke('prop', 'validationMessage').should('not.be.empty');
  });

  it('should display alert when password is empty', () => {
    // action
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('button[type="submit"]').click();

    // assert
    cy.get('input[type="password"]').invoke('prop', 'validationMessage').should('not.be.empty');
  });

  it('should login successfully and redirect to homepage', () => {
    // arrange
    cy.intercept('POST', '**/login', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'ok',
        data: {
          token: 'fake-token',
        },
      },
    }).as('loginRequest');

    cy.intercept('GET', '**/users/me', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'ok',
        data: {
          user: {
            id: 'user-123',
            name: 'John Doe',
            email: 'test@example.com',
            avatar: 'https://ui-avatars.com/api/?name=John+Doe',
          },
        },
      },
    }).as('profileRequest');

    // action
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    // wait for network
    cy.wait('@loginRequest');
    cy.wait('@profileRequest');

    // assert
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });
});
