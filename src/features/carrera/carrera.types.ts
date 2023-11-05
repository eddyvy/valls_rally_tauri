export type CarreraType = {
  id: number
  orden: number
  nombre: string
}

export type CarreraState = {
  selected: CarreraType | null
  carreras: CarreraType[]
}
