import fs from 'fs';

export default class claseGenericaManager {
  constructor(path) {
    this.filePath = path;

    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify([], null, 2), {
        encoding: 'utf-8',
      });
    }
  }
}
