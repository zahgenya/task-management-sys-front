describe('test for dialog form', () => {
  it('Creating new task', () => {
    cy.visit('http://localhost:5173/')
    cy.contains('Create New Task').click()
    cy.get('#title').type('Task 1')
    cy.get('#description').type('Description 1')
    cy.get('[data-testid="addButtonForm"]').click()
    cy.contains('Task 1')
  })

  it('test for buttons', () => {
    cy.visit('http://localhost:5173/')
    cy.get('#inProgressButton').click()
    cy.get('#finishedButton').click()
    cy.get('#deleteButton').click()
    cy.contains('Task 1').should('not.exist')
  })
})