import { writeEncryptedBackup } from './backup.js';
import { runRestoreDrill } from './restore.js';

const file = writeEncryptedBackup('tenant_id,rows\n111,10\n111,20\n');
const result = runRestoreDrill(file, 2);
console.log(JSON.stringify({ file, ...result }));
