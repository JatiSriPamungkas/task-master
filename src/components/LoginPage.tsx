import { useState } from "react";
import logoTaskMaster from "../assets/Logo Task Master.png";
import { Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleShowPassword = () => {
    setIsShowPassword((state) => !state);
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
              Welcome back Master! Please Login to Continue
            </h4>
          </div>

          <div className="my-8 w-full">
            <form className="flex flex-col gap-1">
              <label htmlFor="email" className="text-secondary">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                className="border-2 border-tertiary py-3 px-6 rounded-lg  outline-primary"
              />

              <label htmlFor="password" className="mt-4 text-secondary">
                Password
              </label>
              <div className="flex flex-col justify-center">
                <input
                  id="password"
                  type={isShowPassword ? "text" : "password"}
                  placeholder="Password"
                  className="border-2 py-3 px-6 rounded-lg border-tertiary outline-primary"
                />

                <button
                  onClick={handleShowPassword}
                  type="button"
                  className="absolute right-12 flex items-center cursor-pointer"
                >
                  {isShowPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>

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
            </form>
          </div>

          <div className="flex flex-col w-full items-center">
            <button className="border-2 w-full py-3 rounded-lg bg-primary text-white hover:bg-slate-700">
              Sign In
            </button>

            <div className="flex items-center gap-1 sm:flex-col lg:flex-row">
              <h5 className="my-3 text-secondary">Don't have an Account?</h5>
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
