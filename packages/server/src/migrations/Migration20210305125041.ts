import { Migration } from '@mikro-orm/migrations';

export class Migration20210305125041 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" uuid not null, "mobile" text not null, "status" text check ("status" in (\'standby\', \'in-queue\', \'matched\')) not null, "created_at" timestamptz(0) not null);');
    this.addSql('alter table "user" add constraint "user_pkey" primary key ("id");');
    this.addSql('alter table "user" add constraint "user_mobile_unique" unique ("mobile");');

    this.addSql('create table "queue" ("user_id" uuid not null, "created_at" timestamptz(0) not null);');
    this.addSql('alter table "queue" add constraint "queue_pkey" primary key ("user_id");');

    this.addSql('create table "match" ("id" uuid not null, "user1" text not null, "user2" text not null, "created_at" timestamptz(0) not null);');
    this.addSql('alter table "match" add constraint "match_pkey" primary key ("id");');
    this.addSql('alter table "match" add constraint "match_user1_unique" unique ("user1");');
    this.addSql('alter table "match" add constraint "match_user2_unique" unique ("user2");');

    this.addSql('create table "conversation" ("id" uuid not null, "user_id" uuid not null, "notes" text null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "conversation" add constraint "conversation_pkey" primary key ("id");');

    this.addSql('alter table "conversation" add constraint "conversation_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
  }

}
