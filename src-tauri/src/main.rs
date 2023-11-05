// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

pub mod app;
pub mod carrera {
    pub mod carrera_handler;
    pub mod carrera_repository;
    pub mod carrera_struct;
}
pub mod cita {
    pub mod cita_calculator;
    pub mod cita_handler;
    pub mod cita_repository;
    pub mod cita_struct;
}
pub mod curva {
    pub mod curva_handler;
    pub mod curva_repository;
    pub mod curva_struct;
}
pub mod database {
    pub mod database_connection;
    pub mod database_impl;
}
pub mod tramo {
    pub mod tramo_handler;
    pub mod tramo_repository;
    pub mod tramo_struct;
}

fn main() {
    app::start_app();
}
