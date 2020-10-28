/**
 * Enumeration of possible status values for service health.
 */
export enum Status {
  /**
   * The service is up and running correctly, satisfying the functional and
   * non-functional requirements.
   */
  OK = 'ok',

  /**
   * The service might not be able to meet every requirement, but is able to fulfill its role.
   *
   * For example, if every database query is required to finish under 250 milliseconds, then
   * we can set the status of the database connection to degraded if recent queries take longer
   * than that.
   */
  DEGRADED = 'degraded',

  /**
   * The service is not able to continue its job.
   *
   * For example, if the underlying database has gone offline, then we can set the status of
   * the database connection to failing.
   */
  FAILING = 'failing',
}
