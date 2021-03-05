import fastifySession from "fastify-session";
import connectRedis from "connect-redis";
import { Constants, Redis } from "utils";
import { RedisClient } from "redis";

const RedisStore = connectRedis(fastifySession as any);

export const store = new RedisStore({
  client: (Redis() as unknown) as RedisClient,
});

export const config: fastifySession.Options = {
  store: store,
  cookieName: "qid",
  secret:
    process.env.SESSION_SECRET ||
    "hellounihackjudgeshopeyoureadthisandfindthistobereallysecureindevelopment",
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    domain: Constants.__prod__ ? ".outplay.com.au" : "",
    secure: Constants.__prod__,
    maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
  },
};
