import type { Chat, ChatParams, Message, Prompt } from './types'
import http, { httpStream, type Result } from '@/utils/request'

/**
 * Conversation对话相关接口
 *
 * @returns
 */

// 新增对话
export async function createChat(params: Chat) {
	return http.post<Result<Chat>>('/chat/create', params)
}

// 更新对话
export async function updateChat(params: Chat) {
	return http.post<Result<Chat>>('/chat/update', params)
}

// 移除对话
export async function removeChat(chatId: string) {
	return http.post<Result<void>>(`/chat/remove/${chatId}`)
}

// 清空列表
export const clearChat = async () => http.post<Result<void>>('/chat/clear')

// 获取对话消息列表
export async function queryChat(chatId: string) {
	return http.get<Result<Chat>>(`/chat/${chatId}`)
}

// 获取对话列表
export async function queryChatList() {
	return http.post<Result<Chat[]>>('/chat/list')
}

/**
 * Message对话相关接口
 *
 * @returns
 */

// 新增消息
export async function createMessage(params: Message) {
	return http.post<Result<Message>>('/chat/message/create', params)
}

// 更新消息
export async function updateMessage(params: Message) {
	return http.post<Result<Message>>('/chat/message/update', params)
}

/**
 * Prompt对话相关接口
 *
 * @returns
 */

// 新增指令
export const createPrompt = async (params: Prompt) => http.post<Result<Prompt>>('/prompt/create', params)

// 移除指令
export const removePrompt = async (promptId: string) => http.post(`/prompt/remove/${promptId}`)

// 修改指令
export const updatePrompt = async (params: Prompt) => http.post<Result<Prompt>>('/prompt/update', params)

// 获取指令列表
export const queryPromptList = async () => http.post<Result<Prompt[]>>('/prompt/list')

// 对话
export const chatSubmit = async (params: ChatParams) => httpStream('/chat/submit', params)
