import { useState } from "react";
import logoTaskMaster from "../assets/Logo Task Master.png";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email must contain at least 1 character(s)" })
    .max(255, { message: "Email is too long" })
    .email({ message: "Invalid Email format" }),
  password: z
    .string()
    .min(8, { message: "Password must contain at least 8 character(s)" })
    .max(64, { message: "Password must contain at most 64 character(s)" })
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-b]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character"),
});

type SignInSchema = z.infer<typeof signInSchema>;

const LoginPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  const handleShowPassword = () => {
    setIsShowPassword((state) => !state);
  };

  const handleSignInUser = (values: SignInSchema) => {
    alert("Form Submitted!");
    console.log(values);
  };

  return (
    <>
      <div className="box-border flex justify-center items-center flex-col w-full h-lvh font-lexend bg-stone-100">
        <div className="shadow-2xl flex justify-center items-center flex-col w-1/3 p-8 rounded-2xl relative bg-white">
          <div className="text-center flex flex-col items-center gap-6">
            <img
              src={logoTaskMaster}
              alt="Logo Task Master"
              className="w-1/8"
            />
            <h1 className="text-3xl text-primary">Task Master</h1>
            <h4 className="text-xl text-secondary">
              Welcome back Master!{" "}
              <span className="whitespace-nowrap">
                Please Login to Continue
              </span>
            </h4>
          </div>

          <div className="my-8 w-full">
            <form
              className="flex flex-col gap-1"
              onSubmit={form.handleSubmit(handleSignInUser)}
            >
              <label htmlFor="email" className="text-secondary">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                className="border-2 border-tertiary py-3 px-6 rounded-lg  outline-primary"
                {...form.register("email")}
              />
              <span className="text-red-600">
                {form.formState.errors.email?.message}
              </span>

              <label htmlFor="password" className="mt-4 text-secondary">
                Password
              </label>
              <div className="flex flex-col justify-center">
                <input
                  id="password"
                  type={isShowPassword ? "text" : "password"}
                  placeholder="Password"
                  className="border-2 py-3 px-6 rounded-lg border-tertiary outline-primary"
                  {...form.register("password")}
                />

                <button
                  onClick={handleShowPassword}
                  type="button"
                  className="absolute right-12 flex items-center cursor-pointer"
                >
                  {isShowPassword ? <Eye size={30} /> : <EyeOff size={30} />}
                </button>
              </div>
              <span className="text-red-600">
                {form.formState.errors.password?.message}
              </span>

              <div className="flex justify-between items-center mt-6 text-secondary sm:flex-col sm:items-start sm:gap-3 xl:flex-row ">
                <div className="flex gap-2 items-center ">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    className="w-5 h-5 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                  />
                  <label htmlFor="rememberMe" className="cursor-pointer">
                    Remember me
                  </label>
                </div>
                <a href="#" className=" hover:text-primary">
                  Forgot password?
                </a>
              </div>

              <button className="border-2 w-full py-3 mt-6 rounded-lg bg-primary text-white hover:bg-slate-700">
                Sign In
              </button>
            </form>
          </div>

          <div className="flex flex-col w-full items-center">
            <div className="flex items-center gap-1 sm:flex-col lg:flex-row">
              <h5 className="my-1 text-secondary">Don't have an Account?</h5>
              <a href="#" className="hover:text-slate-700">
                {" "}
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
