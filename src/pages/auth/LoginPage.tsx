import { Button } from "~/components/ui/button";
import { Dices } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  createLoginSchema,
  type TLoginSchema,
} from "~/features/auth/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordInput } from "~/components/base/input/PasswordInput";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "~/constant/misc";
import { useState } from "react";
import { TextInput } from "~/components/base/input/TextInput";
import {
  authenticateUser,
  type TAuthenticateUserRequest,
} from "~/services/auth/mutations/authenticateUser";
import { useMutation } from "@tanstack/react-query";

export const LoginPage = () => {
  const { t, i18n } = useTranslation();
  //   const { authenticateUser } = useAuth();
  const [loginError, setLoginError] = useState("");
  const form = useForm<TLoginSchema>({
    defaultValues: {
      username: "admin",
      password: "password",
    },
    resolver: zodResolver(createLoginSchema),
  });

  const { mutate: login } = useMutation({
    mutationFn: (data: TAuthenticateUserRequest) => authenticateUser(data),
    onSuccess: (data) => {
      if (data.token) {
        console.log("token granted..", data.token);
      }
    },
  });

  //   const onFormSubmit = (data: TLoginSchema) => {
  //     const result = authenticateUser(data);
  //     if (!result) {
  //       setLoginError(t("login.invalidCredentials"));
  //     } else {
  //       setLoginError("");
  //     }
  //   };

  const onFormSubmit = (data: TLoginSchema) => {
    console.log("submitting form...");
    login({
      identifier: data.username,
      password: data.password,
    });
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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl mb-4 shadow-2xl">
            <Dices className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-white mb-2 text-3xl font-bold">
            {t("common.appName")}
          </h1>
          <p className="text-purple-200">{t("common.tagline")}</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
          <form
            onSubmit={form.handleSubmit(onFormSubmit)}
            className="space-y-6"
          >
            <div>
              <label htmlFor="username" className="block text-purple-100 mb-2">
                {t("login.username")}
              </label>
              <TextInput
                name="username"
                control={form.control}
                type="text"
                placeholder={t("login.usernamePlaceholder")}
                className="bg-white/10 border-white/20 text-white placeholder:text-purple-300"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-purple-100 mb-2">
                {t("login.password")}
              </label>
              <PasswordInput
                name="password"
                control={form.control}
                placeholder={t("login.passwordPlaceholder")}
                className="bg-white/10 border-white/20 text-white placeholder:text-purple-300"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white shadow-lg"
            >
              {t("login.submit")}
            </Button>
          </form>

          {loginError && (
            <p className="text-red-500 text-sm font-bold my-2">{loginError}</p>
          )}

          <div className="mt-6 text-center">
            <a
              href="#"
              className="text-purple-200 hover:text-white transition-colors"
            >
              {t("login.forgotPassword")}
            </a>
          </div>

          <div className="mt-4 text-center">
            <p className="text-purple-200">
              {t("login.noAccount")} &nbsp;
              <a
                href="#"
                className="text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                {t("login.signUp")}
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
