# Transaction Management Frontend (React) - Level 3

# Used cypress for testing the app created with create-react-app. Next.js is currently not used

**build a transaction management application frontend in React** that:

1. Integrates with the provided Transaction Management API to create and show transaction/account data.
2. Makes the provided E2E tests pass.



An application that allows to record financial transactions and view the transaction history. The app consists of a form for submitting transactions and a transaction list.

Transaction list displays the withdrawn or deposited amount for each transaction along with the affected account id. It also shows the current balance for the last submitted transaction.



#### Get familiar with the API

<details>
<summary>Request examples</summary>

##### Get transactions history

```
GET https://infra.devskills.app/api/accounting/transactions
```

##### Create a new transaction

```
POST https://infra.devskills.app/api/accounting/transactions
Content-Type: application/json

{
  "account_id": "0afd02d3-6c59-46e7-b7bc-893c5e0b7ac2",
  "amount": 7
}
```

##### Get a transaction by id

```
GET https://infra.devskills.app/api/accounting/transactions/7c94635a-40a3-4c87-888a-42c3ce5b9750
```

##### Get an account by id

```
GET https://infra.devskills.app/api/accounting/accounts/0afd02d3-6c59-46e7-b7bc-893c5e0b7ac2
```

</details>

#### Try running the E2E tests locally

```bash
npm install
# Run your app here
npm run test
```

