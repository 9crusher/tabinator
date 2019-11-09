import {fs} from 'vscode';

export const getPathFromURI = (uri: string) => {
    if(uri.startsWith('file:///')){
        return uri.substring(8);
    }
    return '';
};

export const getAllFiles = (dirPaths: string[], acceptableExtensions: string[]): string[] => {
    let results: string[] = [];
    dirPaths.forEach((path) => {
        let paths = walkSync(path, [], acceptableExtensions);
        results = results.concat(paths);
    });
    return results;
};
wor
// List all files in a directory in Node.js recursively in a synchronous fashion
const walkSync = (dir: string, filelist: string[], acceptableExtensions: string[]) => {
    let files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(file => {
      if (fs.statSync(dir + '/' + file).isDirectory()) {
        filelist = walkSync(dir + '/' + file, filelist, acceptableExtensions);
      }
      else if (isAcceptableFileType(acceptableExtensions, file)) {
        filelist.push(dir + '/' + file);
      }
    });
    return filelist;
  };

const isAcceptableFileType = (acceptableFileExtensions: string[], filePath: string): boolean => {
    let result = false;
    acceptableFileExtensions.forEach(extension => {
        if(filePath.endsWith(extension)){
            result = true;
        }
    });
    return result;
};
