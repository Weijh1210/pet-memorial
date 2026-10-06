# Rainbow 彩虹橋

Rainbow 是一個陪伴寵物生命全程的行動端 MVP：記錄日常與故事、提供溫和的臨終照護指引、瀏覽透明示範善終服務、體驗專屬旅程追蹤，並在安靜的數位紀念花園留下心意。

## 本機預覽

```sh
bun install
bun run preview
```

專案使用 Expo SDK 57、Expo Router 與 React Native，同一個 Metro server 提供 Web 預覽與 Expo Go。Cloud Computer 預覽使用 `scripts/start-expo-preview.sh` 和 omg.dev sandbox proxy。

## 架構

- `src/app/index.tsx`: 首頁、生命時間線、善終服務與旅程追蹤、紀念花園、寵物檔案及互動流程。
- `src/lib/rainbow.ts`: Amy / Mochi Demo 資料和本機持久化的生命記錄、追蹤節點及花園留言。
- `src/lib/tasks.ts`: Expo 樣板原有 AsyncStorage 範例，保留供後續擴充參考。
- `schema.ts`: 未接入帳號或雲端同步；目前不收集或傳送使用者資料。

## MVP 範圍與交付注意

核心流程可在 Demo 中互動：新增生命記錄、查看照護清單、閱讀緊急指引、確認示範服務與價格、建立並推進旅程節點、寫紀念留言、查看生命故事與 QR 樣式卡片。資料保存在目前裝置 / 瀏覽器。

尚未接入真實註冊登入、媒體上傳、AI 生成、QR 目的地、合作服務機構、線上預約或即時物流狀態。服務商、評分、價格與追蹤內容全為示範資料；不可視作可用的實際善終服務。要支援多人共用與真實預約，需接入帳號、後端資料模型及經驗證的合作機構。

## 驗證

```sh
bun run typecheck
```

## 公開部署

網站使用 Vercel 部署，Vercel 連接 GitHub `main` 分支後會在每次推送時自動重新建置。部署設定由根目錄的 `vercel.json` 管理：

- Build command：`npm run build`
- Output directory：`dist`
- Production branch：`main`
