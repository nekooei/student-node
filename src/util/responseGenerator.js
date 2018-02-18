/**
 * Created by milad on 2/7/18.
 */
export default ( isSuccess, message, data ) => {
  return{
    success: isSuccess ? true : undefined,
    error: !isSuccess ? true : undefined,
    message,
    payload : data ? data : {}
  }
}