const hx = require("hbuilderx");
const treePath = require('./tree');
const readDir = require('./tree2');

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
function getTree(dir, showIcon = false, maxLevel = Number.POSITIVE_INFINITY) {
	const treeArr = treePath(dir, showIcon);
	const nums = Math.max(...treeArr.map(el => getTrueLength(el.str)));
	const tree = treeArr.map(el => el.str + ' '.repeat(nums - getTrueLength(el.str) + 2) + '\n').join('');
	return tree;
}

// function readDir(path, level, maxLevel) {
//   let files = fs.readdirSync(path);
//   let tree = '';
//   level = level || 0;
//   maxLevel = maxLevel || Number.POSITIVE_INFINITY;

//   for (let i = 0; i < files.length; i++) {
// 	let file = files[i];
// 	let stats = fs.statSync(path + '/' + file);

// 	if (stats.isDirectory() && level < maxLevel) {
// 	  tree += '\t'.repeat(level) + '|-- ' + file + '\n';
// 	  tree += readDir(path + '/' + file, level + 1, maxLevel);
// 	} else {
// 	  tree += '\t'.repeat(level) + '|-- ' + file + '\n';
// 	}
//   }

//   return tree;
// }

function handleCommand(uri, showIcon = false, maxLevel = Number.POSITIVE_INFINITY) {
	// const str = getTree(uri.fsPath);
	const str = readDir(uri.fsPath, maxLevel);
	hx.env.clipboard.writeText(str);
	hx.window.showInformationMessage('目录树已经复制到剪贴板上了~');
}

/**
 * 该方法将在插件激活的时候调用
 * @param {Object} context
 */
function activate(context) {
	// 生成目录树
	const textTree = hx.commands.registerCommand('tree.generator.text', (uri) => {
		handleCommand(uri)
	});
	const textTree1 = hx.commands.registerCommand('tree.generator.text1', (uri) => {
		handleCommand(uri, false, 1)
	});
	const textTree2 = hx.commands.registerCommand('tree.generator.text2', (uri) => {
		handleCommand(uri, false, 2)
	});
	const textTree3 = hx.commands.registerCommand('tree.generator.text3', (uri) => {
		handleCommand(uri, false, 3)
	});

	// 生成目录树（带图标）
	const iconTree = hx.commands.registerCommand('tree.generator.icon', (uri) => {
		handleCommand(uri, true)
	});
	const iconTree1 = hx.commands.registerCommand('tree.generator.icon1', (uri) => {
		handleCommand(uri, true, 1)
	});
	const iconTree2 = hx.commands.registerCommand('tree.generator.icon2', (uri) => {
		handleCommand(uri, true, 2)
	});
	const iconTree3 = hx.commands.registerCommand('tree.generator.icon3', (uri) => {
		handleCommand(uri, true, 3)
	});
	
	const commandArr = [textTree, textTree1, textTree2, textTree3, iconTree, iconTree1, iconTree2, iconTree3];
	for (let i = 0; i < commandArr.length; i++) {
		context.subscriptions.push(commandArr[i]);
	}
}
//该方法将在插件禁用的时候调用（目前是在插件卸载的时候触发）
function deactivate() {

}
module.exports = {
	activate,
	deactivate
}
