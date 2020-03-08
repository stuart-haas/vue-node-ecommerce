export class Mathf {

  public static randomRange(min:number, max:number) {  
    return Math.random() * (max - min) + min
  }
}