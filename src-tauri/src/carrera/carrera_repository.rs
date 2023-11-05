use rusqlite::{named_params, params, Connection, Error};

use super::carrera_struct::{Carrera, CarreraCreate};

pub fn find(db: &Connection) -> Result<Vec<Carrera>, rusqlite::Error> {
    let mut statement = db.prepare(
        r#"
        SELECT *
        FROM carrera
        ORDER BY orden DESC
    "#,
    )?;

    let mut rows = statement.query([])?;
    let mut items = Vec::new();

    while let Some(row) = rows.next()? {
        let carrera = Carrera {
            id: row.get("id")?,
            nombre: row.get("nombre")?,
            orden: row.get("orden")?,
        };

        items.push(carrera);
    }

    Ok(items)
}

pub fn insert(carrera: CarreraCreate, db: &Connection) -> Result<(), rusqlite::Error> {
    let query = "SELECT COUNT(*) FROM carrera";
    let count: i64 = db
        .query_row(query, params![], |row| row.get(0))
        .expect("Failed to count rows");

    let mut statement = db.prepare(
        r#"
        INSERT INTO carrera (orden, nombre)
        VALUES (@orden, @nombre)
    "#,
    )?;

    statement.execute(named_params! {
        "@orden": count + 1,
        "@nombre": carrera.nombre
    })?;

    Ok(())
}

pub fn update(id: i32, carrera: CarreraCreate, db: &Connection) -> Result<(), rusqlite::Error> {
    let mut statement = db.prepare(
        r#"
        UPDATE carrera
        SET nombre = @nombre
        WHERE id = @id
    "#,
    )?;
    statement.execute(named_params! { "@nombre": carrera.nombre, "@id": id })?;

    Ok(())
}

pub fn update_orden(id: i32, new_orden: i32, db: &Connection) -> Result<(), rusqlite::Error> {
    let current_orden: i32;

    let mut statement_select = db.prepare(
        r#"
        SELECT orden
        FROM carrera
        WHERE id = ?
        LIMIT 1
    "#,
    )?;

    let mut rows = statement_select.query(params![id])?;

    if let Some(row) = rows.next()? {
        current_orden = row.get(0)?;
    } else {
        return Err(Error::QueryReturnedNoRows);
    }

    if new_orden < current_orden {
        let mut statement_others = db.prepare(
            r#"
            UPDATE carrera
            SET orden = orden + 1
            WHERE orden < @current
            AND orden >= @new
        "#,
        )?;
        statement_others.execute(named_params! { "@current": current_orden, "@new": new_orden })?;
    }

    if new_orden > current_orden {
        let mut statement_others = db.prepare(
            r#"
            UPDATE carrera
            SET orden = orden - 1
            WHERE orden > @current
            AND orden <= @new
        "#,
        )?;
        statement_others.execute(named_params! { "@current": current_orden, "@new": new_orden })?;
    }

    let mut statement_this = db.prepare(
        r#"
        UPDATE carrera
        SET orden = @orden
        WHERE id = @id
    "#,
    )?;
    statement_this.execute(named_params! { "@orden": new_orden, "@id": id })?;

    Ok(())
}

pub fn remove(id: i32, db: &Connection) -> Result<(), rusqlite::Error> {
    let mut statement = db.prepare(
        r#"
        DELETE FROM carrera
        WHERE id = @id
    "#,
    )?;
    statement.execute(named_params! { "@id": id })?;

    Ok(())
}
