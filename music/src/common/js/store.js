export function setLocalStorage (id, key, val) {
	let collect = window.localStorage.__collect__;
	if (!collect) {
		collect = {};
		collect[id] = {};
	} else {
		collect = JSON.parse(collect);
		if (!collect[id]) {
			collect[id] = {};
		}
	}
	collect[id][key] = val;
	window.localStorage.__collect__ = JSON.stringify(collect); 
}
export function getLocalStorage (id, key, def) {
	let collect = window.localStorage.__collect__;
	if (!collect) {
		return def;
	}
	collect = JSON.parse(collect)[id];
	if (!collect) {
		return def;
	}
	let ret = collect[key];
	return ret || def;
}
