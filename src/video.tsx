import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring} from 'remotion';
const scenes=[
{start:0,end:120,eyebrow:'STARTUP 60',title:'赤字なのに\n数億円調達？',detail:'スタートアップ資金調達の仕組み'},
{start:120,end:390,eyebrow:'01 / 仕組み',title:'銀行融資と\nVC投資は違う',detail:'融資：返済能力を重視\nVC投資：将来の成長性を評価'},
{start:390,end:840,eyebrow:'02 / 注目するポイント',title:'VCが見ているのは\n将来の可能性',detail:'企業価値が大きくなる可能性に投資する'},
{start:840,end:1290,eyebrow:'03 / 評価の視点',title:'市場規模 × 成長率',detail:'チームの実行力 ＋ 事業モデル\n※投資判断は個別に異なります'},
{start:1290,end:1650,eyebrow:'まとめ',title:'今の売上だけでは\n決まらない',detail:'次回：シードとシリーズAの違い\nフォローして続きをチェック'}
];
export const StartupExplainer:React.FC=()=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();
 const scene=scenes.find(s=>f>=s.start&&f<s.end)??scenes[scenes.length-1];
 const local=f-scene.start;
 const enter=spring({fps,frame:local,config:{damping:16,stiffness:90}});
 const opacity=interpolate(local,[0,10,scene.end-scene.start-12,scene.end-scene.start],[0,1,1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
 const progress=100*f/1650;
 return <AbsoluteFill style={{background:'linear-gradient(145deg,#081321 0%,#111c31 65%,#073847 100%)',color:'#f4f8ff',fontFamily:'sans-serif',overflow:'hidden'}}>
  <div style={{position:'absolute',width:750,height:750,borderRadius:'50%',border:'2px solid rgba(0,210,220,.15)',right:-360,top:200,transform:`scale(${1+f/3500})`}}/>
  <div style={{position:'absolute',top:135,left:82,right:82,display:'flex',justifyContent:'space-between',fontSize:33,fontWeight:800,letterSpacing:5}}><span>STARTUP <span style={{color:'#2fe1de'}}>60</span></span><span>EP.001</span></div>
  <div style={{position:'absolute',top:240,left:82,right:82,height:6,background:'#26394a',borderRadius:5}}><div style={{width:`${progress}%`,height:'100%',background:'#2fe1de'}}/></div>
  <div style={{position:'absolute',top:530,left:85,right:85,opacity,transform:`translateY(${(1-enter)*60}px)`}}>
   <div style={{fontSize:34,color:'#2fe1de',fontWeight:700,letterSpacing:4,marginBottom:44}}>{scene.eyebrow}</div>
   <div style={{fontSize:96,fontWeight:900,lineHeight:1.25,whiteSpace:'pre-line',letterSpacing:-2}}>{scene.title}</div>
   <div style={{marginTop:65,width:120,height:8,background:'#2fe1de'}}/>
   <div style={{marginTop:60,fontSize:44,lineHeight:1.6,whiteSpace:'pre-line',color:'#c9d7e3',fontWeight:600}}>{scene.detail}</div>
  </div>
  <div style={{position:'absolute',bottom:270,left:85,right:85,fontSize:30,color:'#839bad'}}>STARTUP 60 | 60秒で起業の世界がわかる</div>
 </AbsoluteFill>;
};
