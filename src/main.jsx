import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import "./styles.css";

const WA = "03196163938";
const PHONE = "03196163938";
const EMAIL = "flourishwellcounselingcenter@gmail.com";
const address = "101 Block B, Model Town, near Northern Bypass, Multan, Punjab, Pakistan";

const img = {
  hero: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1400&q=85",
  room: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1100&q=85",
  career: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1100&q=85",
  therapist: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=85",
  desk: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1000&q=85",
  online: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1100&q=85",
  books: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=900&q=85"
};

const services = [
  ["Individual Counseling","One-to-one psychological support tailored to your emotional, personal, and mental health needs.","person"],
  ["Career Counseling","Guidance for students, graduates, and professionals navigating education, career choices, and direction.","briefcase"],
  ["Family Counseling","Professional support for communication difficulties, conflict, parenting concerns, and emotional challenges.","family"],
  ["Addiction Counseling","Confidential professional support for individuals dealing with addiction and related emotional or behavioral concerns.","leaf"],
  ["Online Counseling","Access professional psychological support from the comfort and privacy of your own space.","monitor"],
  ["Group Counseling","Structured group support for people experiencing similar concerns and looking for guided growth.","group"]
];

const areas = ["Anxiety","Depression","Career Concerns","Relationships","Stress","Self-Esteem","Family Issues","Grief & Loss","Academic Pressure","Parenting","Addiction","Life Transitions"];

const courses = [
  {slug:"introduction-to-psychology",title:"Introduction to Psychology",duration:"2 months",desc:"A beginner-friendly foundation covering how people think, feel and behave.",topics:["Major schools and perspectives","Cognition, emotion and motivation","Learning, memory and personality","Applications of psychology in everyday life"]},
  {slug:"abnormal-psychology",title:"Abnormal Psychology",duration:"2 months",desc:"An introduction to psychological disorders, their symptoms, causes and treatment approaches.",topics:["Normal vs. abnormal behavior","Major diagnostic categories","Risk and protective factors","Overview of assessment and treatment"]},
  {slug:"developmental-psychology",title:"Developmental Psychology",duration:"2 months",desc:"Explores psychological development from infancy through adulthood and later life.",topics:["Major developmental theories","Cognitive, emotional and social development","Attachment and parenting","Developmental milestones and common concerns"]},
  {slug:"social-psychology",title:"Social Psychology",duration:"2 months",desc:"Examines how people’s thoughts, feelings and behavior are influenced by others and society.",topics:["Attitudes and persuasion","Social influence and conformity","Interpersonal relationships","Prejudice, stereotypes and group behavior"]},
  {slug:"personality-psychology",title:"Personality Psychology",duration:"2 months",desc:"Introduces major theories explaining individual differences in personality.",topics:["Trait, psychodynamic and humanistic approaches","Personality development","Personality assessment overview","Applications in counseling and clinical work"]},
  {slug:"positive-psychology",title:"Positive Psychology",duration:"2 months",desc:"Focuses on strengths, wellbeing, resilience and factors that help individuals flourish.",topics:["PERMA and wellbeing","Character strengths","Resilience and coping","Positive interventions and practical applications"]},
  {slug:"health-psychology",title:"Health Psychology",duration:"2 months",desc:"Explores the relationship between psychological factors, behavior and physical health.",topics:["Stress and health","Health behaviors and adherence","Psychological factors in chronic illness","Patient support and communication"]},
  {slug:"educational-psychology",title:"Educational Psychology",duration:"2 months",desc:"Introduces psychological principles that support learning, teaching and student wellbeing.",topics:["Learning theories","Motivation and classroom behavior","Individual differences","Student support and basic interventions"]},
  {slug:"organizational-industrial-psychology",title:"Organizational / Industrial Psychology",duration:"2 months",desc:"Explores psychology in workplaces and organizational settings.",topics:["Work motivation and job satisfaction","Leadership and teamwork","Employee wellbeing","Recruitment, performance and workplace behavior"]},

  {slug:"counseling-psychology",title:"Counseling Psychology",duration:"3 months",desc:"Builds a practical understanding of counseling, helping relationships and client-centered support.",topics:["Counseling process and ethics","Therapeutic relationship","Basic intervention skills","Case conceptualization and termination"]},
  {slug:"clinical-psychology-foundations-practice",title:"Clinical Psychology: Foundations & Practice",duration:"3 months",desc:"Introduces the role and core skills of a clinical psychologist in assessment and intervention.",topics:["Clinical interview","Assessment and formulation","Treatment planning","Professional ethics and documentation"]},
  {slug:"basic-counseling-skills",title:"Basic Counseling Skills",duration:"3 months",desc:"A practical skills course for developing effective communication and helping skills.",topics:["Active listening and empathy","Open and closed questions","Reflection and summarizing","Boundaries and therapeutic communication"]},
  {slug:"advanced-counseling-skills",title:"Advanced Counseling Skills",duration:"3 months",desc:"Develops higher-level skills for working with complex client presentations.",topics:["Challenging conversations","Resistance and ambivalence","Goal setting","Managing difficult sessions"]},
  {slug:"introduction-to-psychotherapy",title:"Introduction to Psychotherapy",duration:"3 months",desc:"Provides an overview of major psychotherapy approaches and how they are used in practice.",topics:["Psychodynamic, humanistic and behavioral approaches","Integrative therapy","Treatment planning","Therapist skills and ethics"]},
  {slug:"diagnosis-assessment-dsm-5-tr",title:"Diagnosis & Assessment According to DSM-5-TR",duration:"3 months",desc:"Introduces structured clinical thinking for understanding symptoms and diagnostic criteria.",topics:["DSM-5-TR structure and terminology","Diagnostic criteria and differential diagnosis","Case-based diagnostic practice","Assessment limitations and ethical considerations"]},
  {slug:"history-taking-mental-status-examination",title:"History Taking & Mental Status Examination",duration:"3 months",desc:"Teaches systematic clinical history taking and mental status examination.",topics:["Presenting complaint and history","Psychiatric and personal history","MSE domains","Clinical documentation and case presentation"]},
  {slug:"psychological-assessment-report-writing",title:"Psychological Assessment & Report Writing",duration:"3 months",desc:"Introduces the principles of psychological assessment and professional clinical reporting.",topics:["Assessment planning","Interview and test selection","Interpreting findings","Clear, ethical report writing"]},
  {slug:"clinical-case-formulation",title:"Clinical Case Formulation",duration:"3 months",desc:"Teaches how to organize client information into a meaningful psychological formulation.",topics:["Predisposing, precipitating and maintaining factors","Protective factors","Biopsychosocial formulation","Linking formulation to treatment goals"]},
  {slug:"differential-diagnosis-clinical-practice",title:"Differential Diagnosis in Clinical Practice",duration:"3 months",desc:"Develops skills for distinguishing between disorders with overlapping symptoms.",topics:["Diagnostic reasoning","Differential diagnosis","Comorbidity","Case-based practice and referral decisions"]},
  {slug:"risk-assessment-crisis-intervention",title:"Risk Assessment & Crisis Intervention",duration:"3 months",desc:"Introduces safe, structured approaches to assessing risk and responding to psychological crises.",topics:["Risk and protective factors","Crisis assessment","Safety planning principles","Referral and emergency response"]},
  {slug:"trauma-informed-counseling",title:"Trauma-Informed Counseling",duration:"3 months",desc:"Introduces compassionate, safety-focused approaches for clients affected by trauma.",topics:["Trauma responses","Safety and stabilization","Grounding and coping","Avoiding re-traumatization"]},
  {slug:"child-adolescent-counseling",title:"Child & Adolescent Counseling",duration:"3 months",desc:"Focuses on developmental and counseling considerations when working with younger clients.",topics:["Child development and assessment","Play and age-appropriate communication","Parent involvement","Common childhood and adolescent concerns"]},
  {slug:"grief-loss-counseling",title:"Grief & Loss Counseling",duration:"3 months",desc:"Explores psychological responses to loss and supportive counseling approaches.",topics:["Grief processes","Complicated and prolonged grief overview","Supportive interventions","Cultural and ethical considerations"]},

  {slug:"cbt-cognitive-behavioral-therapy",title:"CBT — Cognitive Behavioral Therapy",duration:"6 months",desc:"A structured, evidence-based approach for understanding and changing unhelpful thoughts and behaviors.",topics:["CBT model and case conceptualization","Automatic thoughts and cognitive restructuring","Behavioral techniques","Treatment planning and relapse prevention"]},
  {slug:"rebt-rational-emotive-behavior-therapy",title:"REBT — Rational Emotive Behavior Therapy",duration:"6 months",desc:"Explores the ABC model and techniques for challenging irrational beliefs.",topics:["ABC framework","Irrational vs. rational beliefs","Disputation techniques","Homework and behavior change"]},
  {slug:"dbt-dialectical-behavior-therapy",title:"DBT — Dialectical Behavior Therapy",duration:"6 months",desc:"Introduces skills-based therapy for emotion regulation, distress tolerance and interpersonal effectiveness.",topics:["Mindfulness","Distress tolerance","Emotion regulation","Interpersonal effectiveness"]},
  {slug:"act-acceptance-commitment-therapy",title:"ACT — Acceptance & Commitment Therapy",duration:"6 months",desc:"Introduces psychological flexibility and values-based behavioral change.",topics:["Acceptance and cognitive defusion","Values clarification","Committed action","Mindfulness-based exercises"]},
  {slug:"person-centered-therapy",title:"Person-Centered Therapy",duration:"6 months",desc:"Explores Carl Rogers’ humanistic approach and the therapeutic conditions that support change.",topics:["Empathy, congruence and unconditional positive regard","Client-led therapy","Therapeutic relationship","Practical counseling skills"]},
  {slug:"solution-focused-brief-therapy",title:"Solution-Focused Brief Therapy",duration:"6 months",desc:"A goal-oriented approach that emphasizes strengths, resources and preferred futures.",topics:["Miracle question and scaling","Exceptions and strengths","Goal setting","Brief intervention planning"]},
  {slug:"family-couples-counseling",title:"Family & Couples Counseling",duration:"6 months",desc:"Introduces systemic perspectives for understanding relationship and family difficulties.",topics:["Family systems concepts","Communication patterns","Conflict and relationship dynamics","Basic intervention strategies"]},
  {slug:"addiction-counseling",title:"Addiction Counseling",duration:"6 months",desc:"Develops an understanding of substance and behavioral addictions and counseling approaches.",topics:["Addiction concepts and risk factors","Screening and assessment overview","Motivational interviewing principles","Relapse prevention and recovery support"]},
  {slug:"trauma-assessment-intervention",title:"Trauma Assessment & Intervention",duration:"6 months",desc:"Advanced exploration of trauma assessment and evidence-informed intervention planning.",topics:["Trauma history and clinical assessment","PTSD and trauma-related presentations","Stabilization and treatment planning","Referral and multidisciplinary care"]},
  {slug:"suicide-risk-assessment-prevention",title:"Suicide Risk Assessment & Prevention",duration:"6 months",desc:"Introduces structured approaches to identifying suicide risk and developing safety-focused responses.",topics:["Warning signs and risk factors","Protective factors","Clinical inquiry and safety planning","Documentation, referral and emergency procedures"]},
  {slug:"depression-assessment-intervention",title:"Depression: Assessment & Intervention",duration:"6 months",desc:"Focuses on recognizing depressive presentations and developing appropriate psychological intervention plans.",topics:["Assessment and differential diagnosis","CBT-based intervention principles","Behavioral activation","Monitoring progress and referral"]},
  {slug:"childhood-disorders",title:"Childhood Disorders",duration:"6 months",desc:"Explores common psychological and behavioral difficulties in children and their assessment.",topics:["Neurodevelopmental and behavioral presentations","Assessment considerations","Parent and school collaboration","Intervention and referral principles"]},
  {slug:"neuropsychology-introduction-applications",title:"Neuropsychology: Introduction & Applications",duration:"6 months",desc:"Introduces brain-behavior relationships and common neuropsychological concepts.",topics:["Brain and behavior basics","Cognitive domains","Neuropsychological assessment overview","Clinical and rehabilitation applications"]},
  {slug:"eating-disorders-assessment-management",title:"Eating Disorders: Assessment & Management",duration:"6 months",desc:"Introduces the recognition, assessment and multidisciplinary management of eating disorders.",topics:["Common presentations and warning signs","Assessment principles","Psychological treatment overview","Medical risk and referral"]},
  {slug:"forensic-psychology",title:"Forensic Psychology",duration:"6 months",desc:"Explores psychological principles applied to legal and criminal justice settings.",topics:["Forensic assessment overview","Psychology and law","Risk assessment","Ethics and professional boundaries"]}
];

const resources = [
  ["Understanding Anxiety","Mental Health","A gentle introduction to anxiety, common experiences, and when professional support can help."],
  ["Managing Exam Stress","Students","Practical ways students can create healthier routines around academic pressure."],
  ["Choosing a Career","Career","Questions that can help students and young professionals make more informed career decisions."],
  ["Healthy Boundaries","Relationships","An introduction to boundaries, communication, and healthier relationships."],
  ["Supporting Children's Emotional Wellbeing","Parenting","A parent-friendly starting point for understanding children's emotional needs."]
];

function Icon({name, size=24}) {
  const common={width:size,height:size,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.7",strokeLinecap:"round",strokeLinejoin:"round"};
  const paths={
    person:<><circle cx="12" cy="7" r="3"/><path d="M5 20c.7-3.7 3-5.5 7-5.5s6.3 1.8 7 5.5"/><path d="M3 10h3M18 10h3"/></>,
    briefcase:<><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2"/></>,
    family:<><circle cx="8" cy="8" r="2.7"/><circle cx="16" cy="8" r="2.7"/><circle cx="12" cy="6" r="2.2"/><path d="M3.5 19c.4-3 2-4.5 4.5-4.5s4.1 1.5 4.5 4.5M11.5 19c.4-3 2-4.5 4.5-4.5s4.1 1.5 4.5 4.5M8 12h8"/></>,
    leaf:<><path d="M20 4C10 4 5 8 5 14c0 3 2 5 5 5 6 0 10-5 10-15Z"/><path d="M4 21c2.5-5 6-8 11-10"/></>,
    monitor:<><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></>,
    group:<><circle cx="12" cy="8" r="3"/><path d="M5 20c.5-4 2.7-6 7-6s6.5 2 7 6"/><path d="M5.5 10.5a2.5 2.5 0 1 1 0-5M18.5 10.5a2.5 2.5 0 1 0 0-5"/></>,
    calendar:<><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M8 2v4M16 2v4M3 9h18M8 13h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01"/></>,
    arrow:<><path d="M5 12h13"/><path d="m13 6 6 6-6 6"/></>,
    menu:<><path d="M4 7h16M4 12h16M4 17h16"/></>,
    close:<><path d="m6 6 12 12M18 6 6 18"/></>,
    quote:<><path d="M8 9H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3v-7ZM21 9h-3a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3v-7Z"/></>,
    check:<><path d="m5 12 4 4L19 6"/></>,
    phone:<><path d="M7 3h3l1.5 4-2 1.5a14 14 0 0 0 6 6L17 12l4 1.5V17c0 2-1 3-3 3C10 20 4 14 4 6c0-2 1-3 3-3Z"/></>,
    mail:<><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></>,
    pin:<><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    plus:<><path d="M12 5v14M5 12h14"/></>,
    external:<><path d="M14 5h5v5M19 5l-8 8"/><path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5"/></>
  };
  return <svg {...common}>{paths[name] || paths.leaf}</svg>
}

function WhatsApp({message="Hello Flourish Well Counseling Center. I would like to inquire about booking a counseling session.", label="Chat on WhatsApp", className=""}) {
  return <a className={`wa-btn ${className}`} href={`https://wa.me/92${WA.slice(1)}?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer"><span className="wa-mark" aria-hidden="true"><svg viewBox="0 0 32 32" role="img"><path fill="currentColor" d="M16 3.2C9 3.2 3.3 8.8 3.3 15.8c0 2.3.6 4.5 1.8 6.4L3 28.8l6.8-2.1c1.9 1 4 1.5 6.2 1.5 7 0 12.7-5.7 12.7-12.7S23 3.2 16 3.2Zm0 22.8c-2 0-4-.5-5.7-1.5l-.4-.2-4 .1 1.2-3.8-.3-.4c-1.1-1.7-1.7-3.7-1.7-5.7C5.1 9.2 10 4.4 16 4.4s10.9 4.9 10.9 10.9S22 26 16 26Zm5.9-8.1c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-1.5-.7-2.5-1.3-3.5-2.9-.3-.5.3-.4.9-1.4.1-.2.1-.4 0-.6-.1-.2-.7-1.7-.9-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.6s1.1 3 1.2 3.2c.2.2 2.2 3.4 5.4 4.7 2 .8 2.7.9 3.6.8.6-.1 1.9-.8 2.2-1.6.3-.8.3-1.5.2-1.7-.1-.2-.3-.3-.6-.4Z"/></svg></span>{label}</a>
}

function Button({to, children, variant="primary", onClick, href}) {
  if (href) return <a className={`btn ${variant}`} href={href}>{children}<Icon name="arrow" size={17}/></a>;
  if (to) return <Link className={`btn ${variant}`} to={to}>{children}<Icon name="arrow" size={17}/></Link>;
  return <button className={`btn ${variant}`} onClick={onClick}>{children}<Icon name="arrow" size={17}/></button>;
}

function useMeta(title, description) {
  useEffect(() => {
    document.title = title;
    let meta=document.querySelector('meta[name="description"]');
    if(meta) meta.setAttribute("content",description);
  },[title,description]);
}

function ScrollTop() {
  const {pathname}=useLocation();
  useEffect(()=>{
    const id=window.requestAnimationFrame(()=>window.scrollTo({top:0,left:0,behavior:"auto"}));
    return ()=>window.cancelAnimationFrame(id);
  },[pathname]);
  return null;
}

function Header() {
  const [open,setOpen]=useState(false);
  const nav=[["About","/about"],["Services","/services"],["Training & Courses","/courses"],["Resources","/resources"]];
  return <header className="header">
    <div className="nav-wrap">
      <Link to="/" className="brand brand-logo" onClick={()=>setOpen(false)}>
        <img src="/logo.png" alt="Flourish Well Counseling Center"/>
      </Link>
      <nav className={`nav ${open?"open":""}`}>
        <NavLink to="/" end onClick={()=>setOpen(false)}>Home</NavLink>
        {nav.map(([label,to])=><NavLink key={to} to={to} onClick={()=>setOpen(false)}>{label}</NavLink>)}
        <NavLink to="/psychologist" onClick={()=>setOpen(false)}>Psychologist</NavLink>
        <Link to="/book-appointment" className="nav-book" onClick={()=>setOpen(false)}>Book Appointment</Link>
        <WhatsApp label="" className="nav-wa"/>
      </nav>
      <button className="menu-btn" aria-label="Open menu" onClick={()=>setOpen(!open)}><Icon name={open?"close":"menu"} size={25}/></button>
    </div>
  </header>
}

function MobileBar() {
  return <div className="mobile-bar">
    <a href={`https://wa.me/92${WA.slice(1)}`} target="_blank" rel="noreferrer"><span>◔</span> WhatsApp</a>
    <a href={`tel:${PHONE}`}><Icon name="phone" size={18}/> Call</a>
    <Link to="/book-appointment"><Icon name="calendar" size={18}/> Book</Link>
  </div>
}

function Footer() {
  return <footer className="footer">
    <div className="container footer-grid">
      <div className="footer-brand">
        <div className="brand inverse brand-logo footer-logo"><img src="/logo.png" alt="Flourish Well Counseling Center"/></div>
        <p>Your mental health matters.</p>
        <p className="muted">A calm, professional space for counseling, career direction, and growth.</p>
      </div>
      <div><h4>Explore</h4><Link to="/about">About</Link><Link to="/services">Services</Link><Link to="/courses">Training & Courses</Link><Link to="/resources">Resources</Link></div>
      <div><h4>Get Support</h4><Link to="/book-appointment">Book Appointment</Link><WhatsApp label="WhatsApp" className="footer-wa"/><a href={`tel:${PHONE}`}>Call</a><Link to="/faq">FAQ</Link></div>
      <div><h4>Contact</h4><p>{address}</p><a href={`tel:${PHONE}`}>{PHONE}</a><a href={`mailto:${EMAIL}`}>{EMAIL}</a><p><b>Office</b><br/>Mon–Sat · 10:00 AM–5:00 PM</p><p><b>Online</b><br/>Mon–Fri · 6:00 PM–8:00 PM</p></div>
    </div>
    <div className="container footer-bottom"><span>© 2026 Flourish Well Counseling Center</span><span><Link to="/privacy">Privacy Policy</Link> · <Link to="/terms">Terms & Conditions</Link></span></div>
  </footer>
}

function Layout({children}) {
  return <><Header/><main>{children}</main><Footer/><MobileBar/><div className="float-wa"><WhatsApp label=""/></div></>
}

function SectionHead({eyebrow, title, copy, align="center"}) {
  return <div className={`section-head ${align}`}><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{copy&&<p>{copy}</p>}</div>
}

function Home() {
  useMeta("Flourish Well Counseling Center | You Deserve to Flourish","Professional counseling and psychological support in Multan, with online sessions available across Pakistan.");
  return <>
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy reveal">
          <span className="eyebrow">YOUR MENTAL HEALTH MATTERS</span>
          <h1>You Deserve<br/><em>to Flourish</em></h1>
          <p className="lead">Professional counseling and psychological support in Multan, with online sessions available across Pakistan.</p>
          <div className="actions"><Button to="/book-appointment">Book an Appointment</Button><Button to="/book-appointment?mode=online" variant="outline">Start Online Counseling</Button></div>
          <a className="text-link" href={`https://wa.me/92${WA.slice(1)}?text=${encodeURIComponent("Hello, I would like to speak with Flourish Well Counseling Center.")}`} target="_blank" rel="noreferrer">Talk to us on WhatsApp <Icon name="arrow" size={15}/></a>
          <div className="trust-row"><span><Icon name="check" size={16}/> Confidential</span><span><Icon name="check" size={16}/> Professional Support</span><span><Icon name="check" size={16}/> In-Person + Online</span><span><Icon name="check" size={16}/> 45-Minute Sessions</span></div>
        </div>
        <div className="hero-visual">
          <img className="hero-img" src={img.hero} alt="Warm counseling room with plants and natural light"/>
          <div className="hero-inset"><span>Private · Calm · Professional</span><img src={img.room} alt="Calm therapy room"/></div>
        </div>
      </div>
    </section>

    <section className="intro section">
      <div className="container narrow intro-inner">
        <span className="eyebrow">A SAFE SPACE TO BEGIN</span>
        <h2>A Safe Space to<br/><em>Understand, Heal & Grow</em></h2>
        <p>At Flourish Well Counseling Center, we provide compassionate and professional psychological support for children, teenagers, students, adults, parents, families, and professionals.</p>
        <p>Whether you're struggling with anxiety, depression, relationships, academic pressure, career uncertainty, addiction, or simply want to understand yourself better, we're here to help.</p>
        <Button to="/about" variant="text">Learn About Flourish Well</Button>
      </div>
    </section>

    <section className="section services-section">
      <div className="container"><SectionHead eyebrow="HOW WE CAN SUPPORT YOU" title="Our Counseling Services"/>
        <div className="service-grid">{services.map(([title,desc,icon])=><Link className="service-card" to="/services" key={title}><div className="icon-circle"><Icon name={icon}/></div><h3>{title}</h3><p>{desc}</p><span>Learn more <Icon name="arrow" size={15}/></span></Link>)}</div>
      </div>
    </section>

    <section className="marquee-section"><div className="marquee"><div>{areas.map(a=><span key={a}>{a} <b>•</b></span>)}{areas.map(a=><span key={"x"+a}>{a} <b>•</b></span>)}</div></div></section>


    <section className="section split-section">
      <div className="container split-grid">
        <InfoPanel title="In-Person Counseling" accent="Multan Center" img={img.room} hours={<>Monday – Saturday<br/><b>10:00 AM – 5:00 PM</b></>} copy="Meet with us in a private, comfortable and professional environment." to="/book-appointment"/>
        <InfoPanel title="Online Counseling" accent="Across Pakistan" img={img.online} hours={<>Monday – Friday<br/><b>6:00 PM – 8:00 PM</b></>} copy="Access professional counseling from the comfort and privacy of your own space." to="/book-appointment?mode=online"/>
      </div>
    </section>

    <PsychologistPreview/>
    <TrainingPreview/>
    <B2B/>
    <Testimonials/>
    <FinalCTA/>
  </>
}

function InfoPanel({title,accent,img:photo,hours,copy,to}) {
  return <article className="info-panel"><img src={photo} alt={title}/><div className="info-body"><div className="icon-circle filled"><Icon name={title.startsWith("Online")?"monitor":"pin"}/></div><span className="mini-accent">{accent}</span><h3>{title}</h3><p>{copy}</p><div className="hours"><Icon name="calendar" size={20}/><span>{hours}</span></div><Button to={to} variant="dark">Book Session</Button></div></article>
}

function PsychologistPreview() {
  return <section className="section psychologist-preview"><div className="container psych-grid">
    <div className="psych-photo"><img src={img.therapist} alt="Professional psychologist in a warm office"/><div className="quote-bubble"><Icon name="quote" size={23}/><p>My goal is to help you understand yourself better, heal and create a meaningful life.</p><small>Summen Waseem</small></div></div>
    <div className="psych-copy"><span className="eyebrow">MEET YOUR PSYCHOLOGIST</span><h2>Summen Waseem</h2><p className="role">Clinical Psychologist · Psychotherapist · Addiction Counselor</p><div className="credential-columns"><ul>{["BS Psychology — BZU, 2021–2025","Advanced Diploma in Clinical Psychology — USP","CBT Certified","Graphology Certified"].map(x=><li key={x}><Icon name="check" size={15}/>{x}</li>)}</ul><ul>{["Psychotherapist","ACT","REBT","DBT","Addiction Counselor"].map(x=><li key={x}><Icon name="check" size={15}/>{x}</li>)}</ul></div><p className="small-note"><b>Experience</b><br/>CMH · 1.5 months<br/>South Punjab Rehab Center (details to be verified)<br/>Flourish Well Online Counseling & Training Center</p><Button to="/psychologist">View Profile</Button></div>
  </div></section>
}

function TrainingPreview() {
  return <section className="section training-preview"><div className="container"><div className="training-top"><div><span className="eyebrow">TRAINING & COURSES</span><h2>Learn. Grow. <em>Build Your Practice.</em></h2><p>Practical psychology and mental-health training designed for students, professionals, educators, caregivers, and aspiring counselors.</p></div><Button to="/courses" variant="outline">View All Courses</Button></div><div className="course-grid">{courses.map(c=><CourseCard key={c.slug} course={c}/>)}</div></div></section>
}

function CourseCard({course}) {
  return <article className="course-card"><div className="course-icon"><Icon name="leaf" size={25}/></div><span className="course-status">ENROLLMENT OPEN</span><h3>{course.title}</h3><p>{course.desc}</p><div className="course-meta"><span>{course.duration}</span><strong>{course.fee || "Contact for details"}</strong></div><Link to={`/courses/${course.slug}`}>View course <Icon name="arrow" size={15}/></Link></article>
}

function B2B() {
  return <section className="section b2b"><div className="container b2b-inner"><div><span className="eyebrow light">FOR ORGANIZATIONS</span><h2>Building a Mental Health Product?</h2><p>We partner with organizations, startups, clinics, NGOs, schools and wellness platforms to design clinically informed mental-health products and programs.</p></div><ul>{["Mental health PRD consulting","Clinical content & workflow design","Therapist training & supervision","Program design & impact assessment"].map(x=><li key={x}><Icon name="check" size={16}/>{x}</li>)}</ul><Button to="/contact" variant="cream">Request a Proposal</Button></div></section>
}

function Testimonials() {
  const items=[["“Counseling at Flourish Well helped me manage my anxiety and build confidence. I feel more in control of my life.”","— Student"],["“The career counseling session was insightful. It helped me choose the right path for my future.”","— University Student"],["“A safe, supportive and professional environment. Highly recommended for anyone seeking guidance.”","— Parent"]];
  return <section className="section testimonials"><div className="container"><SectionHead eyebrow="WHAT OUR CLIENTS SAY" title="Why Clients Choose Flourish Well" copy="A few words that reflect the experience we want every visitor to have."/><div className="testimonial-grid">{items.map(([q,n])=><article key={n}><Icon name="quote" size={22}/><p>{q}</p><strong>{n}</strong></article>)}</div><p className="consent-note">Testimonials shown here are illustrative MVP content. Obtain written consent before publishing real client feedback.</p></div></section>
}

function FinalCTA() {
  return <section className="final-cta"><div className="container final-inner"><div><span className="eyebrow">TAKE THE FIRST STEP TODAY</span><h2>Your Wellbeing Matters.</h2><p>We are here for you with confidential, professional support.</p></div><div className="actions"><Button to="/book-appointment">Book an Appointment</Button><WhatsApp/></div></div></section>
}

function PageHero({eyebrow,title,copy}) {
  return <section className="page-hero"><div className="container"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1>{copy&&<p>{copy}</p>}</div></section>
}

function About() {
  useMeta("About Flourish Well | Counseling Center Multan","Learn about Flourish Well Counseling Center and its calm, confidential, evidence-informed approach.");
  return <><PageHero eyebrow="ABOUT FLOURISH WELL" title={<>A Professional Space for <em>Mental Wellbeing</em></>} copy="Compassionate, confidential and evidence-informed support for people at different stages of life."/>
  <section className="section"><div className="container story-grid"><div><img className="rounded-img tall" src={img.room} alt="Warm, private counseling environment"/></div><div className="prose"><span className="eyebrow">OUR APPROACH</span><h2>Care that feels human.</h2><p>Flourish Well Counseling Center was created with a simple belief: mental health deserves the same care, attention, and professionalism as physical health.</p><p>We provide compassionate, confidential, and evidence-informed psychological support designed around each individual's needs.</p><p>Our work focuses not only on reducing symptoms, but also on helping people understand themselves, develop healthier patterns, build confidence, and move forward.</p><Button to="/book-appointment">Start a Conversation</Button></div></div></section>
  <section className="section sage"><div className="container"><SectionHead eyebrow="WHY FLOURISH WELL" title="Professional care, without the clinical coldness."/><div className="pillars">{[["01","Professional","Qualified psychological and counseling expertise."],["02","Confidential","A safe environment where clients can speak openly."],["03","Evidence-Informed","Approaches including CBT, ACT, REBT and DBT."],["04","Client-Centered","Your needs and wellbeing remain the priority."],["05","Flexible","Both in-person and online counseling options."],["06","Growth Focused","Supporting healing, personal development and meaningful change."]].map(([n,t,d])=><article key={n}><b>{n}</b><h3>{t}</h3><p>{d}</p></article>)}</div></div></section><PsychologistPreview/><FinalCTA/></>
}

function Services() {
  useMeta("Counseling Services in Multan | Flourish Well","Explore individual, career, family, addiction, online and group counseling services.");
  return <><PageHero eyebrow="HOW WE CAN SUPPORT YOU" title={<>Counseling that meets you <em>where you are.</em></>} copy="Professional psychological support for children, teenagers, students, adults, families and professionals."/>
  <section className="section"><div className="container service-page-grid">{services.map(([t,d,i])=><article className="service-detail" key={t}><div className="icon-circle"><Icon name={i}/></div><h2>{t}</h2><p>{d}</p><Link to="/book-appointment">Book this service <Icon name="arrow" size={15}/></Link></article>)}</div></section>
  <section className="section soft"><div className="container"><SectionHead eyebrow="AREAS WE HELP WITH" title="Support for life's difficult seasons"/><div className="areas-grid">{areas.map(a=><span key={a}><Icon name="leaf" size={15}/>{a}</span>)}</div></div></section><FinalCTA/></>
}

function Courses() {
  const [filter,setFilter]=useState("All");
  useMeta("Psychology & Mental Health Training Courses | Flourish Well","Explore practical psychology, psychotherapy, assessment and clinical psychology courses.");
  return <><PageHero eyebrow="TRAINING & COURSES" title={<>Learn. Grow. <em>Build Your Practice.</em></>} copy="Structured psychology and clinical training for psychology students, graduates, counselors and mental-health professionals."/>
  <section className="section"><div className="container"><div className="filter-row"><button className={filter==="All"?"active":""} onClick={()=>setFilter("All")}>All courses</button><button className={filter==="2 months"?"active":""} onClick={()=>setFilter("2 months")}>2 months</button><button className={filter==="3 months"?"active":""} onClick={()=>setFilter("3 months")}>3 months</button><button className={filter==="6 months"?"active":""} onClick={()=>setFilter("6 months")}>6 months</button></div><div className="course-grid course-grid-large">{courses.filter(c=>filter==="All"||c.duration===filter).map(c=><CourseCard key={c.slug} course={c}/>)}</div></div></section></>
}

function CourseDetail() {
  const {slug}=useParams(); const c=courses.find(x=>x.slug===slug);
  if(!c) return <NotFound/>;
  useMeta(`${c.title} | Flourish Well Training`,`${c.title} — ${c.duration}. Explore modules and enroll with Flourish Well.`);
  return <><PageHero eyebrow="TRAINING PROGRAM" title={<>{c.title}</>} copy={c.desc}/><section className="section"><div className="container course-detail-grid"><div className="course-main"><div className="course-stats"><span><b>Duration</b>{c.duration}</span><span><b>Fee</b>{c.fee || "Contact for details"}</span><span><b>Mode</b>Contact for schedule</span><span><b>Certificate</b>{c.certificate?"Provided":"Contact for details"}</span></div><h2>What You Will Learn</h2><div className="module-grid">{c.topics.map((x,i)=><div key={x}><b>0{i+1}</b><span>{x}</span></div>)}</div><h2>Who This Course Is For</h2><p>Students, psychology learners, early-career professionals, educators and people looking to build practical knowledge in mental health and psychological practice.</p></div><aside className="enroll-card"><span className="eyebrow">READY TO LEARN?</span><h3>Enroll in {c.title}</h3><p>Submit your details and our team will contact you about the next available schedule.</p><Button to={`/courses/${c.slug}/enroll`}>Enroll Now</Button></aside></div></section></>
}

function Enrollment() {
  const {slug}=useParams(); const c=courses.find(x=>x.slug===slug)||courses[0];
  useMeta(`Enroll — ${c.title} | Flourish Well`,"Course enrollment request for Flourish Well Counseling Center.");
  return <><PageHero eyebrow="COURSE ENROLLMENT" title={<>Enroll in <em>{c.title}</em></>} copy="Complete the official registration form to submit your course application."/><section className="section"><div className="container form-wrap"><div className="form-card"><span className="eyebrow">OFFICIAL REGISTRATION</span><h3>Register for a course</h3><p>Your registration will be submitted through Flourish Well's Google Form and saved to the Google Sheet connected to that form.</p><p><b>Selected course:</b> {c.title}</p><a className="btn primary" href="https://forms.gle/XJJKLfs1QDyE16Hr5" target="_blank" rel="noreferrer">Open Course Registration Form <Icon name="arrow" size={17}/></a><p className="privacy-note" style={{marginTop:18}}>The Google Form opens in a new tab. Complete and submit it there so your response is recorded.</p></div></div></section></>
}

function FormField({label,name,type="text",required=false,placeholder=""}){return <label>{label}<input name={name} type={type} required={required} placeholder={placeholder}/></label>}
function Success({title,copy}){return <div className="success"><div className="success-icon"><Icon name="check" size={30}/></div><h2>{title}</h2><p>{copy}</p><div className="actions"><Button to="/">Return Home</Button><WhatsApp/></div></div>}

function Appointment() {
  useMeta("Book an Appointment | Flourish Well Counseling Center","Register for psychological counseling with Flourish Well.");
  return <><PageHero eyebrow="BOOK AN APPOINTMENT" title={<>Take the first step <em>at your pace.</em></>} copy="Use the official psychological registration form to share your details and request a counseling session."/>
  <section className="section"><div className="container appointment-layout"><div className="form-side"><div className="form-card"><span className="eyebrow">OFFICIAL PSYCHOLOGICAL REGISTRATION</span><h3>Register for psychological counseling</h3><p>Click below to complete Flourish Well's online psychological registration form. When you submit it, your response will be recorded in the Google Sheet connected to that form.</p><a className="btn primary" href="https://forms.gle/WTBNEqAcW595kowe8" target="_blank" rel="noreferrer">Open Psychological Registration Form <Icon name="arrow" size={17}/></a><p className="privacy-note" style={{marginTop:18}}>The Google Form opens in a new tab. Your appointment is not confirmed until the team contacts you to confirm availability. Please avoid sharing more sensitive information than the form requests.</p></div></div>
  <aside className="appointment-side"><div className="side-card"><span className="eyebrow">NEED A QUICKER RESPONSE?</span><h3>Talk to us directly.</h3><p>To ask about availability, mention your preferred session mode and date/time.</p><WhatsApp label="Chat on WhatsApp"/><a className="side-link" href={`tel:${PHONE}`}><Icon name="phone" size={18}/>{PHONE}</a></div><div className="side-card"><span className="eyebrow">SESSION FEES</span><h3>Individual sessions</h3><p><b>Online</b><br/>Rs. 3,000</p><p><b>Physical / In-person</b><br/>Rs. 4,000</p><p className="muted">Typical session length: approximately 45 minutes.</p></div></aside></div></section></>
}
function Psychologist() {
  useMeta("Meet Your Psychologist | Summen Waseem | Flourish Well","Professional profile for Summen Waseem, Clinical Psychologist, Psychotherapist and Addiction Counselor.");
  return <><PageHero eyebrow="MEET YOUR PSYCHOLOGIST" title={<>Summen <em>Waseem</em></>} copy="Clinical Psychologist · Psychotherapist · Addiction Counselor"/>
  <section className="section"><div className="container psych-profile"><div className="profile-image"><img src={img.therapist} alt="Professional psychologist portrait"/></div><div className="profile-copy"><span className="eyebrow">PROFESSIONAL PROFILE</span><h2>A calm, collaborative approach.</h2><p>The goal is to create a space where clients can speak openly, understand themselves better, and work toward meaningful change.</p><div className="profile-columns"><div><h4>Education & Credentials</h4><ul className="check-list">{["BS Psychology — BZU, 2021–2025","Advanced Diploma in Clinical Psychology — USP","CBT Certified","Graphology Certified","Psychotherapist","ACT · REBT · DBT","Addiction Counselor"].map(x=><li key={x}><Icon name="check" size={15}/>{x}</li>)}</ul></div><div><h4>Experience</h4><p><b>CMH</b><br/>1.5 months</p><p><b>South Punjab Rehab Multan</b><br/>Working since 2024.</p><p><b>Flourish Well Online Counseling & Training Center</b></p></div></div><div className="verification"><b>Publication note</b><p>The PRD asks that exact degree titles, institutional names, experience dates, and any licensing/registration claims be verified before launch.</p></div><Button to="/book-appointment">Book a Session</Button></div></div></section><FinalCTA/></>
}

function Resources() {
  useMeta("Mental Health Resources | Flourish Well","Mental health, student wellbeing, career and relationship resources from Flourish Well.");
  return <><PageHero eyebrow="RESOURCES" title={<>Mental Health <em>Resources</em></>} copy="A growing library of approachable educational content around mental health, students, careers, relationships and parenting."/>
  <section className="section"><div className="container resource-grid">{resources.map(([title,cat,desc],i)=><article className="resource-card" key={title}><div className="resource-image"><img src={[img.books,img.desk,img.career,img.room,img.online][i]} alt=""/></div><span>{cat}</span><h3>{title}</h3><p>{desc}</p><button onClick={()=>alert("Resource article placeholder — connect to the future blog/CMS in Phase 2.")}>Read resource <Icon name="arrow" size={15}/></button></article>)}</div></section><section className="section soft"><div className="container narrow"><div className="disclaimer"><b>Educational disclaimer</b><p>Information provided on this website is for general educational purposes and is not a substitute for professional psychological assessment or emergency care. If you are experiencing an immediate crisis or believe you may be in danger, seek immediate in-person assistance or contact your local emergency service.</p></div></div></section></>
}

function FAQ() {
  const qs=[["What is counseling?","Counseling is a professional process that can help people understand their thoughts, emotions, behaviors, relationships and life challenges, and work toward meaningful goals."],["How long is a counseling session?","A typical session is approximately 45 minutes."],["Do you offer online counseling?","Yes. Online counseling is available Monday–Friday, 6:00 PM–8:00 PM, subject to confirmation."],["Do you provide in-person counseling?","Yes. In-person counseling is available in Multan, Monday–Saturday, 10:00 AM–5:00 PM."],["Who can seek counseling?","Children, teenagers, university students, young adults, adults, parents, families and professionals can seek support."],["Is counseling confidential?","Counseling is intended to be confidential, subject to applicable professional and legal exceptions. The center should finalize and publish its exact confidentiality policy before launch."],["How do I book an appointment?","You can request an appointment online, contact the center by WhatsApp or phone, or email the center. A request is followed by availability confirmation."]];
  const [open,setOpen]=useState(0);
  useMeta("FAQ | Flourish Well Counseling Center","Frequently asked questions about counseling, online sessions, confidentiality and booking.");
  return <><PageHero eyebrow="FAQ" title={<>Questions, answered <em>gently.</em></>} copy="A quick guide to counseling, session formats and booking."/><section className="section"><div className="container faq-wrap">{qs.map(([q,a],i)=><article className={`faq ${open===i?"open":""}`} key={q}><button onClick={()=>setOpen(open===i?-1:i)}><span>{q}</span><Icon name={open===i?"close":"plus"} size={19}/></button>{open===i&&<div><p>{a}</p></div>}</article>)}</div></section><FinalCTA/></>
}

function Contact() {
  const [sent,setSent]=useState(false);
  useMeta("Contact Flourish Well | Multan","Contact Flourish Well Counseling Center in Model Town, Multan by phone, WhatsApp or email.");
  return <><PageHero eyebrow="CONTACT" title={<>Let's <em>talk.</em></>} copy="Reach out by phone, WhatsApp, email, or send a message using the form."/><section className="section"><div className="container contact-grid"><div className="contact-info"><span className="eyebrow">CONTACT INFORMATION</span><h2>We're here to help you take the first step.</h2><div className="contact-item"><Icon name="pin"/><div><b>Address</b><p>{address}</p></div></div><div className="contact-item"><Icon name="phone"/><div><b>Phone / WhatsApp</b><p><a href={`tel:${PHONE}`}>{PHONE}</a></p></div></div><div className="contact-item"><Icon name="mail"/><div><b>Email</b><p><a href={`mailto:${EMAIL}`}>{EMAIL}</a></p></div></div><div className="contact-hours"><b>Office hours</b><p>Monday–Saturday: 10:00 AM–5:00 PM<br/>Online: Monday–Friday: 6:00 PM–8:00 PM</p></div><WhatsApp label="Chat on WhatsApp"/></div><div>{sent?<Success title="Message received." copy="Thank you. A member of the team can follow up using the details you provided."/>:<form className="form-card" onSubmit={e=>{e.preventDefault();setSent(true)}}><h3>Send a message</h3><FormField label="Full Name" name="name" required/><div className="two-col"><FormField label="Phone" name="phone" required/><FormField label="Email" name="email" type="email"/></div><label>What can we help with?<textarea rows="6" placeholder="Please avoid sharing highly sensitive medical information." required/></label><button className="btn primary" type="submit">Send Message <Icon name="arrow" size={17}/></button></form>}</div></div></section><section className="map-placeholder"><div><Icon name="pin" size={30}/><h3>Flourish Well Counseling Center</h3><p>Model Town, Multan</p><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`} target="_blank" rel="noreferrer">Open in Google Maps <Icon name="external" size={15}/></a></div></section></>
}

function Legal({type}) {
  const privacy=type==="privacy";
  useMeta(`${privacy?"Privacy Policy":"Terms & Conditions"} | Flourish Well`,`${privacy?"Privacy policy":"Terms and conditions"} for Flourish Well Counseling Center.`);
  return <><PageHero eyebrow="LEGAL" title={privacy?<>Privacy <em>Policy</em></>:<>Terms & <em>Conditions</em></>} copy="Please have the final legal wording reviewed and approved by the center before launch."/><section className="section"><div className="container legal prose"><h2>{privacy?"Your information":"Using this website"}</h2>{privacy?<><p>Flourish Well should only collect information needed to respond to appointment, contact and course inquiries. Avoid submitting detailed medical histories or highly sensitive information through public forms.</p><h3>Information submitted</h3><p>Appointment and course forms may include name, contact details, selected service/course, preferred date/time and a brief message. The production implementation should use HTTPS, secure storage or forwarding, access controls and appropriate retention practices.</p><h3>Third parties</h3><p>WhatsApp and external map services are optional communication/navigation links. Their own privacy policies may apply when you use them.</p></>:<><p>Website information is provided for general educational and informational purposes. It is not a substitute for professional psychological assessment or emergency care.</p><h3>Appointments</h3><p>Submitting a booking request does not itself guarantee an appointment. The center should confirm availability and any applicable policies directly.</p><h3>Training</h3><p>Course schedules, fees, certificates and availability should be confirmed by Flourish Well before enrollment.</p></>}<h3>Disclaimer</h3><p>If you are experiencing an immediate crisis or believe you may be in danger, seek immediate in-person assistance or contact your local emergency service.</p></div></section></>
}

function NotFound(){return <><PageHero eyebrow="404" title={<>This page took a <em>different path.</em></>} copy="Let's get you somewhere useful."/><section className="section center"><Button to="/">Return Home</Button></section></>}

function App(){
  return <BrowserRouter><ScrollTop/><Layout><Routes>
    <Route path="/" element={<Home/>}/><Route path="/about" element={<About/>}/><Route path="/services" element={<Services/>}/><Route path="/courses" element={<Courses/>}/><Route path="/courses/:slug" element={<CourseDetail/>}/><Route path="/courses/:slug/enroll" element={<Enrollment/>}/><Route path="/psychologist" element={<Psychologist/>}/><Route path="/resources" element={<Resources/>}/><Route path="/faq" element={<FAQ/>}/><Route path="/book-appointment" element={<Appointment/>}/><Route path="/contact" element={<Contact/>}/><Route path="/privacy" element={<Legal type="privacy"/>}/><Route path="/terms" element={<Legal type="terms"/>}/><Route path="*" element={<NotFound/>}/>
  </Routes></Layout></BrowserRouter>
}
createRoot(document.getElementById("root")).render(<App/>);
