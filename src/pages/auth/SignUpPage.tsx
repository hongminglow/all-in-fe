import { Button } from "~/components/ui/button";
import { useForm } from "react-hook-form";
import {
  createSignUpSchema,
  type TLoginSchema,
  type TSignUpSchema,
} from "~/features/auth/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordInput } from "~/components/base/input/PasswordInput";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "~/constant/misc";
import { useState } from "react";
import { TextInput } from "~/components/base/input/TextInput";
import { useAuth } from "~/features/auth/hooks/useAuth";
import { ROUTES } from "~/constant/route";
import { PhoneNumberInput } from "~/components/base/input/PhonNumberInput";

export const SignUpPage = () => {
  const { t, i18n } = useTranslation();
  const { authenticateUser } = useAuth();
  const [signUpError, setSignUpError] = useState("");
  const form = useForm<TSignUpSchema>({
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      countryCode: "60",
      phoneNumber: "",
    },
    resolver: zodResolver(createSignUpSchema),
  });

  console.log("form errors", form.formState.errors);

  //   const { mutate: login } = useMutation({
  //     mutationFn: (data: TAuthenticateUserRequest) => authenticateUser(data),
  //     onSuccess: (data) => {
  //       if (data.token) {
  //         console.log("token granted..", data.token);
  //       }
  //     },
  //   });

  const onFormSubmit = (data: TLoginSchema) => {
    console.log("sign up data", JSON.stringify(data, null, 2));
    // const result = authenticateUser(data);
    // if (!result) {
    //   setSignUpError(t("login.invalidCredentials"));
    // } else {
    //   setSignUpError("");
    // }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-500"></div>
      </div>

      {/* Language Switcher - Top Right */}
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        <button
          onClick={() => i18n.changeLanguage(LANGUAGES.ENGLISH)}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            i18n.language === LANGUAGES.ENGLISH
              ? "bg-yellow-400 text-black"
              : "bg-white/10 text-white hover:bg-white/20"
          }`}
        >
          {t("language.english")}
        </button>
        <button
          onClick={() => i18n.changeLanguage(LANGUAGES.CHINESE)}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            i18n.language === LANGUAGES.CHINESE
              ? "bg-yellow-400 text-black"
              : "bg-white/10 text-white hover:bg-white/20"
          }`}
        >
          {t("language.chinese")}
        </button>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <h1 className="text-white mb-2 text-3xl font-bold">
            {t("common.appName")}
          </h1>
        </div>

        {/* Login Form */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
          <form
            onSubmit={form.handleSubmit(onFormSubmit)}
            className="space-y-4"
          >
            <TextInput
              name="username"
              label={t("login.username")}
              control={form.control}
              type="text"
              placeholder={t("login.usernamePlaceholder")}
              className="bg-white/10 border-white/20 text-white placeholder:text-purple-300"
              required
            />

            <TextInput
              name="email"
              label={t("login.email")}
              control={form.control}
              type="text"
              placeholder={t("login.emailPlaceholder")}
              className="bg-white/10 border-white/20 text-white placeholder:text-purple-300"
              required
            />

            <PhoneNumberInput
              countryName="countryCode"
              phoneName="phoneNumber"
              control={form.control}
              label={t("login.phoneNumber")}
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-purple-300"
            />

            <PasswordInput
              name="password"
              label={t("login.password")}
              control={form.control}
              placeholder={t("login.passwordPlaceholder")}
              className="bg-white/10 border-white/20 text-white placeholder:text-purple-300"
            />

            <PasswordInput
              name="confirmPassword"
              label={t("login.confirmPassword")}
              control={form.control}
              placeholder={t("login.confirmPasswordPlaceholder")}
              className="bg-white/10 border-white/20 text-white placeholder:text-purple-300"
            />

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white shadow-lg"
            >
              Sign Up
            </Button>
          </form>

          {signUpError && (
            <p className="text-red-500 text-sm font-bold my-2">{signUpError}</p>
          )}

          <div className="mt-4 text-center">
            <p className="text-purple-200">
              Have an account? &nbsp;
              <a
                href={ROUTES.LOGIN}
                className="text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                {t("login.login")}
              </a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-purple-300">
          <p>{t("login.footer")}</p>
        </div>
      </div>
    </div>
  );
};
