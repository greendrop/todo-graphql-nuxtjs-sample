export interface IPageInfo {
  hasPreviousPage: boolean
  hasNextPage: boolean
  startCursor: string | null
  endCursor: string | null
}

export function initialPageInfo(): IPageInfo {
  return {
    hasPreviousPage: false,
    hasNextPage: false,
    startCursor: null,
    endCursor: null,
  }
}
