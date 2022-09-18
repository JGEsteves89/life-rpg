export default function style() {
	return new inStyle();
}

class inStyle {
	cloneFromThis() {
		const newStyle = new inStyle();
		for (const key in this) {
			newStyle[key] = this[key];
		}
		return newStyle;
	}
	get flex() {
		const newStyle = this.cloneFromThis();
		newStyle.display = 'flex';
		return newStyle;
	}
	get frow() {
		const newStyle = this.cloneFromThis();
		newStyle.flexDirection = 'row';
		return newStyle;
	}
	get fcol() {
		const newStyle = this.cloneFromThis();
		newStyle.flexDirection = 'column';
		return newStyle;
	}
	get jcenter() {
		const newStyle = this.cloneFromThis();
		newStyle.justifyContent = 'center';
		newStyle.justifyItems = 'center';
		newStyle.justifySelf = 'center';
		return newStyle;
	}
	get jbetween() {
		const newStyle = this.cloneFromThis();
		newStyle.justifyContent = 'space-between';
		return newStyle;
	}
	get jaround() {
		const newStyle = this.cloneFromThis();
		newStyle.justifyContent = 'space-around';
		return newStyle;
	}
	get acenter() {
		const newStyle = this.cloneFromThis();
		newStyle.alignContent = 'center';
		newStyle.alignItems = 'center';
		newStyle.alignSelf = 'center';
		return newStyle;
	}
	get m1() {
		const newStyle = this.cloneFromThis();
		newStyle.margin = '1rem';
		return newStyle;
	}
	mr(size) {
		const newStyle = this.cloneFromThis();
		newStyle.marginRight = size + 'rem';
		return newStyle;
	}
	m(size) {
		const newStyle = this.cloneFromThis();
		newStyle.margin = size + 'rem';
		return newStyle;
	}
	get mi1() {
		const newStyle = this.cloneFromThis();
		newStyle.marginInline = '1rem';
		return newStyle;
	}
	mi(size) {
		const newStyle = this.cloneFromThis();
		newStyle.marginInline = size + 'rem';
		return newStyle;
	}
	p(size) {
		const newStyle = this.cloneFromThis();
		newStyle.padding = size + 'rem';
		return newStyle;
	}
	get pi1() {
		const newStyle = this.cloneFromThis();
		newStyle.paddingInline = '1rem';
		return newStyle;
	}
	pi(size) {
		const newStyle = this.cloneFromThis();
		newStyle.paddingInline = size + 'rem';
		return newStyle;
	}
	get grid() {
		const newStyle = this.cloneFromThis();
		newStyle.display = 'grid';
		return newStyle;
	}
	gridTemp(rows, cols) {
		const newStyle = this.cloneFromThis();
		newStyle.gridTemplate = rows + '/' + cols;
		return newStyle;
	}
	row(row) {
		const newStyle = this.cloneFromThis();
		newStyle.gridRow = '' + row;
		return newStyle;
	}
	col(col) {
		const newStyle = this.cloneFromThis();
		newStyle.gridColumn = '' + col;
		return newStyle;
	}
	w(width) {
		const newStyle = this.cloneFromThis();
		newStyle.width = '' + width;
		return newStyle;
	}
	mw(width) {
		const newStyle = this.cloneFromThis();
		newStyle.minWidth = '' + width;
		return newStyle;
	}
	h(height) {
		const newStyle = this.cloneFromThis();
		newStyle.height = '' + height;
		return newStyle;
	}
	mh(height) {
		const newStyle = this.cloneFromThis();
		newStyle.minHeight = '' + height;
		return newStyle;
	}
	get shadow1() {
		const newStyle = this.cloneFromThis();
		newStyle.boxShadow = '' + 1;
		return newStyle;
	}
	get shadow3() {
		const newStyle = this.cloneFromThis();
		newStyle.boxShadow = '' + 3;
		return newStyle;
	}
	get clPrim() {
		const newStyle = this.cloneFromThis();
		newStyle.color = 'var(--cl-primary)!important';
		return newStyle;
	}
	get clSec() {
		const newStyle = this.cloneFromThis();
		newStyle.color = 'var(--cl-secondary)!important';
		return newStyle;
	}
	get clWarn() {
		const newStyle = this.cloneFromThis();
		newStyle.color = 'var(--cl-warning)!important';
		return newStyle;
	}
	get bgPrim() {
		const newStyle = this.cloneFromThis();
		newStyle.backgroundColor = 'var(--bg-primary)!important';
		return newStyle;
	}
	get bgSec() {
		const newStyle = this.cloneFromThis();
		newStyle.backgroundColor = 'var(--bg-secondary)!important';
		return newStyle;
	}
	bg(color) {
		const newStyle = this.cloneFromThis();
		newStyle.backgroundColor = color;
		return newStyle;
	}
	cl(color) {
		const newStyle = this.cloneFromThis();
		newStyle.color = color;
		return newStyle;
	}
	fsize(size) {
		const newStyle = this.cloneFromThis();
		newStyle.fontSize = size;
		return newStyle;
	}
	bradius(radius) {
		const newStyle = this.cloneFromThis();
		newStyle.borderRadius = '' + radius;
		return newStyle;
	}
	get pcursor() {
		const newStyle = this.cloneFromThis();
		newStyle.cursor = 'pointer';
		return newStyle;
	}
}
