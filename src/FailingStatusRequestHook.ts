export interface FailingStatusRequestHook {
  (request: any, reply: any): Promise<void>
}
