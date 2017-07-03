/**
 * Api Error
 * @extends Error
 */
export default class ApiError extends Error {

  /**
   * Constructor
   * @param {Number} status
   * @param {String} message
   */
  constructor({ status, message }) {
    super(message);
    this.status = status;
  }

}
