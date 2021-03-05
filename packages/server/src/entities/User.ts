import {
  Collection,
  Entity,
  Enum,
  OneToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import { v4 } from "uuid";
import { Conversation } from "./Conversation";

export enum UserStatus {
  STANDBY = "standby",
  IN_QUEUE = "in-queue",
  MATCHED = "matched",
}

@ObjectType()
@Entity({ tableName: "user" })
export class User {
  @Field(() => ID)
  @PrimaryKey({ type: "uuid" })
  id: string = v4();

  @Field(() => String)
  @Property({ type: "text", unique: true })
  mobile: string;

  @Field(() => UserStatus)
  @Enum(() => UserStatus)
  status = UserStatus.STANDBY;

  @Field(() => Boolean)
  @Property({ type: "boolean" })
  banned = false;

  @Field(() => String)
  @Property({ type: "date" })
  createdAt = new Date();

  @Field(() => [Conversation])
  @OneToMany(() => Conversation, (conversation) => conversation.user)
  conversation = new Collection<Conversation>(this);
}

registerEnumType(UserStatus, {
  name: "UserStatus",
  description: "Current status of the user in app.",
});
