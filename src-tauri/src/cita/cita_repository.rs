use rusqlite::{named_params, params, Connection};

use super::cita_struct::{Cita, CitaCreate};

pub fn find_by_tramo(tramo_id: i32, db: &Connection) -> Result<Vec<Cita>, rusqlite::Error> {
    let mut statement = db.prepare(
        r#"
        SELECT *
        FROM cita
        WHERE tramo_id = ?
        ORDER BY metro ASC
    "#,
    )?;

    let mut rows = statement.query(params![tramo_id])?;
    let mut items = Vec::new();

    while let Some(row) = rows.next()? {
        let cita = Cita {
            id: row.get("id")?,
            tramo_id: row.get("tramo_id")?,
            nombre: row.get("nombre")?,
            metro: row.get("metro")?,
            metro_teorico: row.get("metro_teorico")?,
        };

        items.push(cita);
    }

    Ok(items)
}

pub fn insert(cita: CitaCreate, db: &Connection) -> Result<(), rusqlite::Error> {
    let mut statement = db.prepare(
        r#"
        INSERT INTO cita (tramo_id, nombre, metro, metro_teorico)
        VALUES (@tramo_id, @nombre, @metro, @metro_teorico)
    "#,
    )?;

    statement.execute(named_params! {
      "@tramo_id": cita.tramo_id,
      "@nombre": cita.nombre,
      "@metro": cita.metro,
      "@metro_teorico": cita.metro_teorico
    })?;

    Ok(())
}

pub fn update(id: i32, cita: CitaCreate, db: &Connection) -> Result<(), rusqlite::Error> {
    let mut statement = db.prepare(
        r#"
        UPDATE cita
        SET tramo_id = @tramo_id,
            nombre = @nombre,
            metro = @metro,
            metro_teorico = @metro_teorico
        WHERE id = @id
    "#,
    )?;

    statement.execute(named_params! {
      "@tramo_id": cita.tramo_id,
      "@nombre": cita.nombre,
      "@metro": cita.metro,
      "@metro_teorico": cita.metro_teorico,
      "@id": id
    })?;

    Ok(())
}

pub fn remove(id: i32, db: &Connection) -> Result<(), rusqlite::Error> {
    let mut statement = db.prepare(
        r#"
        DELETE FROM cita
        WHERE id = @id
    "#,
    )?;
    statement.execute(named_params! { "@id": id })?;

    Ok(())
}

pub fn remove_by_tramo_id(tramo_id: i32, db: &Connection) -> Result<(), rusqlite::Error> {
    let mut statement = db.prepare(
        r#"
        DELETE FROM cita
        WHERE tramo_id = @tramo_id
    "#,
    )?;
    statement.execute(named_params! { "@tramo_id": tramo_id })?;

    Ok(())
}
