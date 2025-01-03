const timeMiddleware = (store) => {
  return (next) => {
    return (action) => {
      console.log("⏰⏰⏰：", new Date().getTime());
      next(action);
    }
  }
}

export default timeMiddleware;