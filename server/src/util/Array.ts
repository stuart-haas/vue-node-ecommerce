export class Array {
  
  public static flatten(arr) {
    return [].concat.apply([], arr)
  }
}