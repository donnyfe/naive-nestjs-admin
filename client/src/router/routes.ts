import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
	{
		path: '/',
		name: 'root',
		redirect: '/appRoot'
	},
	{
		path: '/login',
		name: 'login',
		component: async () => import('@/views/login/index.vue'), // 注意这里要带上 文件后缀.vue
		meta: {
			title: '登录',
			withoutTab: true
		}
	},
	{
		path: '/403',
		name: '403',
		component: async () => import('@/views/error/403/index.vue'),
		meta: {
			title: '用户无权限',
			withoutTab: true
		}
	},
	{
		path: '/404',
		name: '404',
		component: async () => import('@/views/error/404/index.vue'),
		meta: {
			title: '找不到页面',
			icon: 'icon-park-outline:ghost',
			withoutTab: true
		}
	},
	{
		path: '/500',
		name: '500',
		component: async () => import('@/views/error/500/index.vue'),
		meta: {
			title: '服务器错误',
			icon: 'icon-park-outline:close-wifi',
			withoutTab: true
		}
	},
	{
		path: '/:pathMatch(.*)*',
		component: async () => import('@/views/error/404/index.vue'),
		name: '404',
		meta: {
			title: '找不到页面',
			icon: 'icon-park-outline:ghost',
			withoutTab: true
		}
	}
]
