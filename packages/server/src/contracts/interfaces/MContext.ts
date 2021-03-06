import { FastifyReply, FastifyRequest } from "fastify";
import { Redis } from "ioredis";
import { Connection, EntityManager, IDatabaseDriver } from "@mikro-orm/core";
import { Twilio } from "twilio";
import { RouteGenericInterface } from "fastify/types/route";
import { IncomingMessage, Server } from "http";

export interface MContext {
  request: FastifyRequest<RouteGenericInterface, Server, IncomingMessage>;
  reply: FastifyReply;
  redis: Redis;
  em: EntityManager<IDatabaseDriver<Connection>>;
  twilio: Twilio;
}
