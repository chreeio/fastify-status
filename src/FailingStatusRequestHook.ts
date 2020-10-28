export interface FailingStatusRequestHook {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (request: any, reply: any, next: any): void
}
