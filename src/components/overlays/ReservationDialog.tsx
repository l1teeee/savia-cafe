"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { Dialog } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/cn";
import {
  getLocalDateISO,
  reservationSchema,
  type ReservationValues,
} from "@/lib/validation";
import type { CafeLocation } from "@/data/types";

interface ReservationDialogProps {
  open: boolean;
  onClose: () => void;
  locations: CafeLocation[];
  defaultLocationId?: string;
}

export function ReservationDialog({
  open,
  onClose,
  locations,
  defaultLocationId,
}: ReservationDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReservationValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      locationId: defaultLocationId || "",
      date: "",
      time: "",
      people: 2,
      name: "",
      email: "",
    },
  });

  const onSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setIsSubmitting(false);
    setSubmitSuccess(true);
  };

  const handleClose = () => {
    setSubmitSuccess(false);
    reset();
    onClose();
  };

  if (submitSuccess) {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        title="Reserva completada"
        footer={
          <Button variant="primary" onClick={handleClose}>
            Cerrar
          </Button>
        }
      >
        <div className="space-y-4 py-4">
          <div className="flex gap-3 items-start">
            <CheckCircle2
              size={24}
              className="mt-0.5 flex-shrink-0 text-verde"
              aria-hidden
            />
            <div className="space-y-2">
              <p className="text-texto font-medium">
                Solicitud de demostración enviada.
              </p>
              <p className="text-sm text-texto-secundario">
                No se ha realizado ninguna reserva real ni se han almacenado
                tus datos.
              </p>
            </div>
          </div>
        </div>
      </Dialog>
    );
  }

  const timeSlots = [];
  for (let h = 9; h < 20; h++) {
    for (const m of [0, 30]) {
      const time = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
      timeSlots.push(time);
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      title="Reservar mesa"
      size="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4">
        <div>
          <label
            htmlFor="locationId"
            className="block text-sm font-semibold text-texto mb-2"
          >
            Cafetería
          </label>
          <select
            id="locationId"
            data-autofocus
            {...register("locationId")}
            aria-invalid={!!errors.locationId}
            aria-describedby={errors.locationId ? "locationId-error" : undefined}
            className={cn(
              "w-full rounded-lg border bg-crema-clara px-4 py-2 text-texto transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verde/20",
              errors.locationId
                ? "border-verde focus-visible:border-verde"
                : "border-borde hover:border-borde/60"
            )}
          >
            <option value="">Selecciona una cafetería</option>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name} - {loc.city}
              </option>
            ))}
          </select>
          {errors.locationId && (
            <p
              id="locationId-error"
              className="mt-2 text-sm font-semibold text-verde"
              role="alert"
            >
              {errors.locationId.message}
            </p>
          )}
        </div>

        <Input
          label="Fecha"
          id="date"
          type="date"
          min={getLocalDateISO()}
          error={errors.date?.message}
          {...register("date")}
        />

        <div>
          <label
            htmlFor="time"
            className="block text-sm font-semibold text-texto mb-2"
          >
            Hora
          </label>
          <select
            id="time"
            {...register("time")}
            aria-invalid={!!errors.time}
            aria-describedby={errors.time ? "time-error" : undefined}
            className={cn(
              "w-full rounded-lg border bg-crema-clara px-4 py-2 text-texto transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verde/20",
              errors.time
                ? "border-verde focus-visible:border-verde"
                : "border-borde hover:border-borde/60"
            )}
          >
            <option value="">Selecciona una hora</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          {errors.time && (
            <p
              id="time-error"
              className="mt-2 text-sm font-semibold text-verde"
              role="alert"
            >
              {errors.time.message}
            </p>
          )}
        </div>

        <Input
          label="Número de personas"
          id="people"
          type="number"
          min="1"
          max="12"
          error={errors.people?.message}
          {...register("people", { valueAsNumber: true })}
        />

        <Input
          label="Nombre"
          id="name"
          type="text"
          placeholder="Tu nombre"
          error={errors.name?.message}
          {...register("name")}
        />

        <Input
          label="Correo electrónico"
          id="email"
          type="email"
          placeholder="tu@email.com"
          error={errors.email?.message}
          {...register("email")}
        />

        <p className="rounded-2xl bg-crema p-3 text-xs text-texto-secundario">
          Formulario de demostración — sin backend.
        </p>

        <div role="status" aria-live="polite" aria-atomic="true">
          {isSubmitting && (
            <p className="text-sm text-texto-secundario flex items-center gap-2">
              <span
                className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-verde border-t-transparent"
                aria-hidden
              />
              Enviando solicitud...
            </p>
          )}
        </div>

        <Button
          type="submit"
          variant="verde"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enviando…" : "Solicitar reserva"}
        </Button>
      </form>
    </Dialog>
  );
}

interface ReservationTriggerProps {
  locationId: string;
  locations: CafeLocation[];
  label?: string;
}

export function ReservationTrigger({
  locationId,
  locations,
  label = "Reservar",
}: ReservationTriggerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="verde"
        size="md"
        onClick={() => setOpen(true)}
      >
        {label}
      </Button>
      <ReservationDialog
        open={open}
        onClose={() => setOpen(false)}
        locations={locations}
        defaultLocationId={locationId}
      />
    </>
  );
}
