import crypto from "crypto";
import { MContext } from "contracts/interfaces/MContext";
import { User } from "entities/User";
import { Resolver, Query, Mutation, Arg, Ctx } from "type-graphql";

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return "bye";
  }

  @Mutation(() => Boolean)
  async loginRequest(
    @Arg("mobile") mobile: string,
    @Ctx() { em, twilio, redis }: MContext,
  ): Promise<Boolean> {
    // Check for valid mobile number.
    try {
      const validate = await twilio.lookups.v1
        .phoneNumbers(mobile)
        .fetch({ type: ["carrier"] });

      if (validate.carrier.type != "mobile") {
        return false; // TODO - Add specific response code for non-mobile.
      }

      if (validate.countryCode != "AU") {
        return false; // TODO - Add specific response code for non-AU.
      }
    } catch (err) {
      return false;
    }

    // Check if user isn't banned.
    const user = await em.findOne(User, { mobile });

    if (user && user.banned) {
      return false;
    }

    // Send SMS Token
    const token = crypto.randomInt(100000, 999999).toString();
    redis.set("user-login-request:" + token, mobile, "ex", 60 * 60 * 1);

    const message = `🎶 Your token is ${token}`;
    await twilio.messages
      .create({
        body: message,
        from: process.env.TWILIO_HARMONY_SID,
        to: mobile,
      })
      .then((res) => console.log(res));

    return true;
  }

  @Mutation(() => Boolean)
  async loginConfirmation(
    @Arg("mobile") mobile: string,
    @Arg("token") token: string,
    @Ctx() { request, em, redis }: MContext,
  ): Promise<Boolean> {
    const rMobile = await redis.get("user-login-request:" + token);
    if (rMobile && mobile === rMobile) {
      redis.del(["user-login-request:" + token]);
      const user = em.create(User, { mobile });
      await em.persistAndFlush(user);

      request.session.userId = user.id;

      return true;
    }
    return false;
  }
}
