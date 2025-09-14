import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const schema = z.object({
  email: z.string().email("Adresse courriel invalide"),
  password: z.string().min(6, "Au moins 6 caractères"),
});

type FormValues = z.infer<typeof schema>;

export default function AccountLogin() {
  const { register, handleSubmit, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const onSubmit = (values: FormValues) => {
    alert(`Connexion simulée pour ${values.email}`);
  };

  return (
    <div>
      <section className="border-b bg-brand-light">
        <div className="container py-12 md:py-16">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            Se connecter
          </h1>
        </div>
      </section>

      <section>
        <div className="container py-10">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto max-w-md space-y-6 rounded-2xl border bg-white p-6 shadow-sm"
          >
            <div className="space-y-2">
              <Label htmlFor="email">Saisissez votre adresse courriel</Label>
              <Input id="email" type="email" {...register("email")} />
              {formState.errors.email && (
                <p className="text-sm text-red-600">{formState.errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input id="password" type="password" {...register("password")} />
              {formState.errors.password && (
                <p className="text-sm text-red-600">{formState.errors.password.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full rounded-full bg-brand text-white hover:bg-brand-dark">
              Se connecter
            </Button>
            <div className="text-center text-sm">
              <Link to="/account/forgot-password" className="text-brand hover:underline">
                Vous avez oublié votre mot de passe ?
              </Link>
            </div>
            <div className="text-center text-sm text-slate-600">
              Pas de compte ? {" "}
              <Link to="/account/create" className="text-brand hover:underline">
                Créer un compte
              </Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
