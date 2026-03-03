'use client'

import { useState } from 'react'
import { snapdom } from '@zumer/snapdom'

// 内联SVG图标组件
const DocumentTextIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.25a3.375 3.375 0 0 0-3.375-3.375H14.25m1.5 0-3-3m0 0-3 3m3-3v9.5M8.25 21h8.25a2.25 2.25 0 0 0 2.25-2.25v-13.5a2.25 2.25 0 0 0-2.25-2.25h-8.25a2.25 2.25 0 0 0-2.25 2.25v13.5a2.25 2.25 0 0 0 2.25 2.25Z" />
  </svg>
)

const SparklesIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
  </svg>
)

const PlusIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
)

const DownloadIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
)

interface Card {
  id: number
  title: string
  content: string
}

export default function CardsGenPage() {
  const [inputText, setInputText] = useState('')
  const [cards, setCards] = useState<Card[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  // 添加测试卡片功能
  const addTestCard = () => {
    const testCard: Card = {
      id: Date.now(),
      title: '测试卡片',
      content: `
        <div style="width: 375px; min-height: 200px; background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border-radius: 16px; padding: 24px; color: white; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
            <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
              <span style="color: white; font-weight: bold;">T</span>
            </div>
            <h2 style="margin: 0; color: white; font-size: 18px; font-weight: 600;">测试卡片</h2>
          </div>
          <div style="background: rgba(30, 41, 59, 0.5); border-radius: 8px; padding: 16px; margin-bottom: 12px;">
            <p style="margin: 0; color: #e2e8f0; line-height: 1.5;">这是一个用于测试导出功能的简单卡片。使用了安全的CSS颜色值。</p>
          </div>
          <div style="display: flex; gap: 8px; margin-top: 16px;">
            <span style="background: #059669; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">测试</span>
            <span style="background: #dc2626; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">导出</span>
          </div>
        </div>
      `
    }
    setCards([testCard])
  }

  const handleGenerate = async () => {
    if (!inputText.trim()) return
    
    console.log('🚀 [前端] 开始生成卡片，内容长度:', inputText.length)
    setIsGenerating(true)
    
    try {
      console.log('📡 [前端] 向API发送请求...')
      
      // const response = await fetch('/api/generate-cards', {
      const response = await fetch('/api/generate-cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: inputText })
      })
      
      console.log('📡 [前端] 收到API响应，状态:', response.status)
      
      if (!response.ok) {
        console.error('❌ [前端] API响应错误，状态:', response.status)
        const errorData = await response.json()
        console.error('❌ [前端] 错误详情:', errorData)
        throw new Error(errorData.error || '生成失败')
      }
      
      console.log('📦 [前端] 开始解析响应数据...')
      const data = await response.json()
      console.log('📊 [前端] 解析成功，卡片数量:', data.cards?.length || 0)
      console.log('📊 [前端] 响应元数据:', data.metadata)
      
      setCards(data.cards)
      
      // 如果是fallback模式，显示提示
      if (data.metadata?.fallbackMode) {
        console.log('⚠️ [前端] AI响应解析失败，使用fallback数据')
      } else if (data.metadata?.model) {
        console.log(`✅ [前端] 已使用 DeepSeek(${data.metadata.model}) 生成卡片，消耗 ${data.metadata.tokensUsed || 0} tokens`)
      }
    } catch (error) {
      console.error('💥 [前端] 生成卡片失败:', error)
      console.error('🔍 [前端] 错误类型:', error instanceof Error ? error.constructor.name : typeof error)
      alert(`生成失败：${error instanceof Error ? error.message : '未知错误'}`)
    } finally {
      console.log('🏁 [前端] 请求处理完成')
      setIsGenerating(false)
    }
  }

  // 使用 snapdom 导出单个卡片
  const exportWithSnapdom = async (element: HTMLElement, filename: string) => {
    console.log('📸 [导出] 开始使用 Snapdom 处理元素:', element)
    
    try {
      // 使用 snapdom 截图
      const result = await snapdom(element, { 
        scale: 2,
        backgroundColor: '#1a1a1a'
      })
      
      console.log('📸 [导出] Snapdom 截图成功')
      
      // 直接下载文件
      await result.download({ 
        format: 'png', 
        filename: filename 
      })
      
      console.log('📸 [导出] 文件下载完成')
      
    } catch (error) {
      console.error('📸 [导出] snapdom错误:', error)
      throw error
    }
  }

  const handleExport = async () => {
    if (cards.length === 0) return
    
    try {
      console.log('📸 [导出] 开始导出卡片...')
      
      for (let i = 0; i < cards.length; i++) {
        const card = cards[i]
        const element = document.getElementById(`card-${card.id}`)
        
        if (element) {
          console.log(`📸 [导出] 正在导出第 ${i + 1} 张卡片: ${card.title}`)
          console.log(`📸 [导出] 卡片元素信息:`, {
            width: element.offsetWidth,
            height: element.offsetHeight,
            innerHTML: element.innerHTML.substring(0, 200) + '...'
          })
          
          try {
            // 等待一下让样式完全应用
            await new Promise(resolve => setTimeout(resolve, 100))
            
            // 检查元素是否包含问题内容
            const images = element.querySelectorAll('img')
            console.log(`📸 [导出] 卡片 ${i + 1} 包含 ${images.length} 个图像`)
            
            const filename = `知识卡片-${card.title}-${i + 1}`
            
            // 使用 snapdom 导出
            await exportWithSnapdom(element, filename)
            console.log(`✅ [导出] 第 ${i + 1} 张卡片导出完成`)
            
          } catch (cardError) {
            console.error(`💥 [导出] 第 ${i + 1} 张卡片导出失败:`, cardError)
            console.error(`💥 [导出] 卡片标题: ${card.title}`)
            console.error(`💥 [导出] 错误详情:`, {
              name: cardError instanceof Error ? cardError.name : 'Unknown',
              message: cardError instanceof Error ? cardError.message : String(cardError),
              stack: cardError instanceof Error ? cardError.stack : undefined
            })
            
            // 继续导出其他卡片，不要中断整个过程
            alert(`第 ${i + 1} 张卡片 "${card.title}" 导出失败：${cardError instanceof Error ? cardError.message : '未知错误'}`)
            continue
          }
          
          // 延迟下载，避免浏览器阻止多个下载
          if (i < cards.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 1000))
          }
        } else {
          console.warn(`⚠️ [导出] 找不到第 ${i + 1} 张卡片的DOM元素`)
        }
      }
      
      console.log('🎉 [导出] 导出流程完成!')
    } catch (error) {
      console.error('💥 [导出] 导出过程发生错误:', error)
      alert(`导出失败：${error instanceof Error ? error.message : '未知错误'}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="flex h-screen">
        {/* 左侧输入区域 */}
        <div className="w-1/2 border-r border-slate-700 flex flex-col">
          <div className="p-6 border-b border-slate-700">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              AI知识卡片生成器
            </h1>
            <p className="text-slate-400 mt-2">将文章内容转换为精美的知识卡片，由DeepSeek驱动</p>
            <a 
              href="/debug" 
              className="text-xs text-slate-500 hover:text-slate-400 underline mt-1 inline-block"
            >
              调试面板 →
            </a>
          </div>
          
          <div className="flex-1 p-6 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <DocumentTextIcon className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-semibold">输入文章内容</h2>
            </div>
            
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="请粘贴或输入您的文章内容...

支持技术文章、学习笔记、新闻资讯等各种类型的文本内容。
AI会自动分析内容并生成相应的知识卡片。"
              className="flex-1 bg-slate-900/50 border border-slate-600/50 rounded-xl p-4 text-white placeholder-slate-500 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent min-h-[300px]"
            />
            
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-slate-500">
                字符数: {inputText.length} | 建议输入 200+ 字符获得更好的卡片效果
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={!inputText.trim() || isGenerating}
              className="mt-4 w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-600 disabled:cursor-not-allowed rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  AI生成中...
                </>
              ) : (
                <>
                  <SparklesIcon className="w-5 h-5" />
                  生成卡片
                </>
              )}
            </button>

            <div className="mt-4 text-sm text-slate-600 bg-slate-800/30 rounded-lg p-4">
              <p className="font-medium mb-2">💡 使用提示：</p>
              <ul className="space-y-1">
                <li>• 输入技术文章、学习笔记或新闻资讯</li>
                <li>• 建议内容长度在200字符以上</li>
                <li>• AI会自动提取关键信息并设计卡片</li>
                <li>• 支持一键导出为PNG图片</li>
              </ul>
              
              <div className="mt-4 pt-4 border-t border-slate-700">
                <button
                  onClick={addTestCard}
                  className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white rounded-lg font-medium transition-all duration-200 text-sm"
                >
                  🧪 添加测试卡片（用于测试导出功能）
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧卡片展示区域 */}
        <div className="w-1/2 flex flex-col">
          <div className="p-6 border-b border-slate-700 flex justify-between items-center">
            <h2 className="text-2xl font-bold">
              {cards.length > 0 ? `生成的知识卡片 (${cards.length}张)` : '知识卡片预览'}
            </h2>
            
            {cards.length > 0 && (
              <button
                onClick={handleExport}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center gap-2"
              >
                <DownloadIcon className="w-5 h-5" />
                导出卡片
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {cards.length > 0 ? (
              <div>
                {cards.map((card, index) => (
                  <div key={card.id} className="relative" style={{ width: '375px', margin: '0 auto 40px' }}>
                    {/* 卡片序号标识 - 在截图区域外 */}
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                        {index + 1}
                      </div>
                      <div className="px-3 py-1 bg-slate-800/90 backdrop-blur border border-slate-600/50 rounded-lg text-xs text-slate-300 shadow-lg">
                        {card.title}
                      </div>
                    </div>
                    
                    {/* 富文本HTML内容 - 只有这部分被截图 */}
                    <div 
                      id={`card-${card.id}`}
                      dangerouslySetInnerHTML={{ __html: card.content }}
                      className="shadow-2xl hover:shadow-purple-500/10 transition-all duration-300"
                      style={{ width: '375px' }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                    <PlusIcon className="w-16 h-16 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-300 mb-2">还没有生成卡片</h3>
                  <p className="text-slate-500">请在左侧输入文章内容并点击生成按钮</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
