import { Link } from "react-router-dom";

type Props = { title: string; description?: string };

export default function PlaceholderPage({ title, description }: Props) {
  return (
    <section className="container py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          {title}
        </h1>
        {description ? (
          <p className="mt-3 text-slate-600">{description}</p>
        ) : (
          <p className="mt-3 text-slate-600">
            Cette page est en cours de création. Dites-moi quoi ajouter et je la
            construirai immédiatement.
          </p>
        )}
        <div className="mt-8">
          <Link
            to="/"
            className="rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white shadow hover:bg-brand-dark"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </section>
  );
}
