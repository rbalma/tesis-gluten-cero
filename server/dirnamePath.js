import { dirname } from 'path';
import { fileURLToPath } from 'url';

const dirnamePath = dirname(fileURLToPath(import.meta.url));

export default dirnamePath;