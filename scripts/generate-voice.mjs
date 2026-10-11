// Requires a locally running VOICEVOX Engine (default localhost:50021).
// No external API key. Confirm speaker/engine commercial terms before publishing.
import fs from 'node:fs/promises';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const base = process.env.VOICEVOX_URL || 'http://127.0.0.1:50021';
const speaker = Number(process.env.VOICEVOX_SPEAKER || '3');
const fps = 30;
const lines = [
  'まだ赤字なのに、数億円の資金調達。スタートアップで、なぜそんなことが起きるのでしょうか？',
  'ポイントは、銀行からの融資と、ベンチャーキャピタルによる株式投資の違いです。融資では返済能力が重要ですが、株式投資は将来の成長にも期待します。',
  'ベンチャーキャピタルは、今の売上だけでなく、その企業が将来、大きな価値を生み出す可能性を考えます。',
  '例えば、市場の大きさ、成長の速さ、チームの実行力、そしてビジネスモデル。こうした要素を総合して判断します。ただし赤字なら必ず調達できるわけではありません。',
  'つまり、将来どこまで成長できるかが重要です。次回は、シードとシリーズAの違いを解説します。フォローして続きを見てください。',
];
const minimumFrames = [195,405,330,450,270];
await fs.mkdir('public/voice',{recursive:true});
const durations=[];
for (let i=0;i<lines.length;i++) {
  const queryUrl = new URL('/audio_query',base);
  queryUrl.searchParams.set('text',lines[i]);
  queryUrl.searchParams.set('speaker',String(speaker));
  const q=await fetch(queryUrl,{method:'POST'});
  if(!q.ok) throw new Error('VOICEVOX audio_query error: '+q.status);
  const query=await q.json();
  query.speedScale=1.12;
  const wavUrl=new URL('/synthesis',base);wavUrl.searchParams.set('speaker',String(speaker));
  const a=await fetch(wavUrl,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(query)});
  if(!a.ok)throw new Error('VOICEVOX synthesis error: '+a.status);
  const file=path.join('public/voice',`scene-${i+1}.wav`);
  await fs.writeFile(file,Buffer.from(await a.arrayBuffer()));
  const seconds=Number(execFileSync('ffprobe',['-v','error','-show_entries','format=duration','-of','default=nw=1:nk=1',file],{encoding:'utf8'}).trim());
  durations.push(Math.max(minimumFrames[i],Math.ceil(seconds*fps)+18));
  console.log(`Scene ${i+1}: ${seconds.toFixed(1)}s, ${durations[i]} frames`);
}
await fs.writeFile('src/timing.json',JSON.stringify({audioGenerated:true,durationFrames:durations},null,2)+'\n');
console.log('Total video length:',(durations.reduce((a,b)=>a+b,0)/fps).toFixed(1),'sec');
