import Link from "next/link";
import Layout from "../components/Layout";
import { useForm } from "react-hook-form";

interface MobileFormData {
  Mobile_Number: string;
}

interface SecurityFormData {
  Security_Code: string;
}

const MobileNumberForm = () => {
  const { register, handleSubmit, errors } = useForm<MobileFormData>({
    mode: "onChange",
  });
  const onSubmit = handleSubmit(({ Mobile_Number }) => {
    console.log(Mobile_Number);
  });
  return (
    <>
      <form action="" className="space-y-6" onSubmit={onSubmit}>
        <div>
          <label htmlFor="" className="text-sm font-bold text-gray-600 block">
            Mobile Number
          </label>
          <input
            ref={register({
              required: true,
              minLength: 10,
              maxLength: 20,
            })}
            style={{ borderColor: errors.Mobile_Number ? "red" : "" }}
            name="Mobile_Number"
            type="text"
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
          {errors.Mobile_Number && "Your mobile Number is invalid"}
        </div>
        <div>
          <button className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 rounded-md text-white text-md">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

const SecurityCode = () => {
  const { register, handleSubmit, errors } = useForm<SecurityFormData>({
    mode: "onChange",
  });
  const onSubmit = handleSubmit(({ Security_Code }) => {
    console.log(Security_Code);
  });

  return (
    <>
      <form action="" className="space-y-6" onSubmit={onSubmit}>
        <div>
          <label htmlFor="" className="text-sm font-bold text-gray-600 block">
            Security Code
          </label>
          <input
            ref={register({
              required: true,
              minLength: 10,
              maxLength: 20,
            })}
            style={{ borderColor: errors.Security_Code ? "red" : "" }}
            type="text"
            name="Security_Code"
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
          {errors.Security_Code && "Your Security_Code is invalid"}
        </div>

        <div>
          <button className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 rounded-md text-white text-md">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

const IndexPage = () => {
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      {/* <h1 className="text-green-500 front-bold text-center ">Welcome to Harmony👋</h1> */}
      <div className="min-h-screen flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto">
          {/* <div className="text-center front-medium text-xl">bulla</div> */}
          <div className="text-3xl front-bold text-gray-900 mt-2 text-center">
            Registration
          </div>
        </div>

        <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300">
          <MobileNumberForm />
          <SecurityCode />
        </div>
      </div>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
    </Layout>
  );
};

export default IndexPage;
