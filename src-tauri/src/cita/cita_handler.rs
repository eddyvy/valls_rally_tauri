use tauri::AppHandle;

use crate::{
    curva::curva_repository, database::database_impl::ServiceAccess, tramo::tramo_repository,
};

use super::{
    cita_calculator, cita_repository,
    cita_struct::{CitaCalculated, CitaCreate},
};

#[tauri::command]
pub fn get_citas(tramo_id: i32, app_handle: AppHandle) -> Vec<CitaCalculated> {
    let citas = app_handle.db(|db| {
        let citas = cita_repository::find_by_tramo(tramo_id, db).unwrap();
        let curvas = curva_repository::find_by_tramo(tramo_id, db).unwrap();
        let factor = tramo_repository::find_factor_by_id(tramo_id, db).unwrap();

        cita_calculator::calculate_citas(&citas, &curvas, factor)
    });

    return citas;
}

#[tauri::command]
pub fn add_cita(cita: CitaCreate, app_handle: AppHandle) {
    app_handle
        .db(|db| cita_repository::insert(cita, db))
        .unwrap();
}

#[tauri::command]
pub fn modify_cita(id: i32, cita: CitaCreate, app_handle: AppHandle) {
    app_handle
        .db(|db| cita_repository::update(id, cita, db))
        .unwrap();
}

#[tauri::command]
pub fn remove_cita(id: i32, app_handle: AppHandle) {
    app_handle.db(|db| {
        curva_repository::remove_by_cita_id(id, db).unwrap();
        cita_repository::remove(id, db).unwrap();
    });
}
