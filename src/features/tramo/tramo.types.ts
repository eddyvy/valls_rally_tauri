export type TramoType = {
  id: number
  carreraId: number
  orden: number
  nombre: string
  factor: number
}

export type TramoState = {
  tramos: TramoType[]
  selected: TramoType | null
}
