import React,{Suspense,lazy,useEffect} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter,Routes,Route,useLocation} from 'react-router';
import {Header,Footer} from './components';
import Home from './pages/Home';
import './styles.css';
import './light-theme.css';
import {SmoothScroll} from './scroll';
const Company=lazy(()=>import('./pages/Company'));
const Solutions=lazy(()=>import('./pages/Solutions'));
const Products=lazy(()=>import('./pages/Products'));
const Careers=lazy(()=>import('./pages/Careers'));
const Insights=lazy(()=>import('./pages/Insights'));
const Contact=lazy(()=>import('./pages/Contact'));
const Legal=lazy(()=>import('./pages/Legal'));
function ScrollManager(){const {pathname}=useLocation();useEffect(()=>{const titles:Record<string,string>={'/':'Engineering Tomorrow’s Digital Enterprise','/about':'About Us','/services':'Solutions','/products':'Products','/careers':'Careers','/careers/jobs':'Opportunities','/insights':'Insights','/contact':'Contact'};document.title=`${titles[pathname]??pathname.split('/').filter(Boolean).pop()?.replaceAll('-',' ')} | Prakvi`;document.getElementById('main')?.focus({preventScroll:true});},[pathname]);return null}
function App(){return <BrowserRouter><ScrollManager/><SmoothScroll/><div id="top"/><Header/><main id="main" tabIndex={-1}><Suspense fallback={<div className="route-loading" role="status">Loading Prakvi…</div>}><Routes><Route path="/" element={<Home/>}/><Route path="/about" element={<Company/>}/><Route path="/services" element={<Solutions/>}/><Route path="/services/:slug" element={<Solutions/>}/><Route path="/products" element={<Products/>}/><Route path="/products/:slug" element={<Products/>}/><Route path="/careers" element={<Careers/>}/><Route path="/careers/jobs" element={<Careers/>}/><Route path="/careers/jobs/:slug" element={<Careers/>}/><Route path="/careers/jobs/:slug/apply" element={<Careers/>}/><Route path="/insights" element={<Insights/>}/><Route path="/insights/:slug" element={<Insights/>}/><Route path="/contact" element={<Contact/>}/><Route path="/privacy" element={<Legal/>}/><Route path="/terms" element={<Legal/>}/><Route path="*" element={<Legal notFound/>}/></Routes></Suspense></main><Footer/></BrowserRouter>}
const root=import.meta.hot?.data.root??createRoot(document.getElementById('root')!);
if(import.meta.hot)import.meta.hot.data.root=root;
root.render(<React.StrictMode><App/></React.StrictMode>);



