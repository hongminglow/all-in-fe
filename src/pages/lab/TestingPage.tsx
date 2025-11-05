import { Button } from "~/components/ui/button";
import { FlaskConical } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import {
  createLabSchema,
  createSchemaDefaultValues,
  editLabSchema,
  editSchemaDefaultValues,
  type TCreateLabSchema,
  type TEditLabSchema,
} from "~/features/lab/schema/auth";
import { CreateLabForm } from "./components/CreateLabForm";
import { EditLabForm } from "./components/EditLabForm";

type TFormMode = "new" | "edit";

export const TestingPage = () => {
  const { t, i18n } = useTranslation();
  const mode: TFormMode = "new";

  const form = useForm<TCreateLabSchema | TEditLabSchema>({
    defaultValues:
      mode === "new" ? createSchemaDefaultValues : editSchemaDefaultValues,
    resolver: zodResolver(mode === "new" ? createLabSchema : editLabSchema),
  });

  const onFormSubmit = (data: TCreateLabSchema | TEditLabSchema) => {
    console.log("Form submitted:", data);
  };

  console.log("form", JSON.stringify(form.formState.errors, null, 2));

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)}>
        <div className="min-h-screen bg-linear-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center p-4">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
            <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-500"></div>
          </div>

          <div className="relative z-10 w-full max-w-md">
            {/* Logo and Title */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl mb-4 shadow-2xl">
                <FlaskConical className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-white mb-2 text-3xl font-bold">
                Testing Lab
              </h1>
            </div>

            {/* Login Form */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20 space-y-6">
              {mode === "new" ? <CreateLabForm /> : <EditLabForm />}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white shadow-lg"
              >
                {t("login.submit")}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
