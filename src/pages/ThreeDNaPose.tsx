import React, { useEffect } from "react";
import {
  ShieldCheck,
  Infinity as InfinityIcon,
  MessageCircle,
  Award,
} from "lucide-react";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700;800&display=swap');

  #tdp {
    --bg: #0a0807;
    --bg2: #14100c;
    --ink: #f4ede2;
    --muted: #c4b5a3;
    --muted2: #7c6e5d;
    --copper: #e8662a;
    --copperHi: #f4965e;
    --clay: #b8412a;
    --bone: #d4a87c;
    --green: #4ade80;
    --red: #f87171;
    --border: rgba(244,237,226,0.09);
    --d: 'Anton', sans-serif;
    --s: 'Anton', sans-serif;
    --n: 'Inter', system-ui, sans-serif;
    
    font-family: var(--n);
    -webkit-font-smoothing: antialiased;
    background: var(--bg);
    color: var(--ink);
    margin: 0;
    padding: 0;
    min-height: 100vh;
    position: relative;
  }
  #tdp * { box-sizing: border-box; word-wrap: break-word; overflow-wrap: break-word; }
  #tdp a { color: inherit; text-decoration: none; }
  #tdp .hd, #tdp .hs, #tdp h1, #tdp h2, #tdp h3, #tdp h4 { word-wrap: break-word; overflow-wrap: break-word; word-break: keep-all; }
  #tdp::before {
    content: ""; position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background: radial-gradient(900px 600px at 80% -10%, rgba(232,102,42,0.12), transparent 60%),
                radial-gradient(700px 500px at -10% 30%, rgba(184,65,42,0.15), transparent 65%),
                radial-gradient(600px 400px at 50% 110%, rgba(244,150,94,0.08), transparent 70%);
  }
  #tdp main { position: relative; z-index: 1; }
  #tdp .w { max-width: 1080px; margin: 0 auto; padding: 0 56px; position: relative; }

  #tdp .hd, #tdp .hs { font-family: var(--n); font-weight: 800; font-size: 64px; line-height: 1; letter-spacing: -0.02em; text-transform: uppercase; margin: 0 auto 16px; color: #fff; text-align: center; }
  #tdp .hd .it, #tdp .hs .it { background: linear-gradient(90deg, var(--copper) 0%, var(--clay) 50%, var(--copperHi) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; display: inline-block; font-style: normal; font-family: inherit; font-weight: inherit; font-size: inherit; }
  #tdp .ey { font-family: var(--n); font-size: 11px; letter-spacing: 0.28em; color: var(--copperHi); text-transform: uppercase; margin: 0 auto 18px; font-weight: 600; text-align: center; }
  #tdp .lede, #tdp p.sub { font-family: var(--n); font-size: 18px; color: var(--muted); line-height: 1.45; margin: 0 auto; font-style: normal; text-align: center; }
  #tdp .text-center { text-align: center; }
  
  #tdp .btn { display: inline-flex; align-items: center; gap: 10px; padding: 18px 30px; border-radius: 99px; font-family: var(--n); font-weight: 700; font-size: 13px; letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer; border: none; background: linear-gradient(135deg, var(--copper), var(--clay)); color: #fff; box-shadow: 0 18px 40px -10px rgba(232,102,42,0.45), inset 0 0 0 1px rgba(255,255,255,0.1); transition: transform .15s ease, box-shadow .15s ease; }
  #tdp .btn:hover { transform: translateY(-2px); box-shadow: 0 22px 50px -10px rgba(232,102,42,0.6); }
  #tdp .btn .arrow { transition: transform .15s ease; display: inline-block; }
  #tdp .btn:hover .arrow { transform: translateX(4px); }

  /* Nav */
  #tdp .nav { display: flex; justify-content: space-between; align-items: center; padding: 24px 56px; position: absolute; top:0; left:0; width: 100%; z-index: 10; }
  #tdp .nav-links { display: none; }
  @media(min-width:901px){
    #tdp .nav-links { display: flex; align-items: center; gap: 4px; padding: 6px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 99px; }
    #tdp .nav-links a { padding: 10px 20px; font-family: var(--n); font-size: 12px; font-weight: 700; letter-spacing: 0.1em; color: var(--muted); text-transform: uppercase; text-decoration: none; transition: color .2s; border-radius: 99px; }
    #tdp .nav-links a:not(.highlight):hover { color: #fff; }
    #tdp .nav-links a.highlight { background: linear-gradient(135deg, var(--copper), var(--clay)); color: #fff; }
  }
  #tdp .logo-img { height: 42px; width: auto; display: block; }
  #tdp .foot-logo { height: 40px; margin: 0 auto; display: block; opacity: 0.8; transition: opacity 0.2s; }
  #tdp .foot-logo:hover { opacity: 1; }
  #tdp .nav-login { display: inline-flex; align-items: center; padding: 12px 28px; border-radius: 99px; font-family: var(--n); font-size: 12px; font-weight: 700; letter-spacing: 0.1em; color: #fff; text-transform: uppercase; text-decoration: none; border: 1px solid rgba(255,255,255,0.1); transition: background .15s ease; }
  #tdp .nav-login:hover { background: rgba(255,255,255,0.05); }

  /* Hero */
  #tdp .hero { padding: 140px 0 96px; text-align: center; position: relative; overflow: hidden; background: linear-gradient(to bottom, rgba(10,8,7,0) 20%, var(--bg) 90%, var(--bg) 100%), url('https://3dnapose.com/wp-content/uploads/2026/05/bg_3dnapose.webp') no-repeat center top; background-size: cover; background-color: var(--bg); }
  #tdp .hero p.sub { font-family: var(--n); font-size: 17px; color: var(--muted); max-width: 600px; margin: 24px auto 32px; line-height: 1.5; }
  #tdp .hero .micro { font-family: var(--n); font-size: 11px; color: var(--muted2); letter-spacing: 0.22em; text-transform: uppercase; margin-top: 18px; }
  #tdp .hero .avatars { display: flex; align-items: center; justify-content: center; gap: 16px; margin: 32px auto 0; font-family: var(--n); font-size: 13px; color: var(--muted); text-align: left; }
  #tdp .hero .pills { display: flex; justify-content: center; gap: 16px; margin: 24px auto 0; flex-wrap: wrap; }
  #tdp .hero .pill { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--muted); background: rgba(255,255,255,0.03); border: 1px solid var(--border); padding: 8px 16px; border-radius: 99px; }
  #tdp .hero .pill svg { width: 14px; height: 14px; color: var(--green); }
  
  #tdp .hero-fig { margin: 64px auto 0; width: 100%; max-width: 960px; aspect-ratio: 16/9; border: 1px solid var(--border); border-radius: 16px; background: radial-gradient(circle at 50% 50%, #2a1005, #080302); position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; box-shadow: 0 40px 100px -20px rgba(232,102,42,0.15); }
  #tdp .hero-fig iframe { width: 100%; height: 100%; border: none; position: absolute; inset: 0; }
  #tdp .hero-fig svg.fig { height: 120%; opacity: 0.8; color: var(--copperHi); }
  #tdp .hero-fig .tag { position: absolute; left: 24px; top: 24px; font-family: var(--n); font-size: 11px; color: var(--bone); letter-spacing: 0.22em; opacity: 0.8; z-index: 2; font-weight: 600; }
  #tdp .hero-fig .tag.r { left: auto; right: 24px; color: var(--muted2); }

  /* Marquee */
  #tdp .marquee { padding: 32px 0; border-top: 1px solid var(--border); border-bottom: 1px solid transparent; overflow: hidden; background: #000; }
  #tdp .marquee .track { display: flex; width: max-content; animation: tdpMq 25s linear infinite; }
  #tdp .marquee:hover .track { animation-play-state: paused; }
  #tdp .marquee .row { display: flex; align-items: center; gap: 48px; font-family: var(--n); font-weight: 500; font-size: 20px; letter-spacing: 0; text-transform: none; white-space: nowrap; color: #fff; padding-right: 48px; }
  #tdp .marquee .row .star { width: 18px; height: 18px; color: var(--copperHi); }
  @keyframes tdpMq { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

  /* Problem */
  #tdp .problem { padding: 96px 0; }
  #tdp .problem-box { max-width: 800px; margin: 0 auto; }
  #tdp .problem-list { display: flex; flex-direction: column; gap: 24px; margin-top: 48px; }
  #tdp .problem-item { display: flex; align-items: flex-start; gap: 24px; padding: 24px; border: 1px solid var(--border); border-radius: 12px; background: rgba(255,255,255,0.015); transition: background 0.3s; }
  #tdp .problem-item:hover { background: rgba(255,255,255,0.03); }
  #tdp .problem-num { font-family: var(--d); font-size: 32px; color: var(--clay); opacity: 0.7; line-height: 1; margin-top: 2px; }
  #tdp .problem-txt { font-size: 16px; color: var(--muted); line-height: 1.5; font-weight: 500; }
  #tdp .problem-txt b { color: var(--ink); font-weight: 700; }

  /* Method */
  #tdp .method { padding: 96px 0; background: var(--bg2); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
  #tdp .pillars { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; margin-top: 56px; }
  #tdp .pillar { display: flex; flex-direction: column; gap: 16px; }
  #tdp .pillar-icon { width: 64px; height: 64px; border-radius: 50%; background: linear-gradient(135deg, var(--bg2), var(--bg)); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; color: var(--copperHi); box-shadow: inset 0 0 20px rgba(232,102,42,0.1); }
  #tdp .pillar-icon svg { width: 28px; height: 28px; }
  #tdp .pillar-name { font-family: var(--d); font-size: 24px; letter-spacing: 0.02em; color: #fff; text-transform: uppercase; line-height: 1.2; }
  #tdp .pillar-desc { font-size: 15px; color: var(--muted); line-height: 1.5; }

  /* Modules */
  #tdp .modules { padding: 96px 0; }
  #tdp .mod-list { display: flex; flex-direction: column; gap: 48px; margin-top: 48px; }
  #tdp .mod-item { border: 1px solid var(--border); border-radius: 16px; background: rgba(255,255,255,0.015); overflow: hidden; }
  
  #tdp .mod-header { padding: 40px 48px; border-bottom: 1px solid var(--border); background: rgba(255,255,255,0.01); display: flex; gap: 32px; align-items: center; }
  #tdp .mod-num { font-family: var(--d); font-size: 80px; line-height: 1; color: var(--clay); flex-shrink: 0; }
  #tdp .mod-titles { flex: 1; }
  #tdp .mod-label { font-size: 11px; font-weight: 800; color: var(--copperHi); letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 6px; display: block; }
  #tdp .mod-title { font-family: var(--d); font-size: 32px; color: #fff; line-height: 1.1; text-transform: uppercase; letter-spacing: 0.02em; margin-bottom: 6px; }
  #tdp .mod-sub { font-size: 15px; color: var(--muted); font-weight: 500; opacity: 0.8; }
  
  #tdp .mod-body { padding: 48px; }
  #tdp .mod-body-inner { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 64px; align-items: center; }
  #tdp .mod-img-wrap { border: 1px solid var(--border); border-radius: 12px; overflow: hidden; background: #000; box-shadow: 0 20px 50px rgba(0,0,0,0.3); }
  #tdp .mod-img-wrap img { width: 100%; height: auto; display: block; opacity: 1; transition: transform 0.6s ease; }
  #tdp .mod-item:hover .mod-img-wrap img { transform: scale(1.03); }
  
  #tdp .mod-content-right { display: flex; flex-direction: column; gap: 24px; }
  #tdp .mod-desc { font-size: 16px; color: var(--muted); line-height: 1.6; font-weight: 500; }
  #tdp .mod-topics { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; }
  #tdp .mod-topics li { display: flex; gap: 12px; align-items: flex-start; font-size: 14px; color: var(--bone); font-family: var(--n); }
  #tdp .mod-topics li svg { width: 18px; height: 18px; color: var(--copper); flex-shrink: 0; margin-top: 2px; }

  /* About */
  #tdp .about { padding: 96px 0; background: var(--bg2); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
  #tdp .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
  #tdp .about-fig { position: relative; aspect-ratio: 4/5; border-radius: 12px; border: 1px solid var(--border); overflow: hidden; background: #14100c; }
  #tdp .about-fig img { width: 100%; height: 100%; object-fit: cover; opacity: 1; }
  #tdp .about-badge { position: absolute; bottom: 24px; left: 24px; font-family: var(--n); font-size: 10px; font-weight: 700; letter-spacing: 0.22em; color: var(--bone); background: rgba(0,0,0,0.5); padding: 6px 12px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.1); }
  #tdp .about-stats { margin-top: 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  #tdp .stat-num { font-family: var(--d); font-size: 42px; color: var(--copperHi); line-height: 1; }
  #tdp .stat-txt { font-size: 13px; color: var(--muted); font-weight: 500; margin-top: 4px; }
  #tdp .about-bio { display: flex; flex-direction: column; gap: 24px; }
  #tdp .about-bio p { font-family: var(--n); font-size: 16px; color: var(--muted); line-height: 1.6; margin: 0; }
  #tdp .about-bio p.lead { font-family: var(--n); font-size: 20px; font-style: normal; color: var(--ink); font-weight: 600; }
  #tdp .about-collab { font-family: var(--n); font-size: 12px; font-weight: 600; color: var(--bone); letter-spacing: 0.1em; text-transform: uppercase; padding-top: 24px; border-top: 1px solid var(--border); line-height: 1.5; }
  #tdp .port-wrap { margin-top: 96px; overflow: hidden; position: relative; width: 100%; display: flex; }
  #tdp .port-track { display: flex; gap: 16px; width: max-content; animation: tdpPortScroll 45s linear infinite; }
  #tdp .port-wrap:hover .port-track { animation-play-state: paused; }
  #tdp .port-item { width: 340px; aspect-ratio: 4/5; border-radius: 12px; overflow: hidden; cursor: zoom-in; position: relative; border: 1px solid var(--border); }
  #tdp .port-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; display: block; }
  #tdp .port-item:hover img { transform: scale(1.05); }
  @keyframes tdpPortScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  
  /* Lightbox */
  #tdp .lightbox { position: fixed; inset: 0; background: rgba(0,0,0,0.95); z-index: 2000; display: flex; align-items: center; justify-content: center; opacity: 0; pointer-events: none; transition: opacity 0.3s ease; }
  #tdp .lightbox.active { opacity: 1; pointer-events: auto; }
  #tdp .lightbox img { max-width: 90vw; max-height: 90vh; border-radius: 8px; object-fit: contain; box-shadow: 0 40px 100px rgba(0,0,0,0.5); transform: scale(0.95); transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
  #tdp .lightbox.active img { transform: scale(1); }
  #tdp .lb-close { position: absolute; top: 32px; right: 32px; background: rgba(255,255,255,0.1); width: 48px; height: 48px; border-radius: 50%; color: #fff; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.2s; }
  #tdp .lb-close:hover { background: rgba(255,255,255,0.2); }
  #tdp .lb-close svg { width: 24px; height: 24px; }
  
  /* Social Proof */
  #tdp .social-proof { padding: 96px 0; background: var(--bg2); position: relative; overflow: hidden; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
  #tdp .test-header { text-align: center; margin-bottom: 64px; }
  #tdp .test-header .ey { margin-bottom: 16px; display: inline-flex; align-items: center; justify-content: center; gap: 12px; }
  #tdp .test-header .ey span.sep { width: 1px; height: 16px; background: var(--copper); opacity: 0.5; }
  #tdp .test-header h2 { font-family: var(--d); font-size: 42px; color: #fff; text-transform: uppercase; line-height: 1; }
  #tdp .test-header p { font-family: var(--n); font-size: 16px; color: var(--muted); max-width: 600px; margin: 16px auto 0; line-height: 1.5; }
  
  #tdp .test-track-wrap { display: flex; overflow-x: auto; padding-bottom: 32px; margin: 0 -24px; padding: 0 24px 32px 24px; scrollbar-width: none; user-select: none; }
  #tdp .test-track-wrap::-webkit-scrollbar { display: none; }
  #tdp .test-track { display: flex; gap: 24px; width: max-content; }

  #tdp .test-card { flex: 0 0 340px; background: linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%); border: 1px solid var(--border); border-radius: 16px; padding: 32px; position: relative; }
  #tdp .test-card::before { content:''; position:absolute; top:0; left:0; width:100%; height:100px; background: radial-gradient(circle at 50% 0%, rgba(232,102,42,0.15), transparent 70%); pointer-events: none; border-radius: 16px; }
  #tdp .test-user { display: flex; align-items: center; gap: 16px; margin-bottom: 24px; position: relative; z-index: 2; }
  #tdp .test-avatar { width: 48px; height: 48px; border-radius: 50%; background: #000; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); }
  #tdp .test-avatar img { width: 100%; height: 100%; object-fit: cover; }
  #tdp .test-name { font-family: var(--n); font-weight: 700; color: #fff; font-size: 15px; }
  #tdp .test-handle { font-family: var(--n); color: var(--muted2); font-size: 12px; }
  #tdp .test-text { font-family: var(--n); font-size: 14px; color: var(--muted); line-height: 1.6; position: relative; z-index: 2; }

  /* Before After */
  #tdp .bna-wrap { margin-top: 96px; padding-top: 96px; border-top: 1px solid rgba(255,255,255,0.05); }
  #tdp .bna-text { text-align: center; margin-bottom: 64px; }
  #tdp .bna-text .ey { margin-bottom: 16px; display: inline-flex; align-items: center; justify-content: center; gap: 12px; }
  #tdp .bna-text .ey span.sep { width: 1px; height: 16px; background: var(--copper); opacity: 0.5; }
  #tdp .bna-text h2 { font-family: var(--d); font-size: 42px; color: #fff; text-transform: uppercase; line-height: 1; margin-bottom: 24px; }
  #tdp .bna-text p { font-family: var(--n); font-size: 16px; color: var(--muted); max-width: 600px; margin: 0 auto; line-height: 1.5; }
  
  #tdp .bna-carousel-wrap { display: flex; overflow-x: auto; padding-bottom: 32px; margin: 0 -24px; padding: 0 24px 32px 24px; scrollbar-width: none; user-select: none; }
  #tdp .bna-carousel-wrap::-webkit-scrollbar { display: none; }
  #tdp .bna-carousel { display: flex; gap: 24px; width: max-content; }
  
  #tdp .bna-card { flex: 0 0 540px; border: 1px solid var(--border); border-radius: 12px; overflow: hidden; display: flex; flex-direction: column; background: rgba(255,255,255,0.02); }
  #tdp .bna-card-user { padding: 16px; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 12px; }

  #tdp .bna-card-user img { width: 32px; height: 32px; border-radius: 50%; }
  #tdp .bna-card-user span { font-family: var(--n); font-weight: 600; color: #fff; font-size: 14px; }
  #tdp .bna-card-imgs { display: grid; grid-template-columns: 1fr 1fr; aspect-ratio: 16/9; }
  #tdp .bna-img-col { position: relative; }
  #tdp .bna-img-col:first-child { border-right: 1px solid var(--border); }
  #tdp .bna-img-col img { width: 100%; height: 100%; object-fit: cover; }
  #tdp .bna-tag { position: absolute; bottom: 12px; left: 12px; background: rgba(0,0,0,0.8); padding: 4px 10px; border-radius: 4px; font-family: var(--n); font-size: 11px; font-weight: 700; color: #fff; letter-spacing: 0.1em; text-transform: uppercase; }

  /* Compare */
  #tdp .compare { padding: 96px 0; }
  #tdp .comp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0; border: 1px solid var(--border); border-radius: 16px; overflow: hidden; }
  #tdp .comp-col { padding: 48px; display: flex; flex-direction: column; gap: 24px; }
  #tdp .comp-col.left { background: rgba(255,255,255,0.02); border-right: 1px solid var(--border); }
  #tdp .comp-col.right { background: radial-gradient(circle at 100% 100%, rgba(232,102,42,0.1), transparent 60%); }
  #tdp .comp-title { font-family: var(--d); font-size: 24px; text-transform: uppercase; color: #fff; letter-spacing: 0.05em; margin-bottom: 8px; }
  #tdp .comp-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 16px; }
  #tdp .comp-list-item { display: flex; align-items: flex-start; gap: 12px; font-family: var(--n); font-size: 15px; line-height: 1.4; color: var(--muted); }
  #tdp .comp-list-item svg { width: 18px; height: 18px; flex-shrink: 0; margin-top: 2px; }
  #tdp .comp-list-item.bad svg { color: var(--red); }
  #tdp .comp-list-item.good svg { color: var(--green); }
  #tdp .comp-label { display: inline-flex; align-items: center; gap: 8px; padding: 6px 12px; border-radius: 4px; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; width: fit-content; }
  #tdp .comp-label.l-red { background: rgba(248,113,113,0.1); color: var(--red); }
  #tdp .comp-label.l-green { background: rgba(74,222,128,0.1); color: var(--green); }
  #tdp .comp-txt { font-family: var(--n); font-size: 16px; color: var(--muted); line-height: 1.5; font-weight: 500; }
  #tdp .comp-quote { font-family: var(--n); font-size: 18px; font-style: normal; font-weight: 600; padding-left: 16px; border-left: 2px solid var(--border); color: var(--muted2); }
  #tdp .comp-col.right .comp-quote { color: var(--copperHi); border-color: var(--copperHi); }

  /* Offer */
  #tdp .offer { padding: 96px 0; background: var(--bg2); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
  #tdp .offer-card { position: relative; max-width: 960px; margin: 0 auto; border: 1px solid var(--border); border-radius: 16px; background: linear-gradient(180deg, var(--bg), var(--bg2)); box-shadow: 0 40px 100px -20px rgba(0,0,0,0.5); overflow: hidden; }
  #tdp .offer-ribbon { position: absolute; top: 0; right: 0; background: linear-gradient(135deg, var(--copper), var(--clay)); color: #fff; padding: 12px 32px; font-size: 11px; font-weight: 800; letter-spacing: 0.22em; text-transform: uppercase; border-bottom-left-radius: 16px; box-shadow: -4px 4px 20px rgba(0,0,0,0.2); }
  #tdp .offer-head { padding: 48px; text-align: center; border-bottom: 1px solid var(--border); }
  #tdp .offer-head .offer-logo { height: 56px; width: auto; margin: 0 auto 24px; display: block; }
  #tdp .offer-head h3 { font-family: var(--d); font-size: 48px; letter-spacing: 0.02em; text-transform: uppercase; margin: 0 0 12px; font-weight: 400; color: #fff; line-height: 1; }
  #tdp .offer-head p { font-size: 16px; color: var(--bone); font-weight: 600; margin: 0; letter-spacing: 0.05em; }
  #tdp .offer-body { display: grid; grid-template-columns: 1fr 1fr; }
  
  #tdp .offer-feats { padding: 40px 36px; }
  #tdp .feats-title { font-family: var(--n); font-size: 11px; color: var(--copperHi); letter-spacing: 0.28em; text-transform: uppercase; margin-bottom: 18px; }
  #tdp .feats-list { list-style: none; padding: 0; margin: 0; }
  #tdp .feats-list li { padding: 12px 0; border-top: 1px solid var(--border); display: flex; gap: 12px; font-size: 14px; color: var(--ink); line-height: 1.4; font-family: var(--n); transition: all 0.2s; }
  #tdp .feats-list li:hover { color: var(--bone); background: rgba(232,102,42,0.03); padding-left: 8px; margin-left: -8px; margin-right: -8px; padding-right: 8px; border-radius: 4px; }
  #tdp .feats-list li:first-child { border-top: none; }
  #tdp .feats-list .num { font-family: var(--d); font-size: 13px; color: var(--copperHi); min-width: 24px; }
  
  #tdp .offer-price { padding: 40px 36px; border-right: 1px solid var(--border); text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; }
  #tdp .price-inv { font-family: var(--n); font-size: 11px; color: var(--copperHi); letter-spacing: 0.28em; text-transform: uppercase; margin-bottom: 16px; }
  #tdp .price-12x { margin-top: 18px; font-family: var(--s); font-style: italic; font-size: 16px; color: var(--muted); margin-bottom: 4px; }
  #tdp .price-val { font-family: var(--d); font-weight: 400; font-size: 104px; line-height: 1; letter-spacing: 0.005em; margin-top: 4px; color: var(--ink); display: flex; align-items: baseline; justify-content: center; gap: 8px; }
  #tdp .price-val .currency { font-size: 40px; color: var(--ink); }
  #tdp .price-val .amount { font-size: 104px; color: var(--ink); }
  #tdp .price-sj { font-family: var(--s); font-style: italic; font-size: 14px; color: var(--muted2); margin-top: 6px; }
  #tdp .price-div { height: 1px; width: 100%; background: var(--border); margin: 22px 0; }
  #tdp .price-full { font-size: 14px; color: var(--muted); margin-bottom: 22px; }
  
  #tdp .offer-btn { display: inline-flex; width: 100%; align-items: center; gap: 8px; padding: 20px 32px; background: linear-gradient(135deg, var(--copper), var(--clay)); color: #fff; font-family: var(--n); font-weight: 800; font-size: 15px; letter-spacing: 0.15em; text-transform: uppercase; border-radius: 99px; text-decoration: none; transition: transform 0.3s, box-shadow 0.3s; box-shadow: 0 0 30px rgba(232,102,42,0.3); justify-content: center; }
  #tdp .offer-btn:hover { transform: translateY(-2px); box-shadow: 0 0 40px rgba(232,102,42,0.5); }
  #tdp .offer-btn .arrow { margin-left: 4px; transition: transform 0.3s; }
  #tdp .offer-btn:hover .arrow { transform: translateX(4px); }
  
  #tdp .offer-sec { margin-top: 16px; display: flex; align-items: center; justify-content: center; gap: 8px; font-family: var(--n); font-size: 13px; color: var(--muted2); font-weight: 500; }
  #tdp .offer-sec svg { color: var(--copper); }
  
  #tdp .offer-bottom-icons { display: flex; flex-direction: column; gap: 16px; margin-top: 32px; }
  #tdp .obi { display: flex; align-items: center; gap: 12px; }
  #tdp .obi span { font-family: var(--n); font-size: 10px; font-weight: 700; color: var(--muted); letter-spacing: 0.05em; }
  #tdp .obi .icon { width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; }

  /* FAQ */
  #tdp .faq { padding: 96px 0; }
  #tdp .faq-container { max-width: 780px; margin: 0 auto; display: flex; flex-direction: column; gap: 16px; marginTop: 48px; }
  #tdp .faq-item { border: 1px solid var(--border); border-radius: 12px; background: rgba(255,255,255,0.015); overflow: hidden; transition: background 0.3s; }
  #tdp .faq-item.open { background: rgba(255,255,255,0.04); border-color: rgba(255,255,255,0.1); }
  #tdp .faq-q { padding: 24px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; user-select: none; }
  #tdp .faq-title { font-size: 16px; font-weight: 600; color: var(--ink); }
  #tdp .faq-icon { width: 24px; height: 24px; border-radius: 50%; border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; color: var(--copperHi); transition: transform 0.3s, background 0.3s; flex-shrink: 0; font-size: 20px; line-height: 1; }
  #tdp .faq-icon svg { width: 14px; height: 14px; }
  #tdp .faq-item.open .faq-icon { transform: rotate(45deg); background: rgba(232,102,42,0.1); border-color: var(--copperHi); }
  #tdp .faq-a { padding: 0 24px; max-height: 0; overflow: hidden; transition: max-height 0.4s ease, padding 0.4s ease; font-size: 15px; color: var(--muted); line-height: 1.6; }
  #tdp .faq-item.open .faq-a { max-height: 300px; padding: 0 24px 24px; }

  /* Final CTA */
  #tdp .final { padding: 120px 0; text-align: center; background: var(--bg2); border-top: 1px solid var(--border); }
  #tdp .final .lede { margin: 24px auto 48px; max-width: 500px; }

  /* Footer */
  #tdp footer { padding: 64px 56px 48px; text-align: center; border-top: 1px solid var(--border); }
  #tdp .foot-nav { display: flex; justify-content: center; gap: 32px; margin: 32px 0; }
  #tdp .foot-nav a { font-size: 13px; font-weight: 500; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; transition: color 0.2s; }
  #tdp .foot-nav a:hover { color: #fff; }
  #tdp .foot-social { display: flex; justify-content: center; gap: 24px; margin-bottom: 48px; }
  #tdp .foot-social a { width: 44px; height: 44px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; color: var(--muted); transition: all 0.2s; background: rgba(255,255,255,0.02); }
  #tdp .foot-social a:hover { color: var(--ink); border-color: rgba(255,255,255,0.2); background: rgba(255,255,255,0.05); }
  #tdp .foot-social svg { width: 18px; height: 18px; }
  #tdp .foot-copy { font-size: 13px; color: var(--muted2); font-weight: 500; }
  #tdp .foot-cred { font-family: var(--s); font-size: 14px; font-style: italic; color: var(--muted2); margin-top: 12px; }
  #tdp .back-top { display: inline-block; margin-top: 32px; font-size: 11px; font-weight: 700; letter-spacing: 0.2em; color: var(--copperHi); text-transform: uppercase; cursor: pointer; }
  
  /* Scroll Reveal Logic */
  #tdp .rv { opacity: 0; transform: translateY(22px); transition: opacity 0.55s ease, transform 0.55s ease; }
  #tdp .rv.on { opacity: 1; transform: translateY(0); }
  #tdp .d1 { transition-delay: 0.08s; }
  #tdp .d2 { transition-delay: 0.16s; }
  #tdp .d3 { transition-delay: 0.24s; }

  /* Floating CTA */
  .tdp-cta { 
    position: fixed; bottom: 0; left: 0; right: 0; transform: translateY(100%); z-index: 1000; 
    background: rgba(10,8,7,0.85); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
    color: #fff; padding: 16px 24px; font-family: 'Inter', system-ui, sans-serif; 
    display: flex; align-items: center; justify-content: space-between; gap: 12px; 
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    border-top: 2px solid var(--copper);
    text-decoration: none;
  }
  .tdp-cta.on { transform: translateY(0); }
  .tdp-cta .cta-price { display: flex; flex-direction: column; }
  .tdp-cta .cta-price span:first-child { font-size: 10px; opacity: 0.6; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; }
  .tdp-cta .cta-price span:last-child { font-size: 16px; font-weight: 800; color: #fff; }
  .tdp-cta .cta-btn { background: linear-gradient(135deg, var(--copper), var(--clay)); padding: 12px 20px; border-radius: 99px; font-size: 11px; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase; white-space: nowrap; box-shadow: 0 8px 20px rgba(232,102,42,0.3); }

  /* Guarantee Section Styles */
  #tdp .gua { padding: 80px 0; background: var(--bg); border-top: 1px solid var(--border); }
  #tdp .gua-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; max-width: 1040px; margin: 0 auto; }
  #tdp .gua-grid .right { text-align: left; display: flex; flex-direction: column; gap: 24px; }
  #tdp .gua-grid .left { display: flex; justify-content: center; }
  #tdp .gua-medal { width: 360px; height: 360px; position: relative; }
  #tdp .gua-medal svg { width: 100%; height: 100%; animation: tdpRotate 20s linear infinite; }
  #tdp .gua-medal .inner { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; animation: none; }
  #tdp .gua-medal .num { font-family: var(--d); font-size: 120px; line-height: 0.8; background: linear-gradient(180deg, var(--clay), var(--copper)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  #tdp .gua-medal .ey-top { font-family: var(--n); font-size: 14px; letter-spacing: 0.2em; color: var(--copperHi); font-weight: 700; text-transform: uppercase; margin-bottom: 8px; }
  #tdp .gua-medal .ey-bot { font-family: var(--n); font-size: 14px; letter-spacing: 0.3em; color: #fff; font-weight: 700; text-transform: uppercase; margin-top: 12px; }
  
  #tdp .gua-right-ey { font-family: var(--n); font-size: 12px; letter-spacing: 0.2em; color: var(--copperHi); font-weight: 700; text-transform: uppercase; }
  #tdp .gua-right-hd { font-family: var(--d); font-size: 56px; line-height: 1.1; letter-spacing: -0.02em; color: #fff; }
  #tdp .gua-right-hd .grad { background: linear-gradient(90deg, var(--clay), var(--copperHi)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  
  #tdp .gua-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 16px; }
  #tdp .gua-list li { display: flex; gap: 16px; font-size: 16px; color: var(--muted); line-height: 1.5; font-family: var(--n); }
  #tdp .gua-list .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--copperHi); flex-shrink: 0; margin-top: 9px; box-shadow: 0 0 10px rgba(232,102,42,0.5); }
  
  #tdp .gua-btn { display: inline-flex; align-items: center; padding: 16px 32px; background: linear-gradient(135deg, var(--copper), var(--clay)); color: #fff; font-family: var(--n); font-weight: 700; font-size: 14px; letter-spacing: 0.1em; text-transform: uppercase; border-radius: 99px; text-decoration: none; transition: transform 0.3s, box-shadow 0.3s; box-shadow: 0 0 30px rgba(232,102,42,0.3); width: fit-content; }
  #tdp .gua-btn:hover { transform: translateY(-2px); box-shadow: 0 0 40px rgba(232,102,42,0.5); }
  @keyframes tdpRotate{0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}

  /* Micro Social Proof Hero */
  #tdp .hero .micro-proof { display: flex; align-items: center; justify-content: center; gap: 12px; margin-top: 24px; opacity: 0.8; }
  #tdp .hero .avatar-stack { display: flex; align-items: center; }
  #tdp .hero .avatar-stack img { width: 28px; height: 28px; border-radius: 50%; border: 2px solid var(--bg); margin-left: -8px; }
  #tdp .hero .avatar-stack img:first-child { margin-left: 0; }
  #tdp .hero .stars-row { display: flex; gap: 2px; color: #fbbf24; }
  #tdp .hero .stars-row svg { width: 12px; height: 12px; fill: currentColor; }
  #tdp .hero .proof-text { font-size: 12px; color: var(--muted); font-weight: 500; }

  /* Mobile */
  @media(max-width: 900px) {
    #tdp .w { padding: 0 24px; }
    #tdp .nav { padding: 20px 24px; }
    #tdp .hero { padding: 120px 0 64px; }
    #tdp .hd, #tdp .hs { font-size: 42px; }
    #tdp .hero p.sub { font-size: 16px; margin: 16px auto 24px; }
    #tdp .btn { width: 100%; justify-content: center; }
    #tdp .hero-fig { aspect-ratio: 4/5; }
    #tdp .marquee .row { font-size: 28px; gap: 24px; }
    #tdp .problem, #tdp .method, #tdp .modules, #tdp .about, #tdp .social-proof, #tdp .compare, #tdp .offer, #tdp .faq, #tdp .final, #tdp .gua { padding: 64px 0; }
    #tdp .pillars, #tdp .mod-body-inner, #tdp .about-grid, #tdp .comp-grid, #tdp .offer-body { grid-template-columns: 1fr; }
    #tdp .pillar-icon { width: 48px; height: 48px; box-shadow: inset 0 0 16px rgba(232,102,42,0.1); }
    #tdp .pillar-icon svg { width: 22px; height: 22px; }
    #tdp .faq-icon { width: 28px; height: 28px; }
    #tdp .faq-icon svg { width: 12px; height: 12px; }
    #tdp .comp-list-item svg { width: 16px; height: 16px; margin-top: 2px; }
    #tdp .mod-header { padding: 32px 24px; gap: 20px; }
    #tdp .mod-num { font-size: 56px; }
    #tdp .mod-title { font-size: 24px; }
    #tdp .mod-sub { font-size: 14px; }
    #tdp .mod-body { padding: 24px; }
    #tdp .mod-body-inner { gap: 32px; }
    #tdp .about-grid { gap: 32px; }
    #tdp .bna-wrap { margin-top: 64px; padding-top: 64px; }
    #tdp .bna-card { flex: 0 0 320px; }
    #tdp .bna-card-imgs { grid-template-columns: 1fr; aspect-ratio: auto; }
    #tdp .bna-img-col:first-child { border-right: none; border-bottom: 1px solid var(--border); }
    #tdp .bna-img-col img { aspect-ratio: 4/3; }
    #tdp .mod-head, #tdp .problem-item { flex-direction: column; }
    #tdp .mod-head .lede { text-align: left; }
    #tdp .comp-col.left { border-right: none; border-bottom: 1px solid var(--border); }
    #tdp .comp-col { padding: 32px 24px; }
    #tdp .offer-card { border-radius: 12px; }
    #tdp .offer-ribbon { font-size: 9px; padding: 8px 16px; }
    #tdp .offer-head { padding: 32px 24px; }
    #tdp .offer-head .offer-logo { height: 40px; margin-bottom: 16px; }
    #tdp .offer-head h3 { font-size: 32px; }
    #tdp .offer-body { grid-template-columns: 1fr; }
    #tdp .offer-price { padding: 32px 24px; border-right: none; border-bottom: 1px solid var(--border); }
    #tdp .offer-feats { padding: 32px 24px; }
    #tdp .feats-list li { flex-direction: column; align-items: flex-start; gap: 8px; }
    #tdp .price-val { font-size: 80px; }
    #tdp .price-val .currency { font-size: 32px; }
    #tdp .price-val .amount { font-size: 80px; }
    #tdp .offer-btn { padding: 16px; font-size: 14px; flex-wrap: wrap; text-align: center; justify-content: center; width: 100%; box-sizing: border-box; }
    #tdp .faq-q { padding: 20px; }
    #tdp .faq-item.open .faq-a { max-height: 500px; padding: 0 20px 20px; }
    #tdp footer { padding: 48px 24px; }
    #tdp .foot-nav { flex-direction: column; gap: 16px; }
    
    #tdp .gua-grid { grid-template-columns: 1fr; text-align: center; gap: 48px; }
    #tdp .gua-grid .right { text-align: center; align-items: center; }
    #tdp .gua-medal { margin: 0 auto; width: 280px; height: 280px; }
    #tdp .gua-medal .num { font-size: 80px; }
    #tdp .gua-right-hd { font-size: 42px; }
    #tdp .gua-list li { align-items: center; text-align: left; }
  }
  @media(max-width: 480px) {
    #tdp .w { padding: 0 20px; }
    #tdp .nav { padding: 16px 20px; }
    #tdp .nav-login { padding: 8px 16px; font-size: 10px; }
    #tdp .hd, #tdp .hs { font-size: 28px; }
    #tdp .hero p.sub { font-size: 14px; margin: 16px auto 24px; }
    #tdp .bna-card { flex: 0 0 280px; }
    #tdp .pillar-icon { width: 40px; height: 40px; }
    #tdp .pillar-icon svg { width: 18px; height: 18px; }
    #tdp .faq-icon { width: 24px; height: 24px; }
    #tdp .faq-icon svg { width: 10px; height: 10px; }
    #tdp .comp-list-item svg { width: 14px; height: 14px; }
    #tdp .gua-medal { width: 240px; height: 240px; }
    #tdp .gua-medal .num { font-size: 64px; }
    #tdp .offer-head h3 { font-size: 24px; }
    #tdp .mod-num { font-size: 40px; }
    #tdp .mod-title { font-size: 20px; }
    #tdp .price-val { font-size: 52px; }
    #tdp .price-val .amount { font-size: 52px; }
    #tdp .price-val .currency { font-size: 24px; }
    #tdp .gua-right-hd { font-size: 26px; }
    #tdp .btn { font-size: 11px; padding: 14px 20px; }
    #tdp .about-stats { grid-template-columns: 1fr; }
  }
  @media(max-width: 360px) {
    #tdp .w { padding: 0 16px; }
    #tdp .nav { padding: 12px 16px; }
    #tdp .nav-login { padding: 6px 12px; font-size: 9px; }
    #tdp .hd, #tdp .hs { font-size: 24px; }
    #tdp .bna-card { flex: 0 0 240px; }
    #tdp .pillar-icon { width: 36px; height: 36px; }
    #tdp .pillar-icon svg { width: 16px; height: 16px; }
    #tdp .gua-medal { width: 200px; height: 200px; }
    #tdp .gua-medal .num { font-size: 52px; }
    #tdp .offer-head h3 { font-size: 20px; }
    #tdp .mod-num { font-size: 32px; }
    #tdp .mod-title { font-size: 18px; }
    #tdp .price-val { font-size: 44px; }
    #tdp .price-val .amount { font-size: 44px; }
    #tdp .gua-right-hd { font-size: 22px; }
    #tdp .btn { font-size: 10px; padding: 12px 16px; }
  }
  @media(min-width: 769px) {
    .tdp-cta { display: none !important; }
  }

`;

const portImgs = [
  "https://3dnapose.com/wp-content/uploads/2025/11/1.jpg",
  "https://3dnapose.com/wp-content/uploads/2025/11/2.jpg",
  "https://3dnapose.com/wp-content/uploads/2025/11/3.jpg",
  "https://3dnapose.com/wp-content/uploads/2025/11/4.jpg",
  "https://3dnapose.com/wp-content/uploads/2025/11/5.jpg",
  "https://3dnapose.com/wp-content/uploads/2025/11/6.jpg",
  "https://3dnapose.com/wp-content/uploads/2025/11/7.jpg",
  "https://3dnapose.com/wp-content/uploads/2025/11/8.jpg",
];

const mods = [
  {
    n: "01",
    t: "Apresentação e Workflow",
    sub: "Interface, fluxo de trabalho e monetização",
    d: "Você vai aprender a organizar seu fluxo de trabalho no ZBrush, dominar a interface, entender a estrutura do curso e descobrir formas reais de monetizar sua arte no mercado criativo.",
    topics: [
      "Setup completo do ZBrush",
      "Hotkeys e atalhos de produtividade",
      "Caminhos de monetização real",
    ],
    img: "https://3dnapose.com/wp-content/uploads/2025/05/01-1024x819.png",
  },
  {
    n: "02",
    t: "Poses e Composição",
    sub: "Linha de ação, S-curve, contraposto e peso",
    d: "Os fundamentos para criar poses dinâmicas, com linha de ação, equilíbrio, peso e exagero de proporção. Teoria e prática para dar vida e impacto às suas criações.",
    topics: [
      "Linha de ação e ritmo",
      "Distribuição de peso e silhueta",
      "Como evitar poses duras e estáticas",
    ],
    img: "https://3dnapose.com/wp-content/uploads/2025/05/02-1024x819.png",
  },
  {
    n: "03",
    t: "Blocagem Atômica",
    sub: "Volumes, landmarks e direção das formas",
    d: "Estruture o corpo em pose com foco nos volumes principais, pontos de referência anatômicos (landmarks) e direção das formas, garantindo base sólida e expressiva.",
    topics: [
      "Landmarks anatômicos essenciais",
      "Estruturação em blocos primitivos",
      "Massa e proporção na prática",
    ],
    img: "https://3dnapose.com/wp-content/uploads/2025/05/03-1024x819.png",
  },
  {
    n: "04",
    t: "Detalhamento Anatômico",
    sub: "Inserções musculares e introdução ao Polypaint",
    d: "Refine as inserções musculares, aprimore detalhes da escultura e dê vida ao modelo com introdução ao Polypaint. Passo essencial para elevar realismo e expressividade.",
    topics: [
      "Inserções musculares precisas e realistas",
      "Noções de Polypaint e cores de base",
      "Ajustes finos e expressividade anatômica",
    ],
    img: "https://3dnapose.com/wp-content/uploads/2025/05/04-1024x819.png",
  },
  {
    n: "05",
    t: "Tecidos e Acessórios",
    sub: "Comportamento de tecidos, dobras, botas e props",
    d: "Entenda o comportamento de diferentes tipos de tecido, aprenda a direcionar o fluxo das dobras e desenvolva peças com volume, dando mais realismo aos seus modelos.",
    topics: [
      "Tipos de dobras (tensão, compressão, etc)",
      "Modelagem de couro e tecidos grossos",
      "Integração de adereços no personagem",
    ],
    img: "https://3dnapose.com/wp-content/uploads/2025/05/05-1024x819.png",
  },
  {
    n: "06",
    t: "Personagem Completo",
    sub: "Spider-Man do zero ao render no UE5",
    d: "Da pose inicial ao corte para impressão, passando pela renderização na Unreal Engine 5 e finalização no Photoshop. Você modela o Spider-Man aplicando tudo que aprendeu.",
    topics: [
      "Escultura completa do Spider-Man",
      "Cortes (Keying) para impressão 3D",
      "Renderização na UE5 e pós no Photoshop",
    ],
    img: "https://3dnapose.com/wp-content/uploads/2025/05/06-1024x819.png",
  },
];

const testimonials = [
  {
    name: "José Martins",
    handle: "@jothamartins3d",
    instagram: "https://www.instagram.com/jothamartins3d/",
    text: "Extremamente satisfeito com esse investimento para o meu desenvolvimento como artista 3D. O Cardoso tem uma didática muito boa — o difícil fica fácil de entender! Com esse curso, consegui finalizar o meu primeiro modelo, e foi uma experiência incrível. O diferencial desse curso são as atualizações que são feitas constantemente, então sempre há conteúdo novo e atualizado. Apenas gratidão pelos ensinamentos e pela paciência que você teve durante os feedbacks. Kkkkk.",
    avatar: "https://3dnapose.com/wp-content/uploads/2026/05/perfil_jothamartins3d_1x.webp",
  },
  {
    name: "Gabriel Ribeiro",
    handle: "@teras.3d",
    instagram: "https://www.instagram.com/teras.3d/",
    text: "O curso do Cardoso foi extremamente esclarecedor em vários pontos que eu tinha dúvida, principalmente em relação a composição, bases de estatuas e gestual. Nas aulas a maioria das minhas dúvidas eram sanadas, de forma clara e didática. Creio que qualquer um que queira melhorar suas noções gerais de escultura e arte no geral se arrependerá do curso, até porque ele engloba várias áreas diferentes de anatomia masculina/feminina, detalhamento de peças, renderização e finalização de peças. Posso recomendar de olhos fechados, que vale muito a pena.",
    avatar: "https://3dnapose.com/wp-content/uploads/2026/05/perfil_teras.3d_1x.webp",
  },
  {
    name: "Emerson Santos",
    handle: "@emerson3dart",
    instagram: "https://www.instagram.com/emerson3dart/",
    text: "Digo com toda a certeza que o '3D na Pose' é para quem realmente quer mudar de nível na sua modelagem e digo isso por que hoje eu sei que mudei de patamar graças a ele. Ele te mostra como enxergar o seu projeto de uma maneira diferente, para melhorar composição e o gestual do modelo, deixando ele muito mais interessante e bonito de se ver. A didática também é um ponto crucial, pois ele explica de maneira muito simples e efetiva, sempre mostrando na prática como fazer o que facilita muito o ensinamento.\nÉ um curso muito completo com vários módulos e extremamente abrangente pois você pode utilizar os ensinamentos em qualquer personagem que você queira fazer.",
    avatar: "https://3dnapose.com/wp-content/uploads/2026/05/Perfil_emerson3dart_1x.webp",
  },
  {
    name: "Leandro Silva",
    handle: "@leandrosilva.art",
    instagram: "https://www.instagram.com/leandrosilva.art/",
    text: "Antes de começar, eu tinha muita dificuldade em enxergar o gestual, composição e anatomia na minha modelagem, mas com sua paciência, dedicação e olhar artístico, consegui evoluir de uma forma que eu nem imaginava. Durante o processo, o Vinicius com sua didática perfeita foi muito prestativo e claro em cada explicação, os feedbacks dele foram essenciais para o meu crescimento como artista.\nRecomendo de olhos fechados a mentoria '3D NA POSE', é um investmento no qual você não vai se arrepender. Gratidão por todo o aprendizado, Vinicius. Essa experiência marcou um novo passo na minha vida como artista 3D.",
    avatar: "https://3dnapose.com/wp-content/uploads/2026/05/perfil_leandrosilva.art_1x.webp",
  },
  {
    name: "Bruno R. Ortolan",
    handle: "@fabricinacional",
    instagram: "https://www.instagram.com/fabricinacional/",
    text: "O curso do Cardoso além de claro e objetivo, traz um enorme conforto pra soltar a mão na modelagem, tanto pra saber o básico no digital, ou até mesmo quem já teve experiência na escultura tradicional como eu tive.\nO que foi exatamente o ponto que mais me fez comprar o curso e me satisfez mais do que o esperado, achei que muito se assemelha à liberdade tradicional com pontos técnicos do software no digital.\nIndico demais pra quem quer soltar a mão pra criar e esculpir sem medo. Desmistificando o software e possíveis bloqueios trazidos pela comum fórmula das poses simétricas.\n'3D na Pose' é um curso cada vez mais completo a cada vez que você revisita.",
    avatar: "https://ui-avatars.com/api/?name=Bruno+R+Ortolan&background=18181A&color=fff",
  },
  {
    name: "Leonardo Pizani",
    handle: "@leompizani",
    instagram: "https://www.instagram.com/leompizani/",
    text: "O curso é excelente, transformou completamente minha visão sobre gestual e composição. Estar atento a esses elementos desde o princípio permite criar estátuas muito mais interessantes, com poses naturais e base que complementam o personagem sem roubar sua atenção. E o conteúdo do curso ainda vai muito além disso, com aulas de anatomia direto na pose, tecidos, render e mais. É um investimento que vale muito a pena.",
    avatar: "https://3dnapose.com/wp-content/uploads/2026/05/perfil_leompizani_1x.webp",
  },
];

const bnaList = [
  {
    user: "@leandrosilva.art",
    instagram: "https://www.instagram.com/leandrosilva.art/",
    avatar: "https://3dnapose.com/wp-content/uploads/2026/05/perfil_leandrosilva.art_1x.webp",
    imgBefore: "https://3dnapose.com/wp-content/uploads/2026/05/leandrosilvaart-antes-1_1x.webp",
    imgAfter: "https://3dnapose.com/wp-content/uploads/2026/05/leandrosilvaart-depois-1_1x.webp",
  },
  {
    user: "@emerson3dart",
    instagram: "https://www.instagram.com/emerson3dart/",
    avatar: "https://3dnapose.com/wp-content/uploads/2026/05/Perfil_emerson3dart_1x.webp",
    imgBefore: "https://3dnapose.com/wp-content/uploads/2026/05/emerson3dart-antes-1_1x.webp",
    imgAfter: "https://3dnapose.com/wp-content/uploads/2026/05/emerson3dart-depois-1_1x.webp",
  },
  {
    user: "@leompizani",
    instagram: "https://www.instagram.com/leompizani/",
    avatar: "https://3dnapose.com/wp-content/uploads/2026/05/perfil_leompizani_1x.webp",
    imgBefore: "https://3dnapose.com/wp-content/uploads/2026/05/Leompizani-antes-1_1x.webp",
    imgAfter: "https://3dnapose.com/wp-content/uploads/2026/05/Leompizani-depois-1_1x.webp",
  },
];

function useDraggableCarousel(speed = 0.5) {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [startX, setStartX] = React.useState(0);
  const [scrollLeft, setScrollLeft] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);

  React.useEffect(() => {
    let animationId: number;
    const el = trackRef.current;
    if (!el) return;

    const scroll = () => {
      if (!isHovered && !isDragging) {
        el.scrollLeft += speed;
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [isHovered, isDragging, speed]);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    if (!trackRef.current) return;
    setStartX(e.pageX - trackRef.current.offsetLeft);
    setScrollLeft(trackRef.current.scrollLeft);
  };

  const onMouseLeave = () => {
    setIsDragging(false);
    setIsHovered(false);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    trackRef.current.scrollLeft = scrollLeft - walk;
  };

  const onMouseEnter = () => setIsHovered(true);

  return {
    trackRef,
    handlers: {
      onMouseDown,
      onMouseLeave,
      onMouseUp,
      onMouseMove,
      onMouseEnter,
    },
    isDragging,
  };
}

export default function ThreeDnaPose() {
  const [lbImg, setLbImg] = React.useState<string | null>(null);
  const testCarousel = useDraggableCarousel(0.5);
  const bnaCarousel = useDraggableCarousel(0.5);

  const Star = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );

  useEffect(() => {
    const els = document.querySelectorAll("#tdp .rv");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("on");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    els.forEach((el) => obs.observe(el));

    const faqQs = document.querySelectorAll(".faq-q");
    const handleFaqClick = (e: Event) => {
      const parent = (e.currentTarget as HTMLElement).parentElement;
      if (!parent) return;
      const isOpen = parent.classList.contains("open");
      document
        .querySelectorAll(".faq-item")
        .forEach((i) => i.classList.remove("open"));
      if (!isOpen) parent.classList.add("open");
    };
    faqQs.forEach((q) => q.addEventListener("click", handleFaqClick));

    const cta = document.getElementById("tdp-cta");
    let shown = false;

    const onScroll = () => {
      const hero = document.getElementById("tdp-home");
      if (!hero) return;

      const heroHeight = hero.offsetHeight;
      const triggerPoint = heroHeight * 0.8;

      if (!shown && window.scrollY > triggerPoint) {
        cta?.classList.add("on");
        shown = true;
      } else if (shown && window.scrollY <= triggerPoint) {
        cta?.classList.remove("on");
        shown = false;
      }

      const oferta = document.getElementById("tdp-oferta");
      if (oferta && shown) {
        const r = oferta.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) {
          cta?.classList.remove("on");
        } else {
          cta?.classList.add("on");
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      obs.disconnect();
      faqQs.forEach((q) => q.removeEventListener("click", handleFaqClick));
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <style>{STYLES}</style>
      <a href="#tdp-oferta" className="tdp-cta" id="tdp-floating-cta">
        <div className="cta-price">
          <span>Por apenas</span>
          <span>12x R$ 83,09</span>
        </div>
        <div className="cta-btn">GARANTIR VAGA →</div>
      </a>
      <div id="tdp">
        <main>
          <header className="nav rv">
            <a
              id="tdp-nav-logo"
              href="#tdp-home"
              aria-label="3D na Pose"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <img
                src="https://3dnapose.com/wp-content/uploads/2025/04/logo-3DNaPose.png"
                alt="3D NA POSE"
                className="logo-img"
              />
            </a>

            <nav className="nav-links">
              <a href="#tdp-method" id="tdp-nav-method">Método</a>
              <a href="#tdp-modules" id="tdp-nav-modules">Módulos</a>
              <a href="#tdp-about" id="tdp-nav-about">Sobre</a>
              <a href="#tdp-oferta" className="highlight" id="tdp-nav-oferta">
                Oferta
              </a>
            </nav>

            <a
              href="https://pay.hotmart.com/P96903534R?checkoutMode=10"
              target="_blank"
              rel="noreferrer"
              className="nav-login"
              id="tdp-nav-login"
            >
              Entrar
            </a>
          </header>

          <section className="hero" id="tdp-home">
            <div className="w">
              <h1 className="hd rv">
                Aprenda a criar colecionáveis
                <br />
                <span className="it">com nível de estúdio</span>
              </h1>
              <p className="sub rv d1">
                Aprenda a modelar direto na pose e criar colecionáveis com
                qualidade de estúdio, sem retrabalho, sem T-pose, sem tentativa
                e erro.
              </p>

              <div className="hero-fig rv d2">
                <iframe
                  src="https://www.youtube.com/embed/18t1zAp_JXc?autoplay=0&rel=0"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              <div className="rv d3" style={{ marginTop: "64px" }}>
                <a href="#tdp-oferta" className="btn" id="tdp-hero-cta">
                  QUERO COMEÇAR AGORA <span className="arrow">→</span>
                </a>

                <div className="micro-proof">
                  <div className="avatar-stack">
                    <img
                      src="https://ui-avatars.com/api/?name=JC&background=18181A&color=fff"
                      alt=""
                    />
                    <img
                      src="https://ui-avatars.com/api/?name=GR&background=18181A&color=fff"
                      alt=""
                    />
                    <img
                      src="https://ui-avatars.com/api/?name=LS&background=18181A&color=fff"
                      alt=""
                    />
                    <img
                      src="https://ui-avatars.com/api/?name=BO&background=18181A&color=fff"
                      alt=""
                    />
                  </div>
                  <div className="stars-row">
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                  </div>
                  <div className="proof-text">
                    +800 alunos transformaram suas esculturas
                  </div>
                </div>

                <div className="pills">
                  {[
                    "Acesso Imediato",
                    "Plano Vitalício",
                    "Compra Segura",
                    "7 Dias de Garantia",
                  ].map((p, i) => (
                    <div key={i} className="pill">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <div className="marquee">
            <div className="track">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
                <div key={i} className="row">
                  <span>DA POSE AO PROFISSIONAL.</span>
                  <svg
                    className="star"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2v20M17 6l-10 12M22 12H2M6 6l12 12" />
                  </svg>
                </div>
              ))}
            </div>
          </div>

          <section className="problem">
            <div className="w">
              <div className="problem-box">
                <h2 className="hs rv d1">
                  Você já passou
                  <br />
                  <span className="it">por isso?</span>
                </h2>

                <div className="problem-list">
                  {[
                    {
                      t: "Bloca em T-pose, modela tudo…",
                      p: "E na hora de posar, a anatomia desmonta. A silhueta perde força e tudo desanda.",
                    },
                    {
                      t: "Horas refazendo o que já estava pronto",
                      p: "Você mexe aqui, ajusta ali e quando percebe está refazendo o projeto inteiro.",
                    },
                    {
                      t: 'A peça fica "ok", mas nunca profissional',
                      p: "Você sente que sabe modelar, mas ainda não constrói aquele impacto dos grandes.",
                    },
                  ].map((item, i) => (
                    <div key={i} className={`problem-item rv d${(i % 3) + 1}`}>
                      <div className="problem-num">0{i + 1}</div>
                      <div className="problem-txt">
                        <div
                          style={{
                            fontWeight: 700,
                            color: "var(--ink)",
                            marginBottom: "4px",
                            fontSize: "17px",
                          }}
                        >
                          {item.t}
                        </div>
                        <div>{item.p}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  className="rv d3"
                  style={{ marginTop: "48px", textAlign: "center" }}
                >
                  <div
                    style={{
                      fontSize: "20px",
                      fontWeight: 700,
                      color: "var(--ink)",
                      marginBottom: "24px",
                    }}
                  >
                    O problema não é sua habilidade. É o seu PROCESSO.
                  </div>
                  <p
                    style={{
                      color: "var(--muted)",
                      fontSize: "15px",
                      fontWeight: 500,
                    }}
                  >
                    Mais de 800 modeladores já romperam esse ciclo. Veja como ↓
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="method" id="tdp-method">
            <div className="w">
              <h2 className="hs rv d1">
                APRESENTANDO O MÉTODO
                <br />
                <span className="it">3D NA POSE</span>
              </h2>
              <div
                className="lede rv d2"
                style={{ marginBottom: "48px", maxWidth: "800px" }}
              >
                O processo que eu uso pra entregar colecionáveis para
                <br />
                Rafa Grassetti, Red Sparrow e Flesh of Gods.
              </div>

              <div className="pillars">
                {[
                  {
                    n: "Modelar direto na pose",
                    c: "Sem T-pose. Começa pelo gesto e constrói volumes com intenção desde o primeiro stroke.",
                    i: (
                      <path
                        d="M12 4s-4 4-2 8 4 4 2 8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    ),
                  },
                  {
                    n: "Anatomia aplicada",
                    c: "Landmarks, compressão e estiramento na pose final, músculo natural, nunca de borracha.",
                    i: (
                      <>
                        <circle
                          cx="12"
                          cy="12"
                          r="5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <path
                          d="M12 2v5M12 17v5M5 12H2M22 12h-5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </>
                    ),
                  },
                  {
                    n: "Composição narrativa",
                    c: "Base que conta história, leitura clara em 360° e ponto focal definido.",
                    i: (
                      <>
                        <rect
                          x="3"
                          y="14"
                          width="18"
                          height="8"
                          rx="2"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <path
                          d="M7 14V6l10 4v4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </>
                    ),
                  },
                ].map((p, i) => (
                  <div key={i} className={`pillar rv d${i + 1}`}>
                    <div className="pillar-icon">
                      <svg viewBox="0 0 24 24">{p.i}</svg>
                    </div>
                    <div className="pillar-name">
                      <span
                        style={{ fontSize: "18px", color: "var(--copperHi)" }}
                      >
                        Pilar 0{i + 1}
                      </span>
                      <br />
                      {p.n}
                    </div>
                    <div className="pillar-desc">{p.c}</div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: "48px", textAlign: "center" }} className="rv">
                <a href="#tdp-oferta" className="btn" id="tdp-method-cta">
                  QUERO COMEÇAR AGORA <span className="arrow">→</span>
                </a>
              </div>
            </div>
          </section>

          <section className="modules" id="tdp-modules">
            <div className="w">
              <h2 className="hs rv d1">
                O QUE VOCÊ
                <br />
                <span className="it">VAI DOMINAR</span>
              </h2>
              <div className="lede rv d1" style={{ marginBottom: "48px" }}>
                6 módulos práticos do gesto inicial ao STL pronto pra impressão
                e render no Unreal Engine 5.
              </div>

              <div className="mod-list">
                {mods.map((m, i) => (
                  <div key={i} className={`mod-item rv d${(i % 3) + 1}`}>
                    <div className="mod-header">
                      <div className="mod-num">{m.n}</div>
                      <div className="mod-titles">
                        <span className="mod-label">MÓDULO {m.n}</span>
                        <div className="mod-title">{m.t}</div>
                        <div className="mod-sub">{m.sub}</div>
                      </div>
                    </div>
                    <div className="mod-body">
                      <div className="mod-body-inner">
                        <div className="mod-img-wrap">
                          <img src={m.img} alt={m.t} draggable="false" />
                        </div>
                        <div className="mod-content-right">
                          <div className="mod-desc">{m.d}</div>
                          <ul className="mod-topics">
                            {m.topics?.map((topic, tid) => (
                              <li key={tid}>
                                <svg
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="3"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                {topic}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="social-proof" id="tdp-social">
            <div className="w">
              <h2 className="hs rv d1" style={{ marginBottom: "24px" }}>
                Quem já fez,
                <br />
                <span className="it">fala por si</span>
              </h2>
              <div
                className="lede rv d2"
                style={{ maxWidth: "800px", marginBottom: "48px" }}
              >
                Conheça histórias reais de alunos que transformaram suas vidas
                com o conhecimento que adquiriram aqui.
              </div>

              <div
                className="test-track-wrap rv d3"
                ref={testCarousel.trackRef}
                style={{
                  cursor: testCarousel.isDragging ? "grabbing" : "grab",
                }}
                {...testCarousel.handlers}
              >
                <div className="test-track">
                  {[
                    ...testimonials,
                    ...testimonials,
                    ...testimonials,
                    ...testimonials,
                  ].map((t, i) => (
                    <div key={i} className="test-card">
                      <a
                        href={t.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="test-user"
                        id={`test-user-${i}`}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        <div className="test-avatar">
                          <img src={t.avatar} alt={t.name} draggable="false" />
                        </div>
                        <div>
                          <div className="test-name">{t.name}</div>
                          <div className="test-handle">{t.handle}</div>
                        </div>
                      </a>
                      <div
                        className="test-text"
                        style={{ whiteSpace: "pre-line" }}
                      >
                        "{t.text}"
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bna-wrap">
                <h2 className="hs rv d1" style={{ marginBottom: "24px" }}>
                  EVOLUÇÃO REAL,
                  <br />
                  <span className="it">NÃO PROMESSA</span>
                </h2>
                <div
                  className="lede rv d2"
                  style={{ maxWidth: "800px", marginBottom: "48px" }}
                >
                  A evolução não é teoria, é resultado. Alunos que começaram do
                  zero, destravaram a técnica e hoje entregam com qualidade de
                  estúdio.
                </div>

                <div
                  className="bna-carousel-wrap rv d1"
                  ref={bnaCarousel.trackRef}
                  style={{
                    cursor: bnaCarousel.isDragging ? "grabbing" : "grab",
                  }}
                  {...bnaCarousel.handlers}
                >
                  <div className="bna-carousel">
                    {[...bnaList, ...bnaList, ...bnaList, ...bnaList].map(
                      (item, i) => (
                        <div key={i} className="bna-card">
                          <a
                            href={item.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bna-card-user"
                            id={`bna-user-${i}`}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                          >
                            <img
                              src={item.avatar}
                              alt={item.user}
                              draggable="false"
                            />
                            <span>{item.user}</span>
                          </a>
                          <div className="bna-card-imgs">
                            <div className="bna-img-col">
                              <img
                                src={item.imgBefore}
                                alt="Antes"
                                draggable="false"
                              />
                              <div
                                className="bna-tag"
                                style={{
                                  background: "rgba(255,255,255,0.1)",
                                  color: "#fff",
                                }}
                              >
                                Antes
                              </div>
                            </div>
                            <div className="bna-img-col">
                              <img
                                src={item.imgAfter}
                                alt="Depois"
                                draggable="false"
                              />
                              <div
                                className="bna-tag"
                                style={{
                                  background: "var(--copper)",
                                  color: "#000",
                                }}
                              >
                                Depois
                              </div>
                            </div>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>

              <div
                className="rv d3"
                style={{ textAlign: "center", marginTop: "64px" }}
              >
                <a
                  href="#tdp-oferta"
                  className="btn"
                  id="tdp-social-proof-cta"
                  style={{
                    backgroundColor: "#fff",
                    color: "#000",
                    fontWeight: "bold",
                    background: "#fff",
                    boxShadow: "0 0 40px rgba(232,102,42,0.6)",
                  }}
                >
                  QUERO ESSE RESULTADO TAMBÉM
                </a>
              </div>
            </div>
          </section>

          <section className="about" id="tdp-about">
            <div className="w">
              <h2 className="hs rv d1" style={{ marginBottom: "48px" }}>
                Vinícius
                <br />
                <span className="it">Cardoso</span>
              </h2>

              <div className="about-grid">
                <div className="rv">
                  <div className="about-fig">
                    <img
                      src="https://3dnapose.com/wp-content/uploads/2025/11/fotinha-do-vini-2.png"
                      alt="Vinícius Cardoso"
                    />
                    <div className="about-badge">
                      Modelador 3D • Fundador Polymind Studio
                    </div>
                  </div>
                </div>

                <div className="about-bio rv d1">
                  <p className="lead">
                    "Tenho mais de 8 anos no mercado e, há 3+, desenvolvo
                    colecionáveis pela Polymind Studio."
                  </p>
                  <p>
                    "Criei o método 3D na Pose porque eu não aguentava mais
                    começar em pose neutra, refazer o projeto várias vezes e
                    sentir que a peça nunca atingia o potencial. Hoje ensino o
                    processo que uso no dia a dia: começar pelo gesto, aplicar
                    anatomia direto na pose e compor bases com leitura, sem
                    retrabalho."
                  </p>
                  <div className="about-collab">
                    Colaborações: Rafa Grassetti · Red Sparrow Collectibles ·
                    Flesh of Gods · One Page Rules
                  </div>
                  <div className="about-stats" style={{ marginTop: "32px" }}>
                    <div>
                      <div className="stat-num">+8</div>
                      <div className="stat-txt">anos de mercado</div>
                    </div>
                    <div>
                      <div className="stat-num">+100</div>
                      <div className="stat-txt">peças entregues</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="port-wrap rv d2">
              <div className="port-track">
                {portImgs.concat(portImgs).map((img, i) => (
                  <div
                    key={i}
                    className="port-item"
                    onClick={() => setLbImg(img)}
                  >
                    <img src={img} alt={`Portfolio ${i}`} loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="compare">
            <div className="w">
              <h2 className="hs rv d1" style={{ marginBottom: "48px" }}>
                DOIS CAMINHOS.
                <br />
                <span className="it">UM RESULTADO.</span>
              </h2>

              <div className="comp-grid rv d2">
                <div className="comp-col left">
                  <div className="comp-label l-red">O CAMINHO LONGO</div>
                  <ul className="comp-list">
                    {[
                      "Assinar plataformas mensais infinitas",
                      "Comprar cursos isolados e juntar tudo sozinho",
                      "Aprender pedaços sem ver o todo",
                      "Travar na hora de aplicar",
                      "Anos de tentativa e erro",
                    ].map((item, i) => (
                      <li key={i} className="comp-list-item bad">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="comp-col right">
                  <div className="comp-label l-green">COM O 3D NA POSE</div>
                  <ul className="comp-list">
                    {[
                      "Processo completo do gesto ao STL final",
                      "Tudo num só método, na ordem certa",
                      "Aplicação prática desde o primeiro módulo",
                      "Personagem completo entregue em cada bloco",
                      "Acesso vitalício + comunidade no Discord",
                    ].map((item, i) => (
                      <li key={i} className="comp-list-item good">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="offer" id="tdp-oferta">
            <div className="w">
              <h2 className="hs rv d1" style={{ marginBottom: "64px" }}>
                TUDO QUE VOCÊ
                <br />
                <span className="it">RECEBE HOJE</span>
              </h2>

              <div className="offer-card rv d2">
                <div className="offer-ribbon">Oferta Especial</div>

                <div className="offer-head">
                  <img
                    src="https://3dnapose.com/wp-content/uploads/2025/04/logo-3DNaPose.png"
                    alt="3D NA POSE"
                    className="offer-logo"
                  />
                  <h3>OFERTA ESPECIAL</h3>
                  <p>Método completo · ZBrush + Unreal Engine 5 + Photoshop</p>
                </div>

                <div className="offer-body">
                  <div className="offer-price">
                    <div className="price-inv">Investimento</div>
                    <div className="price-12x">12x de</div>
                    <div className="price-val">
                      <span className="currency">R$</span>
                      <span className="amount">83,09</span>
                    </div>
                    <div className="price-sj">sem juros</div>
                    <div className="price-div" />
                    <div className="price-full">
                      ou à vista{" "}
                      <strong style={{ color: "var(--ink)" }}>R$ 997</strong>
                    </div>

                    <a
                      href="https://pay.hotmart.com/P96903534R?checkoutMode=10"
                      id="tdp-checkout-cta"
                      target="_blank"
                      rel="noreferrer"
                      className="btn offer-btn"
                    >
                      QUERO COMEÇAR AGORA <span className="arrow">→</span>
                    </a>
                  </div>

                  <div className="offer-feats">
                    <div className="feats-title">O que você recebe</div>
                    <ul className="feats-list">
                      {[
                        "Curso completo: 6 módulos do gesto ao render final",
                        "Aulas extras de anatomia aplicada",
                        "Novo personagem a cada 4 meses (vitalício)",
                        "Comunidade no Discord + lives mensais",
                        "Processos completos gravados em tempo real",
                        "Brushes e Alphas exclusivos do Cardoso",
                        "Acesso vitalício + atualizações futuras",
                      ].map((t, i) => (
                        <li key={i}>
                          <span className="num">0{i + 1}</span>
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="gua" id="garantia">
            <div className="w">
              <div className="gua-grid">
                <div className="left rv">
                  <div className="gua-medal">
                    <svg viewBox="0 0 400 400">
                      <defs>
                        <path
                          id="tdp-c"
                          d="M 200,200 m -160,0 a 160,160 0 1,1 320,0 a 160,160 0 1,1 -320,0"
                        />
                      </defs>
                      <circle
                        cx="200"
                        cy="200"
                        r="190"
                        fill="none"
                        stroke="#fff"
                        strokeOpacity="0.1"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                      />
                      <circle
                        cx="200"
                        cy="200"
                        r="160"
                        fill="none"
                        stroke="transparent"
                        strokeWidth="0"
                      />
                      <text
                        fill="#fff"
                        opacity="0.8"
                        fontSize="20"
                        letterSpacing="6"
                        fontFamily="Inter,sans-serif"
                        fontWeight="700"
                      >
                        <textPath href="#tdp-c" startOffset="0">
                          GARANTIA · 7 DIAS · GARANTIA · 7 DIAS · GARANTIA · 7
                          DIAS · GARANTIA · 7 DIAS · GARANTIA · 7 DIAS ·
                          GARANTIA · 7 DIAS ·{" "}
                        </textPath>
                      </text>
                    </svg>
                    <div className="inner">
                      <div className="ey-top">GARANTIA</div>
                      <div className="num">7</div>
                      <div className="ey-bot">DIAS</div>
                    </div>
                  </div>
                </div>
                <div className="right rv d1">
                  <div className="gua-right-ey">SEM RISCO.</div>
                  <h2 className="gua-right-hd">
                    <span className="grad">7 dias</span>
                    <br />
                    pra você decidir
                  </h2>
                  <ul className="gua-list">
                    <li>
                      <div className="dot" />
                      Reembolso integral em qualquer momento dentro dos 7
                      primeiros dias.
                    </li>
                    <li>
                      <div className="dot" />
                      Sem perguntas, sem formulário extenso, sem dor de cabeça.
                    </li>
                  </ul>
                  <a href="#tdp-oferta" className="gua-btn" id="tdp-garantia-cta">
                    Quero entrar sem risco →
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className="faq">
            <div className="w">
              <img
                src="https://3dnapose.com/wp-content/uploads/2025/11/faq.png"
                alt="FAQ"
                className="rv"
                style={{
                  display: "block",
                  marginBottom: "24px",
                  maxWidth: "140px",
                  opacity: 0.8,
                }}
              />
              <h2 className="hs rv d1" style={{ marginBottom: "48px" }}>
                Perguntas
                <br />
                <span className="it">frequentes</span>
              </h2>

              <div className="faq-container rv d2">
                {[
                  {
                    q: "Sou iniciante no ZBrush. Serve pra mim?",
                    a: "Sim, desde que você saiba o básico do software: navegar na viewport, mover/rotacionar/escala, selecionar brushes e salvar arquivos. O foco do curso é gesto + composição + anatomia na pose aplicados a colecionáveis.",
                  },
                  {
                    q: "Não tenho muito tempo.",
                    a: "As aulas são curtas e objetivas. Dá pra estudar em blocos de 30–45 min. Acesso vitalício: você volta quando quiser. O método corta retrabalho, então você ganha tempo nas próximas peças.",
                  },
                  {
                    q: "Vou aprender anatomia?",
                    a: "Você aprende anatomia aplicada na pose: landmarks ósseos guiando direção de fibras, compressão/estiramento e transições limpas. Sem teoria infinita — é o que funciona no colecionável, com 2 personagens completos do zero ao final.",
                  },
                  {
                    q: "Preciso saber preparar para impressão?",
                    a: "Não precisa saber antes. Eu mostro a pipeline de preparação e checklists pra organizar o arquivo pra impressão. E você ainda conta com a comunidade no Discord pra tirar dúvidas.",
                  },
                  {
                    q: "E se eu não gostar?",
                    a: "Tem garantia de 7 dias. Entrou, testou e não fez sentido? Devolvo 100%. Sem burocracia.",
                  },
                  {
                    q: "R$ 997 é caro pra mim.",
                    a: "Pode parcelar em 12x sem juros e o acesso é vitalício. Você recebe 7 módulos, 2 personagens completos, módulo de tecido, brushes e alphas no Discord. O método reduz horas de retrabalho.",
                  },
                ].map((f, i) => (
                  <div key={i} className={`faq-item ${i === 0 ? "open" : ""}`}>
                    <div className="faq-q">
                      <div className="faq-title">{f.q}</div>
                      <div className="faq-icon">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </div>
                    </div>
                    <div className="faq-a">{f.a}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="final">
            <div className="w">
              <h2 className="hs rv d1">
                Pronto pra evoluir
                <br />
                <span className="it">no 3D de verdade?</span>
              </h2>
              <div className="lede rv d2">
                Volte e garanta sua vaga agora, antes da próxima atualização de
                preço.
              </div>
              <div className="rv d3" style={{ marginTop: "48px" }}>
                <a href="#tdp-oferta" className="btn" id="tdp-final-cta">
                  GARANTIR MINHA VAGA AGORA <span className="arrow">→</span>
                </a>
              </div>
            </div>
          </section>

          <footer
            className="rv"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "40px",
              padding: "96px 24px 64px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <a
                href="#tdp-home"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <img
                  src="https://3dnapose.com/wp-content/uploads/2025/04/logo-3DNaPose.png"
                  alt="3D NA POSE"
                  style={{ height: "48px" }}
                />
              </a>
              <p
                style={{
                  fontFamily: "var(--n)",
                  fontSize: "9px",
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  color: "rgba(255,255,255,0.4)",
                  margin: 0,
                  fontWeight: 700,
                }}
              >
                Escultura Digital & Impressão 3D
              </p>
            </div>

            <div
              className="foot-social"
              style={{
                marginBottom: 0,
                marginTop: 0,
                display: "flex",
                gap: "24px",
              }}
            >
              <a
                href="https://www.instagram.com/cardoso.3d/"
                id="tdp-footer-social-instagram"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.02)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ width: "20px", height: "20px" }}
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@Cardoso.3d"
                id="tdp-footer-social-youtube"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.02)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ width: "20px", height: "20px" }}
                >
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                </svg>
              </a>
              <a
                href="https://www.twitch.tv/cardoso_3d"
                id="tdp-footer-social-twitch"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitch"
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.02)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ width: "20px", height: "20px" }}
                >
                  <path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/vinicius-cardoso-3370631b7/"
                id="tdp-footer-social-linkedin"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.02)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ width: "20px", height: "20px" }}
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a
                href="https://www.artstation.com/viniciusnunes"
                id="tdp-footer-social-artstation"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ArtStation"
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.02)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ width: "20px", height: "20px" }}
                >
                  <circle cx="13.5" cy="13.5" r="8.5" />
                  <path d="M7 10L5 6L2 11" />
                  <path d="M8 21L10 17" />
                  <path d="M19 10L21 6L23 11" />
                </svg>
              </a>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
                borderTop: "1px solid rgba(255,255,255,0.05)",
                width: "100%",
                maxWidth: "384px",
                paddingTop: "32px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "24px",
                  fontFamily: "var(--n)",
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  fontWeight: 600,
                }}
              >
                <a
                  href="#"
                  id="tdp-footer-terms"
                  style={{
                    color: "rgba(255,255,255,0.6)",
                    textDecoration: "none",
                  }}
                >
                  Termos
                </a>
                <a
                  href="#"
                  id="tdp-footer-privacy"
                  style={{
                    color: "rgba(255,255,255,0.6)",
                    textDecoration: "none",
                  }}
                >
                  Privacidade
                </a>
              </div>
              <div
                className="foot-copy"
                style={{
                  marginTop: "8px",
                  opacity: 0.4,
                  fontSize: "11px",
                  fontFamily: "var(--n)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  fontWeight: 600,
                }}
              >
                &copy; {new Date().getFullYear()} Cardoso3D Studio
              </div>
            </div>
          </footer>
        </main>

        {/* Lightbox */}
        <div
          className={`lightbox ${lbImg ? "active" : ""}`}
          onClick={() => setLbImg(null)}
        >
          <button
            className="lb-close"
            onClick={() => setLbImg(null)}
            aria-label="Fechar"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          {lbImg && (
            <img
              src={lbImg}
              alt="Portfolio Ampliado"
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
      </div>
    </>
  );
}
