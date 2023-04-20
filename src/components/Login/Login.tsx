import ValidationTooltip from "@/components/ValidationTooltip/ValidationTooltip";
import { useSessionContext } from "@supabase/auth-helpers-react";
import clsx from "clsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import style from "./Login.module.scss";

interface LoginForm {
  email: string;
  password: string;
}

export default function Login(): JSX.Element {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginForm>();

  const [isLoading, setIsLoading] = useState(false);
  const { supabaseClient } = useSessionContext();

  /**
   * Attempt to sign in with email and password through Supabase.
   *
   * @param email
   * @param password
   */
  const signInWithEmail = async (email: string, password: string) => {
    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }
  };

  const onSubmit = (data: LoginForm) => {
    setIsLoading(true);

    signInWithEmail(data.email, data.password)
      .catch((error) => {
        setError("email", { type: "server", message: error.message });
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <form
      className={`${style["login-form"]} card`}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1>Login</h1>

      <div>
        <label htmlFor="email" className="form-control-label">
          Email
        </label>
        <input
          aria-invalid={errors.email ? "true" : "false"}
          className="form-control"
          type="email"
          id="email"
          disabled={isLoading}
          {...register("email")}
        />
        <ValidationTooltip messages={["Invalid login details"]} />
      </div>

      <div>
        <label htmlFor="password" className="form-control-label">
          Password
        </label>
        <input
          aria-invalid={errors.password ? "true" : "false"}
          className="form-control"
          type="password"
          id="password"
          disabled={isLoading}
          {...register("password", { required: true })}
        />
        <ValidationTooltip messages={["Password is required"]} />
      </div>

      <button
        className={clsx({
          "form-control": true,
          "is-loading": isLoading,
        })}
        type="submit"
      >
        <span>Login</span>
      </button>
    </form>
  );
}
