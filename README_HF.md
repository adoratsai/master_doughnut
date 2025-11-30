Hugging Face API 設定與測試說明

1) 檔案說明
- `.env.local.example`：用來示範需要哪些環境變數。請複製為 `.env.local` 並填入你的實際金鑰。

2) 本地設定範例
- 建議建立 `.env.local`（Next.js 會自動讀取），內容範例：

  HUGGINGFACE_API_KEY=hf_...   # 將 hf_... 換成你的實際金鑰
  HF_MODEL=meta-llama/Llama-2-7b-chat-hf

- 臨時在 shell 設定（只對當前 session 有效）：

```bash
export HUGGINGFACE_API_KEY="hf_your_token_here"
export HF_MODEL="meta-llama/Llama-2-7b-chat-hf"
```

3) 啟動與測試（示範）
- 啟動開發伺服器：

```bash
npm run dev
```

- 用 curl 測試（請把 HEADER 的 Bearer token 換成你的實際金鑰，或在 server 已讀取環境變數後直接呼叫）：

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"請問你們的配送時間是多少？"}'
```

回應會是 JSON：

```json
{ "text": "...模型回應..." }
```

4) 安全建議（非常重要）
- 不要把實際的 `HUGGINGFACE_API_KEY` 放進專案的任何已追蹤檔案（例如直接 commit 到 repo）。
- 若你不小心把金鑰公開（例如貼到公開聊天室或提交到公開 repo），請立即到 Hugging Face 控制台撤銷並重新產生新金鑰。
- 在部署（如 Vercel）上，請透過平台的 Environment Variables 設定密鑰，不要把密鑰寫入程式碼。

5) 如果你剛才在 chat 中貼了你的 token
- 你剛才在訊息中張貼了 `hf_...` 這類金鑰。建議你立刻到 Hugging Face 帳號註銷/刪除該金鑰並建立新的金鑰，因為公開貼出會有被濫用的風險。

需要我幫你的事項（選項）：
- 幫你把 `.env.local.example` 補上更多說明或自動化檢查
- 幫你把 Token 加到 Vercel 與示範如何安全部署（我不會也不會儲存你的金鑰）
- 幫你加上 fallback 的 prompt-string 支援（若模型不支援 messages）
