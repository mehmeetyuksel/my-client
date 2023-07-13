import { gzipSync } from "fflate"

export const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }
  
  export function bufferToBase64(buf: any) {
    var binstr = Array.prototype.map
      .call(buf, function (ch) {
        return String.fromCharCode(ch)
      })
      .join('')
    return btoa(binstr)
  }
  
  export const fileToArrayBuffer = (file: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (event: any) => {
        resolve(event.target.result)
      }
      reader.readAsArrayBuffer(file)
    })
  
export const imageToBase64 = async (file: File) => {
    const arrayBf: any = await fileToArrayBuffer(file) // get ArrayBuffer with reader.readAsArrayBuffer()
    const nonZippedArray = new Uint8Array(arrayBf) // change data to Uint8Array
    const gzipped = await gzipSync(nonZippedArray) // gzip file
    const base64ZippedImage = await bufferToBase64(gzipped) // convert zipped file to base64
    return base64ZippedImage
}