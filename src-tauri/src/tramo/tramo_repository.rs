use rusqlite::{named_params, params, Connection, Error};

use super::tramo_struct::{Tramo, TramoCreate};

pub fn find_by_carrera(carrera_id: i32, db: &Connection) -> Result<Vec<Tramo>, rusqlite::Error> {
    let mut statement = db.prepare(
        r#"
        SELECT *
        FROM tramo
        WHERE carrera_id = ?
        ORDER BY orden DESC
    "#,
    )?;

    let mut rows = statement.query(params![carrera_id])?;
    let mut items = Vec::new();

    while let Some(row) = rows.next()? {
        let tramo = Tramo {
            id: row.get("id")?,
            carrera_id: row.get("carrera_id")?,
            nombre: row.get("nombre")?,
            orden: row.get("orden")?,
            factor: row.get("factor")?,
        };

        items.push(tramo);
    }

    Ok(items)
}

pub fn find_factor_by_id(id: i32, db: &Connection) -> Result<f64, rusqlite::Error> {
    let mut statement = db.prepare(
        r#"
        SELECT factor
        FROM tramo
        WHERE id = ?
    "#,
    )?;

    let mut rows = statement.query(params![id])?;

    if let Some(row) = rows.next()? {
        Ok(row.get(0)?)
    } else {
        Err(rusqlite::Error::QueryReturnedNoRows)
    }
}

pub fn insert(tramo: TramoCreate, db: &Connection) -> Result<(), rusqlite::Error> {
    let query = "SELECT COUNT(*) FROM tramo";
    let count: i64 = db
        .query_row(query, params![], |row| row.get(0))
        .expect("Failed to count rows");

    let mut statement = db.prepare(
        r#"
        INSERT INTO tramo (carrera_id, orden, nombre, factor)
        VALUES (@carrera_id, @orden, @nombre, @factor)
    "#,
    )?;

    statement.execute(named_params! {
      "@carrera_id": tramo.carrera_id,
      "@orden": count + 1,
      "@nombre": tramo.nombre,
      "@factor": tramo.factor,
    })?;

    Ok(())
}

pub fn update(id: i32, tramo: TramoCreate, db: &Connection) -> Result<(), rusqlite::Error> {
    let mut statement = db.prepare(
        r#"
        UPDATE tramo
        SET carrera_id = @carrera_id,
            nombre = @nombre,
            factor = @factor
        WHERE id = @id
    "#,
    )?;

    statement.execute(named_params! {
      "@carrera_id": tramo.carrera_id,
      "@nombre": tramo.nombre,
      "@factor": tramo.factor,
      "@id": id
    })?;

    Ok(())
}

pub fn update_orden(id: i32, new_orden: i32, db: &Connection) -> Result<(), rusqlite::Error> {
    let current_orden: i32;
    let carrera_id: i32;

    let mut statement_select = db.prepare(
        r#"
        SELECT orden, carrera_id
        FROM tramo
        WHERE id = ?
        LIMIT 1
    "#,
    )?;

    let mut rows = statement_select.query(params![id])?;

    if let Some(row) = rows.next()? {
        current_orden = row.get(0)?;
        carrera_id = row.get(1)?;
    } else {
        return Err(Error::QueryReturnedNoRows);
    }

    if new_orden < current_orden {
        let mut statement_others = db.prepare(
            r#"
            UPDATE tramo
            SET orden = orden + 1
            WHERE carrera_id = @carrera_id
            AND orden < @current
            AND orden >= @new
        "#,
        )?;
        statement_others.execute(named_params! {
            "@carrera_id": carrera_id,
            "@current": current_orden,
            "@new": new_orden
        })?;
    }

    if new_orden > current_orden {
        let mut statement_others = db.prepare(
            r#"
            UPDATE tramo
            SET orden = orden - 1
            WHERE carrera_id = @carrera_id
            AND orden > @current
            AND orden <= @new
        "#,
        )?;
        statement_others.execute(named_params! {
            "@carrera_id": carrera_id,
            "@current": current_orden,
            "@new": new_orden
        })?;
    }

    let mut statement_this = db.prepare(
        r#"
        UPDATE tramo
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
        DELETE FROM tramo
        WHERE id = @id
    "#,
    )?;
    statement.execute(named_params! { "@id": id })?;

    Ok(())
}

pub fn remove_by_carrera_id(carrera_id: i32, db: &Connection) -> Result<(), rusqlite::Error> {
    let mut statement = db.prepare(
        r#"
        DELETE FROM tramo
        WHERE carrera_id = @carrera_id
    "#,
    )?;
    statement.execute(named_params! { "@carrera_id": carrera_id })?;

    Ok(())
}
