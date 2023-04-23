const fs = require("fs");
const path = require("path");
const ignore = ['node_modules', 'uni_modules', 'unpackage', 'dist'];

const treePath = function(dir, showIcon = false, maxLevel = Number.POSITIVE_INFINITY) {
	const treeArr = [{
		name: path.basename(dir),
		str: `${showIcon?'\u{1f4e6}':''}${path.basename(dir)}`
	}];

	const render = function(name, isLast, deep) {
		const line = deep.map(el => `${el?'\u{2502}':' '}  `).join('');
		const text = `${line}${isLast?'\u{2514}':'\u{251c}'} ${name}`;
		return {
			name: name,
			str: text
		};
	}

	const tree = function(target, deep = []) {
		const child = fs.readdirSync(target).filter(el => !el.startsWith('.'));
		const direct = [];
		const file = [];
		child.forEach(function(el) {
			const dir = path.join(target, el);
			const stat = fs.statSync(dir);
			const flag = ignore.every(function(reg) {
				return !dir.includes(reg);
			})
			if (flag) {
				if (stat.isFile()) {
					file.push(el);
				} else {
					direct.push(el);
				}
			}

		})
		direct.forEach(function(el, i) {
			const dir = path.join(target, el);
			const isLast = (i === direct.length - 1) && (file.length === 0);
			const name = `${showIcon?'\u{1f4c2}':''}${el}`;
			treeArr.push(render(name, isLast, deep));
			tree(dir, [...deep, !isLast]);
		})
		file.forEach(function(el, i) {
			const isLast = i === file.length - 1;
			const name = `${showIcon?'\u{1f4dc}':''}${el}`;
			treeArr.push(render(name, isLast, deep));
		})
	}

	tree(dir);
	return treeArr;
}

module.exports = treePath;
