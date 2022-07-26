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
	let disposableTest1 = vscode.commands.registerCommand('pandabt-helper.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from PandaBT Helper!');
	});
	context.subscriptions.push(disposableTest1);

	let disposableTest2 = vscode.commands.registerCommand('pandabt-helper.testSetting', () => {
		var cfg = vscode.workspace.getConfiguration();
		var pbh = vscode.workspace.getConfiguration('pandabt-helper');
		
		console.log(`cfg =>`);
		console.log(cfg);
		console.log(`pbh =>`);
		console.log(pbh);
		vscode.window.showInformationMessage(`PandaBT Helper TestSetting. pbh.b1(${pbh.b1}) pbh.lol(${pbh.lol})`);
	});
	context.subscriptions.push(disposableTest2);

	let disposable1 = vscode.commands.registerCommand('pandabt-helper.updateSetting', async () => {
		console.log('updateSetting', JSON.stringify(defaultSettings, null, 1));
		let strVersion = defaultSettings[0]["pandabt-helper.version"];
		var vi = GetVersionInfo(strVersion);
		const cfgPH = vscode.workspace.getConfiguration('pandabt-helper');

		let strUpdated = 'is not updated';
		if(!!cfgPH) {
			const version = cfgPH.get('version') as string;
			if(!!version){
				const curVI = GetVersionInfo(version);
				if(curVI.rev < vi.rev) {
					await udpateUserSettings(defaultSettings);
					strUpdated = `is updated!! version(${strVersion})`;
				}
				else {
					strUpdated = `is not updated. cur(${curVI.strFull}) goal(${strVersion})`;
				}
			}
		}
		await vscode.window.showInformationMessage(`setting.json ${strUpdated}`);
	});
	context.subscriptions.push(disposable1);

	let disposable2 = vscode.commands.registerCommand('pandabt-helper.revertSetting', async () => {
		console.log('revertSetting', JSON.stringify(defaultSettings, null, 1));
		let strVersion = defaultSettings[0]["pandabt-helper.version"];
		await udpateUserSettings(defaultSettings);
		await vscode.window.showInformationMessage(`setting.json reverted  to default version(${strVersion}()`);
	});

	context.subscriptions.push(disposable2);
}

class VersionInfo {
	public major: number;
	public minor: number;
	public rev: number;
	public strFull: string;

	constructor(){
		this.major = 0;
		this.minor = 0;
		this.rev = 0;
		this.strFull = "0.0.0";
	}
}

function GetVersionInfo(strVersion:string | undefined) : VersionInfo {
	let vi = new VersionInfo();
	vi.strFull = strVersion || "";
	let arrVer = strVersion?.split(".");
	if(!!strVersion && !!arrVer && arrVer.length === 3){
		vi.major = parseInt(arrVer[0]) || 0;
		vi.minor = parseInt(arrVer[1]) || 0;
		vi.rev = parseInt(arrVer[2]) || 0;
	}
	return vi;
}
// this method is called when your extension is deactivated
export function deactivate() {}
