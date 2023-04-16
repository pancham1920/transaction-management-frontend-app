import { useState } from "react";
import { validate } from "uuid";
import { TransactionHistory } from "./TransactionHistory";

export const TransactionCreator = () => {
  const [valAccount, setValAccount] = useState("");
  const [valAmount, setValAmount] = useState("");
  const [balance, setBalance] = useState(0);
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [validationMsg, setValidationMsg] = useState("");

  const getTransactions = async () => {
    try {
      const response = await fetch(
        "https://infra.devskills.app/api/accounting/transactions"
      );
      let newData = await response.json();

      return newData;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const validateAccount = (val) => {
    const isValid = validate(val);
    return isValid;
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsError(false);
    setValidationMsg("");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ account_id: valAccount, amount: valAmount }),
    };

    if(!valAccount || !valAmount ) {
      setIsError(true);
      setValidationMsg("Please fill both account number and amount for submitting");
      return;
    }

    if(valAccount) {

      const isValidAcc = validateAccount(valAccount);
      if(!isValidAcc) {
        setIsError(true);
        setValAccount("");
        setValAmount("");
        setValidationMsg("Please enter valid account number");
        return;
      }
    }

    //clear form after submit
    setValAccount("");
    setValAmount("");

    //post transaction
    try {
      const response = await fetch(
        "https://infra.devskills.app/api/accounting/transactions",
        requestOptions
      );
      //const responseData = await response.json();

      //if response is 201 then call get api for getting records in transaction history
      if (response.status === 201) {
        const dataLatest = await getTransactions();
        setData(dataLatest);

        const latestData = dataLatest[0];
        if (latestData !== undefined) {
          const accountId = latestData.account_id;

          //form url for getting back account balance
          const balanceUrl = `https://infra.devskills.app/api/accounting/accounts/${accountId}`;

          try {
            const responseBalance = await fetch(balanceUrl);
            const responseBalData = await responseBalance.json();
            setBalance(responseBalData.balance);
          } catch (error) {
            console.log(error);
            return;
          }
        }
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };

  return (
    <div className="row">
      <div className="column">
        <div className="form">
          <p>Submit a new Transaction</p>
          <form id="transaction-form" onSubmit={handleSubmit}>
            <div>
              <input
                className="input"
                type="text" 
                value={valAccount}
                placeholder="Enter Account Id"
                onChange={(e) => setValAccount(e.target.value)}
                data-cy="account-id"
              />
              <br></br>
              <input
                className="input"
                type="number" 
                pattern="[0-9]*" 
                value={valAmount}
                placeholder="Enter Amount"
                onChange={(e) => setValAmount(e.target.value)}
                data-cy="amount"
              />
            </div>
            <button className="button" data-cy="transaction-submit">Submit</button>
          </form>
          {isError &&        
            <p>{validationMsg}</p> }
        </div>
      </div>
      <TransactionHistory data={data} balance={balance} />
    </div>
  );
};
