use rusqlite::{named_params, params, Connection};

use super::curva_struct::{Curva, CurvaCreate};

pub fn find_by_tramo(tramo_id: i32, db: &Connection) -> Result<Vec<Curva>, rusqlite::Error> {
    let mut statement = db.prepare(
        r#"
        SELECT curva.*
        FROM curva
        JOIN cita ON curva.cita_inicial_id = cita.id
        WHERE curva.tramo_id = ?
        ORDER BY cita.metro ASC
    "#,
    )?;

    let mut rows = statement.query(params![tramo_id])?;
    let mut items = Vec::new();

    while let Some(row) = rows.next()? {
        let curva = Curva {
            id: row.get("id")?,
            tramo_id: row.get("tramo_id")?,
            cita_inicial_id: row.get("cita_inicial_id")?,
            cita_final_id: row.get("cita_final_id")?,
            grados: row.get("grados")?,
            is_right: row.get("is_right")?,
        };

        items.push(curva);
    }

    Ok(items)
}

pub fn insert(curva: CurvaCreate, db: &Connection) -> Result<(), rusqlite::Error> {
    let mut statement = db.prepare(
        r#"
        INSERT INTO curva (
          tramo_id,
          cita_inicial_id,
          cita_final_id,
          grados,
          is_right
        )
        VALUES (
          @tramo_id,
          @cita_inicial_id,
          @cita_final_id,
          @grados,
          @is_right
        )
    "#,
    )?;

    statement.execute(named_params! {
      "@tramo_id": curva.tramo_id,
      "@cita_inicial_id": curva.cita_inicial_id,
      "@cita_final_id": curva.cita_final_id,
      "@grados": curva.grados,
      "@is_right": curva.is_right,
    })?;

    Ok(())
}

pub fn update(id: i32, curva: CurvaCreate, db: &Connection) -> Result<(), rusqlite::Error> {
    let mut statement = db.prepare(
        r#"
        UPDATE curva
        SET tramo_id = @tramo_id,
            cita_inicial_id = @cita_inicial_id,
            cita_final_id = @cita_final_id,
            grados = @grados,
            is_right = @is_right
        WHERE id = @id
    "#,
    )?;

    statement.execute(named_params! {
      "@tramo_id": curva.tramo_id,
      "@cita_inicial_id": curva.cita_inicial_id,
      "@cita_final_id": curva.cita_final_id,
      "@grados": curva.grados,
      "@is_right": curva.is_right,
      "@id": id
    })?;

    Ok(())
}

pub fn remove(id: i32, db: &Connection) -> Result<(), rusqlite::Error> {
    let mut statement = db.prepare(
        r#"
        DELETE FROM curva
        WHERE id = @id
    "#,
    )?;
    statement.execute(named_params! { "@id": id })?;

    Ok(())
}

pub fn remove_by_cita_id(cita_id: i32, db: &Connection) -> Result<(), rusqlite::Error> {
    let mut statement = db.prepare(
        r#"
        DELETE FROM curva
        WHERE cita_inicial_id = @cita_id
        OR cita_final_id = @cita_id
    "#,
    )?;
    statement.execute(named_params! { "@cita_id": cita_id })?;

    Ok(())
}

pub fn remove_by_tramo_id(tramo_id: i32, db: &Connection) -> Result<(), rusqlite::Error> {
    let mut statement = db.prepare(
        r#"
        DELETE FROM curva
        WHERE tramo_id = @tramo_id
    "#,
    )?;
    statement.execute(named_params! { "@tramo_id": tramo_id })?;

    Ok(())
}
