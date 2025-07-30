const NameServices = (e: string | null) => {
  switch (e) {
    case 'fechaRadicacion':
      return 'Fecha de Radicación';
      break;
    case 'clientes':
      return 'Clientes';
      break;
    case 'sede':
      return 'Sede';
      break;
    case 'tipoNovedad':
      return 'Tipo de Novedad';
      break;
    case 'sedeResponsable':
      return 'Sede Responsable';
      break;
    case 'procesoResponsable':
      return 'Proceso Responsable';
      break;
    case 'tratamientoNovedad':
      return 'Tratamiento de la Novedad';
      break;
    case 'tiempoRespuesta':
      return 'Tiempo de Respuesta';
      break;
  }
}

const TypeOfConsultServices = (states: object | any, widgetId: string) => {
  for (let index = 0; index < states.length; index++) {
    if (states[index].id === widgetId) {
      return states[index].subtitle;
    }
  }
}

export { NameServices, TypeOfConsultServices };