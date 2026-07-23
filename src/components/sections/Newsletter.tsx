"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import {
  newsletterSchema,
  type NewsletterValues,
} from "@/lib/validation";

type SubmissionStatus = "idle" | "success" | "error";

const DEMO_ERROR_EMAIL = "error@demo.test";

export function Newsletter() {
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterValues>({
    resolver: zodResolver(newsletterSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
    },
  });

  const clearStatus = () => {
    if (status !== "idle") setStatus("idle");
  };

  const emailField = register("email", { onChange: clearStatus });
  const privacyField = register("privacy", { onChange: clearStatus });

  const onSubmit = async ({ email }: NewsletterValues) => {
    setStatus("idle");

    // Punto de integración: sustituir esta espera por la llamada al backend.
    await new Promise<void>((resolve) => setTimeout(resolve, 900));

    if (email.trim().toLowerCase() === DEMO_ERROR_EMAIL) {
      setStatus("error");
      return;
    }

    reset();
    setStatus("success");
  };

  const emailDescription = errors.email
    ? "newsletter-email-error"
    : "newsletter-email-hint";

  return (
    <section
      id="newsletter"
      aria-labelledby="newsletter-heading"
      className="bg-cafe py-14 text-crema-clara sm:py-16 lg:py-20"
    >
      <Container>
        <div className="grid gap-9 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16">
          <div className="max-w-xl space-y-4">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-verde-claro">
              Club Savia
            </p>
            <h2
              id="newsletter-heading"
              className="font-display max-w-lg text-[clamp(1.9rem,4vw,3.25rem)] text-crema-clara"
            >
              Haz una pausa. Nosotros llevamos el café.
            </h2>
            <p className="max-w-lg text-sm leading-relaxed text-crema-clara/70 sm:text-base">
              Recibe novedades, lanzamientos de temporada y beneficios
              exclusivos.
            </p>
            <a
              href="#nuestro-cafe"
              className="link-underline inline-flex min-h-11 items-center text-sm font-semibold text-crema-clara"
            >
              Conocer el programa de fidelidad
            </a>
          </div>

          {/* Formulario dentro de una tarjeta tipo marco: el texto vuelve a tono oscuro */}
          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            aria-busy={isSubmitting}
            className="rounded-[24px] bg-crema-clara p-6 text-texto shadow-[0_18px_50px_rgba(23,21,18,0.28)] sm:p-8"
          >
            <div className="space-y-5">
              <div className="space-y-2.5">
                <label
                  htmlFor="newsletter-email"
                  className="text-label block text-cafe"
                >
                  Correo electrónico
                </label>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                  <input
                    {...emailField}
                    id="newsletter-email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="tu@correo.com"
                    required
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={emailDescription}
                    className={`min-h-12 w-full flex-1 rounded-[12px] border bg-white px-4 py-3 text-base text-texto placeholder:text-texto-secundario/60 transition-colors focus-visible:border-verde focus-visible:outline-none ${
                      errors.email ? "border-terracota" : "border-borde"
                    }`}
                  />
                  <Button
                    type="submit"
                    variant="verde"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full shrink-0 disabled:cursor-wait disabled:opacity-65 sm:w-auto"
                  >
                    {isSubmitting
                      ? "Enviando…"
                      : "Quiero recibir novedades"}
                  </Button>
                </div>
                {errors.email ? (
                  <p
                    id="newsletter-email-error"
                    role="alert"
                    className="flex items-start gap-2 text-sm font-medium text-terracota"
                  >
                    <AlertCircle
                      size={18}
                      strokeWidth={1.5}
                      className="mt-0.5 shrink-0 text-terracota"
                      aria-hidden
                    />
                    <span>Error: {errors.email.message}</span>
                  </p>
                ) : (
                  <p
                    id="newsletter-email-hint"
                    className="text-xs leading-relaxed text-texto-secundario"
                  >
                    Solo utilizaremos el correo durante esta simulación.
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <input
                    {...privacyField}
                    id="newsletter-privacy"
                    type="checkbox"
                    required
                    aria-invalid={Boolean(errors.privacy)}
                    aria-describedby={
                      errors.privacy ? "newsletter-privacy-error" : undefined
                    }
                    className="mt-0.5 h-5 w-5 shrink-0 rounded-[4px] border-borde bg-white text-verde accent-verde focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verde focus-visible:ring-offset-2 focus-visible:ring-offset-crema-clara"
                  />
                  <label
                    htmlFor="newsletter-privacy"
                    className="text-sm leading-relaxed text-texto-secundario"
                  >
                    Acepto recibir comunicaciones y la política de privacidad
                    provisional de esta demostración.
                  </label>
                </div>
                {errors.privacy && (
                  <p
                    id="newsletter-privacy-error"
                    role="alert"
                    className="flex items-start gap-2 pl-8 text-sm font-medium text-terracota"
                  >
                    <AlertCircle
                      size={18}
                      strokeWidth={1.5}
                      className="mt-0.5 shrink-0 text-terracota"
                      aria-hidden
                    />
                    <span>Error: {errors.privacy.message}</span>
                  </p>
                )}
              </div>

              <p
                id="newsletter-demo-note"
                className="text-xs leading-relaxed text-texto-secundario"
              >
                Solicitud de demostración — no se almacenan datos personales.
              </p>

              <div
                aria-live="polite"
                aria-atomic="true"
                className="min-h-5 text-sm text-texto"
              >
                {isSubmitting && (
                  <p className="flex items-center gap-2">
                    <LoaderCircle
                      size={18}
                      strokeWidth={1.5}
                      className="shrink-0 text-verde motion-safe:animate-spin"
                      aria-hidden
                    />
                    Enviando la solicitud de demostración…
                  </p>
                )}
                {!isSubmitting && status === "success" && (
                  <p className="flex items-start gap-2">
                    <CheckCircle2
                      size={18}
                      strokeWidth={1.5}
                      className="mt-0.5 shrink-0 text-verde"
                      aria-hidden
                    />
                    Simulación completada. Gracias por acompañarnos; tu correo
                    no se ha almacenado.
                  </p>
                )}
                {!isSubmitting && status === "error" && (
                  <p className="flex items-start gap-2">
                    <AlertCircle
                      size={18}
                      strokeWidth={1.5}
                      className="mt-0.5 shrink-0 text-terracota"
                      aria-hidden
                    />
                    No pudimos completar la simulación. Inténtalo de nuevo con
                    otro correo.
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
}
