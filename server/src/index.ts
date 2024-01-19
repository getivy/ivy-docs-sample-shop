import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import morgan from "morgan";

dotenv.config();

const IVY_API_URL = process.env.IVY_API_URL;
const PORT = process.env.PORT;
const IVY_API_KEY = process.env.IVY_API_KEY ?? "secret";
const MERCHANT_APP_ID = process.env.MERCHANT_APP_ID;

const CONFIG = {
  headers: {
    "content-type": "application/json",
    "X-Ivy-Api-Key": IVY_API_KEY,
  },
};

const app = express();

app.use(cors());

app.use(morgan("dev"));

app.use(express.json());

app.use(express.static("public"));

app.post("/checkout", async (req: Request, res: Response) => {
  try {
    const price = req.body?.price;

    if (!price) {
      res.status(400).send("No price provided");
      return;
    }

    const response = await axios.post(
      `${IVY_API_URL}/service/checkout/session/create`,
      {
        referenceId: Date.now().toString(),
        price,
        guest: true,
        successCallbackUrl: "http://localhost:5173?success=true",
        errorCallbackUrl: "http://localhost:5173?error=true",
      },
      CONFIG
    );

    res.set("Content-Type", "application/json");
    res.send({
      ivyCheckoutUrl: response.data.redirectUrl,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to create Ivy checkout session");
  }
});

app.delete(
  "/webhook-subscription/:hookId",
  async (req: Request, res: Response) => {
    const hookId = req.params.hookId;
    try {
      if (!hookId) {
        res.status(400).send("No hookId provided");
        return;
      }

      const response = await axios.post(
        `${IVY_API_URL}/webhook-subscription/delete`,
        {
          id: hookId,
        },
        CONFIG
      );

      res.status(response.status).end();
    } catch (error) {
      console.error(error);
      res.status(500).send(`Failed to delete webhook with id ${hookId}`);
    }
  }
);

app.post("/webhook-subscription", async (req: Request, res: Response) => {
  const url = req.body.url;
  const eventType = req.body.eventType;

  try {
    if (!url || !eventType) {
      res.status(400).send("No url and/or eventType provided");
      return;
    }

    const response = await axios.post(
      `${IVY_API_URL}/webhook-subscription/create`,
      {
        url: url,
        events: [eventType],
        merchantAppId: MERCHANT_APP_ID,
      },
      CONFIG
    );

    res.status(response.status).send(response.statusText);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(`Failed to create webhook of type ${eventType} for url ${url}`);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
