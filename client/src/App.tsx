import "./App.css";

import { useEffect, useState } from "react";

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

const CheckoutDemo = () => {
  const isSuccess = window.location.search.includes("success=true");
  const isError = window.location.search.includes("error=true");

  useScript("https://cdn.getivy.de/button.js");

  const createCheckout = async () => {
    await axios
      .post(`${BASE_URL}/checkout`, {
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
        data-cart-value="119"
        data-currency-code="EUR"
        data-locale="en"
        data-mode="cashback"
        onClick={createCheckout}
      ></button>
    </div>
  );
};

const webhookEvents = [
  "test",
  "merchant_updated",
  "merchant_app_updated",
  "order_created",
  "order_updated",
  "refund_succeeded",
  "refund_failed",
  "payout_report_requested",
  "data_session_completed",
  "checkout_session_created",
  "checkout_session_updated",
  "checkout_session_expired",
  "checkout_session_completed",
  "payout_created",
  "payout_updated",
] as const;

type WebhookEvent = (typeof webhookEvents)[number];

const WebhookDemo = () => {
  const [webhookUrl, setWebhookUrl] = useState("");
  const [subscribedWebhooks, setSubscribedWebhooks] = useState([]);
  const [hookId, setHookId] = useState("");

  const listWebhooks = async () => {};

  const createWebhook = async (event: any) => {
    const form = new FormData(document.getElementById("createForm"));
    const data = Object.fromEntries(form.entries());

    event.preventDefault();
    console.log("called create webhook", data);

    const success = await axios.post(`${BASE_URL}/webhook-subscription`, {
      eventType: data.event,
      url: data.url,
    });

    return success.status == 200;
  };

  const deleteWebhook = async (event: any) => {
    const form = new FormData(document.getElementById("deleteForm"));
    const data = Object.fromEntries(form.entries());

    event.preventDefault();
    console.log("called delete webhook", data);

    const success = await axios.delete(
      `${BASE_URL}/webhook-subscription/${data.deleteId}`
    );
    return success.status == 200;
  };

  // create webhook subscription
  // show list of all webhook subscriptions
  // delete webhook subscription
  // update webhook subscription

  // trigger webhook + dropdown to select which one
  // show subscribed webhook events
  // only subscribed webhook events can be triggered

  const triggerWebhook = async () => {
    await axios.post(`${BASE_URL}/webhook/trigger/${hookId}`);
  };

  const triggerTestWebhook = async () => {
    await axios
      .post(`${BASE_URL}/webhook/test`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h2>Webhook</h2>
      <h3>Subscribed Webhooks</h3>
      <ul>
        {subscribedWebhooks.length < 1 ? (
          <p>No webhooks subscribed</p>
        ) : (
          subscribedWebhooks.map((webhook) => <li>{webhook}</li>)
        )}
      </ul>
      <h3>Create Webhook</h3>
      <form onSubmit={createWebhook} id="createForm">
        <input type="text" placeholder="Webhook URL" name="url" id="url" />
        <select name="event" id="event">
          {webhookEvents.map((event) => (
            <option value={event}>{event}</option>
          ))}
        </select>
        <button className="primary">Create Webhook</button>
      </form>
      {webhookUrl && <p>Webhook URL: {webhookUrl}</p>}
      <h3>Trigger Webhook</h3>
      <form onSubmit={triggerWebhook} id="triggerForm">
        <input
          type="text"
          placeholder="Webhook ID"
          name="triggerId"
          id="triggerId"
          value={hookId}
          onChange={(e) => setHookId(e.target.value)}
        />
        <button className="primary">Trigger Webhook</button>
      </form>
      <h3>Delete Webhook</h3>
      <form onSubmit={deleteWebhook} id="deleteForm">
        <input
          type="text"
          placeholder="Webhook ID"
          name="deleteId"
          id="deleteId"
          value={hookId}
          onChange={(e) => setHookId(e.target.value)}
        />
        <button className="primary" type="submit">
          Delete Webhook
        </button>
      </form>
      <h3>Trigger Test Webhook</h3>
      <button className="primary" onClick={triggerTestWebhook}>
        Trigger Test Webhook
      </button>
    </div>
  );
};

const App = () => {
  const [activeTab, setActiveTab] = useState("checkout");

  return (
    <div>
      <div className="tab-bar">
        <button
          className={activeTab === "checkout" ? "tab active" : "tab"}
          onClick={() => setActiveTab("checkout")}
        >
          Checkout Demo
        </button>
        <button
          className={activeTab === "webhook" ? "tab active" : "tab"}
          onClick={() => setActiveTab("webhook")}
        >
          Webhook Demo
        </button>
      </div>
      <hr />
      {activeTab === "checkout" && <CheckoutDemo />}
      {activeTab === "webhook" && <WebhookDemo />}
    </div>
  );
};

export default App;
