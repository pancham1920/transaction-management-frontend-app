export const TransactionHistory = (props) => {

  const firstTransaction = props.data.slice(0,1);
  const otherTransactions = props.data.slice(1, props.data.length);
  return (
    
      <div className="double-column">
        <div className="transaction-history" data-cy="transaction">
          <p>Transactions history</p>
          <ul className="list">
            {firstTransaction.map((transaction) => {
              const { transaction_id, account_id, amount } = transaction;
              return (
                <li className="list-element" key={transaction_id}>
                  <div>
                    <p data-cy="transaction-account-id">
                      Transferred ${amount} to account {account_id}
                    </p>
                    <p data-cy="transaction-balance">
                      The current account balance - ${props.balance}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
          <ul className="list">
            {otherTransactions.map((transaction) => {
              const { transaction_id, account_id, amount } = transaction;
              return (
                <li className="list-element" key={transaction_id}>
                  <div>
                    <p>
                      Transferred ${amount} to account {account_id}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    
  );
};
