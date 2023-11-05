use serde::{Deserialize, Serialize};

#[derive(Serialize)]
pub struct Carrera {
    pub id: i32,
    pub orden: i32,
    pub nombre: String,
}

#[derive(Deserialize)]
pub struct CarreraCreate {
    pub nombre: String,
}
