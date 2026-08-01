// ============================================================================
// CONFIGURACIÓN DE LA CALCULADORA DE AHORRO SOLAR — Solar Joy
// ----------------------------------------------------------------------------
// TODO lo de este archivo son SUPUESTOS de cálculo, no tarifas oficiales de
// CFE ni cotizaciones garantizadas. Edítalos aquí — la calculadora (script.js)
// no tiene ningún número de negocio embebido, solo lee estos valores.
//
// ⚠️ Los marcados "CONFIRMAR" son los que más cambian el resultado que ve el
// visitante. Revísalos antes de considerar la calculadora "lista para
// producción". El resto ya está anclado a datos que el propio sitio publica.
// ============================================================================

const CALC_CONFIG = {
  // Precio promedio que paga un usuario por kWh de CFE (MXN/kWh).
  // Se usa únicamente para convertir "gasto en pesos" <-> "consumo en kWh"
  // cuando el visitante solo conoce uno de los dos datos.
  // ⚠️ CONFIRMAR: la tarifa real varía por esquema (1, 1A–1F, DAC) y por
  // consumo — este es un promedio simplificado a propósito (ver brief:
  // "puede empezar simplificado").
  precioPromedioPorKwh: 3.2,

  // kWh generados por kW instalado, por mes.
  // Calculado (no inventado) a partir del promedio real de los 8 proyectos
  // en `projects` (script.js): en todos, generación mensual ÷ tamaño del
  // sistema ≈ 156 kWh/kW/mes de forma consistente.
  // ⚠️ CONFIRMAR que ese desempeño siga vigente conforme se sumen proyectos.
  generacionKwhPorKwMes: 156,

  // Porcentaje de ahorro objetivo sobre el recibo de CFE que ofrece la
  // calculadora por defecto. El sitio ya publica un rango de 90–99%
  // (ver hybrid-banner en index.html); se usa el extremo conservador.
  ahorroObjetivoPorcentaje: 0.90,

  // Costo estimado de instalación por kW, equipo + mano de obra (MXN/kW).
  // ⚠️ CONFIRMAR — es el número más sensible: de él depende el "retorno de
  // inversión" que se le promete al visitante. No hay ningún dato real del
  // sitio del que derivarlo; reemplázalo por el costo promedio real de
  // Solar Joy antes de publicar, o dependiendo el margen de error que
  // manejen, considera quitar el payback y dejar solo "cotización
  // personalizada" (ver comentario en script.js, función calcularAhorro).
  costoPorKwMxn: 20000,

  // kg de CO₂ evitados por kWh generado.
  // Derivado (no importado de una fuente externa) para ser consistente con
  // la cifra que el sitio ya publica: "10 KW de respaldo → ~2.8 t CO₂/año"
  // (hybrid-banner). Con 156 kWh/kW/mes, 10 kW generan 18,720 kWh/año;
  // 2,800 kg ÷ 18,720 kWh ≈ 0.15 kg CO₂/kWh.
  // ⚠️ CONFIRMAR si se necesita precisión para reportes o certificaciones —
  // el factor de emisión oficial del Sistema Eléctrico Nacional puede diferir.
  co2KgPorKwh: 0.15,

  // Rango de tamaño de sistema que la calculadora puede sugerir (kW).
  // Tomado del rango real de los proyectos instalados (2.2 kW–51 kW),
  // redondeado, para no sugerir sistemas fuera de lo que Solar Joy opera.
  sistemaMinKw: 1,
  sistemaMaxKw: 50,
};
