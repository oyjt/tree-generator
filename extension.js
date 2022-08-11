const hx = require("hbuilderx");
const treePath = require('./tree');

/**
 * 获取目录树
 * @param {Object} dir
 */
function gettree(dir){
	const treeArr = treePath(dir);
	const nums = Math.max(...treeArr.map(el=>el.str.length));
	const tree = treeArr.map(el => el.str + ' '.repeat(nums-el.str.length+2)+'\n').join('');
	return tree;
}

/**
 * 该方法将在插件激活的时候调用
 * @param {Object} context
 */
function activate(context) {
	let disposable = hx.commands.registerCommand('extension.generator', (uri) => {
		const str = gettree(uri.fsPath);
		hx.env.clipboard.writeText(str);
		hx.window.showInformationMessage('目录树已经复制到剪贴板上了~');
	});
	//订阅销毁钩子，插件禁用的时候，自动注销该command。
	context.subscriptions.push(disposable);
}
//该方法将在插件禁用的时候调用（目前是在插件卸载的时候触发）
function deactivate() {

}
module.exports = {
	activate,
	deactivate
}
