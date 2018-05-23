import fs from 'fs';
import uuid from 'uuid/v4'

export default class ImageProvider {

  BASE_STUDENT_DIRECTORY_PATH = '/data/ftp/files/students';

  base64MimeType(encoded) {
    let result = null;

    if (typeof encoded !== 'string') {
      return result;
    }

    let mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);

    if (mime && mime.length) {
      result = mime[1];
    }
    return result;
  }

  saveImage(rawData, callBack){
    let mimeType = this.base64MimeType(rawData);
    let type = '';
    let data = '';
    switch (mimeType) {
      case 'image/png':
        type = 'png';
        data = rawData.replace(/^data:image\/png;base64,/, "");
        break;
      case 'image/jpeg':
        type = 'jpg';
        data = rawData.replace(/^data:image\/jpeg;base64,/, "");
        break;
      default:
        break;
    }
    console.log('type & data: ',type, data);
    const fileName = uuid();
    console.log('fileName', fileName);
    fs.writeFile(`${this.BASE_STUDENT_DIRECTORY_PATH}/${fileName}.${type}`, data, 'base64', (err) => callBack(err, `${this.BASE_STUDENT_DIRECTORY_PATH}/${fileName}.${type}`))
  }
}