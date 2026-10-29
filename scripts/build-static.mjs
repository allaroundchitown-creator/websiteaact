import {readdir,cp,rm,mkdir} from 'node:fs/promises';
const excluded=new Set(['.git','.netlify','.gitignore','node_modules','dist','netlify','payment-server','scripts','tests','PAYMENTS-SETUP.md','package.json','package-lock.json','netlify.toml']);
await rm('dist',{recursive:true,force:true});await mkdir('dist');
for(const entry of await readdir('.',{withFileTypes:true}))if(!excluded.has(entry.name)&&!entry.name.startsWith('.'))await cp(entry.name,`dist/${entry.name}`,{recursive:true});
