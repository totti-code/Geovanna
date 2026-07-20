import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaHeart, FaMusic, FaPause, FaRedoAlt, FaTimes } from 'react-icons/fa'
import { GiCardJoker } from 'react-icons/gi'
import confetti from 'canvas-confetti'
import Background from './components/Background'
import { GlitchTitle, NeonButton, Section, TypeLine } from './components/UI'
import { cantadas } from './data/cantadas'
import { siteConfig as cfg } from './config'

const KEY = 'geovanna-chaos-progress-v1'
const phaseMotion = { initial:{ opacity:0, x:80, scale:.97, filter:'blur(12px)' }, animate:{ opacity:1, x:0, scale:1, filter:'blur(0px)' }, exit:{ opacity:0, x:-80, scale:1.03, filter:'blur(14px)' }, transition:{ duration:.7, ease:[.22,1,.36,1] } }
const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {} } catch { return {} } }
const save = value => localStorage.setItem(KEY, JSON.stringify(value))

function Intro({ onFinish }) {
  const [phase, setPhase] = useState(0), [progress, setProgress] = useState(15)
  useEffect(() => {
    const steps = [[700,35],[1450,65],[2200,100]]
    const timers = steps.map(([t,p]) => setTimeout(() => setProgress(p), t))
    timers.push(setTimeout(() => setPhase(1), 3000))
    return () => timers.forEach(clearTimeout)
  }, [])
  return <motion.div className="intro" exit={{ opacity: 0, scale: 1.15, filter: 'blur(20px)' }} transition={{ duration: 1 }}>
    <div className="scanline"/><motion.div className="terminal-card" initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }}>
      {phase === 0 ? <>
        <p className="terminal-label">{cfg.titulo}</p><GlitchTitle>ACESSANDO O BANCO DE DADOS...</GlitchTitle><p className="typing">PROCURANDO {cfg.para.toUpperCase()}...</p>
        <div className="progress"><motion.i animate={{ width: `${progress}%` }}/></div><span className="progress-num">{progress}%</span>
      </> : <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <GlitchTitle className="error">IDENTIFICADA!!!</GlitchTitle>
        <div className="database-profile"><p><span>IDADE:</span><b>CONFIDENCIAL</b></p><p><span>NÍVEL DE FOFURA:</span><b>ILEGAL</b></p><p><span>NÍVEL DE CAOS:</span><b>ALTO</b></p><p><span>NÍVEL DE PACIÊNCIA COM O TOTTI:</span><b>EM ANÁLISE</b></p></div>
        <div className="danger-report"><div><p className="eyebrow">PERIGO:</p><ul><li>Faz rir.</li><li>Faz passar mais tempo no celular.</li><li>Vício em conversar.</li></ul></div><div className="danger-status"><span>STATUS:</span><strong>ALTAMENTE PERIGOSA.</strong></div></div>
        <NeonButton onClick={onFinish}>Continuar por sua conta e risco</NeonButton>
      </motion.div>}
    </motion.div>
  </motion.div>
}

function MusicButton() {
  const audio = useRef(null), [playing,setPlaying] = useState(false), [failed,setFailed] = useState(false)
  const toggle = async () => { try { if (playing) audio.current.pause(); else await audio.current.play(); setPlaying(!playing); setFailed(false) } catch { setFailed(true) } }
  return <div className="music-wrap"><audio ref={audio} src={cfg.musica} loop onEnded={()=>setPlaying(false)}/><button className={`round-button ${playing?'playing':''}`} onClick={toggle} aria-label={playing?'Pausar música':'Tocar música'}>{playing?<FaPause/>:<FaMusic/>}{playing&&<span className="sound-bars"><i/><i/><i/></span>}</button>{failed&&<span className="music-tip">Adicione tema.mp3 em public/music</span>}</div>
}

function TottiTinder({ onComplete }) {
  const cards=[{label:'Chocolate?',icon:'🍫'},{label:'Dormir?',icon:'🌙'},{label:'Pizza?',icon:'🍕'},{label:'Sair comigo?',icon:'🎭'}]
  const [index,setIndex]=useState(0), [error,setError]=useState(false)
  const like=()=>{setError(false);if(index===cards.length-1)onComplete();else setIndex(i=>i+1)}
  const dislike=()=>setError(true)
  return <section className="tinder-screen"><div className="case-number">MATCH EXPERIMENTAL • TOTTI EDITION</div><h1>TINDER DO <em>TOTTI</em></h1><p className="tinder-sub">Escolha com cuidado. O sistema pode ser um pouco tendencioso.</p>
    <div className="tinder-deck"><AnimatePresence mode="wait"><motion.div key={index} className="tinder-card" initial={{opacity:0,x:90,rotate:8}} animate={{opacity:1,x:0,rotate:0}} exit={{opacity:0,x:-120,rotate:-12}} transition={{type:'spring',stiffness:170,damping:18}}><span className="tinder-count">{index+1} / {cards.length}</span><div className="tinder-icon">{cards[index].icon}</div><h2>{cards[index].label}</h2><div className="tinder-actions"><motion.button whileTap={{scale:.85}} className="dislike" onClick={dislike}><FaTimes/><span>DESLIKE</span></motion.button><motion.button whileTap={{scale:.85}} className="like" onClick={like}><FaHeart/><span>LIKE</span></motion.button></div></motion.div></AnimatePresence></div>
    <AnimatePresence>{error&&<motion.div className="invalid-answer" initial={{opacity:0,scale:.8}} animate={{opacity:1,scale:1,x:[-6,6,-3,0]}}><b>RESPOSTA INVÁLIDA</b><span>TENTE NOVAMENTE KKKKK</span></motion.div>}</AnimatePresence>
  </section>
}

function Accusation({ onDone, onNext }) {
  const [verdict,setVerdict]=useState(false)
  const defenses=['Não fui eu','Foi sem querer','Sou inocente']
  const choose=()=>{setVerdict(true);onDone()}
  return <Section eyebrow="TRIBUNAL DO CAOS • PROCESSO #021" title="GEOVANNA ESTÁ SENDO ACUSADA DE:">
    {!verdict?<motion.div className="accusation-card" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
      <div className="charges"><p>Roubar sorrisos <b>+100</b></p><p>Ser bonita demais <b>+200</b></p><p>Fazer o Totti ficar olhando o celular <b>+500</b></p><p>Ser responsável por pensamentos aleatórios do Totti durante o dia <b>+999</b></p></div>
      <h3>Qual será sua defesa?</h3><div className="defense-grid">{defenses.map(x=><motion.button key={x} whileHover={{x:5}} onClick={choose}><i/> {x}</motion.button>)}</div>
    </motion.div>:<motion.div className="verdict" initial={{opacity:0,scale:.72,rotate:-3}} animate={{opacity:1,scale:1,rotate:0}} transition={{type:'spring',duration:.8}}>
      <p className="eyebrow">VEREDITO FINAL</p><GlitchTitle>CULPADA.</GlitchTitle><span>Pena aplicada:</span><h3>Continuar sendo maluca.</h3><NeonButton onClick={onNext}>Aceitar sentença →</NeonButton>
    </motion.div>}
  </Section>
}

function Quiz({ onDone, onNext }) {
  const options=['Netflix','Café','Dormir até tarde','Geovanna'], [message,setMessage]=useState(''), [done,setDone]=useState(false)
  const wrong=['Resposta suspeita detectada.','Tem certeza disso?','O sistema discorda respeitosamente.','Tente novamente.']
  const answer = x => { if(x==='Geovanna'){setDone(true);setMessage('Parabéns. Você desbloqueou +500 pontos de simpatia.');onDone()} else setMessage(wrong[Math.floor(Math.random()*wrong.length)]) }
  return <Section id="quiz" eyebrow="TESTE DE COMPATIBILIDADE • 01" title="Quem anda roubando alguns dos sorrisos do Totti?">
    <div className="answer-grid">{options.map(x=><motion.button disabled={done} whileHover={{y:-4}} key={x} onClick={()=>answer(x)} className={done&&x==='Geovanna'?'correct':''}>{x}</motion.button>)}</div>
    <AnimatePresence mode="wait"><motion.p key={message} className={`feedback ${done?'success':''}`} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}>{message}</motion.p></AnimatePresence>
    {done&&<NeonButton onClick={onNext}>Próxima fase →</NeonButton>}
  </Section>
}

function Pickups({ onNext }) {
  const [index,setIndex]=useState(0), [visible,setVisible]=useState(false)
  const next=()=>{let n; do n=Math.floor(Math.random()*cantadas.length); while(n===index); setIndex(n);setVisible(true)}
  return <Section eyebrow="PROTOCOLO DE FLERTE EXPERIMENTAL" title="MANUAL DO CAOS" className="manual">
    <p className="lead">Frases de procedência duvidosa e efeitos colaterais desconhecidos.</p>
    <div className="pickup-box"><AnimatePresence mode="wait">{visible?<motion.p key={index} initial={{opacity:0,rotateX:70,y:20}} animate={{opacity:1,rotateX:0,y:0}} exit={{opacity:0,y:-20}} transition={{type:'spring'}}><span>“</span>{cantadas[index]}<span>”</span></motion.p>:<p className="muted">Pressione o botão por sua conta e risco.</p>}</AnimatePresence></div>
    <div className="phase-actions"><NeonButton onClick={next}><GiCardJoker/> Gerar cantada #{visible?index+1:'?'}</NeonButton>{visible&&<button className="ghost-next" onClick={onNext}>Continuar aventura →</button>}</div><small>{cantadas.length} frases caóticas disponíveis</small>
  </Section>
}

function TottiFlix({ onDone, onNext }) {
  const favorites=[{rank:'1°',name:'Comida',icon:'🍔',tag:'Sempre em alta'},{rank:'2°',name:'Dormir',icon:'😴',tag:'Série de longa duração'},{rank:'3°',name:'Conversar com Geovanna',icon:'💬',tag:'Nova favorita'}]
  const advance=()=>{onDone();onNext()}
  return <Section eyebrow="FASE • ME CONHEÇA MELHOR" className="tottiflix">
    <div className="flix-logo"><span>TOTTI</span>FLIX</div><h2 className="flix-heading">TOP 3 COISAS FAVORITAS:</h2>
    <div className="flix-list">{favorites.map((item,i)=><motion.div className="flix-item" key={item.name} initial={{opacity:0,x:55}} animate={{opacity:1,x:0}} transition={{delay:i*.18}} whileHover={{scale:1.035,y:-4}}><strong>{item.rank}</strong><div className="flix-poster"><span>{item.icon}</span></div><div className="flix-info"><b>{item.name}</b><small>{item.tag}</small><i>{96-i*2}% relevante</i></div></motion.div>)}</div>
    <p className="flix-note">(essa ordem muda dependendo do horário)</p><NeonButton onClick={advance}>Próximo episódio →</NeonButton>
  </Section>
}

function SecretFiles({ onDone, onNext }) {
  const [stage,setStage]=useState('cinema'), [checks,setChecks]=useState(0)
  const items=['Brisa agradável','Céu estrelado','Conversas legais','Companhia agradável']
  const unlock=()=>{setStage('unlocking');setTimeout(()=>{setStage('beach');items.forEach((_,i)=>setTimeout(()=>setChecks(i+1),700*(i+1)));setTimeout(()=>{setStage('result');onDone()},3900)},2100)}
  return <div className={`secret-files ${stage!=='cinema'?'night-mode':''}`}><div className="stars" aria-hidden="true">{[...Array(32)].map((_,i)=><i key={i} style={{'--sx':`${(i*47)%100}%`,'--sy':`${(i*73)%90}%`,'--sd':`${2+i%4}s`}}/>)}</div><Section eyebrow="ARQUIVOS SECRETOS DO TOTTI" className="files-content">
    <AnimatePresence mode="wait">
      {stage==='cinema'&&<motion.div key="cinema" className="case-file" initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} exit={{opacity:0,scale:1.1,filter:'blur(15px)'}}><p className="file-number">ARQUIVO #001</p><div className="file-grid"><FileRow label="LOCALIZAÇÃO" value="CINEMA"/><FileRow label="STATUS" value="CONCLUÍDO COM SUCESSO."/></div><p className="eyebrow">RESULTADOS:</p><ul><li>Muitas risadas.</li><li>Momentos legais.</li><li>Aprovação do sistema: 10/10.</li></ul><div className="recommendation"><span>RECOMENDAÇÃO:</span><strong>REPETIR A EXPERIÊNCIA.</strong></div><NeonButton onClick={unlock}>Desbloquear próximo arquivo →</NeonButton></motion.div>}
      {stage==='unlocking'&&<motion.div key="unlocking" className="unlocking-file" initial={{opacity:0,scale:.7}} animate={{opacity:1,scale:1}}><div className="orbit-lock">✦</div><GlitchTitle>DESBLOQUEANDO...</GlitchTitle><p>ARQUIVO #002</p><div className="progress"><motion.i initial={{width:0}} animate={{width:'100%'}} transition={{duration:1.8}}/></div></motion.div>}
      {stage==='beach'&&<motion.div key="beach" className="case-file beach-file" initial={{opacity:0}} animate={{opacity:1}}><p className="file-number">ARQUIVO #002</p><div className="file-grid"><FileRow label="LOCALIZAÇÃO" value="PRAIA (MODO NOTURNO)"/><FileRow label="STATUS" value="CONCLUÍDO COM MUITO SUCESSO."/></div><p className="eyebrow">ANALISANDO...</p><div className="check-list">{items.map((x,i)=><motion.p key={x} animate={{opacity:checks>i?1:.2,x:checks>i?0:-8}}>{x} <b>{checks>i?'✔':'...'}</b></motion.p>)}</div></motion.div>}
      {stage==='result'&&<motion.div key="result" className="case-file star-result" initial={{opacity:0,scale:.8}} animate={{opacity:1,scale:1}}><p className="approved">RESULTADO: <b>100% APROVADO.</b></p><GlitchTitle className="error">ERRO DETECTADO!!!!</GlitchTitle><h3>Não foi possível identificar<br/>qual das estrelas era a mais bonita.</h3><div className="reason"><span>MOTIVO:</span><strong>A Geovanna estava presente.</strong></div><NeonButton onClick={onNext}>Continuar aventura →</NeonButton></motion.div>}
    </AnimatePresence>
  </Section></div>
}

function FileRow({label,value}) { return <div className="file-row"><span>{label}:</span><strong>{value}</strong></div> }

function PasswordSecret({ onDone, onNext }) {
  const [password,setPassword]=useState(''), [error,setError]=useState(false), [open,setOpen]=useState(false)
  const submit=e=>{e.preventDefault();if(password.trim().toUpperCase()==='GEOVANNA'){setOpen(true);setError(false);onDone()}else{setError(true);setPassword('')}}
  return <Section eyebrow="ARQUIVO CRIPTOGRAFADO • ACESSO SECRETO" title={open?'ACESSO AUTORIZADO':'Digite a senha:'} className="password-phase">
    {!open?<form className="password-form" onSubmit={submit}><div className="password-input"><input autoFocus value={password} onChange={e=>{setPassword(e.target.value);setError(false)}} placeholder="________" aria-label="Senha secreta" autoComplete="off"/><span>{password.length}/8</span></div><NeonButton type="submit">Desbloquear arquivo</NeonButton><AnimatePresence mode="wait">{error&&<motion.p className="password-error" initial={{opacity:0,x:-12}} animate={{opacity:1,x:[-5,5,-3,0]}}>Senha incorreta.</motion.p>}</AnimatePresence><div className="password-hint"><b>DICA:</b><span>A senha possui 8 letras.</span></div></form>:
    <motion.div className="unlocked-message" initial={{opacity:0,scale:.85}} animate={{opacity:1,scale:1}}><div className="unlock-icon">♥</div><p className="eyebrow">VOCÊ DESBLOQUEOU UM SEGREDO DO TOTTI.</p><h3>Eu queria ter falado com você há um bom tempo já...</h3><NeonButton onClick={onNext}>Continuar →</NeonButton></motion.div>}
  </Section>
}

function SecretHeart({ unlocked, onUnlock }) {
  const [clicks,setClicks]=useState(0), [show,setShow]=useState(false)
  const hit=()=>{const n=clicks+1;setClicks(n);if(n>=5){setShow(true);onUnlock()}}
  return <><button onClick={hit} className="secret-heart" aria-label="Coração misterioso"><FaHeart/></button><AnimatePresence>{show&&<motion.div className="secret-modal" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setShow(false)}><motion.div className="terminal-card" initial={{scale:.6,rotate:-4}} animate={{scale:1,rotate:0}} onClick={e=>e.stopPropagation()}><GlitchTitle>MODO CAOS DESBLOQUEADO</GlitchTitle><p className="eyebrow">SÓ ENTRE NÓS...</p><h2>O Totti fica sorrindo quando aparece uma notificação sua.</h2><p>E isso provavelmente já é tarde demais para corrigir.</p><NeonButton onClick={()=>setShow(false)}>Guardar segredo</NeonButton></motion.div></motion.div>}</AnimatePresence>{unlocked&&<span className="secret-badge">SEGREDO DESBLOQUEADO</span>}</>
}

function Finale() {
  const destinations=['Paris','Lua','Disney','Fortaleza','Japão','Hamburgueria','Sorveteria','Kart','Outro cinema','Outra praia']
  const [stage,setStage]=useState('future'), [destination,setDestination]=useState('???')
  const scan=()=>{setStage('scanning');let i=0;const timer=setInterval(()=>{setDestination(destinations[i%destinations.length]);i++},105);setTimeout(()=>{clearInterval(timer);setStage('error')},2800)}
  const send=()=>{setStage('sent');setTimeout(()=>setStage('report'),1700)}
  return <Section className="future-finale">
    <AnimatePresence mode="wait">
      {(stage==='future'||stage==='scanning')&&<motion.div key="future" className="future-analysis" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,scale:1.1,filter:'blur(15px)'}}><p className="eyebrow">PRÓXIMO ENCONTRO</p><GlitchTitle>ANÁLISE DO FUTURO</GlitchTitle><div className="past-places"><span>Cinema <b>✔</b></span><span>Praia <b>✔</b></span></div>{stage==='future'?<NeonButton onClick={scan}>Calcular próximo destino →</NeonButton>:<div className="destination-scan"><p>Calculando próximo destino...</p><AnimatePresence mode="wait"><motion.strong key={destination} initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-18}}>{destination}</motion.strong></AnimatePresence><div className="progress"><motion.i animate={{width:'96%'}} transition={{duration:2.8}}/></div></div>}</motion.div>}
      {stage==='error'&&<motion.div key="error" className="future-error" initial={{opacity:0,scale:.7}} animate={{opacity:1,scale:1}}><GlitchTitle className="error">ERRO!!!</GlitchTitle><h3>Não foi possível calcular.</h3><div className="availability-reason"><span>MOTIVO DO ERRO:</span><p>O próximo encontro depende<br/>da disponibilidade da Geovanna.</p></div><NeonButton onClick={send}>LIBERAR DISPONIBILIDADE</NeonButton></motion.div>}
      {stage==='sent'&&<motion.div key="sent" className="request-sent" initial={{opacity:0,scale:.7}} animate={{opacity:1,scale:1}}><div>✓</div><GlitchTitle>PEDIDO ENVIADO COM SUCESSO.</GlitchTitle><p>Gerando relatório final...</p></motion.div>}
      {stage==='report'&&<motion.div key="report" className="season-report" initial={{opacity:0,y:60}} animate={{opacity:1,y:0}}><p className="eyebrow">RELATÓRIO FINAL</p><h2>Depois de todos os cálculos realizados...</h2><div className="approval-summary"><span>Cinema: <b>APROVADO.</b></span><span>Praia à noite: <b>APROVADO.</b></span></div><div className="current-status"><span>STATUS ATUAL:</span><strong>Aguardando o episódio 03.</strong></div><div className="season-box"><div className="season-header"><b>TEMPORADA 01</b><span>TOTTIFLIX</span></div><Episode number="01" title="Cinema" status="✔ Assistido"/><Episode number="02" title="Praia à noite" status="✔ Assistido"/><Episode number="03" title="Em produção..." status="AGUARDANDO" pending/></div><p className="coming-soon">(Em breve nos melhores cinemas,<br/>praias ou lugares aleatórios.)</p><div className="signature"><span>{cfg.assinatura[0]}</span><strong>{cfg.assinatura[1]}</strong></div></motion.div>}
    </AnimatePresence>
  </Section>
}

function Episode({number,title,status,pending=false}) { return <div className={`episode ${pending?'pending':''}`}><strong>{number}</strong><div><b>EP {number} — {title}</b><span>{status}</span></div>{pending&&<i/>}</div> }

export default function App() {
  const initial=load(), [entered,setEntered]=useState(initial.entered||false), [progress,setProgress]=useState(initial), [phase,setPhase]=useState(initial.phase||0), [resetOpen,setResetOpen]=useState(false)
  const mark=k=>setProgress(p=>{const n={...p,[k]:true,entered:true};save(n);return n})
  const enter=()=>{setEntered(true);mark('entered');setTimeout(()=>window.scrollTo(0,0),50)}
  const next=()=>setPhase(p=>{const n=Math.min(p+1,7);const data={...load(),phase:n};save(data);return n})
  const reset=()=>{localStorage.removeItem(KEY);window.location.reload()}
  return <main><Background/><AnimatePresence mode="wait">{!entered?<Intro key="intro" onFinish={enter}/>:<motion.div key="story" initial={{opacity:0}} animate={{opacity:1}}>
    <header className="topbar"><div className="brand"><GiCardJoker/><span>ARQUIVO <b>G.</b></span></div><div><span className="progress-chip">{phase+1}/8 FASES</span><MusicButton/><button className="round-button" onClick={()=>setResetOpen(true)} aria-label="Reiniciar"><FaRedoAlt/></button></div></header>
    <div className={`phase-stage phase-${phase}`}><div className="harley-photo" aria-hidden="true"/><AnimatePresence mode="wait">
      {phase===0&&<motion.div key="tinder" className="phase-screen" {...phaseMotion}><TottiTinder onComplete={next}/></motion.div>}
      {phase===1&&<motion.div key="accusation" className="phase-screen" {...phaseMotion}><Accusation onDone={()=>mark('accusation')} onNext={next}/></motion.div>}
      {phase===2&&<motion.div key="quiz" className="phase-screen" {...phaseMotion}><Quiz onDone={()=>mark('quiz')} onNext={next}/></motion.div>}
      {phase===3&&<motion.div key="manual" className="phase-screen" {...phaseMotion}><Pickups onNext={next}/></motion.div>}
      {phase===4&&<motion.div key="tottiflix" className="phase-screen" {...phaseMotion}><TottiFlix onDone={()=>mark('tottiflix')} onNext={next}/></motion.div>}
      {phase===5&&<motion.div key="secret-files" className="phase-screen" {...phaseMotion}><SecretFiles onDone={()=>mark('secretFiles')} onNext={next}/></motion.div>}
      {phase===6&&<motion.div key="password" className="phase-screen" {...phaseMotion}><PasswordSecret onDone={()=>mark('password')} onNext={next}/></motion.div>}
      {phase===7&&<motion.div key="finale" className="phase-screen" {...phaseMotion}><Finale/></motion.div>}
    </AnimatePresence></div>
    <SecretHeart unlocked={progress.secret} onUnlock={()=>mark('secret')}/>
    <AnimatePresence>{resetOpen&&<motion.div className="secret-modal" initial={{opacity:0}} animate={{opacity:1}} onClick={()=>setResetOpen(false)}><div className="confirm" onClick={e=>e.stopPropagation()}><h3>Reiniciar o arquivo?</h3><p>Todo o progresso e o segredo descoberto serão apagados deste navegador.</p><div><button onClick={()=>setResetOpen(false)}>Cancelar</button><NeonButton onClick={reset}>Reiniciar</NeonButton></div></div></motion.div>}</AnimatePresence>
  </motion.div>}</AnimatePresence></main>
}
