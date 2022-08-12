const hx = require("hbuilderx");
const treePath = require('./tree');

/**
 * 获取字符串的真实长度（中文占两个字符）
 * @param {Object} str 字符串
 */
function getTrueLength(str) {
	let reg = /[\u4e00-\u9fa5]/g,
		chinese = str.match(reg);
	// 中文占两个字符
	return chinese ? str.length + chinese.length : str.length;
}

/**
 * 获取目录树
 * @param {Object} dir 
 */
function getTree(dir, showIcon = false) {
	const treeArr = treePath(dir, showIcon);
	const nums = Math.max(...treeArr.map(el => getTrueLength(el.str)));
	const tree = treeArr.map(el => el.str + ' '.repeat(nums - getTrueLength(el.str) + 2) + '\n').join('');
	return tree;
}

/**
 * 该方法将在插件激活的时候调用
 * @param {Object} context
 */
function activate(context) {
	// 生成目录树
	let tree = hx.commands.registerCommand('tree.generator', (uri) => {
		const str = getTree(uri.fsPath);
		hx.env.clipboard.writeText(str);
		hx.window.showInformationMessage('目录树已经复制到剪贴板上了~');
	});
	context.subscriptions.push(tree);

	// 生成目录树
	let icon_tree = hx.commands.registerCommand('tree.generator.icon', (uri) => {
		const str = getTree(uri.fsPath, true);
		hx.env.clipboard.writeText(str);
		hx.window.showInformationMessage('目录树已经复制到剪贴板上了~');
	});
	context.subscriptions.push(icon_tree);
}
//该方法将在插件禁用的时候调用（目前是在插件卸载的时候触发）
function deactivate() {

}
module.exports = {
	activate,
	deactivate
}
