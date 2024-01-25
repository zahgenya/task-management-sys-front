describe('template spec', () => {
  it('Creating new task', () => {
    cy.visit('http://localhost:5173/')
    cy.contains('Create New Task').click()
    cy.get('#title').type('Task 1')
    cy.get('#description').type('Description 1')
    cy.get('[data-testid="addButtonForm"]').click()
    cy.contains('Task 1')
  })
})