import { FastifyReply, FastifyRequest } from "fastify";
import { Redis } from "ioredis";
import { Connection, EntityManager, IDatabaseDriver } from "@mikro-orm/core";
import { Twilio } from "twilio";

export interface MContext {
  request: FastifyRequest;
  reply: FastifyReply;
  redis: Redis;
  em: EntityManager<IDatabaseDriver<Connection>>;
  twilio: Twilio;
}
