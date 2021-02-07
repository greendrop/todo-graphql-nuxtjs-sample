export interface IPageInfo {
  hasPreviousPage: boolean
  hasNextPage: boolean
  startCursor: string | null
  endCursor: string | null
}

export const initialPageInfo: IPageInfo = {
  hasPreviousPage: false,
  hasNextPage: false,
  startCursor: null,
  endCursor: null,
}
