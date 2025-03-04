import type { LocalStorageData, SessionStorageData, StorageData } from '@/types/global'

const STORAGE_PREFIX = import.meta.env.VITE_STORAGE_PREFIX

/**
 * LocalStorage部分操作
 */
function createLocalStorage<T extends LocalStorageData>() {
	// 默认缓存期限为7天
	function set<K extends keyof T>(key: K, value: T[K], expire: number = 60 * 60 * 24 * 7) {
		const storageData: StorageData<T[K]> = {
			value,
			expire: new Date().getTime() + expire * 1000
		}
		const json = JSON.stringify(storageData)
		window.localStorage.setItem(`${STORAGE_PREFIX}${String(key)}`, json)
	}

	function get<K extends keyof T>(key: K) {
		const json = window.localStorage.getItem(`${STORAGE_PREFIX}${String(key)}`)
		if (!json) return null

		const storageData: StorageData<T[K]> | null = JSON.parse(json)

		if (storageData) {
			const { value, expire } = storageData
			if (expire === null || expire >= Date.now()) return value
		}
		remove(key)
		return null
	}

	function remove(key: keyof T) {
		window.localStorage.removeItem(`${STORAGE_PREFIX}${String(key)}`)
	}

	function clear() {
		window.localStorage.clear()
	}
	return {
		set,
		get,
		remove,
		clear
	}
}
/**
 * sessionStorage部分操作
 */
function createSessionStorage<T extends SessionStorageData>() {
	function set<K extends keyof T>(key: K, value: T[K]) {
		const json = JSON.stringify(value)
		window.sessionStorage.setItem(`${STORAGE_PREFIX}${String(key)}`, json)
	}
	function get<K extends keyof T>(key: K) {
		const json = window.sessionStorage.getItem(`${STORAGE_PREFIX}${String(key)}`)
		if (!json) return null

		const storageData: T[K] | null = JSON.parse(json)

		if (storageData) return storageData

		return null
	}

	function remove(key: keyof T) {
		window.sessionStorage.removeItem(`${STORAGE_PREFIX}${String(key)}`)
	}

	function clear() {
		window.sessionStorage.clear()
	}

	return {
		set,
		get,
		remove,
		clear
	}
}

export const local = createLocalStorage()
export const session = createSessionStorage()
