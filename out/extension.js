"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode_1 = require("vscode");
const commands_1 = require("./commands");
function activate(context) {
    // 右键菜单注册
    for (const [key, value] of commands_1.commandsMap) {
        const command = vscode_1.commands.registerCommand(key, args => { console.log(`Carity generate ${key}`); });
        context.subscriptions.push(command);
    }
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map