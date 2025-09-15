import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/contexts/i18n";

const schema = z
  .object({
    firstName: z.string().min(1, "Requis"),
    lastName: z.string().min(1, "Requis"),
    email: z.string().email("Adresse courriel invalide"),
    password: z.string().min(8, "Au moins 8 caractères"),
    confirm: z.string().min(1, "Requis"),
  })
  .refine((d) => d.password === d.confirm, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirm"],
  });

type FormValues = z.infer<typeof schema>;

export default function AccountCreate() {
  const { t } = useI18n();
  const { register, handleSubmit, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const onSubmit = (values: FormValues) => {
    alert(`Compte créé (simulation) pour ${values.email}`);
  };

  return (
    <div>
      <section className="border-b bg-brand-light">
        <div className="container py-12 md:py-16">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            {t("create_title")}
          </h1>
        </div>
      </section>

      <section>
        <div className="container py-10">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto grid max-w-2xl gap-6 rounded-2xl border bg-white p-6 shadow-sm md:grid-cols-2"
          >
            <div className="space-y-2">
              <Label htmlFor="firstName">{t("first_name")}</Label>
              <Input id="firstName" {...register("firstName")} />
              {formState.errors.firstName && (
                <p className="text-sm text-red-600">{formState.errors.firstName.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">{t("last_name")}</Label>
              <Input id="lastName" {...register("lastName")} />
              {formState.errors.lastName && (
                <p className="text-sm text-red-600">{formState.errors.lastName.message}</p>
              )}
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="email">{t("email")}</Label>
              <Input id="email" type="email" {...register("email")} />
              {formState.errors.email && (
                <p className="text-sm text-red-600">{formState.errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t("password")}</Label>
              <Input id="password" type="password" {...register("password")} />
              {formState.errors.password && (
                <p className="text-sm text-red-600">{formState.errors.password.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm">{t("confirm_password")}</Label>
              <Input id="confirm" type="password" {...register("confirm")} />
              {formState.errors.confirm && (
                <p className="text-sm text-red-600">{formState.errors.confirm.message}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <Button type="submit" className="w-full rounded-full bg-brand text-white hover:bg-brand-dark">
                {t("create_submit")}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
