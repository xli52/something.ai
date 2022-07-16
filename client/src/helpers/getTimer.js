export default function getTimer(limit, callback) {
  return(
    setTimeout(() => {
      callback();
    }, limit)
  );
}