import {workspace, Uri} from 'vscode';
import {LinkedList} from 'linked-list-typescript';

export const getUrisByExtensions = async(extensions: string[]) => {
    let blobPattern = '{' + extensions.toString() + '}';
    return await workspace.findFiles('**/*.' + blobPattern);
};

export const replaceTabsWithSpaces = async(uri: Uri, spacesInATab: number) => {
    const originalFileContents = await workspace.fs.readFile(uri);
    const newFileContents: LinkedList<number> = new LinkedList();
    originalFileContents.forEach(char => {
        if(char === 9){
            addSpaces(newFileContents, spacesInATab);
        } else {
            newFileContents.append(char);
        }
    });
    await workspace.fs.writeFile(uri, new Uint8Array(newFileContents.toArray()));
};

export const replaceSpacesWithTabs = async(uri: Uri, spacesInATab: number ) => {
	const originalFileContents = await workspace.fs.readFile(uri);
	const newFileContents: LinkedList<number> = new LinkedList();
	let spaceCount = 0;
	originalFileContents.forEach(char => {
 		if(char === 32) {
			spaceCount++;
			if(spaceCount === spacesInATab) {
				newFileContents.append(9);
				spaceCount = 0;
			} 
		} else {
			addSpaces(newFileContents, spaceCount);
			newFileContents.append(char);
			spaceCount = 0;
		}
	});
	addSpaces(newFileContents, spaceCount);
    await workspace.fs.writeFile(uri, new Uint8Array(newFileContents.toArray()));
};

const addSpaces = (list: LinkedList<number>, numSpaces: number) => {
    for (let i = 0; i < numSpaces; i++) {
        list.append(32);
    }
};

