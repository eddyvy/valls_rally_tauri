use tauri::AppHandle;

use crate::database::database_impl::ServiceAccess;

use super::{
    curva_repository,
    curva_struct::{Curva, CurvaCreate},
};

#[tauri::command]
pub fn get_curvas(tramo_id: i32, app_handle: AppHandle) -> Vec<Curva> {
    let curvas = app_handle
        .db(|db| curva_repository::find_by_tramo(tramo_id, db))
        .unwrap();

    return curvas;
}

#[tauri::command]
pub fn add_curva(curva: CurvaCreate, app_handle: AppHandle) {
    app_handle
        .db(|db| curva_repository::insert(curva, db))
        .unwrap();
}

#[tauri::command]
pub fn modify_curva(id: i32, curva: CurvaCreate, app_handle: AppHandle) {
    app_handle
        .db(|db| curva_repository::update(id, curva, db))
        .unwrap();
}

#[tauri::command]
pub fn remove_curva(id: i32, app_handle: AppHandle) {
    app_handle
        .db(|db| curva_repository::remove(id, db))
        .unwrap();
}
