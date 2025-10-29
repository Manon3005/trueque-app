
export enum State {
  NEW,
  LIKE_NEW,
  GOOD_CONDITION,
  ACCEPTABLE_CONDITION,
  WORN,
  NEEDS_REPAIR
}


export const StateLabel = new Map<State, string>([
  [State.NEW, 'Nuevo'],
  [State.LIKE_NEW, 'Como Nuevo'],
  [State.GOOD_CONDITION, 'Buen Estado'],
  [State.ACCEPTABLE_CONDITION, 'Aceptable'],
  [State.WORN, 'Desgastado'],
  [State.NEEDS_REPAIR, 'Necesita Reparación']
]);