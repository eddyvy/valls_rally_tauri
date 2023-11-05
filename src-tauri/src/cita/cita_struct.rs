use serde::{Deserialize, Serialize};

use crate::curva::curva_struct::Curva;

#[derive(Serialize)]
pub struct Cita {
    pub id: i32,
    pub tramo_id: i32,
    pub nombre: String,
    pub metro: f64,
    pub metro_teorico: Option<f64>,
}

#[derive(Deserialize)]
pub struct CitaCreate {
    pub tramo_id: i32,
    pub nombre: String,
    pub metro: f64,
    pub metro_teorico: Option<f64>,
}

#[derive(Serialize)]
pub struct CitaCurvaData {
    pub is_right: bool,
    pub grados: f64,
}

#[derive(Serialize)]
pub struct CitaCalculated {
    pub id: i32,
    pub tramo_id: i32,
    pub nombre: String,
    pub metro: f64,
    pub es_teorico: bool,
    pub metro_calculado: Option<f64>,
    pub diff: Option<f64>,
    pub curva_data: Option<CitaCurvaData>,
}

pub struct CitaBloque {
    pub metro_desde: f64,
    pub metro_hasta: f64,
    pub m: f64, // pendiente
    pub n: f64, // cte
    pub curva_data: Option<CitaCurvaData>,
}

pub struct CitaBloqueCalculo<'a, 'b, 'c> {
    pub cita: &'a Cita,
    pub es_teorico: bool,
    pub next_teorico: Option<&'b Cita>,
    pub es_curva_ini: bool,
    pub es_curva_fin: bool,
    pub curva: Option<&'c Curva>,
}
