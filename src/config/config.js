import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(new URL('./', import.meta.url));
const __dirname = dirname(__filename);

// import * as url from 'url';
// const __dirname = url.fileURLToPath(new URL('../', import.meta.url));

export default __dirname;