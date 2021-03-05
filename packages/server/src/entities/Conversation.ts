import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ID, ObjectType } from "type-graphql";
import { v4 } from "uuid";
import { User } from "./User";

@ObjectType()
@Entity({ tableName: "conversation" })
export class Conversation {
  @Field(() => ID)
  @PrimaryKey({ type: "uuid" })
  id: string = v4();

  @Field(() => User)
  @ManyToOne({ entity: () => User })
  user: User;

  @Field(() => String)
  @Property({ type: "text", nullable: true })
  notes: string;

  @Field(() => String)
  @Property({ type: "date" })
  createdAt = new Date();

  @Field(() => String)
  @Property({ onUpdate: () => new Date(), type: "date" })
  updatedAt = new Date();
}
