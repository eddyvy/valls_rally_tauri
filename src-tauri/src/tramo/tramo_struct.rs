use serde::{Deserialize, Serialize};

#[derive(Serialize)]
pub struct Tramo {
    pub id: i32,
    pub carrera_id: i32,
    pub orden: i32,
    pub nombre: String,
    pub factor: f64,
}

#[derive(Deserialize)]
pub struct TramoCreate {
    pub carrera_id: i32,
    pub nombre: String,
    pub factor: f64,
}
