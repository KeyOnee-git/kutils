// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { extractAsKeyValue, GeneralObject } from './koutil';
import { defaultSettings } from './defaultSettings';

const udpateUserSettings = async(settings: GeneralObject[]) => {
	settings.forEach(async setting => {
		const {key, value} = extractAsKeyValue(setting);
		await vscode.workspace
			.getConfiguration()
			.update(key, value, vscode.ConfigurationTarget.Global);
	});
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "pandabt-helper" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('pandabt-helper.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from PandaBT Helper!');
	});

	context.subscriptions.push(disposable);

	let disposable2 = vscode.commands.registerCommand('pandabt-helper.testSetting', () => {
		var cfg = vscode.workspace.getConfiguration();
		var pbh = vscode.workspace.getConfiguration('pandabt-helper');
		
		console.log(`cfg =>`);
		console.log(cfg);
		console.log(`pbh =>`);
		console.log(pbh);
		vscode.window.showInformationMessage(`PandaBT Helper TestSetting. pbh.b1(${pbh.b1}) pbh.lol(${pbh.lol})`);
	});

	context.subscriptions.push(disposable2);

	let disposable3 = vscode.commands.registerCommand('pandabt-helper.updateConfig', async () => {
		console.log(JSON.stringify(defaultSettings, null, 1));
		await udpateUserSettings(defaultSettings);
		await vscode.window.showInformationMessage('config has been updated');
	});

	context.subscriptions.push(disposable3);
}

// this method is called when your extension is deactivated
export function deactivate() {}
