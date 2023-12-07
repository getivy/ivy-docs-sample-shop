import "./App.css";

import { useEffect } from "react";

import axios from "axios";

const BASE_URL = "http://localhost:3001";

const useScript = (url: string) => {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = url;
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [url]);
};

const App = () => {
  const isSuccess = window.location.search.includes("success=true");
  const isError = window.location.search.includes("error=true");

  useScript("https://cdn.getivy.de/button.js");

  const createCheckout = async () => {
    await axios
      .post(`${BASE_URL}/checkout/create`, {
        price: {
          totalNet: 100,
          vat: 19,
          total: 119,
          currency: "EUR",
        },
      })
      .then((res) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        startIvyCheckout(res.data.ivyCheckoutUrl);
      });
  };

  return (
    <div>
      {isSuccess && <p>Your previous payment was successful!</p>}
      {isError && <p>Your previous payment failed!</p>}
      <h2>Checkout</h2>
      <p>List of other payment methods...</p>
      <button
        className="ivy-checkout-button"
        data-cart-value="399.99"
        data-currency-code="EUR"
        data-locale="en"
        data-mode="cashback"
        onClick={createCheckout}
      ></button>
    </div>
  );
};

export default App;
