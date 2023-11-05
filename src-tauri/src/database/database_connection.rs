use rusqlite::Connection;
use std::fs;
use std::path::Path;
use tauri::AppHandle;

const CURRENT_DB_VERSION: u32 = 1;

pub fn initialize_database(app_handle: &AppHandle) -> Result<Connection, rusqlite::Error> {
    let app_dir = app_handle
        .path_resolver()
        .app_data_dir()
        .expect("The app data directory should exist.");
    fs::create_dir_all(&app_dir).expect("The app data directory should be created.");
    let sqlite_path = app_dir.join("valls_rally.sqlite");

    let db_path = sqlite_path.to_str().unwrap();

    if !Path::new(db_path).exists() {
        fs::File::create(db_path).unwrap();
    }

    let mut db = Connection::open(sqlite_path)?;

    let mut user_pragma = db.prepare("PRAGMA user_version")?;
    let existing_user_version: u32 = user_pragma.query_row([], |row| Ok(row.get(0)?))?;
    drop(user_pragma);

    upgrade_database_if_needed(&mut db, existing_user_version, app_handle)?;

    Ok(db)
}

fn upgrade_database_if_needed(
    db: &mut Connection,
    existing_version: u32,
    app_handle: &AppHandle,
) -> Result<(), rusqlite::Error> {
    if existing_version < CURRENT_DB_VERSION {
        let resource_path = app_handle
            .path_resolver()
            .resolve_resource("resources/migrations/migration_1.sql")
            .expect("failed to resolve resource");

        let migration = std::fs::read_to_string(&resource_path)
            .expect("Should have been able to read the migration file");

        db.pragma_update(None, "journal_mode", "WAL")?;

        let tx = db.transaction()?;

        tx.pragma_update(None, "user_version", CURRENT_DB_VERSION)?;

        tx.execute_batch(&migration)?;

        tx.commit()?;
    }

    Ok(())
}
