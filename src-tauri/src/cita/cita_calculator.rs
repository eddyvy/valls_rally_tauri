use crate::curva::curva_struct::Curva;

use super::cita_struct::{Cita, CitaBloque, CitaBloqueCalculo, CitaCalculated, CitaCurvaData};

pub fn calculate_citas(citas: &Vec<Cita>, curvas: &Vec<Curva>, factor: f64) -> Vec<CitaCalculated> {
    let mut calculated_citas: Vec<CitaCalculated> = Vec::new();
    let bloques: Vec<CitaBloque> = calc_bloques(citas, curvas, factor);

    if bloques.len() <= 0 {
        for cita in citas {
            calculated_citas.push(CitaCalculated {
                id: cita.id,
                tramo_id: cita.tramo_id,
                nombre: cita.nombre.clone(),
                metro: cita.metro,
                es_teorico: cita.metro_teorico.is_some(),
                metro_calculado: cita.metro_teorico,
                diff: None,
                curva_data: None,
            });
        }
        return calculated_citas;
    }

    let mut b: usize = 0;
    let mut bloque = &bloques[b];

    for cita in citas {
        if cita.metro < bloque.metro_desde || cita.metro > bloque.metro_hasta {
            b += 1;
            if b < bloques.len() {
                bloque = &bloques[b];
            }
        }

        let metro_calc = if let Some(metro_teorico) = cita.metro_teorico {
            metro_teorico
        } else {
            bloque.m * cita.metro + bloque.n
        };

        let diff = metro_calc - cita.metro;

        let curva_data = if let Some(curva_data) = &bloque.curva_data {
            Some(CitaCurvaData {
                grados: curva_data.grados,
                is_right: curva_data.is_right,
            })
        } else {
            if bloque.metro_hasta == cita.metro {
                if b + 1 < bloques.len() {
                    if let Some(c_data) = &bloques[b + 1].curva_data {
                        Some(CitaCurvaData {
                            grados: c_data.grados,
                            is_right: c_data.is_right,
                        })
                    } else {
                        None
                    }
                } else {
                    None
                }
            } else {
                None
            }
        };

        calculated_citas.push(CitaCalculated {
            id: cita.id,
            tramo_id: cita.tramo_id,
            nombre: cita.nombre.clone(),
            metro: cita.metro,
            es_teorico: cita.metro_teorico.is_some(),
            metro_calculado: Some(metro_calc),
            diff: Some(diff),
            curva_data,
        });
    }

    calculated_citas
}

fn calc_bloques(citas: &Vec<Cita>, curvas: &Vec<Curva>, factor: f64) -> Vec<CitaBloque> {
    let mut bloques: Vec<CitaBloque> = Vec::new();
    let mut bloques_calculo: Vec<CitaBloqueCalculo> = Vec::new();

    if citas.len() == 0 {
        return bloques;
    }

    let citas_range = citas.len();

    for i in 0..citas_range {
        let cita = &citas[i];

        let mut next_teorico: Option<&Cita> = None;
        let es_teorico = cita.metro_teorico.is_some();
        let mut curva_cita: Option<&Curva> = None;
        let mut es_curva_ini = false;
        let mut es_curva_fin = false;

        for curva in curvas {
            if cita.id == curva.cita_inicial_id {
                es_curva_ini = true;
                curva_cita = Some(&curva);
            }
            if cita.id == curva.cita_final_id {
                es_curva_fin = true;
                curva_cita = Some(&curva);
            }
        }

        if es_teorico || es_curva_ini || es_curva_fin {
            for j in (i + 1)..citas_range {
                let next_cita = &citas[j];
                if next_cita.metro_teorico.is_some() {
                    next_teorico = Some(next_cita);
                }
            }

            bloques_calculo.push(CitaBloqueCalculo {
                cita: &cita,
                curva: curva_cita,
                es_curva_fin,
                es_curva_ini,
                es_teorico,
                next_teorico,
            })
        }
    }

    let mut curva_ini_metro = 0.0;
    let mut prev_metro = 0.0;
    let mut metro_desde_calc = 0.0;

    for bloque_calculo in bloques_calculo {
        let metro_desde = prev_metro;
        let metro_hasta = bloque_calculo.cita.metro;
        prev_metro = bloque_calculo.cita.metro;

        let curva_data: Option<CitaCurvaData> = if let Some(curva) = bloque_calculo.curva {
            Some(CitaCurvaData {
                grados: curva.grados,
                is_right: curva.is_right,
            })
        } else {
            None
        };

        if bloque_calculo.es_teorico {
            if let Some(metro_teorico) = bloque_calculo.cita.metro_teorico {
                let m = (metro_teorico - metro_desde_calc) / (metro_hasta - metro_desde);
                let n = metro_desde_calc - m * metro_desde;

                metro_desde_calc = metro_teorico;

                bloques.push(CitaBloque {
                    metro_desde,
                    metro_hasta,
                    m,
                    n,
                    curva_data: None,
                })
            }
        } else if bloque_calculo.es_curva_fin {
            if let Some(curva) = bloque_calculo.curva {
                let direction = if curva.is_right { 1.0 } else { -1.0 };
                let alpha = direction * factor * curva.grados * std::f64::consts::PI / 180.0;

                let m = 1.0 + alpha / (metro_hasta - curva_ini_metro);
                let n = metro_desde_calc - m * metro_desde;

                metro_desde_calc = metro_hasta * m + n;

                bloques.push(CitaBloque {
                    metro_desde,
                    metro_hasta,
                    m,
                    n,
                    curva_data,
                })
            }
        } else if bloque_calculo.es_curva_ini {
            if let Some(next_teorico) = bloque_calculo.next_teorico {
                if let Some(metro_teorico) = next_teorico.metro_teorico {
                    let m = (metro_teorico - metro_desde_calc) / (next_teorico.metro - metro_desde);
                    let n = metro_desde_calc - m * metro_desde;

                    metro_desde_calc = metro_hasta * m + n;

                    bloques.push(CitaBloque {
                        metro_desde,
                        metro_hasta,
                        m,
                        n,
                        curva_data: None,
                    })
                }
            }
        }

        if bloque_calculo.es_curva_ini {
            curva_ini_metro = bloque_calculo.cita.metro;
        }
    }

    bloques
}
