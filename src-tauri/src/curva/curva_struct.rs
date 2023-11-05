use serde::{Deserialize, Serialize};

#[derive(Serialize)]
pub struct Curva {
    pub id: i32,
    pub tramo_id: i32,
    pub cita_inicial_id: i32,
    pub cita_final_id: i32,
    pub grados: f64,
    pub is_right: bool,
}

#[derive(Deserialize)]
pub struct CurvaCreate {
    pub tramo_id: i32,
    pub cita_inicial_id: i32,
    pub cita_final_id: i32,
    pub grados: f64,
    pub is_right: bool,
}
