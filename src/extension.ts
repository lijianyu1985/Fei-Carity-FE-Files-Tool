import { stringify } from 'querystring';
import { ExtensionContext, commands } from 'vscode';

import { commandsMap } from './commands';

export function activate(context: ExtensionContext) {

	// 右键菜单注册
	for (const [key, value] of commandsMap) {
		const command = commands.registerCommand(key, args => { console.log(`Carity generate ${ key }`); });

		context.subscriptions.push(command);
	}
}

// this method is called when your extension is deactivated
export function deactivate() {}
