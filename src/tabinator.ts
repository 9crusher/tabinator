import vscode, { InputBoxOptions, QuickPickOptions } from 'vscode';
import {replaceTabsWithSpaces, replaceSpacesWithTabs, getUrisByExtensions} from './utils';


export function activate(context: vscode.ExtensionContext) {

    let tabsToSpacesDisposable = vscode.commands.registerCommand('tabinator.tabsToSpaces', async () => {
        const conversionQuantity = await getConversionQuantity();
        const fileTypesCsv = await getFileExtensions();
        if(fileTypesCsv){
            convertTabsToSpaces(fileTypesCsv.split(','), conversionQuantity ? +conversionQuantity : 4);
        }
    });
    
    let spacesToTabsDisposable = vscode.commands.registerCommand('tabinator.spacesToTabs', async () => {
        const conversionQuantity = await getConversionQuantity();
        const fileTypesCsv = await getFileExtensions();
        if(fileTypesCsv){
            convertSpacesToTabs(fileTypesCsv.split(','), conversionQuantity ? +conversionQuantity : 4);
        }
    });
    
    context.subscriptions.push(tabsToSpacesDisposable);
    context.subscriptions.push(spacesToTabsDisposable);
}

async function convertTabsToSpaces(fileExtensions: string[], conversionQuantity: number){
    const files = await getUrisByExtensions(fileExtensions);
    files.forEach((file) => replaceTabsWithSpaces(file, conversionQuantity));
}

async function convertSpacesToTabs(fileExtensions: string[], conversionQuantity: number){
    const files = await getUrisByExtensions(fileExtensions);
    files.forEach((file) => replaceSpacesWithTabs(file, conversionQuantity));
}

 function getConversionQuantity() {
     const options: QuickPickOptions = {
         placeHolder: 'Enter the number of spaces in a tab'
     };
    return vscode.window.showQuickPick(["1", "2", "3", "4", "6", "8"], options);
}

function getFileExtensions(){

    const inputBoxOptions: InputBoxOptions = {
        prompt: 'Enter comma-seperated file types to be modified e.g. "java,txt,cpp"'
    };
    return vscode.window.showInputBox(inputBoxOptions);

}
