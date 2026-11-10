import { useEffect, useState } from "react";
import {
  getAppointments,
  saveAppointments
} from "./storage";

export function useAppointments() {
  const [appointments, setAppointments] = useState(
    () => getAppointments()
  );

  useEffect(() => {
    const refresh = () => {
      setAppointments(getAppointments());
    };

    window.addEventListener("storage", refresh);
    window.addEventListener("citycare-update", refresh);

    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("citycare-update", refresh);
    };
  }, []);

  function update(id, changes) {
    const updated = getAppointments().map((item) =>
      item.id === id
        ? { ...item, ...changes }
        : item
    );

    saveAppointments(updated);
    setAppointments(updated);

    return updated.find((item) => item.id === id);
  }

  function add(appointment) {
    const newAppointment = {
      ...appointment,
      id: `A${Date.now()}`,
      status: "Pending",
      doctorNote: "",
      createdAt: new Date().toISOString().slice(0, 10)
    };

    const updated = [
      newAppointment,
      ...getAppointments()
    ];

    saveAppointments(updated);
    setAppointments(updated);

    return newAppointment;
  }

  return {
    appointments,
    update,
    add
  };
}