import { useFormContext } from "react-hook-form";
import { TextInput } from "~/components/base/TextInput";
import { PasswordInput } from "~/components/base/PasswordInput";
import { useTranslation } from "react-i18next";

export const EditLabForm = () => {
  const form = useFormContext();
  const { t } = useTranslation();
  return (
    <>
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
        label="Email"
        control={form.control}
        type="text"
        placeholder="Enter your email"
        className="bg-white/10 border-white/20 text-white placeholder:text-purple-300"
        required
      />

      <PasswordInput
        name="agentId"
        label="Agent ID"
        control={form.control}
        placeholder="Enter your Agent ID"
        className="bg-white/10 border-white/20 text-white placeholder:text-purple-300"
      />
    </>
  );
};
