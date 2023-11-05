use tauri::AppHandle;

use crate::{
    cita::cita_repository, curva::curva_repository, database::database_impl::ServiceAccess,
};

use super::{
    tramo_repository,
    tramo_struct::{Tramo, TramoCreate},
};

#[tauri::command]
pub fn get_tramos(carrera_id: i32, app_handle: AppHandle) -> Vec<Tramo> {
    let tramos = app_handle
        .db(|db| tramo_repository::find_by_carrera(carrera_id, db))
        .unwrap();

    return tramos;
}

#[tauri::command]
pub fn add_tramo(tramo: TramoCreate, app_handle: AppHandle) {
    app_handle
        .db(|db| tramo_repository::insert(tramo, db))
        .unwrap();
}

#[tauri::command]
pub fn modify_tramo(id: i32, tramo: TramoCreate, app_handle: AppHandle) {
    app_handle
        .db(|db| tramo_repository::update(id, tramo, db))
        .unwrap();
}

#[tauri::command]
pub fn remove_tramo(id: i32, app_handle: AppHandle) {
    app_handle.db(|db| {
        curva_repository::remove_by_tramo_id(id, db).unwrap();
        cita_repository::remove_by_tramo_id(id, db).unwrap();
        tramo_repository::remove(id, db).unwrap();
    });
}

#[tauri::command]
pub fn update_tramo_orden(id: i32, orden: i32, app_handle: AppHandle) {
    app_handle
        .db(|db| tramo_repository::update_orden(id, orden, db))
        .unwrap();
}
