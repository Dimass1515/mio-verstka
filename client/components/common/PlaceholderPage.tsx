import { Link } from "react-router-dom";
import { useI18n } from "@/contexts/i18n";

type Props = { title: string; description?: string };

export default function PlaceholderPage({ title, description }: Props) {
  const { t } = useI18n();
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
            {t("placeholder_building")}
          </p>
        )}
        <div className="mt-8">
          <Link
            to="/"
            className="rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white shadow hover:bg-brand-dark"
          >
            {t("placeholder_back_home")}
          </Link>
        </div>
      </div>
    </section>
  );
}
