import React from 'react';
import {Composition} from 'remotion';
import {StartupExplainer} from './video';
export const Root:React.FC=()=> <Composition id="StartupExplainer" component={StartupExplainer} width={1080} height={1920} fps={30} durationInFrames={1650}/>;
