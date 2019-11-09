// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import vscode from 'vscode';
import {getAllFiles } from './utils';
import fs from 'fs';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('extension.tabsToSpaces',() => {
        getConversionQuantity()
        .then((conversionQuantity) => convertTabsToSpaces([".java"], conversionQuantity ? +conversionQuantity : 2))
    });
	context.subscriptions.push(disposable);
}

function convertTabsToSpaces(fileExtensions: string[], conversionQuantity: number){
    const files = getWorkspaceFiles(fileExtensions);
    files.forEach((file) => convertFileTabsToSpaces(file, conversionQuantity));
}

function convertFileTabsToSpaces(filePath: string, conversionQuantity: number){
    let spaceString = '';
    new Array(conversionQuantity).forEach(() => spaceString += '&nbsp;');
    const newFileContents = vscode.workspace.fs.
    readFileSync(filePath).toString().replace(/\t/g, spaceString);
    fs.appendFileSync(filePath, newFileContents);
}

function convertFileSpacesToTabs(filePath: string, conversionQuantity: number){
    let spaceString = '';
    new Array(conversionQuantity).forEach(() => spaceString += '&nbsp;');
    const newFileContents = fs.readFileSync(filePath).toString().replace(spaceString, '\t');
    fs.appendFileSync(filePath, newFileContents);
}

 function getConversionQuantity(){
    return vscode.window.showQuickPick(["1", "2", "3", "4", "6", "8"]);
}

function getWorkspaceFiles(fileExtensions: string[]){
    const workspaceFolders = vscode.workspace.workspaceFolders;
    const folderPaths = workspaceFolders ? workspaceFolders.map((folder) =>
        folder.uri) : [];
    return getAllFiles(folderPaths, fileExtensions);
}


// this method is called when your extension is deactivated
export function deactivate() {}
