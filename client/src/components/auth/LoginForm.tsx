import { NavLink } from "react-router";
import logo from "../../assets/logo.png";
import PasswordInput from "../shared/password-input/PasswordInput";
import { FormEvent, useRef } from "react";
import {
  getUserDetails,
  validateUserCredentials,
} from "../../services/UserService";
import { useLoginInfo } from "@/hooks/LoggedInUserHooks";
import { useNavigate } from "react-router";
import { setupAutoLogout } from "@/context/LoggedInContext";

export default function LoginForm() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { setIsLoggedIn, setLoggedInUser } = useLoginInfo();

  const logout = () => {
    localStorage.removeItem("token");
    setLoggedInUser(null);
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleLoginSubmitEvent = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const email = emailRef.current!.value;
      const password = passwordRef.current!.value;

      const token = await validateUserCredentials(email, password);

      if (token) {
        const user = await getUserDetails();
        if (user) {
          setLoggedInUser(user);
          setIsLoggedIn(true);
          setupAutoLogout(logout);
          navigate("/dashboard");
        }
      }
    } catch (err) {}
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img alt="logo" src={logo} className="mx-auto h-10 w-auto" />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            action="/login"
            method="POST"
            className="space-y-6"
            onSubmit={handleLoginSubmitEvent}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-white"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  ref={emailRef}
                />
              </div>
            </div>
            <PasswordInput inputReference={passwordRef} />
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white pointer shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
              >
                Sign in
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm/6 text-white">
            Don't have an account?{" "}
            <NavLink
              className="font-semibold text-indigo-600 hover:text-indigo-500"
              to="/register"
              end
            >
              Sign Up Here
            </NavLink>
          </p>
        </div>
      </div>
    </>
  );
}
