use tauri::AppHandle;

use crate::{
    cita::cita_repository, curva::curva_repository, database::database_impl::ServiceAccess,
    tramo::tramo_repository,
};

use super::{
    carrera_repository,
    carrera_struct::{Carrera, CarreraCreate},
};

#[tauri::command]
pub fn get_carreras(app_handle: AppHandle) -> Vec<Carrera> {
    let carreras = app_handle.db(|db| carrera_repository::find(db)).unwrap();

    return carreras;
}

#[tauri::command]
pub fn add_carrera(carrera: CarreraCreate, app_handle: AppHandle) {
    app_handle
        .db(|db| carrera_repository::insert(carrera, db))
        .unwrap();
}

#[tauri::command]
pub fn modify_carrera(id: i32, carrera: CarreraCreate, app_handle: AppHandle) {
    app_handle
        .db(|db| carrera_repository::update(id, carrera, db))
        .unwrap();
}

#[tauri::command]
pub fn remove_carrera(id: i32, app_handle: AppHandle) {
    app_handle.db(|db| {
        let tramos = tramo_repository::find_by_carrera(id, db).unwrap();

        for tramo in tramos.iter() {
            let tramo_id = tramo.id;
            curva_repository::remove_by_tramo_id(tramo_id, db).unwrap();
            cita_repository::remove_by_tramo_id(tramo_id, db).unwrap();
        }

        tramo_repository::remove_by_carrera_id(id, db).unwrap();
        carrera_repository::remove(id, db).unwrap();
    });
}

#[tauri::command]
pub fn update_carrera_orden(id: i32, orden: i32, app_handle: AppHandle) {
    app_handle
        .db(|db| carrera_repository::update_orden(id, orden, db))
        .unwrap();
}
