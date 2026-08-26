import React, { useEffect, useState, useRef } from 'react'
import { Play, Pause, Volume2, VolumeX, Volume1, ChevronDown, X } from 'lucide-react'

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700;800&display=swap');

  #zdz{--bg:#0a0612;--bg2:#140820;--ink:#f5efff;--muted:#bcaecc;--muted2:#7d6f8e;--purple:#8b5cf6;--purpleHi:#b794f6;--magenta:#e633a8;--green:#22c55e;--red:#ef4444;--border:rgba(245,239,255,0.09);--d:'Anton',sans-serif;--s:'Anton',sans-serif;--n:'Inter',system-ui,sans-serif;font-family:var(--n);-webkit-font-smoothing:antialiased;background:var(--bg);color:var(--ink);margin:0;padding:0;min-height:100vh;position:relative;}
  #zdz *{box-sizing:border-box;word-wrap:break-word;overflow-wrap:break-word;}
  #zdz a{color:inherit;text-decoration:none;}
  #zdz .hd,#zdz .hs,#zdz .cyber-hs,#zdz h1,#zdz h2,#zdz h3,#zdz h4{word-wrap:break-word;overflow-wrap:break-word;word-break:keep-all;}
  #zdz::before{content:"";position:fixed;inset:0;pointer-events:none;z-index:0;background:radial-gradient(900px 600px at 80% -10%,rgba(139,92,246,0.18),transparent 60%),radial-gradient(700px 500px at -10% 30%,rgba(58,15,87,0.45),transparent 65%),radial-gradient(600px 400px at 50% 110%,rgba(230,51,168,0.12),transparent 70%),linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);background-size: 100% 100%, 100% 100%, 100% 100%, 48px 48px, 48px 48px;}
  #zdz main{position:relative;z-index:1;}
  #zdz .w{max-width:1080px;margin:0 auto;padding:0 56px;position:relative;}
  #zdz .nav{display:flex;justify-content:space-between;align-items:center;padding:24px 56px;position:relative;z-index:10;}
  #zdz .nav-links{display:none;}
  @media(min-width:901px){
    #zdz .nav-links{display:flex;align-items:center;gap:4px;padding:6px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);border-radius:99px;}
    #zdz .nav-links a{padding:10px 20px;font-family:var(--n);font-size:12px;font-weight:700;letter-spacing:0.1em;color:var(--muted);text-transform:uppercase;text-decoration:none;transition:color .2s;border-radius:99px;}
    #zdz .nav-links a:not(.highlight):hover{color:#fff;}
    #zdz .nav-links a.highlight{background:linear-gradient(135deg,var(--purple),var(--magenta));color:#fff;}
  }
  #zdz .nav-login{display:inline-flex;align-items:center;padding:12px 28px;border-radius:99px;font-family:var(--n);font-size:12px;font-weight:700;letter-spacing:0.1em;color:#fff;text-transform:uppercase;text-decoration:none;background:linear-gradient(135deg,var(--purple),var(--magenta));transition:transform .15s ease,box-shadow .15s ease;}
  #zdz .nav-login:hover{transform:translateY(-2px);box-shadow:0 12px 30px -10px rgba(230,51,168,0.6);}
  #zdz .logo{display:inline-block;text-align:center;line-height:1;}
  #zdz .logo svg{display:block;}
  #zdz .btn{display:inline-flex;align-items:center;gap:10px;padding:18px 30px;border-radius:99px;font-family:var(--n);font-weight:700;font-size:13px;letter-spacing:0.12em;text-transform:uppercase;cursor:pointer;border:none;background:linear-gradient(135deg,var(--purple),var(--magenta));color:#fff;box-shadow:0 18px 40px -10px rgba(230,51,168,0.45),inset 0 0 0 1px rgba(255,255,255,0.1);transition:transform .15s ease,box-shadow .15s ease;}
  #zdz .btn:hover{transform:translateY(-2px);box-shadow:0 22px 50px -10px rgba(230,51,168,0.6);}
  #zdz .btn .arrow{transition:transform .15s ease;display:inline-block;}
  #zdz .btn:hover .arrow{transform:translateX(4px);}
  #zdz section{padding:80px 0;}
  #zdz .ey{font-family:var(--n);font-size:11px;letter-spacing:0.28em;color:var(--purpleHi);text-transform:uppercase;margin:0 0 18px;font-weight:600;}
  #zdz .hd, #zdz .hs, #zdz .cyber-hs{font-family:var(--n);font-weight:800;font-size:64px;line-height:1;letter-spacing:-0.02em;text-transform:uppercase;margin:0 0 16px;color:#fff;}
  #zdz .hd .it, #zdz .hs .it, #zdz .cyber-hs .grad{background:linear-gradient(90deg,#e633a8 0%,#a855f7 50%,#00e5ff 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;display:inline-block;font-style:normal;}
  #zdz .lede{font-family:var(--n);font-size:18px;color:var(--muted);line-height:1.45;margin:0;}

  #zdz .cyber-heading{text-align:center;margin-bottom:56px;}
  #zdz .cyber-ey{display:flex;align-items:center;justify-content:center;gap:16px;font-family:var(--n);font-size:13px;font-weight:700;color:#00e5ff;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:16px;}
  #zdz .cyber-ey::before, #zdz .cyber-ey::after{content:"";height:1px;background:#00e5ff;flex:1;opacity:0.5;}

  #zdz .hero{padding:48px 0 96px;text-align:center;position:relative;overflow:hidden;}
  #zdz .hero .hd{font-size:64px;}
  #zdz .hero p.sub{font-family:var(--n);font-size:17px;color:var(--muted);max-width:560px;margin:24px auto 32px;line-height:1.5;}
  #zdz .hero .micro{font-family:var(--n);font-size:11px;color:var(--muted2);letter-spacing:0.22em;text-transform:uppercase;margin-top:18px;}
  #zdz .aurora{position:absolute;inset:0;pointer-events:none;overflow:hidden;}
  #zdz .aurora .orb{position:absolute;border-radius:50%;filter:blur(80px);}
  #zdz .aurora .o1{width:600px;height:400px;background:radial-gradient(circle,rgba(139,92,246,0.22) 0%,transparent 70%);top:-100px;left:50%;animation:zdzO1 6s ease-in-out infinite;}
  #zdz .aurora .o2{width:400px;height:300px;background:radial-gradient(circle,rgba(230,51,168,0.15) 0%,transparent 70%);top:40%;right:-80px;animation:zdzO2 7s ease-in-out infinite;}
  #zdz .aurora .o3{width:350px;height:250px;background:radial-gradient(circle,rgba(100,20,180,0.2) 0%,transparent 70%);bottom:-60px;left:-40px;animation:zdzO3 8s ease-in-out infinite;}
  @keyframes zdzO1{0%,100%{opacity:.7;transform:translateX(-50%) scale(1);}50%{opacity:1;transform:translateX(-50%) scale(1.1);}}
  @keyframes zdzO2{0%,100%{opacity:.5;transform:scale(1);}50%{opacity:.9;transform:scale(1.15);}}
  @keyframes zdzO3{0%,100%{opacity:.6;transform:scale(1);}50%{opacity:1;transform:scale(1.08);}}
  #zdz .hero-img{margin:64px auto 0;max-width:720px;border:1px solid var(--border);border-radius:16px;background:linear-gradient(135deg,#1a0626,#0e0014 60%,#2a0d3d);position:relative;overflow:hidden;box-shadow:0 30px 80px -20px rgba(139,92,246,0.25);}
  #zdz .hero-img::before{content:"";position:absolute;inset:0;background:radial-gradient(60% 50% at 30% 35%,rgba(255,255,255,0.18),transparent 60%),radial-gradient(50% 50% at 75% 65%,rgba(230,51,168,0.22),transparent 70%);z-index:1;pointer-events:none;}
  #zdz .hero-img .bust{display:block;width:100%;height:auto;opacity:.95;position:relative;z-index:0;}
  #zdz .hero-img .tag{position:absolute;left:18px;top:18px;font-family:var(--n);font-size:10px;color:#fff;letter-spacing:0.22em;opacity:.75;z-index:2;}
  #zdz .hero-img .tag.r{left:auto;right:18px;}

  #zdz .avatars{display:flex;align-items:center;justify-content:center;gap:16px;margin:24px auto 0;font-family:var(--n);font-size:13px;color:var(--muted);text-align:left;}
  #zdz .avs{display:flex;}
  #zdz .av{width:40px;height:40px;border-radius:50%;border:2px solid var(--bg);background:#2a0d3d;margin-left:-12px;background-size:cover;}
  #zdz .av:first-child{margin-left:0;background-image:url(https://i.pravatar.cc/100?img=68);}
  #zdz .av-txt{display:flex;flex-direction:column;justify-content:center;}

  #zdz .marquee{padding:24px 0;border-top:1px solid rgba(255,255,255,0.05);border-bottom:1px solid rgba(255,255,255,0.05);overflow:hidden;background:rgba(255,255,255,0.02);}
  #zdz .marquee .track{display:flex;width:max-content;animation:zdzMq 28s linear infinite;}
  #zdz .marquee:hover .track{animation-play-state:paused;}
  #zdz .marquee .row{display:flex;align-items:center;gap:48px;font-family:var(--n);font-weight:800;font-size:22px;letter-spacing:0.1em;text-transform:uppercase;white-space:nowrap;color:#fff;padding-right:48px;}
  #zdz .marquee .row .cyan{color:#00e5ff;}
  #zdz .marquee .row .dot{color:#e633a8;font-size:16px;}
  @keyframes zdzMq{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}

  #zdz .pain-cards{display:grid;grid-template-columns:1fr 1fr;gap:24px;max-width:960px;margin:0 auto;}
  #zdz .pain-card{background:linear-gradient(145deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01));border:1px solid rgba(255,255,255,0.05);border-radius:16px;padding:32px;display:flex;align-items:center;gap:24px;position:relative;overflow:hidden;}
  #zdz .pain-card::before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 80% 50%,rgba(230,51,168,0.15),transparent 60%);opacity:0.3;transition:opacity .4s;}
  #zdz .pain-card:nth-child(even)::before{background:radial-gradient(circle at 80% 50%,rgba(0,229,255,0.12),transparent 60%);opacity:0.3;}
  #zdz .pain-card:hover::before{opacity:0.8;}
  #zdz .pain-icon-wrapper{width:64px;height:64px;border-radius:16px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#fff;}
  #zdz .pain-card:nth-child(even) .pain-icon-wrapper{border-color:rgba(0,229,255,0.3);box-shadow:inset 0 0 20px rgba(0,229,255,0.15);}
  #zdz .pain-card:nth-child(odd) .pain-icon-wrapper{border-color:rgba(230,51,168,0.3);box-shadow:inset 0 0 20px rgba(230,51,168,0.15);}
  #zdz .pain-content{display:flex;flex-direction:column;gap:8px;}
  #zdz .pain-num-styled{font-family:var(--n);font-size:12px;font-weight:700;letter-spacing:0.1em;color:#e633a8;}
  #zdz .pain-card:nth-child(even) .pain-num-styled{color:#00e5ff;}
  #zdz .pain-txt-styled{font-family:var(--n);font-size:16px;color:#d1d5db;line-height:1.5;font-weight:500;}

  #zdz .process-flow{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;border:none;max-width:1080px;margin:48px auto 0;}
  #zdz .process-step{padding:28px 24px;text-align:left;border:1px solid rgba(255,255,255,0.08);border-radius:24px;background:linear-gradient(145deg, rgba(20,8,32,0.8), rgba(0,0,0,0.4));position:relative;display:flex;flex-direction:column;min-height:300px;transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1);box-shadow:inset 0 1px 0 rgba(255,255,255,0.05),0 12px 32px -12px rgba(0,0,0,0.8);}
  #zdz .process-step:hover{border-color:var(--accent);transform:translateY(-4px);box-shadow:inset 0 1px 0 rgba(255,255,255,0.1),0 16px 40px -12px var(--accent),0 8px 16px -8px rgba(0,0,0,0.5);}
  #zdz .step-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:32px;}
  #zdz .step-ey{font-family:monospace;font-size:12px;letter-spacing:0.2em;margin:0;color:var(--accent);font-weight:700;}
  #zdz .step-dot{width:10px;height:10px;border-radius:50%;background:var(--accent);box-shadow:0 0 16px var(--accent), 0 0 8px var(--accent);}
  #zdz .step-icon{width:80px;height:80px;border-radius:24px;background:var(--grad);border:none;margin:auto auto 40px auto;display:flex;align-items:center;justify-content:center;color:#fff;box-shadow:0 12px 40px -12px var(--accent);}
  #zdz .step-icon svg{width:36px;height:36px;}
  #zdz .step-title{font-family:var(--n);font-size:20px;letter-spacing:-0.01em;line-height:1.2;font-weight:800;margin-top:auto;}
  #zdz .step-arrow{position:absolute;right:-18px;top:50%;transform:translateY(-50%);width: 24px; height: 24px; border-radius: 50%; background: #0a0612; display:flex; align-items:center; justify-content:center; color:var(--accent); font-size:14px; z-index:2; border: 1px solid rgba(255,255,255,0.1); font-weight:800; font-family:monospace;}
  #zdz .process-feats{display:flex;justify-content:center;gap:24px;max-width:1080px;margin:28px auto 0;border:none;}
  #zdz .process-feat{padding:20px 24px;border:1px solid rgba(255,255,255,0.08);border-radius:20px;background:linear-gradient(145deg, rgba(20,8,32,0.8), rgba(0,0,0,0.4));display:flex;align-items:center;gap:16px;box-shadow:inset 0 1px 0 rgba(255,255,255,0.05),0 8px 24px -12px rgba(0,0,0,0.8);flex:1;max-width:340px;}
  #zdz .feat-icon{width:48px;height:48px;border-radius:14px;background:var(--grad);display:flex;align-items:center;justify-content:center;color:#fff;flex-shrink:0;box-shadow:0 8px 24px -8px var(--grad);}
  #zdz .feat-icon svg{width:22px;height:22px;color:#fff!important;}
  #zdz .process-feat span{font-family:var(--n);font-size:15px;color:#d1d5db;font-weight:600;line-height:1.4;}

  #zdz .video-head{display:grid;grid-template-columns:0.4fr 1.6fr;gap:48px;align-items:end;margin-bottom:48px;}
  #zdz .video-frame{position:relative;aspect-ratio:16/9;border:1px solid var(--border);overflow:hidden;background:var(--bg2);}
  #zdz .video-frame::before{content:"";position:absolute;inset:0;background:linear-gradient(135deg,#1a0626,#0e0014 60%,#2a0d3d);}
  #zdz .video-frame::after{content:"";position:absolute;inset:0;background:radial-gradient(closest-side,transparent,rgba(10,6,18,0.7));}
  #zdz .video-frame .play{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;z-index:2;}
  #zdz .play-circle{width:96px;height:96px;border-radius:99px;background:linear-gradient(135deg,var(--purple),var(--magenta));display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 14px rgba(230,51,168,0.12),0 0 60px var(--magenta);cursor:pointer;transition:transform .2s,box-shadow .2s;}
  #zdz .play-circle:hover{transform:scale(1.08);box-shadow:0 0 0 20px rgba(230,51,168,0.15),0 0 80px var(--magenta);}
  #zdz .play-circle::after{content:"";width:0;height:0;border-left:24px solid #fff;border-top:14px solid transparent;border-bottom:14px solid transparent;margin-left:6px;}
  #zdz .video-frame .vtag{position:absolute;left:24px;top:24px;font-size:10px;letter-spacing:0.22em;color:#fff;z-index:2;text-transform:uppercase;}
  #zdz .video-frame .vbar{position:absolute;left:24px;right:24px;bottom:20px;display:flex;justify-content:space-between;align-items:center;z-index:2;}
  #zdz .video-frame .vbar .time{font-size:11px;color:#fff;letter-spacing:0.16em;}
  #zdz .video-frame .vbar .prog{flex:1;height:1px;margin:0 24px;background:rgba(255,255,255,0.25);position:relative;}
  #zdz .video-frame .vbar .prog::after{content:"";position:absolute;left:0;top:0;bottom:0;width:var(--progress, 100%);background:#fff;}
  #zdz .video-foot{margin-top:48px;display:flex;flex-direction:column;align-items:center;gap:20px;padding-top:32px;}
  #zdz .video-foot .meta{font-family:var(--n);font-size:11px;color:var(--muted);letter-spacing:0.22em;text-transform:uppercase;}

  #zdz .fit-grid{display:grid;grid-template-columns:1fr 1fr;border-top:1px solid var(--border);border-bottom:1px solid var(--border);}
  #zdz .fit-col{padding:36px;border-right:1px solid var(--border);position:relative;}
  #zdz .fit-col:last-child{border-right:none;}
  #zdz .fit-head{display:flex;align-items:center;gap:14px;margin-bottom:24px;}
  #zdz .fit-head .label{font-family:var(--d);font-size:32px;}
  #zdz .fit-head .label.yes{color:var(--green);}
  #zdz .fit-head .label.no{color:var(--red);}
  #zdz .fit-head .rule{flex:1;height:1px;background:var(--border);}
  #zdz .fit-sub{font-family:var(--n);font-size:18px;color:var(--ink);margin-bottom:18px;font-weight:600;}
  #zdz .fit-list{list-style:none;padding:0;margin:0;}
  #zdz .fit-list li{padding:14px 0;border-top:1px solid var(--border);display:flex;gap:14px;font-size:14px;color:var(--muted);line-height:1.5;font-family:var(--n);}
  #zdz .fit-list li:first-child{border-top:none;}
  #zdz .fit-list .num{font-family:var(--d);font-size:14px;min-width:24px;}
  #zdz .fit-list .num.g{color:var(--green);}
  #zdz .fit-list .num.r{color:var(--red);}
  #zdz .fit-col .ctrl{position:absolute;right:36px;top:36px;color:var(--red);opacity:.7;}

  #zdz .modules-head{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:48px;gap:32px;}
  #zdz .modules-head p{font-family:var(--n);font-size:17px;color:var(--muted);max-width:380px;text-align:right;margin:0;line-height:1.5;}
  #zdz .modules-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;align-items:start;}
  #zdz .module-card{position:relative;border:1px solid var(--border);border-radius:16px;background:rgba(255,255,255,0.015);overflow:hidden;cursor:pointer;transition:border-color .3s, box-shadow .3s, transform .2s, background .3s;user-select:none;}
  #zdz .module-card:hover{border-color:rgba(183,148,246,0.35);box-shadow:0 12px 30px -10px rgba(139,92,246,0.25);transform:translateY(-2px);}
  #zdz .module-card.open{border-color:rgba(183,148,246,0.5);background:rgba(139,92,246,0.03);box-shadow:0 16px 40px -10px rgba(139,92,246,0.3);}
  #zdz .module-art{position:relative;aspect-ratio:16/9;overflow:hidden;background:var(--bg2);}
  #zdz .module-art img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .4s ease;}
  #zdz .module-card:hover .module-art img{transform:scale(1.025);}
  #zdz .module-foot{padding:16px 20px;display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--border);background:rgba(255,255,255,0.01);transition:background .2s;}
  #zdz .module-foot .ch{font-family:var(--n);font-size:15px;color:var(--ink);font-weight:600;}
  #zdz .module-foot .vm{display:flex;align-items:center;gap:8px;font-family:var(--n);font-size:12px;font-weight:600;color:var(--purpleHi);letter-spacing:0.05em;}
  #zdz .module-trigger-icon{width:22px;height:22px;border-radius:50%;border:1px solid rgba(183,148,246,0.35);display:flex;align-items:center;justify-content:center;font-size:13px;line-height:1;color:var(--purpleHi);transition:transform .3s ease, background .3s, border-color .3s, color .3s;flex-shrink:0;}
  #zdz .module-card.open .module-trigger-icon{transform:rotate(45deg);background:rgba(139,92,246,0.25);border-color:var(--purpleHi);color:#fff;}
  #zdz .module-details{max-height:0;opacity:0;overflow:hidden;transition:max-height .35s ease, opacity .3s ease, padding .35s ease;padding:0 20px;background:rgba(0,0,0,0.25);}
  #zdz .module-card.open .module-details{max-height:300px;opacity:1;padding:18px 20px 22px;border-top:1px solid rgba(183,148,246,0.15);}
  #zdz .module-details-title{font-family:var(--n);font-size:15px;font-weight:700;color:var(--purpleHi);margin-bottom:8px;line-height:1.4;}
  #zdz .module-details-desc{font-family:var(--n);font-size:14px;color:var(--muted);line-height:1.6;margin:0;}

  /* About / Instructor */
  #zdz .about { padding: 96px 0; background: var(--bg2); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
  #zdz .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
  #zdz .about-fig { position: relative; aspect-ratio: 4/5; border-radius: 16px; border: 1px solid var(--border); overflow: hidden; background: #140820; box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
  #zdz .about-fig img { width: 100%; height: 100%; object-fit: cover; opacity: 1; display: block; }
  #zdz .about-badge { position: absolute; bottom: 20px; left: 20px; font-family: var(--n); font-size: 11px; font-weight: 700; letter-spacing: 0.15em; color: #fff; background: rgba(10,6,18,0.85); backdrop-filter: blur(8px); padding: 8px 16px; border-radius: 99px; border: 1px solid rgba(255,255,255,0.15); box-shadow: 0 8px 24px rgba(0,0,0,0.4); }
  #zdz .about-stats { margin-top: 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  #zdz .stat-num { font-family: var(--d); font-size: 44px; color: #00e5ff; line-height: 1; letter-spacing: 0.02em; }
  #zdz .stat-txt { font-size: 13px; color: var(--muted); font-weight: 500; margin-top: 4px; font-family: var(--n); }
  #zdz .about-bio { display: flex; flex-direction: column; gap: 20px; }
  #zdz .about-bio p { font-family: var(--n); font-size: 16px; color: var(--muted); line-height: 1.6; margin: 0; }
  #zdz .about-bio p.lead { font-family: var(--n); font-size: 19px; font-style: normal; color: var(--ink); font-weight: 600; line-height: 1.5; }
  #zdz .about-collab { font-family: var(--n); font-size: 12px; font-weight: 600; color: var(--purpleHi); letter-spacing: 0.1em; text-transform: uppercase; padding-top: 20px; border-top: 1px solid var(--border); line-height: 1.5; }
  #zdz .port-wrap { margin-top: 80px; overflow-x: auto; overflow-y: hidden; position: relative; width: 100%; display: flex; scrollbar-width: none; -ms-overflow-style: none; -webkit-overflow-scrolling: touch; cursor: grab; user-select: none; }
  #zdz .port-wrap::-webkit-scrollbar { display: none; }
  #zdz .port-wrap.is-dragging { cursor: grabbing; scroll-behavior: auto; }
  #zdz .port-track { display: flex; gap: 16px; width: max-content; }
  #zdz .port-item { width: 320px; aspect-ratio: 4/5; border-radius: 14px; overflow: hidden; cursor: pointer; position: relative; border: 1px solid var(--border); background: #140820; flex-shrink: 0; user-select: none; }
  #zdz .port-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; display: block; pointer-events: none; -webkit-user-drag: none; }
  #zdz .port-item:hover img { transform: scale(1.05); }

  /* Lightbox */
  #zdz .lightbox { position: fixed; inset: 0; background: rgba(10,6,18,0.96); z-index: 2000; display: flex; align-items: center; justify-content: center; opacity: 0; pointer-events: none; transition: opacity 0.3s ease; backdrop-filter: blur(8px); }
  #zdz .lightbox.active { opacity: 1; pointer-events: auto; }
  #zdz .lightbox img { max-width: 90vw; max-height: 90vh; border-radius: 12px; object-fit: contain; box-shadow: 0 40px 100px rgba(0,0,0,0.8); transform: scale(0.95); transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); border: 1px solid var(--border); }
  #zdz .lightbox.active img { transform: scale(1); }
  #zdz .lb-close { position: absolute; top: 28px; right: 28px; background: rgba(255,255,255,0.08); width: 44px; height: 44px; border-radius: 50%; color: #fff; border: 1px solid rgba(255,255,255,0.15); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.2s, transform 0.2s; }
  #zdz .lb-close:hover { background: rgba(255,255,255,0.2); transform: scale(1.08); }

  #zdz .gua{padding: 80px 0;}
  #zdz .gua-grid{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center;max-width:1040px;margin:0 auto;}
  #zdz .gua-grid .right{text-align:left; display: flex; flex-direction: column; gap: 24px;}
  #zdz .gua-grid .left{display:flex; justify-content:center;}
  #zdz .gua-medal{width:360px;height:360px;position:relative;}
  #zdz .gua-medal svg{width:100%;height:100%;animation:zdzRotate 20s linear infinite;}
  #zdz .gua-medal .inner{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;animation:none;}
  #zdz .gua-medal .num{font-family:var(--d);font-size:120px;line-height:0.8;background:linear-gradient(180deg, #e633a8, #8b5cf6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
  #zdz .gua-medal .ey-top{font-family:var(--n);font-size:14px;letter-spacing:0.2em;color:#00e5ff;font-weight:700;text-transform:uppercase;margin-bottom:8px;}
  #zdz .gua-medal .ey-bot{font-family:var(--n);font-size:14px;letter-spacing:0.3em;color:#fff;font-weight:700;text-transform:uppercase;margin-top:12px;}
  
  #zdz .gua-right-ey{font-family:var(--n);font-size:12px;letter-spacing:0.2em;color:#b794f6;font-weight:700;text-transform:uppercase;}
  #zdz .gua-right-hd{font-family:var(--d);font-size:56px;line-height:1.1;letter-spacing:-0.02em;color:#fff;}
  #zdz .gua-right-hd .grad{background:linear-gradient(90deg, #e633a8, #00e5ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
  
  #zdz .gua-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:16px;}
  #zdz .gua-list li{display:flex;gap:16px;font-size:16px;color:var(--muted);line-height:1.5;font-family:var(--n);}
  #zdz .gua-list .dot{width:6px;height:6px;border-radius:50%;background:#b794f6;flex-shrink:0;margin-top:9px;box-shadow:0 0 10px #b794f6;}
  
  #zdz .gua-btn{display:inline-flex;align-items:center;padding:16px 32px;background:linear-gradient(135deg, #e633a8, #8b5cf6);color:#fff;font-family:var(--n);font-weight:700;font-size:14px;letter-spacing:0.1em;text-transform:uppercase;border-radius:99px;text-decoration:none;transition:transform 0.3s, box-shadow 0.3s;box-shadow:0 0 30px rgba(230,51,168,0.3);width:fit-content;}
  #zdz .gua-btn:hover{transform:translateY(-2px);box-shadow:0 0 40px rgba(230,51,168,0.5);}
  @keyframes zdzRotate{0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}

  #zdz .price-card{position:relative;max-width:960px;margin:0 auto;border:1px solid var(--border);border-radius:16px;background:linear-gradient(180deg,var(--bg2),var(--bg));}
  #zdz .price-ribbon{position:absolute;top:24px;right:-8px;background:linear-gradient(135deg,var(--purple),var(--magenta));color:#fff;padding:8px 16px;font-family:var(--n);font-size:10px;font-weight:800;letter-spacing:0.22em;text-transform:uppercase;}
  #zdz .price-head{padding:40px 32px 24px;border-bottom:1px solid var(--border);text-align:center;}
  #zdz .price-name{margin-top:18px;font-family:var(--d);font-size:38px;font-weight:400;letter-spacing:0.02em;text-transform:uppercase;}
  #zdz .price-name .it{color:var(--purpleHi);letter-spacing:0.02em;}
  #zdz .price-tag{font-family:var(--n);font-size:16px;color:var(--muted);margin-top:6px;font-weight:500;}
  #zdz .price-body{display:grid;grid-template-columns:1fr 1fr;}
  #zdz .price-amt{padding:40px 36px;border-right:1px solid var(--border);text-align:center;}
  #zdz .price-pre{font-family:var(--n);font-size:11px;color:var(--purpleHi);letter-spacing:0.28em;text-transform:uppercase;}
  #zdz .price-inst{margin-top:18px;font-family:var(--n);font-size:16px;color:var(--muted);font-weight:500;}
  #zdz .price-big{font-family:var(--d);font-weight:400;font-size:104px;line-height:1;letter-spacing:0.005em;margin-top:4px;color:var(--ink);}
  #zdz .price-juros{font-family:var(--s);font-style:italic;font-size:14px;color:var(--muted2);margin-top:6px;}
  #zdz .price-divider{height:1px;background:var(--border);margin:22px 0;}
  #zdz .price-cash{font-family:var(--n);font-size:14px;color:var(--muted);margin-bottom:22px;font-weight:500;}
  #zdz .price-feats{padding:40px 36px;}
  #zdz .price-feats .heading{font-family:var(--n);font-size:11px;color:var(--purpleHi);letter-spacing:0.28em;text-transform:uppercase;margin-bottom:18px;}
  #zdz .price-feats ul{list-style:none;padding:0;margin:0;}
  #zdz .price-feats li{padding:12px 0;border-top:1px solid var(--border);display:flex;gap:12px;font-size:14px;color:var(--ink);line-height:1.4;}
  #zdz .price-feats li:first-child{border-top:none;}
  #zdz .price-feats .num{font-family:var(--d);font-size:13px;color:var(--purpleHi);min-width:24px;}

  /* FAQ */
  #zdz .faq{padding: 96px 0; border-top: 1px solid var(--border);}
  #zdz .faq-container{max-width: 780px; margin: 0 auto; display: flex; flex-direction: column; gap: 16px; margin-top: 48px;}
  #zdz .faq-item{border: 1px solid var(--border); border-radius: 12px; background: rgba(255,255,255,0.015); overflow: hidden; transition: background 0.3s, border-color 0.3s;}
  #zdz .faq-item.open{background: rgba(255,255,255,0.04); border-color: rgba(183,148,246,0.3);}
  #zdz .faq-q{padding: 24px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; user-select: none;}
  #zdz .faq-title{font-size: 16px; font-weight: 600; color: var(--ink); font-family: var(--n); line-height: 1.4;}
  #zdz .faq-icon{width: 28px; height: 28px; border-radius: 50%; border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; color: var(--purpleHi); transition: transform 0.3s, background 0.3s, border-color 0.3s; flex-shrink: 0; margin-left: 16px;}
  #zdz .faq-icon svg{width: 14px; height: 14px;}
  #zdz .faq-item.open .faq-icon{transform: rotate(45deg); background: rgba(139,92,246,0.15); border-color: var(--purpleHi); color: #fff;}
  #zdz .faq-a{padding: 0 24px; max-height: 0; overflow: hidden; transition: max-height 0.4s ease, padding 0.4s ease; font-size: 15px; color: var(--muted); line-height: 1.6; font-family: var(--n);}
  #zdz .faq-item.open .faq-a{max-height: 400px; padding: 0 24px 24px;}

  #zdz footer{padding:48px 56px 56px;text-align:center;border-top:1px solid var(--border);}
  #zdz .social{display:inline-flex;gap:24px;margin-top:18px;color:var(--muted);}
  #zdz .social a{display:flex;align-items:center;justify-content:center;width:48px;height:48px;border-radius:50%;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.02);transition:all .2s;}
  #zdz .social a:hover{color:#fff;background:rgba(255,255,255,0.05);border-color:rgba(255,255,255,0.2);}
  #zdz .social svg{width:20px;height:20px;}
  #zdz footer .copy{margin-top:14px;font-family:var(--n);font-size:11px;color:var(--muted2);text-transform:uppercase;letter-spacing:0.05em;}
  #zdz .back-top{display:inline-block;margin-top:18px;font-family:var(--n);font-size:10px;letter-spacing:0.22em;color:var(--muted2);text-transform:uppercase;transition:color .2s;}
  #zdz .back-top:hover{color:var(--purpleHi);}

  .zdz-cta{position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(100px);z-index:100;background:linear-gradient(135deg,#8b5cf6,#e633a8);color:#fff;padding:16px 28px;border-radius:99px;font-family:'Inter',system-ui,sans-serif;font-weight:700;font-size:13px;letter-spacing:0.1em;text-transform:uppercase;box-shadow:0 12px 40px -8px rgba(230,51,168,0.6);display:flex;align-items:center;gap:10px;transition:transform .4s cubic-bezier(.34,1.56,.64,1),opacity .3s;opacity:0;pointer-events:none;white-space:nowrap;}
  .zdz-cta.on{transform:translateX(-50%) translateY(0);opacity:1;pointer-events:auto;}
  .zdz-cta:hover{transform:translateX(-50%) translateY(-2px);}
  .zdz-cta .arrow{transition:transform .15s;display:inline-block;}
  .zdz-cta:hover .arrow{transform:translateX(4px);}

  #zdz .rv{opacity:0;transform:translateY(22px);transition:opacity .55s ease,transform .55s ease;}
  #zdz .rv.on{opacity:1;transform:translateY(0);}
  #zdz .d1{transition-delay:.08s;}
  #zdz .d2{transition-delay:.16s;}
  #zdz .d3{transition-delay:.24s;}

  @media(max-width:900px){
    #zdz .w{padding:0 24px;}
    #zdz .nav{padding:20px 24px;}
    #zdz .hd, #zdz .hs, #zdz .cyber-hs{font-size:36px; line-height:1.15; letter-spacing:-0.01em;}
    #zdz .hero .hd{font-size:36px; line-height:1.15;}
    #zdz .hero p.sub{font-size:15px; margin:16px auto 28px; line-height:1.45;}
    #zdz .lede{font-size:15px; line-height:1.45;}
    #zdz section{padding:48px 0;}
    #zdz .pain-cards{grid-template-columns:1fr; gap:16px;}
    #zdz .pain-card{padding:20px; gap:16px;}
    #zdz .pain-icon-wrapper{width:48px;height:48px;border-radius:12px;}
    #zdz .pain-icon-wrapper svg{width:20px;height:20px;}
    #zdz .pain-txt-styled{font-size:14px;}
    #zdz .process-flow{grid-template-columns:1fr;gap:16px;padding:0 24px;margin-left:auto;margin-right:auto;}
    #zdz .process-step{height:200px !important;min-height:200px !important;width:200px !important;margin:0 auto;padding:20px;display:flex;flex-direction:column;justify-content:space-between;}
    #zdz .step-top{margin-bottom:0 !important;}
    #zdz .process-step .step-icon{width:56px;height:56px;border-radius:14px;margin:0 auto !important;}
    #zdz .process-step .step-icon svg{width:24px;height:24px;}
    #zdz .process-step .step-title{font-size:16px;text-align:center;margin-top:0 !important;}
    #zdz .step-arrow{display:none;}
    #zdz .process-feats{flex-direction:column;gap:12px;padding:0 24px;}
    #zdz .process-feat{border-bottom:none; padding:16px; max-width:100%;}
    #zdz .feat-icon{width:40px;height:40px;border-radius:10px;}
    #zdz .feat-icon svg{width:18px;height:18px;}
    #zdz .process-feat span{font-size:14px;}
    #zdz .video-head{grid-template-columns:1fr;}
    #zdz .modules-head{flex-direction:column;align-items:flex-start; gap:12px; margin-bottom:32px;}
    #zdz .modules-head p{text-align:left; font-size:15px;}
    #zdz .modules-grid,#zdz .fit-grid,#zdz .price-body,#zdz .about-grid{grid-template-columns:1fr;}
    #zdz .about-grid{gap:36px;}
    #zdz .about-fig{max-width:380px;margin:0 auto;width:100%;}
    #zdz .fit-col{border-right:none;border-bottom:1px solid var(--border); padding:24px;}
    #zdz .fit-head svg{width:20px;height:20px;}
    #zdz .fit-col .ctrl svg{width:20px;height:20px;}
    #zdz .fit-sub{font-size:16px;}
    #zdz .fit-list li{font-size:13px; padding:10px 0;}
    #zdz .gua-grid{grid-template-columns:1fr;text-align:center;gap:36px;}
    #zdz .gua-grid .right{text-align:center; align-items:center; gap:16px;}
    #zdz .gua-medal{margin:0 auto; width: 240px; height: 240px;}
    #zdz .gua-medal .num{font-size: 64px;}
    #zdz .gua-right-hd{font-size:32px; line-height:1.15;}
    #zdz .gua-list li{align-items:center;text-align:left; font-size:14px;}
    #zdz .price-name{font-size:28px;}
    #zdz .price-big{font-size:64px;}
    #zdz .price-head{padding:32px 20px 20px;}
    #zdz .price-amt, #zdz .price-feats{padding:32px 20px;}
    #zdz .price-feats li{font-size:13px; padding:10px 0;}
    #zdz .port-item{width:260px;}
    #zdz .hero-img{width:100%; margin-top:32px;}
    #zdz .marquee .row{font-size:20px; gap:24px;}
    #zdz .player-cover-play{width:42px !important;height:42px !important;box-shadow:0 0 0 5px rgba(230,51,168,0.15), 0 0 20px var(--magenta) !important;}
    #zdz .player-cover-play svg{width:18px !important;height:18px !important;margin-left:2px !important;}
    #zdz .player-controls-bar {height: 44px !important; padding: 0 10px !important;}
    #zdz .player-left, #zdz .player-right {gap: 8px !important;}
    #zdz .player-btn {width: 28px !important; height: 28px !important;}
    #zdz .player-btn svg {width: 14px !important; height: 14px !important;}
    #zdz .player-timeline-wrapper {margin: 0 8px !important;}
    #zdz .player-time-display {min-width: 54px !important; font-size: 9px !important;}
    #zdz .player-volume-container {display: none !important;}
    #zdz .player-quality-btn {font-size: 9px !important; padding: 2px 6px !important;}
    #zdz .player-quality-btn svg {width: 8px !important; height: 8px !important;}
    .zdz-cta{font-size:11px;padding:14px 22px;}
    #zdz .btn{font-size:12px; padding:16px 24px;}
  }
  @media(max-width:480px){
    #zdz .w{padding:0 20px;}
    #zdz .nav{padding:16px 20px;}
    #zdz .nav-login{padding:8px 16px; font-size:10px;}
    #zdz .hd, #zdz .hs, #zdz .cyber-hs{font-size:24px;}
    #zdz .hero .hd{font-size:24px;}
    #zdz .marquee .row{font-size:14px; gap:16px;}
    #zdz .fit-head .label{font-size:25px;}
    #zdz-process-cta{font-size:8px !important; padding:14px 20px !important; width:100%; justify-content:center;}
    #zdz-hero-cta{font-size:10px !important;}
    #zdz-modules-cta{font-size:10px !important;}
    #zdz .module-foot{padding:14px 16px;}
    #zdz .module-foot .ch{font-size:13px;}
    #zdz .module-foot .vm{font-size:11px;}
    #zdz .module-details{padding:0 16px;}
    #zdz .module-card.open .module-details{padding:14px 16px 18px;}
    #zdz .module-details-title{font-size:14px;}
    #zdz .module-details-desc{font-size:13px;}
    #zdz .pain-icon-wrapper{width:44px;height:44px;border-radius:10px;}
    #zdz .pain-icon-wrapper svg{width:18px;height:18px;}
    #zdz .process-flow{padding:0 20px;}
    #zdz .process-step .step-icon{width:48px;height:48px;border-radius:12px;margin-bottom:12px;}
    #zdz .process-step .step-icon svg{width:20px;height:20px;}
    #zdz .process-feats{padding:0 20px;}
    #zdz .gua-right-hd{font-size:26px;}
    #zdz .price-name{font-size:24px;}
    #zdz .price-big{font-size:52px;}
    #zdz .btn{width:100%; justify-content:center; padding:14px 20px; font-size:11px;}
    #zdz .video-foot .meta{font-size:9px; letter-spacing:0.1em; line-height:1.4; text-align:center;}
  }
  @media(max-width:360px){
    #zdz .w{padding:0 16px;}
    #zdz .nav{padding:12px 16px;}
    #zdz .nav-login{padding:6px 12px; font-size:9px;}
    #zdz .hd, #zdz .hs, #zdz .cyber-hs{font-size:24px;}
    #zdz .hero .hd{font-size:24px;}
    #zdz .marquee .row{font-size:14px; gap:12px;}
    #zdz .fit-head .label{font-size:25px;}
    #zdz-process-cta{font-size:8px !important; padding:12px 16px !important;}
    #zdz-hero-cta{font-size:10px !important;}
    #zdz-modules-cta{font-size:10px !important;}
    #zdz .pain-icon-wrapper{width:40px;height:40px;border-radius:8px;}
    #zdz .pain-icon-wrapper svg{width:16px;height:16px;}
    #zdz .process-flow{padding:0 16px;}
    #zdz .process-step .step-icon{width:44px;height:44px;border-radius:10px;margin-bottom:8px;}
    #zdz .process-step .step-icon svg{width:18px;height:18px;}
    #zdz .process-feats{padding:0 16px;}
    #zdz .gua-right-hd{font-size:22px;}
    #zdz .price-name{font-size:20px;}
    #zdz .price-big{font-size:44px;}
    #zdz .btn{font-size:10px; padding:12px 16px;}
    #zdz .video-foot .meta{font-size:8px;}
  }
  @media(min-width:901px){.zdz-cta{display:none;}}

  /* Custom premium player styles */
  #zdz .player-container {
    position: relative;
    width: 100%;
    height: 100%;
    background: #000;
    overflow: hidden;
    border-radius: 16px;
    touch-action: pan-y;
  }
  #zdz .player-unmute-overlay {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 20;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 12px 28px;
    background: rgba(10, 6, 18, 0.94);
    border: 2px solid var(--magenta);
    border-radius: 999px;
    box-shadow: 0 0 30px rgba(230, 51, 168, 0.5), 0 8px 32px rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(12px);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    animation: zdzPulseSound 1.8s infinite;
    max-width: 92%;
    user-select: none;
    touch-action: pan-y;
  }
  #zdz .player-unmute-overlay:hover {
    transform: translateX(-50%) scale(1.05);
    box-shadow: 0 0 45px rgba(230, 51, 168, 0.85), 0 12px 40px rgba(0, 0, 0, 0.9);
  }
  @keyframes zdzPulseSound {
    0%, 100% {
      box-shadow: 0 0 20px rgba(230, 51, 168, 0.4), 0 4px 20px rgba(0,0,0,0.5);
      border-color: var(--magenta);
    }
    50% {
      box-shadow: 0 0 40px rgba(230, 51, 168, 0.9), 0 8px 32px rgba(0,0,0,0.8);
      border-color: #ff66cc;
    }
  }
  #zdz .player-unmute-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--purple), var(--magenta));
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    flex-shrink: 0;
    box-shadow: 0 0 16px var(--magenta);
  }
  #zdz .player-unmute-text {
    display: flex;
    flex-direction: column;
    text-align: left;
  }
  #zdz .player-unmute-title {
    font-size: 13px;
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #fff;
    line-height: 1.2;
  }
  #zdz .player-unmute-sub {
    font-size: 11px;
    font-weight: 700;
    color: #00e5ff;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin-top: 2px;
  }
  @media(max-width: 640px) {
    #zdz .player-unmute-overlay {
      top: 12px;
      padding: 8px 16px;
      gap: 10px;
    }
    #zdz .player-unmute-icon {
      width: 32px;
      height: 32px;
    }
    #zdz .player-unmute-title {
      font-size: 11px;
    }
    #zdz .player-unmute-sub {
      font-size: 9px;
    }
  }
  #zdz .player-iframe-wrapper {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 1;
    overflow: hidden;
  }
  #zdz .player-iframe-wrapper iframe {
    width: 100%;
    height: 100%;
    border: none;
    pointer-events: none;
  }
  #zdz .player-click-shield {
    position: absolute;
    inset: 0;
    bottom: 56px;
    z-index: 10;
    cursor: pointer;
    touch-action: pan-y;
  }
  #zdz .player-cover {
    position: absolute;
    inset: 0;
    z-index: 9;
    background: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.4s ease;
    touch-action: pan-y;
  }
  #zdz .player-cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.65;
  }
  #zdz .player-cover-play {
    position: absolute;
    width: 84px;
    height: 84px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--purple), var(--magenta));
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 0 10px rgba(230, 51, 168, 0.15), 0 0 40px var(--magenta);
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    z-index: 11;
  }
  #zdz .player-cover-play:hover {
    transform: scale(1.08);
    box-shadow: 0 0 0 16px rgba(230, 51, 168, 0.2), 0 0 60px var(--magenta);
  }
  #zdz .player-controls-bar {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 56px;
    background: linear-gradient(to top, rgba(10, 6, 18, 0.98), rgba(10, 6, 18, 0.85) 60%, transparent);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    z-index: 15;
    transition: opacity 0.3s ease, transform 0.3s ease;
    user-select: none;
  }
  #zdz .player-controls-bar.hidden {
    opacity: 0;
    transform: translateY(10px);
    pointer-events: none;
  }
  #zdz .player-left, #zdz .player-right {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  #zdz .player-timeline-wrapper {
    flex: 1;
    height: 16px;
    display: flex;
    align-items: center;
    cursor: pointer;
    margin: 0 16px;
    position: relative;
  }
  #zdz .player-timeline-track {
    width: 100%;
    height: 3px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 99px;
    position: relative;
    transition: height 0.15s ease;
  }
  #zdz .player-timeline-wrapper:hover .player-timeline-track {
    height: 5px;
  }
  #zdz .player-timeline-progress {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    background: linear-gradient(90deg, var(--purple), var(--magenta));
    border-radius: 99px;
  }
  #zdz .player-timeline-handle {
    position: absolute;
    top: 50%;
    width: 12px;
    height: 12px;
    background: #fff;
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    transition: transform 0.15s ease;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
  }
  #zdz .player-timeline-wrapper:hover .player-timeline-handle {
    transform: translate(-50%, -50%) scale(1);
  }
  #zdz .player-btn {
    background: none;
    border: none;
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    transition: background 0.2s, color 0.2s;
  }
  #zdz .player-btn:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
  }
  #zdz .player-time-display {
    font-size: 11px;
    font-family: var(--n);
    color: #d1d5db;
    min-width: 80px;
    text-align: center;
    letter-spacing: 0.05em;
  }
  #zdz .player-volume-container {
    display: flex;
    align-items: center;
    gap: 8px;
    position: relative;
  }
  #zdz .player-volume-slider-wrapper {
    width: 0;
    overflow: hidden;
    transition: width 0.2s ease, opacity 0.2s ease;
    opacity: 0;
    display: flex;
    align-items: center;
  }
  #zdz .player-volume-container:hover .player-volume-slider-wrapper {
    width: 80px;
    opacity: 1;
  }
  #zdz .player-volume-slider {
    width: 100%;
    height: 4px;
    -webkit-appearance: none;
    background: rgba(255,255,255,0.2);
    border-radius: 99px;
    outline: none;
    cursor: pointer;
  }
  #zdz .player-volume-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 12px;
    height: 12px;
    background: #fff;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 0 5px rgba(0,0,0,0.5);
  }
  #zdz .player-quality-container {
    position: relative;
  }
  #zdz .player-quality-btn {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.05em;
    padding: 4px 8px;
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 4px;
    background: transparent;
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 4px;
    transition: all 0.2s;
    text-transform: uppercase;
  }
  #zdz .player-quality-btn:hover {
    background: rgba(255,255,255,0.1);
    border-color: rgba(255,255,255,0.4);
  }
  #zdz .player-quality-menu {
    position: absolute;
    bottom: calc(100% + 12px);
    right: 0;
    background: #140820;
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 6px 0;
    min-width: 100px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.5);
    display: flex;
    flex-direction: column;
    z-index: 20;
  }
  #zdz .player-quality-item {
    padding: 8px 16px;
    font-size: 12px;
    font-family: var(--n);
    color: var(--muted);
    background: none;
    border: none;
    text-align: left;
    width: 100%;
    cursor: pointer;
    transition: all 0.15s;
  }
  #zdz .player-quality-item:hover {
    background: rgba(255,255,255,0.05);
    color: #fff;
  }
  #zdz .player-quality-item.active {
    color: var(--magenta);
    font-weight: 700;
    background: rgba(230,51,168,0.05);
  }
`

const Logo = ({ w = 170, h = 62 }: { w?: number; h?: number }) => (
  <img 
    src="https://zbrushdozero.com/var/assets/img/media/original/fc65c1199699d6c899cfe0a1daeeb9f1/Sem-T-tulo-1.png" 
    alt="ZBrush do Zero"
    style={{ width: w, height: h, objectFit: 'contain' }}
  />
)

const MODULES = [
  { 
    num: '01',
    title: 'Módulo 01 - Introdução ao ZBrush',
    desc: 'Você domina o essencial pra não se perder: interface, movimentação e os principais menus. Em vez de travar na quantidade de botões, você começa a se sentir em casa no programa.',
    img: 'https://zbrushdozero.com/var/assets/img/media/original/bef4d60582c0ead95aaeef926fc0fca5/modulo-1.png', 
    d: '' 
  },
  { 
    num: '02',
    title: 'Módulo 02 - Seu Primeiro Modelo',
    desc: 'Você põe a mão na massa e cria seu primeiro modelo, algo simples pra pegar o jeito das ferramentas principais na prática, sem teoria demais.',
    img: 'https://zbrushdozero.com/var/assets/img/media/original/4b5807001050c68f3583bc5d4a120841/modulo-2.png', 
    d: 'd1' 
  },
  { 
    num: '03',
    title: 'Módulo 03 - Projeto Completo',
    desc: 'Você junta tudo dos módulos anteriores e constrói um modelo completo do zero, do início ao fim, do jeito que se faz de verdade.',
    img: 'https://zbrushdozero.com/var/assets/img/media/original/037e8aefa8ac30f820bcb6dc29a605e4/modulo-3.png', 
    d: 'd2' 
  },
  { 
    num: '04',
    title: 'Módulo 04 - Preparações para Render e Cortes',
    desc: 'Você aprende a preparar o modelo pra impressão, criando cortes e fechando a malha, e ainda a renderizar pra apresentar a peça no seu portfólio.',
    img: 'https://zbrushdozero.com/var/assets/img/media/original/65f0bc46d2b38aad13639354599e9b72/unnamed.jpg', 
    d: 'd3' 
  },
]

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

const zdzFaqList = [
  {
    q: "Nunca usei o ZBrush. Dou conta mesmo começando do zero?",
    a: "Sim. Esse curso foi feito exatamente pra quem está começando do zero, mesmo que você nunca tenha aberto o programa. Tudo é passo a passo, na ordem certa, do primeiro clique até o seu primeiro modelo pronto pra imprimir.",
  },
  {
    q: "Quanto tempo por dia eu preciso? Em quanto tempo consigo fazer meu primeiro modelo?",
    a: "Você não precisa de horas por dia. As aulas são curtas, de 10 a 25 minutos, e você avança no seu ritmo. Seguindo o passo a passo na ordem, dá pra sair do zero e chegar no seu primeiro modelo pronto pra imprimir sem enrolação, mesmo com pouco tempo livre.",
  },
  {
    q: "Tem muito tutorial de graça no YouTube. Por que fazer o curso?",
    a: "Tutorial solto te ensina uma coisa aqui, outra ali, fora de ordem, e é por isso que tanta gente trava e desiste no meio. Aqui você tem o caminho completo e na sequência certa, do primeiro clique até o modelo pronto, sem ficar perdido juntando pedaço. Você paga pela ordem e pelo tempo que economiza, não por informação solta.",
  },
  {
    q: "Preciso de um computador potente? Funciona no Mac?",
    a: "Não precisa de nada de outro mundo. O ZBrush roda na maioria dos computadores comuns, e sim, funciona no Mac. Os requisitos mínimos são modestos: um processador simples, 4 GB de RAM (o ideal é 16 GB pra trabalhar com folga) e cerca de 8 GB livres no disco. Se o seu computador dá conta dos programas do dia a dia, provavelmente já roda numa boa.",
  },
  {
    q: "As aulas são ao vivo ou gravadas?",
    a: "Todas as aulas são gravadas e curtas, de 10 a 25 minutos em média. Você assiste no seu ritmo, na hora que quiser e quantas vezes precisar.",
  },
  {
    q: "Por quanto tempo eu tenho acesso?",
    a: "O acesso é vitalício. Você compra uma vez e assiste quando e quantas vezes quiser, pra sempre.",
  },
  {
    q: "Como eu recebo o acesso depois de comprar?",
    a: "Assim que o pagamento é aprovado, você recebe o acesso imediato pela Hotmart e já pode começar na mesma hora.",
  },
  {
    q: "E se eu não gostar?",
    a: "Você tem 7 dias de garantia. Se entrar, assistir e sentir que não é pra você, é só pedir dentro desse prazo que devolvemos 100% do valor, sem burocracia.",
  },
];

export default function ZbrushDoZero() {
  const [lbImg, setLbImg] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [openModules, setOpenModules] = useState<Record<number, boolean>>({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(54); // default 54s, updated onReady
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(true);
  const [hasActivatedSound, setHasActivatedSound] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState('1080p');
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const playerRef = useRef<any>(null);
  const controlsTimeoutRef = useRef<any>(null);
  const touchStartPos = useRef<{ x: number; y: number } | null>(null);

  // Portfolio carousel interactive drag & touch refs
  const portWrapRef = useRef<HTMLDivElement | null>(null);
  const isDraggingPort = useRef(false);
  const startXPort = useRef(0);
  const scrollLeftPort = useRef(0);
  const hasDraggedPort = useRef(false);
  const portPausedRef = useRef(false);

  useEffect(() => {
    // 1. Check if YT already ready
    if ((window as any).YT && (window as any).YT.Player) {
      initYTPlayer();
      return;
    }

    // 2. Set up global callback
    const prevCallback = (window as any).onYouTubeIframeAPIReady;
    (window as any).onYouTubeIframeAPIReady = () => {
      if (prevCallback) prevCallback();
      initYTPlayer();
    };

    // 3. Load script asynchronously without blocking
    if (!document.getElementById('yt-iframe-api-script')) {
      const tag = document.createElement('script');
      tag.id = 'yt-iframe-api-script';
      tag.src = 'https://www.youtube.com/iframe_api';
      tag.async = true;
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    // Light fallback timer (runs only once after 800ms if event didn't trigger)
    const fallbackTimer = setTimeout(() => {
      if ((window as any).YT && (window as any).YT.Player && !playerRef.current) {
        initYTPlayer();
      }
    }, 800);

    return () => {
      clearTimeout(fallbackTimer);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, []);

  const initYTPlayer = () => {
    if (playerRef.current) return;
    try {
      playerRef.current = new (window as any).YT.Player('youtube-hero-player', {
        videoId: 'Jjw6at0zSjQ',
        playerVars: {
          autoplay: 1,
          mute: 1,
          playsinline: 1,
          controls: 0,
          rel: 0,
          showinfo: 0,
          modestbranding: 1,
          iv_load_policy: 3,
          fs: 0,
          disablekb: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: (event: any) => {
            setPlayerReady(true);
            setDuration(event.target.getDuration() || 54);
            try {
              event.target.mute();
              event.target.playVideo();
              setIsPlaying(true);
              setIsMuted(true);
            } catch (err) {
              console.warn('Autoplay error handled:', err);
            }
          },
          onStateChange: (event: any) => {
            // PlayerState: PLAYING (1), PAUSED (2), ENDED (0), BUFFERING (3)
            if (event.data === 1) {
              setIsPlaying(true);
              resetControlsTimeout();
            } else if (event.data === 2) {
              setIsPlaying(false);
              setShowControls(true);
            } else if (event.data === 0) {
              setIsPlaying(false);
              setCurrentTime(0);
              setShowControls(true);
            }
          }
        }
      });
    } catch (err) {
      console.error('Error loading custom YouTube player:', err);
    }
  };

  useEffect(() => {
    let updateTimer: any;
    if (isPlaying && playerRef.current && playerRef.current.getCurrentTime) {
      updateTimer = setInterval(() => {
        setCurrentTime(playerRef.current.getCurrentTime());
      }, 250);
    }
    return () => clearInterval(updateTimer);
  }, [isPlaying]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches && e.touches[0]) {
      touchStartPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const isSwipeGesture = (e: any) => {
    if (!touchStartPos.current) return false;
    let clientX = 0;
    let clientY = 0;
    if (e.changedTouches && e.changedTouches[0]) {
      clientX = e.changedTouches[0].clientX;
      clientY = e.changedTouches[0].clientY;
    } else if (e.clientX !== undefined) {
      clientX = e.clientX;
      clientY = e.clientY;
    } else {
      return false;
    }
    const dx = Math.abs(clientX - touchStartPos.current.x);
    const dy = Math.abs(clientY - touchStartPos.current.y);
    return dx > 10 || dy > 10;
  };

  const handleActivateSound = (e?: any) => {
    if (e && isSwipeGesture(e)) return;
    if (e && e.stopPropagation) e.stopPropagation();
    if (!playerRef.current || !playerReady) return;
    try {
      playerRef.current.unMute();
      playerRef.current.setVolume(100);
      setVolume(100);
      setIsMuted(false);
      setHasActivatedSound(true);
      playerRef.current.seekTo(0, true);
      setCurrentTime(0);
      playerRef.current.playVideo();
      setIsPlaying(true);
      resetControlsTimeout();
    } catch (err) {
      console.warn('Error activating sound:', err);
    }
  };

  const togglePlayPause = (e?: any) => {
    if (e && isSwipeGesture(e)) return;
    if (e && e.stopPropagation) e.stopPropagation();
    if (!playerRef.current || !playerReady) return;
    if (!hasActivatedSound) {
      handleActivateSound(e);
      return;
    }
    if (isPlaying) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
      setShowControls(true);
    } else {
      playerRef.current.playVideo();
      setIsPlaying(true);
      resetControlsTimeout();
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!playerRef.current || !playerReady) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    const seekSeconds = percentage * duration;
    setCurrentTime(seekSeconds);
    playerRef.current.seekTo(seekSeconds, true);
    resetControlsTimeout();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const val = parseInt(e.target.value, 10);
    setVolume(val);
    if (playerRef.current && playerReady) {
      playerRef.current.setVolume(val);
      if (val > 0) {
        playerRef.current.unMute();
        setIsMuted(false);
        setHasActivatedSound(true);
      }
    }
    resetControlsTimeout();
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!playerRef.current || !playerReady) return;
    if (!hasActivatedSound) {
      handleActivateSound(e);
      return;
    }
    if (isMuted) {
      playerRef.current.unMute();
      setIsMuted(false);
      playerRef.current.setVolume(volume);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
    resetControlsTimeout();
  };

  const handleQualityChange = (quality: string) => {
    setSelectedQuality(quality);
    setShowQualityMenu(false);
    if (!playerRef.current || !playerReady) return;

    let ytQuality = 'default';
    if (quality === '1080p') ytQuality = 'hd1080';
    else if (quality === '720p') ytQuality = 'hd720';
    else if (quality === '480p') ytQuality = 'large';
    else if (quality === '360p') ytQuality = 'medium';

    playerRef.current.setPlaybackQuality(ytQuality);
    resetControlsTimeout();
  };

  const resetControlsTimeout = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2500);
    }
  };

  const handlePlayerMouseMove = () => {
    resetControlsTimeout();
  };

  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60)
    const seconds = Math.floor(secs % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  useEffect(() => {
    const els = document.querySelectorAll('#zdz .rv')
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); obs.unobserve(e.target) } })
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
    els.forEach(el => obs.observe(el))

    const cta = document.getElementById('zdz-cta')
    let shown = false
    const onScroll = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight)
      if (!shown && pct > 0.4) { cta?.classList.add('on'); shown = true }
      const oferta = document.getElementById('zdz-oferta')
      if (oferta) {
        const r = oferta.getBoundingClientRect()
        if (r.top < window.innerHeight && r.bottom > 0) cta?.classList.remove('on')
        else if (shown) cta?.classList.add('on')
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { obs.disconnect(); window.removeEventListener('scroll', onScroll) }
  }, [])

  // Interactive Infinite Carousel Effect
  useEffect(() => {
    const wrap = portWrapRef.current;
    if (!wrap) return;

    let animId: number;
    const speed = 0.8; // px per frame

    const tick = () => {
      if (!portPausedRef.current && !isDraggingPort.current && wrap) {
        wrap.scrollLeft += speed;
        // Infinite wrap check: if reached half way (after first copy of images), reset seamlessly
        const maxScroll = (wrap.scrollWidth - wrap.clientWidth) / 2;
        if (maxScroll > 0 && wrap.scrollLeft >= maxScroll) {
          wrap.scrollLeft -= maxScroll;
        }
      }
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  const handlePortMouseDown = (e: React.MouseEvent) => {
    const wrap = portWrapRef.current;
    if (!wrap) return;
    isDraggingPort.current = true;
    hasDraggedPort.current = false;
    portPausedRef.current = true;
    startXPort.current = e.pageX - wrap.offsetLeft;
    scrollLeftPort.current = wrap.scrollLeft;
    wrap.classList.add('is-dragging');
  };

  const handlePortMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingPort.current) return;
    const wrap = portWrapRef.current;
    if (!wrap) return;
    e.preventDefault();
    const x = e.pageX - wrap.offsetLeft;
    const walk = (x - startXPort.current) * 1.5;
    if (Math.abs(walk) > 5) {
      hasDraggedPort.current = true;
    }
    wrap.scrollLeft = scrollLeftPort.current - walk;

    // Boundary wrap
    const halfWidth = wrap.scrollWidth / 2;
    if (wrap.scrollLeft <= 0) {
      wrap.scrollLeft += halfWidth;
      scrollLeftPort.current += halfWidth;
    } else if (wrap.scrollLeft >= halfWidth) {
      wrap.scrollLeft -= halfWidth;
      scrollLeftPort.current -= halfWidth;
    }
  };

  const handlePortMouseUp = () => {
    isDraggingPort.current = false;
    const wrap = portWrapRef.current;
    if (wrap) {
      wrap.classList.remove('is-dragging');
    }
    // Briefly keep paused before resuming smooth flow
    setTimeout(() => {
      portPausedRef.current = false;
    }, 1200);
  };

  const handlePortTouchStart = (e: React.TouchEvent) => {
    const wrap = portWrapRef.current;
    if (!wrap) return;
    isDraggingPort.current = true;
    hasDraggedPort.current = false;
    portPausedRef.current = true;
    startXPort.current = e.touches[0].pageX - wrap.offsetLeft;
    scrollLeftPort.current = wrap.scrollLeft;
  };

  const handlePortTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingPort.current) return;
    const wrap = portWrapRef.current;
    if (!wrap) return;
    const x = e.touches[0].pageX - wrap.offsetLeft;
    const walk = (x - startXPort.current) * 1.2;
    if (Math.abs(walk) > 5) {
      hasDraggedPort.current = true;
    }
    wrap.scrollLeft = scrollLeftPort.current - walk;

    // Boundary wrap
    const halfWidth = wrap.scrollWidth / 2;
    if (wrap.scrollLeft <= 0) {
      wrap.scrollLeft += halfWidth;
      scrollLeftPort.current += halfWidth;
    } else if (wrap.scrollLeft >= halfWidth) {
      wrap.scrollLeft -= halfWidth;
      scrollLeftPort.current -= halfWidth;
    }
  };

  const handlePortTouchEnd = () => {
    isDraggingPort.current = false;
    setTimeout(() => {
      portPausedRef.current = false;
    }, 1500);
  };

  return (
    <>
      <style>{STYLES}</style>
      <a href="#zdz-oferta" className="zdz-cta" id="zdz-floating-cta">Quero começar do zero <span className="arrow">→</span></a>
      <div id="zdz">
        <main>

          <header className="nav rv">
            <a className="logo" id="zdz-nav-logo" href="#" aria-label="ZBrush do Zero" onClick={(e) => { e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'}); }}><Logo /></a>
            
            <nav className="nav-links">
              <a href="#curso" id="zdz-nav-curso">Curso</a>
              <a href="#modulos" id="zdz-nav-modulos">Módulos</a>
              <a href="#garantia" id="zdz-nav-garantia">Garantia</a>
              <a href="#zdz-oferta" className="highlight" id="zdz-nav-oferta">Oferta</a>
            </nav>

            <a href="#" className="nav-login" id="zdz-nav-login">Entrar</a>
          </header>

          <section className="hero">
            <div className="aurora">
              <div className="orb o1" /><div className="orb o2" /><div className="orb o3" />
            </div>
            <div className="w">
              <h1 className="hd rv">Do Zero ao seu primeiro<br /><span className="it">modelo pronto pra imprimir</span></h1>
              <p className="sub rv d1">Aprenda ZBrush mesmo sem nunca ter aberto o programa. Com um passo a passo simples e organizado.</p>
              <div 
                className="hero-img rv d2" 
                style={{ aspectRatio: '16/9', position: 'relative', overflow: 'hidden', borderRadius: '16px', background: '#000', border: '1px solid var(--border)' }} 
                aria-label="ZBrush — modelos 3D"
                onMouseMove={handlePlayerMouseMove}
                onMouseLeave={() => isPlaying && setShowControls(false)}
              >
                <div className="player-container" onTouchStart={handleTouchStart}>
                  {/* YouTube Iframe element */}
                  <div className="player-iframe-wrapper">
                    <div id="youtube-hero-player" />
                  </div>

                  {/* Absolute Click Shield: captures clicks to play/pause or activate sound */}
                  <div 
                    className="player-click-shield" 
                    onTouchStart={handleTouchStart}
                    onClick={(e) => {
                      if (!hasActivatedSound) {
                        handleActivateSound(e);
                      } else {
                        togglePlayPause(e);
                      }
                    }} 
                  />

                  {/* Smart Sound Activation / Unmute Banner */}
                  {!hasActivatedSound && (
                    <div 
                      className="player-unmute-overlay" 
                      onTouchStart={handleTouchStart}
                      onClick={(e) => handleActivateSound(e)}
                      id="zdz-unmute-banner"
                    >
                      <div className="player-unmute-icon">
                        <Volume2 size={20} />
                      </div>
                      <div className="player-unmute-text">
                        <span className="player-unmute-title">SEU VÍDEO JÁ COMEÇOU</span>
                        <span className="player-unmute-sub">🔊 Clique para ativar o som</span>
                      </div>
                    </div>
                  )}

                  {/* Custom Poster Image / Start Cover */}
                  {!isPlaying && currentTime === 0 && !hasActivatedSound && (
                    <div 
                      className="player-cover" 
                      onTouchStart={handleTouchStart}
                      onClick={(e) => handleActivateSound(e)}
                    >
                      <img 
                        src="https://zbrushdozero.com/var/assets/img/media/original/46e16046e3eb9f4f9c6cca002e9779e8/processo.png" 
                        alt="Play Video" 
                      />
                      <div className="player-cover-play">
                        <Play size={36} fill="#fff" stroke="#fff" style={{ marginLeft: '4px' }} />
                      </div>
                    </div>
                  )}

                  {/* Sleek Custom Control Bar */}
                  <div className={`player-controls-bar ${(!showControls && isPlaying) ? 'hidden' : ''}`}>
                    <div className="player-left">
                      <button className="player-btn" onClick={togglePlayPause} aria-label={isPlaying ? "Pause" : "Play"}>
                        {isPlaying ? <Pause size={18} fill="#fff" /> : <Play size={18} fill="#fff" />}
                      </button>

                      <div className="player-volume-container">
                        <button className="player-btn" onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"}>
                          {isMuted || volume === 0 ? <VolumeX size={18} /> : volume < 50 ? <Volume1 size={18} /> : <Volume2 size={18} />}
                        </button>
                        <div className="player-volume-slider-wrapper">
                          <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            value={isMuted ? 0 : volume} 
                            onChange={handleVolumeChange} 
                            className="player-volume-slider"
                            style={{ background: `linear-gradient(to right, var(--magenta) ${isMuted ? 0 : volume}%, rgba(255,255,255,0.2) ${isMuted ? 0 : volume}%)` }}
                          />
                        </div>
                      </div>

                      <div className="player-time-display">
                        {formatTime(Math.floor(currentTime))} / {formatTime(Math.floor(duration))}
                      </div>
                    </div>

                    {/* Horizontal seeking timeline */}
                    <div className="player-timeline-wrapper" onClick={handleSeek}>
                      <div className="player-timeline-track">
                        <div 
                          className="player-timeline-progress" 
                          style={{ width: `${(currentTime / duration) * 100}%` }} 
                        />
                        <div 
                          className="player-timeline-handle" 
                          style={{ left: `${(currentTime / duration) * 100}%` }} 
                        />
                      </div>
                    </div>

                    <div className="player-right">
                      <div className="player-quality-container">
                        <button 
                          className="player-quality-btn" 
                          onClick={(e) => { e.stopPropagation(); setShowQualityMenu(!showQualityMenu); }}
                        >
                          {selectedQuality} <ChevronDown size={12} />
                        </button>
                        
                        {showQualityMenu && (
                          <div className="player-quality-menu">
                            {['1080p', '720p', '480p', '360p', 'Auto'].map((q) => (
                              <button 
                                key={q} 
                                className={`player-quality-item ${selectedQuality === q ? 'active' : ''}`}
                                onClick={(e) => { e.stopPropagation(); handleQualityChange(q); }}
                              >
                                {q}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rv d3" style={{ marginTop: '48px' }}>
                <a href="#zdz-oferta" className="btn" id="zdz-hero-cta">Quero começar do zero <span className="arrow">→</span></a>
                <div className="micro">Acesso vitalício · 7 dias de garantia</div>
              </div>
            </div>
          </section>

          <div className="marquee">
            <div className="track">
              {[0,1,2,3].map(i=>(
                <div key={i} className="row">
                  <span>Miniaturas</span><span className="dot">◆</span><span className="cyan">Bustos</span><span className="dot">◆</span>
                  <span>Colecionáveis</span><span className="dot">◆</span><span className="cyan">Impressão 3D</span><span className="dot">◆</span>
                  <span>Personagens</span><span className="dot">◆</span>
                </div>
              ))}
            </div>
          </div>

          <section id="curso">
            <div className="w">
              <div className="cyber-heading rv">
                <h2 className="cyber-hs">Você já<br /><span className="grad">passou por...</span></h2>
              </div>
              <div className="pain-cards">
                {[
                  { t: 'Abriu o Zbrush e ficou perdido com mil botões', icon: <><circle cx="12" cy="12" r="10"/><path d="M8 9.05v-.1"/><path d="M16 9.05v-.1"/><path d="M16 16c-1.5-2-6.5-2-8 0"/></> },
                  { t: 'Tentou mas não sabe por onde começar.', icon: <><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></> },
                  { t: 'Assistiu tutoriais mas parece avançado demais e te deixam travado.', icon: <polygon points="5 3 19 12 5 21 5 3"/> },
                  { t: 'Quer imprimir seus próprios modelos, mas trava no software.', icon: <><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></> }
                ].map((item,i)=>(
                  <div key={i} className={`pain-card rv ${i?`d${i}`:''}`}>
                    <div className="pain-icon-wrapper">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{item.icon}</svg>
                    </div>
                    <div className="pain-content">
                      <span className="pain-num-styled">0{i+1}</span>
                      <span className="pain-txt-styled">{item.t}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section>
            <div className="w" style={{textAlign:'center'}}>
              <h2 className="hs rv">Zbrush não é difícil!<br />Você só nunca <span className="it">aprendeu</span> o processo certo</h2>
              <p className="lede rv d1">Você não precisa dominar tudo! Só seguir a ordem certa.</p>
            </div>
            <div className="process-flow">
              {[
                {ey:'01',icon:<><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></>,title:'Interface\n(só o essencial)', accent:'#8b5cf6', grad:'linear-gradient(135deg, #b794f6, #8b5cf6)'},
                {ey:'02',icon:<path d="M4.5 10.5 L12 6.5 L19.5 10.5 L12 14.5z M4.5 10.5v5 L12 19.5 v-5 M19.5 10.5v5 L12 19.5"/>,title:'Formas\nbásicas', accent:'#e633a8', grad:'linear-gradient(135deg, #f9a8d4, #e633a8)'},
                {ey:'03',icon:<><line x1="6" y1="20" x2="6" y2="14"/><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/></>,title:'Refinamento', accent:'#00e5ff', grad:'linear-gradient(135deg, #67e8f9, #06b6d4)'},
                {ey:'04',icon:<><rect x="6" y="2" width="12" height="20" rx="2"/><line x1="10" y1="18" x2="14" y2="18"/></>,title:'Pronto pra\nimprimir', accent:'#e633a8', grad:'linear-gradient(135deg, #f9a8d4, #e633a8)'},
              ].map((s,i)=>(
                <div key={i} className="process-step rv" style={{ '--accent': s.accent, '--grad': s.grad } as React.CSSProperties}>
                  <div className="step-top">
                    <div className="step-ey">{s.ey}</div>
                    <div className="step-dot"></div>
                  </div>
                  <div className="step-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{s.icon}</svg></div>
                  <div className="step-title">{s.title.split('\n').map((l,j)=><span key={j}>{l}{j<s.title.split('\n').length-1&&<br/>}</span>)}</div>
                  {i<3&&<span className="step-arrow">&gt;</span>}
                </div>
              ))}
            </div>
            <div className="process-feats">
              {[
                {icon:<path d="M4.5 10.5 L12 6.5 L19.5 10.5 L12 14.5z M4.5 10.5v5 L12 19.5 v-5 M19.5 10.5v5 L12 19.5"/>,txt:'Comece com formas simples', grad:'linear-gradient(135deg, #f9a8d4, #e633a8)'},
                {icon:<><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>,txt:'Evolua passo a passo, sem travar', grad:'linear-gradient(135deg, #e879f9, #d946ef)'},
                {icon:<><rect x="6" y="2" width="12" height="20" rx="2"/><line x1="10" y1="18" x2="14" y2="18"/></>,txt:'Termine com um modelo pronto pra impressão 3d', grad:'linear-gradient(135deg, #d8b4fe, #a855f7)'},
              ].map((f,i)=>(
                <div key={i} className="process-feat rv" style={{ '--grad': f.grad } as React.CSSProperties}>
                  <div className="feat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{f.icon}</svg></div>
                  <span>{f.txt}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="w">
              <div className="cyber-heading rv">
                <h2 className="cyber-hs">Veja o processo <span className="grad">na prática</span></h2>
                <p className="lede">Da blocagem simples ao modelo pronto pra impressão 3D! Passo a passo.</p>
              </div>
              <div className="video-frame rv">
                <iframe 
                  src="https://www.youtube.com/embed/IwvuCM9_zbU?autoplay=1&controls=1&loop=1&rel=0&mute=1&playlist=IwvuCM9_zbU"
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  allowFullScreen
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 3 }}
                ></iframe>
              </div>
              <div className="video-foot rv">
                <a href="#zdz-oferta" className="btn" id="zdz-process-cta" style={{ padding: '18px 48px' }}>Quero aprender o passo a passo <span className="arrow">→</span></a>
                <div className="meta">Aulas curtas • Método em etapas • Acesso imediato</div>
              </div>
            </div>
          </section>

          {/* Section: Quem vai te ensinar */}
          <section className="about" id="zdz-mentor">
            <div className="w">
              <div className="cyber-heading rv">
                <div className="cyber-ey">Mente por trás</div>
                <h2 className="cyber-hs">Quem vai <span className="grad">te ensinar</span></h2>
              </div>
              <div className="about-grid">
                <div className="about-fig rv">
                  <img src="https://3dnapose.com/wp-content/uploads/2025/11/fotinha-do-vini-2.png" alt="Vinicius Cardoso" />
                  <div className="about-badge">VINICIUS CARDOSO</div>
                </div>
                <div className="about-bio rv">
                  <p className="lead">Prazer, eu sou o Vinicius.</p>
                  <p>Faço modelos 3D, personagens e colecionáveis, há mais de 9 anos, e nesse tempo trabalhei com artistas como o Rafael Grassetti (ex-diretor de arte da Santa Monica, de God of War) e pra vários estúdios de colecionáveis e miniaturas.</p>
                  <p>Aqui você não recebe teoria de livro. Recebe o mesmo processo que eu uso no mercado de verdade, só que organizado passo a passo pra quem tá começando do zero.</p>
                  <div className="about-collab">
                    Colaborações com Rafael Grassetti &amp; estúdios de colecionáveis
                  </div>
                  <div className="about-stats">
                    <div>
                      <div className="stat-num">+9</div>
                      <div className="stat-txt">Anos esculpindo e imprimindo</div>
                    </div>
                    <div>
                      <div className="stat-num">+100</div>
                      <div className="stat-txt">Projetos entregues no mercado</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Infinite Portfolio Carousel with Touch and Drag */}
            <div 
              className="port-wrap rv"
              ref={portWrapRef}
              onMouseDown={handlePortMouseDown}
              onMouseMove={handlePortMouseMove}
              onMouseUp={handlePortMouseUp}
              onMouseLeave={handlePortMouseUp}
              onTouchStart={handlePortTouchStart}
              onTouchMove={handlePortTouchMove}
              onTouchEnd={handlePortTouchEnd}
              onMouseEnter={() => { portPausedRef.current = true; }}
              onMouseOut={(e) => { 
                if (!isDraggingPort.current && !e.currentTarget.contains(e.relatedTarget as Node)) {
                  portPausedRef.current = false; 
                }
              }}
            >
              <div className="port-track">
                {portImgs.concat(portImgs).map((img, i) => (
                  <div 
                    key={i} 
                    className="port-item" 
                    onClick={() => {
                      if (!hasDraggedPort.current) {
                        setLbImg(img);
                      }
                    }}
                  >
                    <img src={img} alt={`Trabalho ${(i % portImgs.length) + 1}`} loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section>
            <div className="w" style={{textAlign:'center',marginBottom:'48px'}}>
              <div className="cyber-heading rv">
                <h2 className="cyber-hs">Este curso é<br /><span className="grad">pra você?</span></h2>
              </div>
            </div>
            <div className="w">
              <div className="fit-grid">
                <div className="fit-col rv">
                  <div className="fit-head"><span className="label yes">SIM</span><span className="rule"/><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>
                  <div className="fit-sub">É pra você se…</div>
                  <ul className="fit-list">
                    {['Você nunca usou o Zbrush (ou sabe muito pouco)','Você abriu o programa e travou na interface','Você quer um passo a passo simples e organizado','Você quer aprender a modelar suas próprias miniaturas, bustos e colecionáveis'].map((t,i)=>(
                      <li key={i}><span className="num g">0{i+1}</span>{t}</li>
                    ))}
                  </ul>
                </div>
                <div className="fit-col rv d1">
                  <span className="ctrl"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 12h4"/><path d="M8 10v4"/><circle cx="15" cy="13" r="1"/><circle cx="18" cy="11" r="1"/><path d="M17.32 5H6.68a4 4 0 0 0-3.99 3.7l-.61 7.93A2 2 0 0 0 4.07 19h.86a2 2 0 0 0 1.84-1.21L8 15h8l1.23 2.79A2 2 0 0 0 19.07 19h.86a2 2 0 0 0 1.99-2.37l-.61-7.93A4 4 0 0 0 17.32 5z"/></svg></span>
                  <div className="fit-head"><span className="label no">NÃO</span><span className="rule"/><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></div>
                  <div className="fit-sub">Não é pra você se…</div>
                  <ul className="fit-list">
                    {['Seu foco é games, animação ou VFX','Você procura anatomia avançada','Você já é avançado no Zbrush','Você quer técnicas artísticas complexas e teoria pesada'].map((t,i)=>(
                      <li key={i}><span className="num r">0{i+1}</span>{t}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section id="modulos">
            <div className="w">
              <div className="cyber-heading rv">
                <h2 className="cyber-hs" style={{ marginBottom: 0 }}>MÓDULOS DO CURSO</h2>
                <p className="lede" style={{ marginTop: '16px' }}>Um caminho simples, em etapas, até seu primeiro modelo pronto pra imprimir</p>
              </div>
              <div className="modules-grid rv d1">
                {MODULES.map((m, i) => {
                  const isOpen = !!openModules[i];
                  return (
                    <div 
                      key={i} 
                      className={`module-card ${isOpen ? 'open' : ''}`}
                      id={`zdz-module-card-${i}`}
                      onClick={() => setOpenModules(prev => ({ ...prev, [i]: !prev[i] }))}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setOpenModules(prev => ({ ...prev, [i]: !prev[i] }));
                        }
                      }}
                    >
                      <div className="module-art">
                        <img src={m.img} alt={m.title} loading="lazy" />
                      </div>
                      
                      <div className="module-foot">
                        <div className="ch">{m.title}</div>
                        <div className="vm">
                          <span>{isOpen ? 'Fechar' : 'Ver detalhes'}</span>
                          <div className="module-trigger-icon">
                            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <line x1="12" y1="5" x2="12" y2="19" />
                              <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div className="module-details">
                        <div className="module-details-title">{m.title}</div>
                        <p className="module-details-desc">{m.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{textAlign:'center',marginTop:'56px'}} className="rv">
                <a href="#zdz-oferta" className="btn" id="zdz-modules-cta">Quero começar do zero <span className="arrow">→</span></a>
              </div>
            </div>
          </section>

          <section className="gua" id="garantia">
            <div className="w">
              <div className="gua-grid">
                <div className="left rv">
                  <div className="gua-medal">
                    <svg viewBox="0 0 400 400">
                      <defs><path id="zdz-c" d="M 200,200 m -160,0 a 160,160 0 1,1 320,0 a 160,160 0 1,1 -320,0"/></defs>
                      <circle cx="200" cy="200" r="190" fill="none" stroke="#fff" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="4 4"/>
                      <circle cx="200" cy="200" r="160" fill="none" stroke="transparent" strokeWidth="0"/>
                      <text fill="#fff" opacity="0.8" fontSize="20" letterSpacing="6" fontFamily="Inter,sans-serif" fontWeight="700">
                        <textPath href="#zdz-c" startOffset="0">GARANTIA · 7 DIAS · GARANTIA · 7 DIAS · GARANTIA · 7 DIAS · GARANTIA · 7 DIAS · GARANTIA · 7 DIAS · GARANTIA · 7 DIAS · </textPath>
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
                  <h2 className="gua-right-hd"><span className="grad">7 dias</span><br/>pra você decidir</h2>
                  <ul className="gua-list">
                    <li><div className="dot"/>Reembolso integral em qualquer momento dentro dos 7 primeiros dias.</li>
                    <li><div className="dot"/>Sem perguntas, sem formulário extenso, sem dor de cabeça.</li>
                  </ul>
                  <a href="#zdz-oferta" className="gua-btn" id="zdz-garantia-cta">Quero entrar sem risco →</a>
                </div>
              </div>
            </div>
          </section>

          <section id="zdz-oferta">
            <div className="w">
              <div className="price-card rv">
                <div className="price-ribbon">Oferta Especial</div>
                <div className="price-head">
                  <a className="logo"><Logo w={200} h={74}/></a>
                  <div className="price-name">Oferta <span className="it">Zbrush do Zero</span></div>
                  <div className="price-tag">Entre hoje e comece a modelar pra impressão 3D</div>
                </div>
                <div className="price-body">
                  <div className="price-amt">
                    <div className="price-pre">Investimento</div>
                    <div className="price-inst">12x de</div>
                    <div className="price-big">R$21,42</div>
                    <div className="price-juros">sem juros</div>
                    <div className="price-divider"/>
                    <div className="price-cash">ou à vista <strong style={{color:'var(--ink)'}}>R$257</strong></div>
                    <a href="https://pay.hotmart.com/H103748861J?checkoutMode=10" className="btn" id="zdz-checkout-cta">Quero começar agora <span className="arrow">→</span></a>
                  </div>
                  <div className="price-feats">
                    <div className="heading">O que você recebe</div>
                    <ul>
                      {['Curso gravado (aulas de 10–25min)','Método em etapas (sem travar)','Projeto final: personagem completo imprimível','Foco em impressão 3D','Garantia de 7 dias','Acesso vitalício','Acesso imediato pela Hotmart'].map((t,i)=>(
                        <li key={i}><span className="num">0{i+1}</span>{t}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Perguntas Frequentes */}
          <section className="faq" id="zdz-faq">
            <div className="w">
              <div className="cyber-heading rv" style={{ textAlign: 'center', marginBottom: '48px' }}>
                <div className="cyber-ey">Dúvidas comuns</div>
                <h2 className="cyber-hs">PERGUNTAS <span className="grad">FREQUENTES</span></h2>
              </div>

              <div className="faq-container rv d2">
                {zdzFaqList.map((f, i) => {
                  const isOpen = openFaqIndex === i;
                  return (
                    <div 
                      key={i} 
                      className={`faq-item ${isOpen ? 'open' : ''}`}
                      id={`zdz-faq-item-${i}`}
                    >
                      <div 
                        className="faq-q" 
                        onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                        id={`zdz-faq-q-${i}`}
                      >
                        <div className="faq-title">{f.q}</div>
                        <div className="faq-icon">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                          </svg>
                        </div>
                      </div>
                      <div className="faq-a">{f.a}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <footer className="rv" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px', padding: '96px 24px 64px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              <a href="#" id="zdz-footer-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'}); }}>
                <Logo w={130} h={48}/>
              </a>
              <p style={{ fontFamily: 'var(--n)', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', margin: 0, fontWeight: 700 }}>Escultura Digital & Impressão 3D</p>
            </div>
            
            <div className="social" style={{ marginBottom: 0, marginTop: 0, display: 'flex', gap: '24px' }}>
              <a href="https://www.instagram.com/cardoso.3d/" id="zdz-footer-social-instagram" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://www.youtube.com/@Cardoso.3d" id="zdz-footer-social-youtube" target="_blank" rel="noopener noreferrer" aria-label="YouTube" style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
              </a>
              <a href="https://www.twitch.tv/cardoso_3d" id="zdz-footer-social-twitch" target="_blank" rel="noopener noreferrer" aria-label="Twitch" style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}><path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/vinicius-cardoso-3370631b7/" id="zdz-footer-social-linkedin" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="https://www.artstation.com/viniciusnunes" id="zdz-footer-social-artstation" target="_blank" rel="noopener noreferrer" aria-label="ArtStation" style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}><circle cx="13.5" cy="13.5" r="8.5"/><path d="M7 10L5 6L2 11"/><path d="M8 21L10 17"/><path d="M19 10L21 6L23 11"/></svg>
              </a>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', borderTop: '1px solid rgba(255,255,255,0.05)', width: '100%', maxWidth: '384px', paddingTop: '32px' }}>
              <div style={{ display: 'flex', gap: '24px', fontFamily: 'var(--n)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
                <a href="#" id="zdz-footer-terms" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Termos</a>
                <a href="#" id="zdz-footer-privacy" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Privacidade</a>
              </div>
              <div className="copy" style={{ marginTop: '8px', opacity: 0.4, fontSize: '11px', fontFamily: 'var(--n)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>&copy; {new Date().getFullYear()} Cardoso3D Studio</div>
            </div>
          </footer>

        </main>

        {/* Lightbox Modal */}
        <div 
          className={`lightbox ${lbImg ? 'active' : ''}`}
          id="zdz-portfolio-lightbox"
          onClick={() => setLbImg(null)}
        >
          {lbImg && (
            <>
              <img src={lbImg} alt="Preview do modelo" onClick={(e) => e.stopPropagation()} />
              <button 
                className="lb-close" 
                onClick={() => setLbImg(null)} 
                aria-label="Fechar"
                id="zdz-portfolio-lightbox-close"
              >
                <X size={24} />
              </button>
            </>
          )}
        </div>
      </div>
    </>
  )
}
