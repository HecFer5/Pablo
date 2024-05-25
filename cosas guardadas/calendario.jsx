import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es"; // Importa el idioma español de Moment.js

const localizer = momentLocalizer(moment); // Configura el localizador con Moment.js

const MiCalendario = () => (
  <div>
    <Calendar localizer={localizer} />
  </div>
);

export default MiCalendario;
