export type CitaDBType = {
  id: number
  tramoId: number
  nombre: string
  metro: number
  metroTeorico: number | null
}

export type CitaType = {
  id: number
  tramoId: number
  nombre: string
  metro: number
  esTeorico: boolean
  metroCalculado: number | null
  diff: number | null
  curvaData?: {
    isRight: boolean
    grados: number
  }
}

export type CitaTypeSnakeCase = {
  id: number
  tramo_id: number
  nombre: string
  metro: number
  es_teorico: boolean
  metro_calculado: number | null
  diff: number | null
  curva_data?: {
    is_right: boolean
    grados: number
  }
}
