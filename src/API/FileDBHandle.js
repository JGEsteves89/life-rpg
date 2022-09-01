export default class FileDBHandle {
	static save(name, data) {
		localStorage.setItem(name, JSON.stringify(data));
	}

	static load(name, emptyObject) {
		const data = JSON.parse(localStorage.getItem(name));
		if (data) {
			emptyObject.cloneFrom(data);
		} else {
			console.warn('There is no storage for', name);
		}
		return emptyObject;
	}
}
