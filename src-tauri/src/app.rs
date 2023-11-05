use tauri::{self, Manager, State};

use crate::{
    carrera::carrera_handler,
    cita::cita_handler,
    curva::curva_handler,
    database::{database_connection::initialize_database, database_impl::AppState},
    tramo::tramo_handler,
};

pub fn start_app() {
    tauri::Builder::default()
        .manage(AppState {
            db: Default::default(),
        })
        .setup(|app| {
            let handle = app.handle();

            let app_state: State<AppState> = handle.state();
            let db = initialize_database(&handle).expect("Database initialize should succeed");
            *app_state.db.lock().unwrap() = Some(db);

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            carrera_handler::get_carreras,
            carrera_handler::add_carrera,
            carrera_handler::modify_carrera,
            carrera_handler::remove_carrera,
            carrera_handler::update_carrera_orden,
            cita_handler::get_citas,
            cita_handler::add_cita,
            cita_handler::modify_cita,
            cita_handler::remove_cita,
            tramo_handler::get_tramos,
            tramo_handler::add_tramo,
            tramo_handler::modify_tramo,
            tramo_handler::remove_tramo,
            tramo_handler::update_tramo_orden,
            curva_handler::get_curvas,
            curva_handler::add_curva,
            curva_handler::modify_curva,
            curva_handler::remove_curva
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
