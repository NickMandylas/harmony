import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ID, ObjectType } from "type-graphql";
import { v4 } from "uuid";

@ObjectType()
@Entity({ tableName: "match" })
export class Match {
  @Field(() => ID)
  @PrimaryKey({ type: "uuid" })
  id: string = v4();

  @Field(() => String)
  @Property({ type: "text", unique: true })
  user1: string;

  @Field(() => String)
  @Property({ type: "text", unique: true })
  user2: string;

  @Field(() => String)
  @Property({ type: "date" })
  createdAt = new Date();
}
