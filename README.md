# STARTUP 60 — スタートアップ解説ショート動画

第1弾「赤字でもなぜスタートアップは億単位の資金調達ができるのか？」。縦型1080×1920 / 30fps、初期設定55秒（ナレーションの長さによって自動延長）。

## 前提環境
Node.js 20+、npm、FFmpeg / ffprobe、Remotion用Chrome/Chromium。音声を生成する場合はローカルのVOICEVOX Engineを別途準備して起動してください。音声生成にはAPIキーが不要ですが、VOICEVOX・話者の利用規約、商用利用条件、クレジット表記を必ず確認してください。

## 動画プレビュー（音声なしでも動作）
```bash
npm install
npm run preview
```

## 日本語音声を生成
VOICEVOX Engineを http://127.0.0.1:50021 で起動してから：
```bash
npm run voice
npm run render
```
必要なら `VOICEVOX_URL` と `VOICEVOX_SPEAKER` を環境変数で指定。 `npm run voice` は5シーンの音声を `public/voice/` に書き出し、音声の長さに合わせて `src/timing.json` を更新します。音声ファイルはGitに入れません。各シーンは最低表示時間を確保するため、完成尺が約55秒を超える場合があります。

**注意：** `src/timing.json` が `audioGenerated:true` の状態で音声ファイルがない場合、レンダリングは失敗します。音声なしに戻す場合は `audioGenerated:false` にしてください。

## MP4を書き出す
```bash
npm run render
ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1 out/startup-60.mp4
```
MP4は `out/startup-60.mp4` に出力。GitHubには動画をコミットしない設計です。ローカルPCやCodex実行環境からダウンロードしてください。

## 再利用する
原稿・見出しは `src/episode.ts`、声の読み上げ原稿は `scripts/generate-voice.mjs` に入っています。**現状は2か所の原稿を合わせて編集する必要があり、原稿JSON一本化は未実装です。**

## 検証・編集チェック
- 事実関係、企業名、数値、出典URLは人間が一次資料で確認する
- 映像の見切れ、ナレーションとテロップの同期、音量、動画尺を手動確認する
- VOICEVOX・音声モデル、フォント、BGM、ロゴ等のライセンスとクレジット要件を確認する
- スポンサー案件では広告・PRであることを明記する

## 制限
この変更はGitHub上のソース実装です。開発実行環境の外部ネットワーク制限により、`npm install` とMP4の実レンダリングはこの作業内では未検証です。音声の自動生成にはローカルVOICEVOX Engineの起動が必要です。
