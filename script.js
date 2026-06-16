import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCGzv19D25q6ySnd7CFdfZI28SYW20oCNY",
  authDomain: "dasdasd-f9f5e.firebaseapp.com",
  projectId: "dasdasd-f9f5e",
  storageBucket: "dasdasd-f9f5e.firebasestorage.app",
  messagingSenderId: "557206660933",
  appId: "1:557206660933:web:2a9275c20f6f299623c02c",
  measurementId: "G-B589VDLY7S"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {
    // --- i18n Logic ---
    const translations = {
        ko: {
            nav_evolution: "AI 진화",
            nav_about: "정의",
            nav_tech: "핵심 기술",
            nav_apps: "활용 분야",
            nav_community: "커뮤니티",
            nav_comm_lounge: "커뮤니티 라운지",
            nav_inquiry: "문의하기",
            hero_h1: "Physical AI <span class='highlight'>Nexus</span>",
            hero_p: "Intelligence in Motion, Excellence in Action",
            hero_btn_learn: "알아보기",
            hero_btn_tech: "기술 탐색",
            evo_title: "AI Evolution",
            evo_subtitle: "보는 AI, 그리는 AI를 넘어 실제 세상을 움직이는 피지컬 AI로의 진화",
            evo_1_h: "Perception AI",
            evo_1_p: "인지: 환경을 구별하는 눈",
            evo_2_h: "Generative AI",
            evo_2_p: "생성: 창작하는 손",
            evo_3_h: "Agentic AI",
            evo_3_p: "자율: 계획하는 뇌",
            evo_4_h: "Physical AI",
            evo_4_p: "행동: 옮기는 로봇",
            about_title: "What is Physical AI?",
            about_subtitle: "센서와 카메라를 통해 주변 환경을 인식하고, 스스로 판단하여 실제 행동을 수행하는 차세대 지능형 시스템",
            about_item1_h: "주변 인식",
            about_item1_p: "카메라, 라이다(LiDAR), 센서를 통해 현실 세계의 데이터를 실시간으로 파악합니다.",
            about_item2_h: "지능적 판단",
            about_item2_p: "딥러닝과 강화학습을 통해 상황을 분석하고 최적의 행동 방침을 결정합니다.",
            about_item3_h: "물리적 행동",
            about_item3_p: "결정된 로직에 따라 로봇 팔이나 차량의 조향을 물리적으로 제어합니다.",
            tech_title: "Core Technologies",
            tech_subtitle: "Physical AI를 지탱하는 5가지 핵심 기술 기둥",
            tech_1_h: "Computer Vision",
            tech_1_p: "사람, 사물, 장애물을 완벽히 식별하여 공간 지각 능력을 부여합니다.",
            tech_2_h: "Sensor Fusion",
            tech_2_p: "Camera, LiDAR, GPS, Radar 데이터를 통합하여 정밀한 상황 인식을 지원합니다.",
            tech_3_h: "Reinforcement Learning",
            tech_3_p: "시뮬레이션과 실습을 통한 수억 번의 시행착오 끝에 최적의 거동을 학습합니다.",
            tech_4_h: "Digital Twin",
            tech_4_p: "가상 공간에 실제 환경을 복제하여 안전하고 빠른 기술 검증을 가능케 합니다.",
            tech_5_h: "Edge AI",
            tech_5_p: "지연 없는 실시간 판단을 위해 장치 내에서 직접 고성능 AI를 구동합니다.",
            chall_title: "Physical AI Challenges",
            chall_subtitle: "기술적 임계점을 돌파하기 위한 혁신적 솔루션",
            chall_1_h: "데이터 부족",
            chall_1_p: "디지털 트윈 기반의 가상 가속 학습을 통해 수억 시간의 데이터를 생성합니다.",
            chall_2_h: "Sim2Real 격차",
            chall_2_p: "실시간 오차 수정 알고리즘을 적용하여 현실 세계에 즉각 최적화합니다.",
            chall_3_h: "연산 지연",
            chall_3_p: "온디바이스 최적화를 통해 인터넷 연결 없이도 즉각적인 물리 제어가 가능합니다.",
            app_title: "Industry Applications",
            app_subtitle: "글로벌 주요 산업군에서 실시간으로 발생하는 지능형 변화",
            app_1_h: "스마트 팩토리",
            app_1_p: "자동 물류 및 지능형 생산 공정 혁신을 주도합니다.",
            app_2_h: "자율주행",
            app_2_p: "완벽한 주변 환경 인식을 통한 안전한 이동을 보장합니다.",
            app_3_h: "무인 드론",
            app_3_p: "자율 비행 및 고정밀 시설 점검 시스템을 구축합니다.",
            app_4_h: "의료 로봇",
            app_4_p: "정밀 수술 보조 및 환자 케어 자동화를 실현합니다.",
            leader_title: "Global Leaders",
            leader_subtitle: "Physical AI 분야를 선도하는 글로벌 테크 자이언트",
            vision_title: "Future Vision 2030",
            vision_subtitle: "인간과 로봇이 공존하는 지능형 세상을 향한 로드맵",
            vision_1_h: "Humanoid Era",
            vision_1_p: "가사 및 서비스 현장에서 인간과 완벽히 상호작용하는 휴머노이드 보급",
            vision_2_h: "AI Factory",
            vision_2_p: "생산부터 출하까지 전 과정이 지능형 로봇에 의해 자율적으로 운영되는 공장",
            vision_3_h: "Level 5 World",
            vision_3_p: "사고 없는 도로와 하늘을 완성하는 완전 자율주행 모빌리티 생태계",
            comm_title: "Community Lounge",
            comm_subtitle: "미래 기술을 논하는 피지컬 AI 연구자들의 열린 공간입니다.",
            comm_inquiry_btn: "문의하기 (Inquiry)",
            form_name: "이름",
            form_pass: "비밀번호",
            form_title: "제목",
            form_content: "내용",
            form_file: "첨부파일",
            form_submit: "게시글 등록하기",
            form_org: "소속/기업명",
            form_email: "이메일",
            form_msg: "문의 내용",
            form_send: "문의 보내기",
            contact_title: "Direct Inquiry",
            contact_subtitle: "기술 협력 및 비즈니스 문의",
            contact_info_h: "Contact Info",
            contact_info_p: "새로운 물리적 지능의 시대를 함께 열어갈 파트너를 기다립니다."
        },
        en: {
            nav_evolution: "AI Evolution",
            nav_about: "Definition",
            nav_tech: "Tech",
            nav_apps: "Apps",
            nav_community: "Community",
            nav_comm_lounge: "Community Lounge",
            nav_inquiry: "Inquiry",
            hero_h1: "Physical AI <span class='highlight'>Nexus</span>",
            hero_p: "Intelligence in Motion, Excellence in Action",
            hero_btn_learn: "Learn More",
            hero_btn_tech: "Explore Tech",
            evo_title: "AI Evolution",
            evo_subtitle: "Evolution from seeing and drawing AI to Physical AI that moves the world",
            evo_1_h: "Perception AI",
            evo_1_p: "Recognition: Eyes to distinguish environment",
            evo_2_h: "Generative AI",
            evo_2_p: "Generation: Hands to create",
            evo_3_h: "Agentic AI",
            evo_3_p: "Autonomy: Brain to plan",
            evo_4_h: "Physical AI",
            evo_4_p: "Action: Robots to move",
            about_title: "What is Physical AI?",
            about_subtitle: "Next-gen intelligent system that recognizes environment, reasons, and acts",
            about_item1_h: "Perception",
            about_item1_p: "Understand real world data in real-time via cameras and LiDAR.",
            about_item2_h: "Reasoning",
            about_item2_p: "Analyze situations and decide optimal actions via Deep Learning.",
            about_item3_h: "Action",
            about_item3_p: "Physically control robotic arms or vehicles based on logic.",
            tech_title: "Core Technologies",
            tech_subtitle: "5 core technology pillars supporting Physical AI",
            tech_1_h: "Computer Vision",
            tech_1_p: "Identifies people and objects for spatial awareness.",
            tech_2_h: "Sensor Fusion",
            tech_2_p: "Integrates Camera, LiDAR, GPS for precise sensing.",
            tech_3_h: "Reinforcement Learning",
            tech_3_p: "Learns optimal behavior through millions of simulations.",
            tech_4_h: "Digital Twin",
            tech_4_p: "Replicates real environment for safe technology validation.",
            tech_5_h: "Edge AI",
            tech_5_p: "Runs high-performance AI on-device for zero latency.",
            chall_title: "Physical AI Challenges",
            chall_subtitle: "Innovative solutions to break technical barriers",
            chall_1_h: "Data Scarcity",
            chall_1_p: "Generates data through virtual accelerated learning in simulations.",
            chall_2_h: "Sim2Real Gap",
            chall_2_p: "Optimizes for real world with real-time error correction.",
            chall_3_h: "Latence",
            chall_3_p: "Enables immediate control without internet via Edge AI.",
            app_title: "Industry Applications",
            app_subtitle: "Intelligent changes occurring in global industries",
            app_1_h: "Smart Factory",
            app_1_p: "Leads innovation in logistics and production processes.",
            app_2_h: "Autonomous",
            app_2_p: "Ensures safe mobility through perfect environment awareness.",
            app_3_h: "Drones",
            app_3_p: "Builds autonomous flight and inspection systems.",
            app_4_h: "Medical Robots",
            app_4_p: "Realizes precision surgery and patient care automation.",
            leader_title: "Global Leaders",
            leader_subtitle: "Global tech giants leading Physical AI",
            vision_title: "Future Vision 2030",
            vision_subtitle: "Roadmap to a world where humans and robots coexist",
            vision_1_h: "Humanoid Era",
            vision_1_p: "Widespread humanoids interacting with humans in daily life",
            vision_2_h: "AI Factory",
            vision_2_p: "Factories operated autonomously from production to shipping",
            vision_3_h: "Level 5 World",
            vision_3_p: "Autonomous mobility ecosystem completing safe roads and skies",
            comm_title: "Community Lounge",
            comm_subtitle: "An open space for researchers discussing future tech.",
            comm_inquiry_btn: "Inquiry",
            form_name: "Name",
            form_pass: "Password",
            form_title: "Title",
            form_content: "Content",
            form_file: "File",
            form_submit: "Post Now",
            form_org: "Organization",
            form_email: "Email",
            form_msg: "Message",
            form_send: "Send Inquiry",
            contact_title: "Direct Inquiry",
            contact_subtitle: "Tech cooperation and business inquiry",
            contact_info_h: "Contact Info",
            contact_info_p: "Waiting for partners to open the era of physical intelligence."
        },
        ja: {
            nav_evolution: "AIの進化",
            nav_about: "定義",
            nav_tech: "技術",
            nav_apps: "活用分野",
            nav_community: "コミュニティ",
            nav_comm_lounge: "ラウンジ",
            nav_inquiry: "お問い合わせ",
            hero_h1: "Physical AI <span class='highlight'>Nexus</span>",
            hero_p: "Intelligence in Motion, Excellence in Action",
            hero_btn_learn: "詳細を見る",
            hero_btn_tech: "技術を探る",
            evo_title: "AIの進化",
            evo_subtitle: "見る、描くAIを超え、世界を動かすフィジカルAIへ",
            evo_1_h: "Perception AI",
            evo_1_p: "認知: 環境を見分ける目",
            evo_2_h: "Generative AI",
            evo_2_p: "生成: 創造する手",
            evo_3_h: "Agentic AI",
            evo_3_p: "自律: 計画する脳",
            evo_4_h: "Physical AI",
            evo_4_p: "行動: 動くロボット",
            about_title: "フィジカルAIとは？",
            about_subtitle: "環境認識、思考、行動を自律的に行う次世代知能システム",
            tech_title: "核心技術",
            tech_subtitle: "物理AIを支える5つの技術の柱",
            chall_title: "克服すべき課題",
            chall_subtitle: "技術的な限界を突破するための革新的な解決策",
            comm_title: "コミュニティラウンジ",
            comm_subtitle: "フィジカルAIの未来を語る研究者のための空間",
            comm_inquiry_btn: "お問い合わせ",
            form_name: "名前",
            form_pass: "パスワード",
            form_title: "タイトル",
            form_content: "内容",
            form_submit: "登録する",
            form_org: "所属/企業名",
            contact_title: "直接お問い合わせ",
            contact_subtitle: "技術提携およびビジネスのお問い合わせ"
        },
        zh: {
            nav_evolution: "AI 演進",
            nav_about: "定義",
            nav_tech: "核心技術",
            nav_apps: "應用領域",
            nav_community: "社區",
            nav_comm_lounge: "社區休息室",
            nav_inquiry: "諮詢",
            hero_h1: "Physical AI <span class='highlight'>Nexus</span>",
            hero_p: "Intelligence in Motion, Excellence in Action",
            hero_btn_learn: "了解更多",
            hero_btn_tech: "探索技術",
            evo_title: "AI 演進",
            evo_subtitle: "從視覺合繪圖 AI 演進到推動世界的物理 AI",
            evo_1_h: "感知 AI",
            evo_1_p: "認知：辨別環境的眼睛",
            evo_2_h: "生成式 AI",
            evo_2_p: "生成：創造的手",
            evo_3_h: "代理式 AI",
            evo_3_p: "自主：規劃的大腦",
            evo_4_h: "物理 AI",
            evo_4_p: "行動：移動的機器人",
            about_title: "什麼是物理 AI？",
            about_subtitle: "感知環境、自主判斷並執行物理行動的下一代智能系統",
            tech_title: "核心技術",
            tech_subtitle: "支撐物理 AI 的五大技術支柱",
            chall_title: "物理 AI 的挑戰",
            chall_subtitle: "突破技術瓶頸的創新解決方案",
            comm_title: "社區休息室",
            comm_subtitle: "討論未來技術的物理 AI 研究者開放空間",
            comm_inquiry_btn: "諮詢",
            form_name: "姓名",
            form_pass: "密碼",
            form_title: "標題",
            form_content: "內容",
            form_submit: "發布文章",
            form_org: "隸屬/企業名稱",
            contact_title: "直接諮詢",
            contact_subtitle: "技術合作與商務諮詢"
        }
    };

    const langSelector = document.getElementById('lang-selector');
    const setLanguage = (lang) => {
        localStorage.setItem('preferred_lang', lang);
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = translations[lang][key];
                } else if (key.includes('h1') || key.includes('hero_h1')) {
                    el.innerHTML = translations[lang][key];
                } else {
                    el.textContent = translations[lang][key];
                }
            }
        });
        document.documentElement.lang = lang;
    };

    if (langSelector) {
        const savedLang = localStorage.getItem('preferred_lang') || 'ko';
        langSelector.value = savedLang;
        setLanguage(savedLang);
        langSelector.addEventListener('change', (e) => setLanguage(e.target.value));
    }

    // --- Accordion Logic for Challenges ---
    const barrierCards = document.querySelectorAll('.barrier-card');
    barrierCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent bubbling issues
            const currentlyActive = card.classList.contains('active');
            
            // Close ALL cards first to ensure only one is ever open (Accordion behavior)
            // If the user wants ONLY the clicked one to behave, we ensure no global trigger exists.
            barrierCards.forEach(c => c.classList.remove('active'));
            
            // If it wasn't active, activate it.
            if (!currentlyActive) {
                card.classList.add('active');
            }
        });
    });

    // --- Hotspot Anatomy Logic ---
    const hotspots = document.querySelectorAll('.hotspot');
    const popups = document.querySelectorAll('.anatomy-popup');
    hotspots.forEach(hotspot => {
        hotspot.addEventListener('click', (e) => {
            e.stopPropagation();
            const targetId = hotspot.getAttribute('data-target');
            const target = document.getElementById(targetId);
            const isAlreadyActive = target.classList.contains('active');
            popups.forEach(p => p.classList.remove('active'));
            if (!isAlreadyActive) {
                if (target) target.classList.add('active');
                if(document.getElementById('main-robot-body')) {
                     document.getElementById('main-robot-body').style.filter = 'brightness(1) drop-shadow(var(--neon-glow))';
                }
            } else {
                if(document.getElementById('main-robot-body')) {
                     document.getElementById('main-robot-body').style.filter = 'brightness(0.6)';
                }
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.robot-anatomy-viewer')) {
            popups.forEach(p => p.classList.remove('active'));
            if(document.getElementById('main-robot-body')) {
                document.getElementById('main-robot-body').style.filter = 'brightness(0.6)';
            }
        }
    });

    // --- Scroll Handling ---
    const nav = document.querySelector('nav');
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
        if (window.pageYOffset > 300) backToTop.style.display = 'flex';
        else backToTop.style.display = 'none';
    });

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    const intro = document.getElementById('signature-intro');
    if (intro) {
        setTimeout(() => { intro.style.display = 'none'; }, 6000);
    }

    // --- Particle Background ---
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const particleCount = 80;
        let mouse = { x: null, y: null, radius: 150 };
        window.addEventListener('mousemove', (e) => { mouse.x = e.x; mouse.y = e.y; });
        const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
        window.addEventListener('resize', resize);
        resize();
        class Particle {
            constructor() { this.reset(); }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.4;
                this.vy = (Math.random() - 0.5) * 0.4;
                this.size = Math.random() * 2 + 1;
                this.baseSize = this.size;
                this.alpha = Math.random() * 0.3 + 0.1;
            }
            update() {
                this.x += this.vx; this.y += this.vy;
                if (mouse.x != null) {
                    let dx = mouse.x - this.x; let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx*dx + dy*dy);
                    if (distance < mouse.radius) { this.size = this.baseSize * 2; this.alpha = 0.8; }
                    else { this.size = this.baseSize; this.alpha = Math.random() * 0.3 + 0.1; }
                }
                if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
            }
            draw() {
                ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(34, 211, 238, ${this.alpha})`; ctx.fill();
            }
        }
        for (let i = 0; i < particleCount; i++) particles.push(new Particle());
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Futuristic Neural Network Connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx*dx + dy*dy);
                    
                    if (dist < 180) {
                        ctx.beginPath();
                        // Dynamic glow based on distance
                        const opacity = (1 - dist / 180) * 0.15;
                        ctx.strokeStyle = `rgba(56, 189, 248, ${opacity})`;
                        ctx.lineWidth = dist < 80 ? 1.5 : 0.5; // Thicker lines for close nodes
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            particles.forEach(p => { p.update(); p.draw(); });
            requestAnimationFrame(animate);
        };
        animate();
    }

    // --- Leader Spotlight ---
    const leaderCards = document.querySelectorAll('.leader-card');
    leaderCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; const y = e.clientY - rect.top;
            card.style.setProperty('--x', `${x}px`); card.style.setProperty('--y', `${y}px`);
        });
    });

    const observerOptions = { threshold: 0.2 };
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
    }, observerOptions);
    document.querySelectorAll('.reveal-on-scroll, .evo-step').forEach((el, i) => {
        if (el.classList.contains('evo-step')) el.style.transitionDelay = `${i * 0.2}s`;
        revealObserver.observe(el);
    });

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                let count = 0;
                const update = () => {
                    const speed = target / 50;
                    if (count < target) { count += speed; counter.innerText = Math.ceil(count); setTimeout(update, 20); }
                    else { counter.innerText = target; }
                };
                update(); counterObserver.unobserve(counter);
            }
        });
    }, observerOptions);
    document.querySelectorAll('.counter').forEach(c => counterObserver.observe(c));

    // --- Board Logic ---
    const postForm = document.getElementById('post-form');
    const postList = document.getElementById('post-list');
    const loadPosts = async () => {
        if(!postList) return;
        postList.innerHTML = '<div class="loading-spinner">Loading from Nexus Cloud...</div>';
        
        try {
            const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            postList.innerHTML = '';
            
            if (querySnapshot.empty) {
                postList.innerHTML = '<p style="text-align:center; opacity:0.6;">아직 게시글이 없습니다. 첫 글을 남겨보세요!</p>';
                return;
            }

            querySnapshot.forEach((docSnap) => {
                const post = docSnap.data();
                const postId = docSnap.id;
                const date = post.createdAt ? post.createdAt.toDate().toLocaleString() : 'Just now';
                
                const postEl = document.createElement('div');
                postEl.className = 'card'; postEl.style.marginBottom = '20px';
                postEl.innerHTML = `
                    <div class="post-meta"><span class="author-badge">${post.author || '익명'}</span><span>${date}</span></div>
                    <div class="post-header"><h4 style="color:var(--secondary-color); margin:0;">${post.title}</h4></div>
                    <p style="margin: 15px 0;">${post.content}</p>
                    ${post.image ? `<img src="${post.image}" class="post-image" alt="Post Image">` : ''}
                    <div style="margin-top:20px; display:flex; justify-content: flex-end; gap:15px;">
                         <button class="theme-toggle" style="padding: 4px 10px; font-size: 0.7rem;" data-id="${postId}" onclick="window.handleDeletePost('${postId}', '${post.password}')">삭제</button>
                    </div>
                `;
                postList.appendChild(postEl);
            });
        } catch (error) {
            console.error("Error loading posts: ", error);
            postList.innerHTML = '<p style="text-align:center; color:red;">데이터를 불러오는 중 오류가 발생했습니다.</p>';
        }
    };

    if (postForm) {
        postForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const author = document.getElementById('post-author').value;
            const title = document.getElementById('post-title').value;
            const content = document.getElementById('post-content').value;
            const password = document.getElementById('post-password').value;
            const imageFile = document.getElementById('post-image').files[0];
            
            const submitBtn = postForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Uploading to Cloud...';

            let imageData = null;
            if (imageFile) {
                imageData = await new Promise((resolve) => {
                    const reader = new FileReader(); reader.onload = (e) => resolve(e.target.result);
                    reader.readAsDataURL(imageFile);
                });
            }

            try {
                await addDoc(collection(db, "posts"), {
                    author,
                    title,
                    content,
                    password,
                    image: imageData,
                    createdAt: serverTimestamp()
                });
                postForm.reset();
                await loadPosts();
            } catch (error) {
                console.error("Error adding doc: ", error);
                alert("게시글 저장에 실패했습니다.");
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = '게시글 등록하기';
            }
        });
    }

    window.handleDeletePost = async (id, correctPassword) => {
        const inputPass = prompt('비밀번호를 입력하세요:');
        if (inputPass === correctPassword) {
            try {
                await deleteDoc(doc(db, "posts", id));
                alert('게시글이 삭제되었습니다.');
                await loadPosts();
            } catch (error) {
                console.error("Error deleting doc: ", error);
                alert('삭제 중 오류가 발생했습니다.');
            }
        } else if (inputPass !== null) {
            alert('비밀번호가 틀렸습니다.');
        }
    };
    if (postList) loadPosts();

    // --- Inquiry Form Actual Send (mailto) ---
    const inquiryForm = document.getElementById('inquiry-form');
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const org = document.getElementById('inquiry-org').value;
            const email = document.getElementById('inquiry-email').value;
            const msg = document.getElementById('inquiry-msg').value;
            
            const subject = encodeURIComponent(`[Inquiry] Physical AI Nexus - ${org}`);
            const body = encodeURIComponent(`Organization: ${org}\nFrom: ${email}\n\nMessage:\n${msg}`);
            
            window.location.href = `mailto:kimdg0417@dongyang.ac.kr?subject=${subject}&body=${body}`;
            
            alert('메일 클라이언트가 열립니다. 내용을 확인 후 전송해 주세요!');
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if(target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
        });
    });
});
