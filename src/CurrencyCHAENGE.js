import { useEffect, useState } from "react";

export default function CurrencyChalenge() {
  const [amount, setAmount] = useState(1);
  const [firstCurrency, setFirstCurrency] = useState("USD");
  const [secondCurrency, setSecondCurrency] = useState("EUR");
  const [output, setOutput] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      if (amount >= 1) {
        async function getCurrencies() {
          setIsLoading(true);

          const responce = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${firstCurrency}&to=${secondCurrency}`
          );
          const data = await responce.json();

          setOutput(Object.values(data.rates)[0]);
          setIsLoading(false);
        }

        getCurrencies();
      } else {
        setOutput("Amount not entered");
      }
    },
    [amount, firstCurrency, secondCurrency]
  );

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        disabled={isLoading}
      />
      <select
        onChange={(e) => setFirstCurrency(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD" selected>
          USD
        </option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        onChange={(e) => setSecondCurrency(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR" selected>
          EUR
        </option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>

      <p>
        {output} {amount >= 1 && secondCurrency}
      </p>
    </div>
  );
}
