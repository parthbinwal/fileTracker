import path from 'path';
import fs from 'fs/promises';
import crypto from 'crypto';
class Filetracker{
     constructor(repoPath='.'){
      this.repoPath=path.join(repoPath,'.FileTracker');
      this.objectsPath=path.join(this.repoPath,'objects');
      this.headPath=path.join(this.repoPath,'HEAD');
      this.indexPath=path.join(this.repoPath,'index');
      this.init();
     }

     async init(){
     await fs.mkdir(this.objectsPath,{recursive: true});
     try {
          await fs.writeFile(this.headPath,'',{flag:'wx'});//open for writing, fail iif   exists
          await fs.writeFile(this.indexPath,'',JSON.stringify([]),{flag:'wx'});//open for writing, fail iif   exists
     } catch (error) {
          console.log('already initialised',error);
          
     }
    }
    async hashObject(content){
       return crypto.createHash('sha1').update(content,'utf-8').digest('hex'); 
    }
     }

const groot=new Filetracker();





