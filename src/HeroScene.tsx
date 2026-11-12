import {useEffect,useRef,useState} from 'react';
import {useReducedMotion} from 'motion/react';
import {Pause,Play} from 'lucide-react';
import {media} from './data';

export default function HeroScene(){
 const canvas=useRef<HTMLCanvasElement>(null);
 const sceneTime=useRef(0);
 const reduced=useReducedMotion();
 const [paused,setPaused]=useState(false);
 const [ready,setReady]=useState(false);
 const running=!reduced&&!paused;
 useEffect(()=>{
  const element=canvas.current;
  const ctx=element?.getContext('2d',{alpha:true});
  if(!element||!ctx)return;
  let width=1,height=1,frame=0,visible=true,last=0,time=sceneTime.current;
  const count=110;
  const nodes=Array.from({length:count},(_,i)=>{const y=1-(i/(count-1))*2;const r=Math.sqrt(1-y*y);const angle=i*Math.PI*(3-Math.sqrt(5));return {x:Math.cos(angle)*r,y,z:Math.sin(angle)*r}});
  function resize(){const bounds=element!.getBoundingClientRect();width=bounds.width;height=bounds.height;const ratio=Math.min(window.devicePixelRatio||1,1.5);element!.width=Math.round(width*ratio);element!.height=Math.round(height*ratio);ctx!.setTransform(ratio,0,0,ratio,0,0);draw()}
  function draw(){
   ctx!.clearRect(0,0,width,height);
   const mobile=width<650;
   const cx=width*(mobile?.64:.77),cy=height*(mobile?.66:.43),radius=Math.min(width*(mobile?.42:.20),height*.31);
   const glow=ctx!.createRadialGradient(cx,cy,radius*.1,cx,cy,radius*1.65);glow.addColorStop(0,'rgba(0,118,199,.07)');glow.addColorStop(.65,'rgba(0,157,221,.035)');glow.addColorStop(1,'rgba(0,95,200,0)');ctx!.fillStyle=glow;ctx!.fillRect(0,0,width,height);
   // Curved ribbons travel across the scene, independent of scrolling.
   const wave=(x:number,line:number)=>height*(mobile?.80:.72)-x*height*.38+Math.sin(x*4+line*.11+time*.13)*height*.06+line*2.2;
   for(let line=0;line<21;line++){
    ctx!.beginPath();for(let step=0;step<=60;step++){const x=step/60;const px=x*width;const py=wave(x,line);if(step===0)ctx!.moveTo(px,py);else ctx!.lineTo(px,py)}
    ctx!.strokeStyle=`rgba(${line%3?15:50},${line%3?139:198},${line%3?218:234},${.065+Math.sin(line*.2)*.035})`;ctx!.lineWidth=line%7===0?4:.8;ctx!.shadowColor='#009edb';ctx!.shadowBlur=line%7===0?12:0;ctx!.stroke();ctx!.shadowBlur=0;
   }
   for(let i=0;i<45;i++){const x=((i*.071+time*(.011+(i%4)*.002))%1);const y=wave(x,(i*7)%21);const opacity=.18+Math.sin(i+time)*.12;ctx!.fillStyle=`rgba(82,211,255,${opacity})`;ctx!.beginPath();ctx!.arc(x*width,y,.6+(i%3)*.35,0,Math.PI*2);ctx!.fill()}
   const rotation=time*.055,tilt=.22;
   const projected=nodes.map(n=>{const x=n.x*Math.cos(rotation)+n.z*Math.sin(rotation);const z=-n.x*Math.sin(rotation)+n.z*Math.cos(rotation);const y=n.y*Math.cos(tilt)-z*Math.sin(tilt);const depth=n.y*Math.sin(tilt)+z*Math.cos(tilt);return {x:cx+x*radius,y:cy+y*radius,z:depth}});
   for(let i=0;i<count;i++){const a=projected[i];for(let j=i+1;j<count;j++){const b=projected[j];const original=Math.hypot(nodes[i].x-nodes[j].x,nodes[i].y-nodes[j].y,nodes[i].z-nodes[j].z);if(original>.43)continue;ctx!.beginPath();ctx!.moveTo(a.x,a.y);ctx!.lineTo(b.x,b.y);ctx!.strokeStyle=`rgba(73,190,235,${.06+(a.z+b.z+2)*.035})`;ctx!.lineWidth=.65;ctx!.stroke()}ctx!.beginPath();ctx!.arc(a.x,a.y,1.05+(a.z+1)*.5,0,Math.PI*2);ctx!.fillStyle=`rgba(115,222,255,${.26+(a.z+1)*.23})`;ctx!.fill()}
   ctx!.beginPath();ctx!.ellipse(cx,cy,radius,radius,0,0,Math.PI*2);ctx!.strokeStyle='rgba(35,169,226,.10)';ctx!.lineWidth=1;ctx!.stroke();
  }
  function tick(now:number){if(!running||!visible||document.hidden){last=0;return}time+=last?Math.min((now-last)/1000,.05):0;sceneTime.current=time;last=now;draw();frame=requestAnimationFrame(tick)}
  function start(){cancelAnimationFrame(frame);last=0;draw();if(running&&visible&&!document.hidden)frame=requestAnimationFrame(tick)}
  const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(element);
  const intersection=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;start()});intersection.observe(element);
  document.addEventListener('visibilitychange',start);
  resize();setReady(true);start();
  return()=>{cancelAnimationFrame(frame);resizeObserver.disconnect();intersection.disconnect();document.removeEventListener('visibilitychange',start)};
 },[running]);
 return <><div className={`hero-scene ${ready?'is-ready':''}`} aria-hidden="true"><img className="scene-fallback" src={media.globe} alt=""/><canvas ref={canvas}/><div className="scene-vignette"/></div>{!reduced&&<button className="hero-motion-control" onClick={()=>setPaused(!paused)} aria-label={paused?'Play background animation':'Pause background animation'} aria-pressed={paused}>{paused?<Play size={12}/>:<Pause size={12}/>}<span>{paused?'Play motion':'Pause motion'}</span></button>}</>;
}

