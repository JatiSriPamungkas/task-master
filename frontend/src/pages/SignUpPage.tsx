import logoTaskMaster from "../assets/Logo Task Master.png";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const signUpSchema = z
  .object({
    first_name: z
      .string()
      .min(1, { message: "First Name must contain at least 1 character(s)" })
      .max(255, {
        message: "First Name must contain at most 255 character(s)",
      }),
    last_name: z
      .string()
      .min(1, { message: "Last Name must contain at least 1 character(s)" })
      .max(255, { message: "Last Name must contain at most 255 character(s)" }),
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
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[\W_]/, "Password must contain at least one special character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not Match!",
    path: ["confirmPassword"],
  });

type SignUpSchema = z.infer<typeof signUpSchema>;

const SignUpPage = () => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const { register, handleSubmit, formState, reset } = form;

  const createNewUser = async (values: SignUpSchema) => {
    await fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    reset();
  };

  const onSubmit = handleSubmit((values) => {
    createNewUser(values);

    alert("Form Sign Up Submitted!");
    console.log(values);
  });

  const handleShowPassword = () => {
    setIsShowPassword((state) => !state);
  };

  return (
    <>
      <div className="box-border min-h-screen flex justify-center items-center font-lexend bg-stone-100">
        <form onSubmit={onSubmit}>
          <div className="shadow-2xl rounded-2xl flex flex-col justify-center items-center gap-2 p-8 bg-white">
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
                  Please{" "}
                  <span className="underline underline-offset-8 text-primary">
                    Sign Up
                  </span>{" "}
                  to Continue
                </span>
              </h4>
            </div>

            <div className="flex flex-col justify-center gap-2 mt-8">
              <div className="flex flex-col gap-1">
                <div className="grid grid-cols-2 gap-4 text-secondary">
                  <label htmlFor="firstName">First Name</label>
                  <label htmlFor="lastName">Last Name</label>
                </div>

                <div className="flex gap-4">
                  <input
                    type="text"
                    id="firstName"
                    placeholder="John"
                    className="border-2 py-3 px-4 rounded-lg border-tertiary outline-primary"
                    {...register("first_name")}
                  />
                  <input
                    type="text"
                    id="lastName"
                    placeholder="Doe"
                    className="border-2 py-3 px-4 rounded-lg border-tertiary outline-primary"
                    {...register("last_name")}
                  />
                </div>
                <span className="text-red-500">
                  {formState.errors.first_name?.message}
                </span>
                <span className="text-red-500">
                  {formState.errors.last_name?.message}
                </span>
              </div>

              <label htmlFor="email" className="text-secondary">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="tralalala@gmail.com"
                className="border-2 py-3 px-4 rounded-lg border-tertiary outline-primary"
                {...register("email")}
              />
              <span className="text-red-500">
                {formState.errors.email?.message}
              </span>

              <label htmlFor="password" className="text-secondary">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  type={isShowPassword ? "text" : "password"}
                  id="password"
                  placeholder="Password"
                  className="border-2 py-3 px-4 rounded-lg border-tertiary outline-primary w-full"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={handleShowPassword}
                  className="absolute flex right-4"
                >
                  {isShowPassword ? <Eye size={30} /> : <EyeOff size={30} />}
                </button>
              </div>
              <span className="text-red-500">
                {formState.errors.password?.message}
              </span>

              <label htmlFor="confirmPassword" className="text-secondary">
                Confirm Password
              </label>
              <div className="relative flex items-center">
                <input
                  type={isShowPassword ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  className="border-2 py-3 px-4 rounded-lg border-tertiary outline-primary w-full"
                  {...register("confirmPassword")}
                />

                <button
                  type="button"
                  onClick={handleShowPassword}
                  className="absolute flex right-4 "
                >
                  {isShowPassword ? <Eye size={30} /> : <EyeOff size={30} />}
                </button>
              </div>
              <span className="text-red-500">
                {formState.errors.confirmPassword?.message}
              </span>
            </div>

            <button className="border-2 w-full py-3 rounded-lg bg-primary text-white hover:bg-slate-700 cursor-pointer text-center mt-6 ">
              Sign Up
            </button>

            <div className="flex gap-2 mt-4">
              <p className="text-secondary">Already have an Account?</p>{" "}
              <Link to="/signIn" className="hover:text-slate-700">
                Sign In
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUpPage;
