import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {episode} from './episode';
import timing from './timing.json';

export const StartupExplainer: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const total = timing.durationFrames.reduce((a, b) => a + b, 0);
  let start = 0;
  const sections = episode.map((item, i) => {
    const from = start;
    const length = timing.durationFrames[i] ?? item.minimumFrames;
    start += length;
    return {item, from, length, i};
  });
  const current = sections.find(s => frame >= s.from && frame < s.from+s.length) ?? sections[sections.length-1];
  const local = frame - current.from;
  const t = spring({fps, frame:local, config:{damping:17, stiffness:90}});
  const opacity = interpolate(local, [0,12,current.length-12,current.length], [0,1,1,0], {extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  return <AbsoluteFill style={{background:'linear-gradient(150deg,#071321 0%,#122039 75%,#093846 100%)',fontFamily:'"Noto Sans CJK JP","Noto Sans JP",sans-serif',color:'#f6faff',overflow:'hidden'}}>
    <div style={{position:'absolute',right:-270,top:230,width:780,height:780,border:'2px solid #22616d',borderRadius:'50%',opacity:.36}}/>
    <div style={{position:'absolute',top:155,left:85,fontWeight:900,fontSize:43,letterSpacing:4}}>STARTUP <span style={{color:'#29dedf'}}>60</span></div>
    <div style={{position:'absolute',top:265,left:85,width:910,height:7,background:'#234052'}}><div style={{width:`${frame/total*100}%`,height:7,background:'#29dedf'}}/></div>
    <div style={{position:'absolute',top:530,left:80,right:80,transform:`translateY(${(1-t)*64}px)`,opacity}}>
      <div style={{fontSize:38,color:'#2bdfdf',fontWeight:700,marginBottom:60,letterSpacing:3}}>{current.item.eyebrow}</div>
      <div style={{fontSize:84,fontWeight:900,lineHeight:1.3,whiteSpace:'pre-line',wordBreak:'keep-all'}}>{current.item.title}</div>
      <div style={{width:140,height:9,background:'#29dedf',marginTop:65,marginBottom:55}}/>
      <div style={{fontSize:42,fontWeight:650,lineHeight:1.62,whiteSpace:'pre-line',color:'#d2e4ed'}}>{current.item.detail}</div>
    </div>
    <div style={{position:'absolute',bottom:345,left:84,right:84,fontSize:27,lineHeight:1.4,color:'#9aafc0',padding:'18px 0',borderTop:'1px solid #406070'}}>{current.item.narration}</div>
    <div style={{position:'absolute',bottom:210,left:84,fontSize:28,color:'#88aab4'}}>STARTUP 60  /  60秒で起業の世界がわかる</div>
    {timing.audioGenerated && sections.map(s=>
      <Sequence key={s.i} from={s.from} durationInFrames={s.length}>
        <Audio src={staticFile(`voice/scene-${s.i+1}.wav`)}/>
      </Sequence>)}
  </AbsoluteFill>;
};
