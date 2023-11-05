export enum AutoLoadStatus {
  INITIAL = 0,
  STARTED = 1,
  FINISHED = 2,
}

export type AutoLoadState = { status: AutoLoadStatus }
