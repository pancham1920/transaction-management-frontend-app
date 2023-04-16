// DO NOT CHANGE THIS FILE!

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

describe('Transaction Management Frontend - Level 3', () => {
  it(
    'passes', () => {
    cy.visit('localhost:3000')
  

  // submit a transaction & verify the position on the list
  const accountId = uuid()
  const amount = 30
  const balance = 30
  cy.get('[data-cy="account-id"]').type(accountId)
  cy.get('[data-cy="amount"]').type(amount)
  cy.get('[data-cy="transaction-submit"]').click()
  cy.get('[data-cy="transaction-account-id"]').contains(`${accountId}`)
  cy.get('[data-cy="transaction-balance"]').contains(`${balance}`)

  // submit a new transaction to the same account and verify the balance
  const newAmount = 7
  const newBalance = 37
  cy.get('[data-cy="transaction-submit"]').click()
  cy.get('[data-cy="transaction-account-id"]').contains(`${accountId}`)
  cy.get('[data-cy="transaction-balance"]').should('exist')

  // submit another transaction & verify the position on the list
  const anotherAccountId = uuid()
  const anotherAmount = 7
  const anotherBalance = 7
  cy.get('[data-cy="account-id"]').type(anotherAccountId)
  cy.get('[data-cy="amount"]').type(anotherAmount)
  cy.get('[data-cy="transaction-submit"]').click()
  cy.get('[data-cy="transaction-account-id"]').contains(`${anotherAccountId}`)
  cy.get('[data-cy="transaction-balance"]').contains(`${anotherBalance}`)

  const negativeAmount = -5
  const negativeBalance = 2
  cy.get('[data-cy="account-id"]').type(anotherAccountId)
  cy.get('[data-cy=amount]').type(negativeAmount)
  cy.get('[data-cy=transaction-submit]').click()
  cy.get('[data-cy="transaction-account-id"]').contains(`${anotherAccountId}`)
  cy.get('[data-cy="transaction-balance"]').contains(`${anotherBalance}`)

  })

  it('The app can handle invalid user input', () => {
    cy.visit('localhost:3000')

    // invalid account_id
    const invalidAccountId = 123
    const invalidAccountIdAmount = 12
    cy.get('[data-cy="account-id"]').type(invalidAccountId)
    cy.get('[data-cy="amount"]').type(invalidAccountIdAmount)
    cy.get('[data-cy="transaction-submit"]').click({force: true})
    cy.get('[data-cy="transaction-account-id"]').should('not.exist')

    const invalidAmountAccountId = uuid()
    const invalidAmount = 'abc'
    cy.get('[data-cy="account-id"]').type(invalidAmountAccountId)
    // invalid amount
    cy.get('[data-cy="amount"]').type(invalidAmount)
    cy.get('[data-cy="transaction-submit"]').click({force: true})
    cy.get('[data-cy="transaction-account-id"]').should('not.exist')
    
  })

})