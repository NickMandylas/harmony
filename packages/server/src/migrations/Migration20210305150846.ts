import { Migration } from '@mikro-orm/migrations';

export class Migration20210305150846 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "banned" bool not null;');
  }

}
