import {useEffect,useRef} from 'react';
import {useLocation} from 'react-router';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

/** One scroll controller for every route; native touch and keyboard input remain available. */
export function SmoothScroll(){
 const {pathname,hash}=useLocation();
 const instance=useRef<Lenis|null>(null);
 const previousPath=useRef<string|null>(null);
 useEffect(()=>{
  const lenis=new Lenis({autoRaf:true,lerp:.085,smoothWheel:true,syncTouch:false,anchors:true,respectReducedMotion:true,stopInertiaOnNavigate:true,prevent:node=>!!node.closest('[data-lenis-prevent],input,textarea,select')});
  instance.current=lenis;
  const onMenu=()=>document.body.style.overflow==='hidden'?lenis.stop():lenis.start();
  const observer=new MutationObserver(onMenu);
  observer.observe(document.body,{attributes:true,attributeFilter:['style']});
  return()=>{observer.disconnect();lenis.destroy();instance.current=null};
 },[]);
 useEffect(()=>{
  const routeChanged=previousPath.current!==pathname;
  previousPath.current=pathname;
  let frame=0;
  const position=()=>{
   const target=hash?document.getElementById(decodeURIComponent(hash.slice(1))):null;
   instance.current?.resize();
   instance.current?.scrollTo(target??0,{immediate:!hash||routeChanged,force:true});
   if(!instance.current)window.scrollTo({top:target?target.getBoundingClientRect().top+window.scrollY-100:0,behavior:'instant'});
  };
  frame=requestAnimationFrame(position);
  // Lazy route content can arrive after the location changes.
  const content=document.getElementById('main');
  const observer=new MutationObserver(()=>{if(!content?.querySelector('.route-loading')){cancelAnimationFrame(frame);frame=requestAnimationFrame(position);observer.disconnect()}});
  if(content?.querySelector('.route-loading'))observer.observe(content,{childList:true,subtree:true});
  return()=>{cancelAnimationFrame(frame);observer.disconnect()};
 },[pathname,hash]);
 return null;
}
