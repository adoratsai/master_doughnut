const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY
const HF_MODEL = process.env.HF_MODEL || "meta-llama/Llama-2-7b-chat-hf"

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    // 根據收到的消息回傳特定的文字
    if (message === '你好') {
      return Response.json({ text: '您好！有什麼我可以幫助您的？' })
    } else if (message === '訂單狀態') {
      return Response.json({ text: '請提供您的訂單編號以查詢狀態。' })
    } else {
      return Response.json({ text: '抱歉，我無法理解您的請求。' })
    }
  } catch (error) {
    console.error('Chat API error:', error)
    return Response.json({ error: '處理請求時發生錯誤' }, { status: 500 })
  }
}
