const exceptiontimeMiddleware = (store) => (next) => (action) => {
  try {
    console.log('很棒，没有异常~')
    next(action);
  } catch (err) {
    console.log("error❌:", err);
  }
}

export default exceptiontimeMiddleware;