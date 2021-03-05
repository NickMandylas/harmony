import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity({ tableName: "queue" })
export class Queue {
  @Field(() => String)
  @PrimaryKey({ type: "uuid" })
  userId: string;

  @Field(() => String)
  @Property({ type: "date" })
  createdAt = new Date();
}
