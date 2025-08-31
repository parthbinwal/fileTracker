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
          await fs.writeFile(this.indexPath,JSON.stringify([]),{flag:'wx'});//open for writing, fail iif   exists
     } catch (error) {
          console.log('already initialised',error);
          
     }
    }
    async hashObject(content){
       return crypto.createHash('sha1').update(content,'utf-8').digest('hex'); 
    }
    async add(fileTobeAdded){
     const fileData=await fs.readFile(fileTobeAdded,{encoding:'utf-8'});
     const fileHash=await this.hashObject(fileData);
     console.log(fileHash);
     const newFileHashobjectsPath=path.join(this.objectsPath,fileHash);
     await fs.writeFile(newFileHashobjectsPath,fileData);
     await this.updatetagingArea(fileTobeAdded,fileHash);
     console.log(`Added ${fileTobeAdded}`);
    }
    async updatetagingArea(filePath,fileHash){
           const index=JSON.parse(await fs.readFile(this.indexPath,{encoding:'utf-8'}));
           index.push({path : filePath,hash : fileHash});
           await fs.writeFile(this.indexPath,JSON.stringify(index));
           console.log(`Updated index with ${filePath} at ${fileHash}`);

    }
    async commit(message){
        const index=JSON.parse(await fs.readFile(this.indexPath,{encoding:'utf-8'}));
        
       

     }
     async getCurrentHead(){
          try {
               return await fs.readFile(this.headPath,{encoding:'utf-8'});
               const parentCommit=await this.getCurrentHead();

          } catch (error) {
               
          }

     }



}

const groot=new Filetracker();
groot.add('sample.txt');




