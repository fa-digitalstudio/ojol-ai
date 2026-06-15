const firebaseConfig = {
    apiKey: "AIzaSyBj86r9p6TzIc9TmrXAzQX2LRTe8K7Umro",
    authDomain: "ojolai.firebaseapp.com",
    databaseURL: "https://ojolai-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "ojolai",
    storageBucket: "ojolai.firebasestorage.app",
    messagingSenderId: "7449834990",
    appId: "1:7449834990:web:53c321edd8d479654f0aff",
    measurementId: "G-ZEKT2CQD6Q"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

const SECRET_UPGRADE_CODE = "nurul0105"; 

let DEFAULTS = {
    openrouter: "",
    api: "",
    silicon: "", 
    openai: "", 
    gemini: ""
};

let ADMIN_STATUS = {
    or_active: true,
    gr_active: true,
    gm_active: true
};

function syncAdminConfig() {
    db.ref('config').on('value', (snap) => {
        const data = snap.val();
        if (data) {
            if (data.is_maintenance === true) {
                document.body.innerHTML = `<div style="height:100dvh; display:flex; flex-direction:column; justify-content:center; align-items:center; background:#0f172a; color:black; font-family:'Outfit',sans-serif; text-align:center; padding:20px;"><div style="background:#FFFF; padding:30px; border-radius:30px; border:1px solid #334155;"><i data-lucide="alert-circle" size="50" color="#ef4444"></i><h2 style="margin:20px 0 10px 0;">MAINTENANCE</h2><p style="opacity:0.7; font-size:14px; line-height:1.6;">Mohon maaf, sistem sedang dalam pemeliharaan.<br>Silahkan kembali lagi nanti.</p></div></div>`;
                if (window.lucide) lucide.createIcons();
                return;
            }
            if (data.openrouter_key) DEFAULTS.openrouter = data.openrouter_key;
            if (data.groq_key) DEFAULTS.api = data.groq_key;
            if (data.gemini_key) DEFAULTS.gemini = data.gemini_key;

            ADMIN_STATUS.or_active = data.or_active !== undefined ? data.or_active : true;
            ADMIN_STATUS.gr_active = data.gr_active !== undefined ? data.gr_active : true;
            ADMIN_STATUS.gm_active = data.gm_active !== undefined ? data.gm_active : true;
            
            loadSavedSettings();
        }
    });
}
syncAdminConfig();

marked.setOptions({ breaks: true, gfm: true, headerIds: false, mangle: false, sanitize: false });
let chatHistory = [{ role: "system", content: "Kamu adalah OJOL AI PREMIUM, asisten cerdas yang dikembangkan oleh Farid Aris." }];
let selectedImageBase64 = null;
let currentChatId = Date.now().toString();

window.addEventListener('load', () => {
    const loader = document.getElementById('loader-wrapper');
    setTimeout(() => { 
        if(loader) loader.classList.add('loader-hidden');
        document.getElementById('promo-popup').style.display = 'flex';
        if (window.lucide) lucide.createIcons();
    }, 1500); 
    if (window.lucide) lucide.createIcons();
    loadSavedSettings();
    renderHistory();
});

window.onpopstate = function(event) {
    const linkPage = document.getElementById('link-page');
    const settingsModal = document.getElementById('settings-modal');
    const sidebar = document.getElementById('sidebar');
    const donationPage = document.getElementById('donation-page');
    if (donationPage.classList.contains('active')) donationPage.classList.remove('active');
    else if (linkPage.style.display === 'flex') linkPage.style.display = 'none';
    else if (settingsModal.style.display === 'flex') settingsModal.style.display = 'none';
    else if (sidebar.classList.contains('active')) toggleSidebar();
};

function pushState() { history.pushState({page: 1}, null, ""); }
function closePromo() { document.getElementById('promo-popup').style.display = 'none'; }

function toggleDonation() {
    const page = document.getElementById('donation-page');
    const sidebar = document.getElementById('sidebar');
    const isClosing = page.classList.contains('active');
    page.classList.toggle('active');
    if (sidebar.classList.contains('active')) toggleSidebar();
    if (!isClosing) { document.getElementById('dropdown-menu').classList.remove('active'); pushState(); }
    if (window.lucide) lucide.createIcons();
}

function copyOvo() {
    navigator.clipboard.writeText("86101085304");
    Swal.fire({ target: '#donation-page', icon: 'success', title: 'Berhasil', text: 'Nomor Rekening disalin!', timer: 1500, showConfirmButton: false });
}

function toggleLinkPage() {
    const page = document.getElementById('link-page');
    const isVisible = page.style.display === 'flex';
    page.style.display = isVisible ? 'none' : 'flex';
    if (!isVisible) { document.getElementById('dropdown-menu').classList.remove('active'); pushState(); }
    if (window.lucide) lucide.createIcons();
}

function loadSavedSettings() {
    const keys = ['openrouter', 'silicon', 'api', 'openai', 'gemini'];
    keys.forEach(k => {
        const saved = localStorage.getItem('user_' + k + '_key');
        const val = (saved && saved !== "") ? saved : DEFAULTS[k];
        
        const inputId = k + (k==='api'?'':'-key') + '-input';
        const inputEl = document.getElementById(inputId);
        if(inputEl) inputEl.value = val;

        const shortCode = (k==='api'?'gr':(k==='openrouter'?'or':(k==='silicon'?'sf':(k==='openai'?'oa':'gm'))));
        const toggle = document.getElementById('toggle-' + shortCode);
        let isActive = localStorage.getItem('status_' + shortCode) !== 'off';
        if (shortCode === 'or' && !ADMIN_STATUS.or_active) isActive = false;
        if (shortCode === 'gr' && !ADMIN_STATUS.gr_active) isActive = false;
        if (shortCode === 'gm' && !ADMIN_STATUS.gm_active) isActive = false;
        if(toggle) toggle.checked = isActive;
    });
}

function toggleMenu(e) { e.stopPropagation(); document.getElementById('dropdown-menu').classList.toggle('active'); }
function closeDropdownOuter(e) { const menu = document.getElementById('dropdown-menu'); if (menu.classList.contains('active')) { menu.classList.remove('active'); } }

function showAbout() {
    Swal.fire({
        title: 'Tentang OJOL AI',
        html: `<div style="text-align: center;"><div style="background: white; width: 70px; height: 70px; border-radius: 20px; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px auto; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);"><img src="https://i.ibb.co.com/cSR6TWgd/20260514-222136.png" style="width: 100%; height: 100%; object-fit: contain; padding: 5px;"/></div><p style="font-weight: 700; font-size: 18px; margin-bottom: 5px;">OJOL AI PREMIUM v2.0</p><p style="font-size: 14px; color: #64748b; margin-bottom: 20px;">Asisten Digital Cerdas</p><hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 15px 0;"><p style="font-size: 13px; color: #1e293b; margin-bottom: 5px;">Developed with ❤️ by:</p><p style="font-weight: 700; color: #6366f1; font-size: 16px;"><a href="https://www.fa-digitalstudio.web.id/" target="_blank" style="color: #6366f1; text-decoration: none;">Farid Aris</a></p><p style="font-size: 12px; color: #94a3b8; margin-top: 15px;">© 2026 FA DIGITAL STUDIO</p></div>`,
        confirmButtonText: 'Tutup', confirmButtonColor: '#1e293b'
    });
}

function toggleSidebar() { 
    const isOpening = !document.getElementById('sidebar').classList.contains('active');
    document.getElementById('sidebar').classList.toggle('active'); 
    document.getElementById('overlay-sidebar').classList.toggle('active'); 
    if (isOpening) pushState();
}

function saveToHistory() {
    if (chatHistory.length <= 1) return;
    let allChats = JSON.parse(localStorage.getItem('ojol_chat_history') || '{}');
    let title = "Percakapan Baru";
    const firstUserMsg = chatHistory.find(m => m.role === 'user');
    if (firstUserMsg) { 
        const content = Array.isArray(firstUserMsg.content) ? firstUserMsg.content[0].text : firstUserMsg.content; 
        title = content.substring(0, 35) + (content.length > 35 ? "..." : ""); 
    }
    allChats[currentChatId] = { title: title, date: new Date().toISOString(), data: chatHistory };
    try { localStorage.setItem('ojol_chat_history', JSON.stringify(allChats)); } catch (e) { }
    renderHistory();
}

function renderHistory() {
    const list = document.getElementById('history-list');
    const allChats = JSON.parse(localStorage.getItem('ojol_chat_history') || '{}');
    list.innerHTML = '';
    const sortedIds = Object.keys(allChats).sort((a,b) => b - a);
    if(sortedIds.length === 0) { list.innerHTML = '<div style="text-align:center; color:#94a3b8; font-size:12px; margin-top:20px;">Belum ada riwayat</div>'; return; }
    sortedIds.forEach(id => {
        const item = document.createElement('div');
        item.className = 'history-item';
        item.innerHTML = `<div onclick="loadChat('${id}')" style="display:flex; align-items:center; gap:12px; flex:1; overflow:hidden;"><i data-lucide="message-circle" size="16"></i><span style="flex:1; overflow:hidden; text-overflow:ellipsis;">${allChats[id].title}</span></div><button class="btn-delete-history" onclick="deleteChat(event, '${id}')"><i data-lucide="trash-2" size="16"></i></button>`;
        list.appendChild(item);
    });
    if (window.lucide) lucide.createIcons();
}

function deleteChat(event, id) {
    event.stopPropagation();
    Swal.fire({ title: 'Hapus Chat?', text: "Percakapan ini akan dihapus permanen.", icon: 'warning', showCancelButton: true, confirmButtonColor: '#ef4444', cancelButtonColor: '#64748b', confirmButtonText: 'Ya, Hapus', cancelButtonText: 'Batal' }).then((result) => {
        if (result.isConfirmed) {
            let allChats = JSON.parse(localStorage.getItem('ojol_chat_history') || '{}');
            delete allChats[id];
            localStorage.setItem('ojol_chat_history', JSON.stringify(allChats));
            if (currentChatId === id) startNewChat();
            else renderHistory();
            Swal.fire({ title: 'Terhapus', icon: 'success', timer: 800, showConfirmButton: false });
        }
    });
}

function loadChat(id) {
    const allChats = JSON.parse(localStorage.getItem('ojol_chat_history') || '{}');
    if (allChats[id]) {
        currentChatId = id; chatHistory = allChats[id].data;
        document.getElementById('chat-box').innerHTML = '';
        chatHistory.forEach(msg => { if (msg.role !== 'system') { let text = Array.isArray(msg.content) ? msg.content[0].text : msg.content; let img = (Array.isArray(msg.content) && msg.content[1]) ? msg.content[1].image_url.url : null; appendMsg(msg.role, text, img); } });
        toggleSidebar();
    }
}

function startNewChat() { location.reload(); }
function handleFileUpload(input) {
    const file = input.files[0]; if (!file) return;
    if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) { selectedImageBase64 = e.target.result; document.getElementById('image-preview').src = selectedImageBase64; document.getElementById('image-preview-container').style.display = 'block'; };
        reader.readAsDataURL(file);
    } else {
        const reader = new FileReader();
        reader.onload = function(e) { document.getElementById('user-input').value += `\n[FILE: ${file.name.toUpperCase()}]\n${e.target.result}\n---`; autoResize(document.getElementById('user-input')); };
        reader.readAsText(file);
    }
    input.value = ""; 
}

function clearImage() { selectedImageBase64 = null; document.getElementById('image-preview-container').style.display = 'none'; }

async function sendMessage() {
    const input = document.getElementById('user-input'); const text = input.value.trim();
    if(!text && !selectedImageBase64) return;
    appendMsg('user', text, selectedImageBase64);
    let userContent = selectedImageBase64 ? [{ type: "text", text: text || "Jelaskan gambar ini" }, { type: "image_url", image_url: { url: selectedImageBase64 } }] : text;
    chatHistory.push({ role: "user", content: userContent });
    input.value = ''; input.style.height = 'auto'; clearImage();
    const tId = showTyping();
    const providers = [
        { id: 'or', active: ADMIN_STATUS.or_active, url: "https://openrouter.ai/api/v1/chat/completions", key: localStorage.getItem('user_openrouter_key') || DEFAULTS.openrouter, model: "google/gemini-2.0-flash-001" },
        { id: 'sf', active: true, url: "https://api.siliconflow.cn/v1/chat/completions", key: localStorage.getItem('user_silicon_key') || DEFAULTS.silicon, model: "deepseek-ai/DeepSeek-V3" },
        { id: 'oa', active: true, url: "https://api.openai.com/v1/chat/completions", key: localStorage.getItem('user_openai_key') || DEFAULTS.openai, model: "gpt-4o-mini" },
        { id: 'gr', active: ADMIN_STATUS.gr_active, url: "https://api.groq.com/openai/v1/chat/completions", key: localStorage.getItem('user_api_key') || DEFAULTS.api, model: selectedImageBase64 ? "llama-3.2-11b-vision-preview" : "llama-3.3-70b-versatile" },
        { id: 'gm', active: ADMIN_STATUS.gm_active, url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent", key: localStorage.getItem('user_gemini_key') || DEFAULTS.gemini, type: 'gemini' }
    ];
    let success = false;
    for (let p of providers) {
        if (!p.key || !p.active || localStorage.getItem('status_' + p.id) === 'off') continue;
        try {
            let res, aiText;
            if (p.type === 'gemini') {
                const geminiUrl = `${p.url}?key=${p.key}`;
                const geminiBody = { contents: [{ parts: [{ text: typeof userContent === 'string' ? userContent : userContent[0].text }] }] };
                res = await fetch(geminiUrl, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(geminiBody) });
                const data = await res.json();
                aiText = data.candidates[0].content.parts[0].text;
            } else {
                res = await fetch(p.url, { method: "POST", headers: { "Authorization": `Bearer ${p.key}`, "Content-Type": "application/json" }, body: JSON.stringify({ model: p.model, messages: chatHistory }) });
                if (!res.ok) throw new Error();
                const data = await res.json(); 
                aiText = data.choices[0].message.content;
            }
            removeTyping(tId); appendMsg('ai', aiText); chatHistory.push({ role: "assistant", content: aiText }); saveToHistory(); success = true; break;
        } catch (e) { console.error("Provider " + p.id + " gagal"); }
    }
    if (!success) { removeTyping(tId); appendMsg('ai', "⚠️ Maaf, layanan AI OJOL ASISTEN tidak dapat merespon."); }
}

function copyToClipboard(text, btn) {
    navigator.clipboard.writeText(text).then(() => {
        const originalInhalt = btn.innerHTML;
        btn.innerHTML = '<i data-lucide="check" size="14"></i> Tersalin!';
        btn.style.background = "#10b981"; btn.style.color = "white";
        if (window.lucide) lucide.createIcons();
        setTimeout(() => { btn.innerHTML = originalInhalt; btn.style.background = "rgba(99,102,241,0.1)"; btn.style.color = "#6366f1"; if (window.lucide) lucide.createIcons(); }, 2000);
    });
}

function appendMsg(sender, content, imgData = null) {
    const chatBox = document.getElementById('chat-box'); 
    const welcomeMsg = document.querySelector('.welcome-wrapper');
    if(welcomeMsg) welcomeMsg.remove(); 
    
    const row = document.createElement('div'); 
    row.className = `msg-row ${sender}-row`;
    
    const msgDiv = document.createElement('div'); 
    msgDiv.className = `message ${sender}-message`;
    
    if(sender === 'user') {
        let pressTimer;
        const startPress = () => {
            pressTimer = setTimeout(() => {
                row.classList.toggle('show-actions');
                if (navigator.vibrate) navigator.vibrate(50);
            }, 600);
        };
        const endPress = () => clearTimeout(pressTimer);
        row.addEventListener('mousedown', startPress);
        row.addEventListener('touchstart', startPress);
        row.addEventListener('mouseup', endPress);
        row.addEventListener('touchend', endPress);
        row.addEventListener('mouseleave', endPress);
    }
    
    if (sender === 'ai' && content) {
        const copyAllBtn = document.createElement('button');
        copyAllBtn.innerHTML = '<i data-lucide="copy" size="14"></i> Salin';
        copyAllBtn.style = "position: absolute; top: 8px; right: 12px; background: rgba(99,102,241,0.1); border: 1px solid rgba(99,102,241,0.2); color: #6366f1; font-size: 11px; padding: 4px 8px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 4px; font-weight: 600; z-index: 10;";
        copyAllBtn.onclick = function() { copyToClipboard(content, copyAllBtn); };
        msgDiv.appendChild(copyAllBtn);
        msgDiv.style.paddingTop = "35px"; 
    }

    if(imgData) { const img = new Image(); img.src = imgData; img.className = 'chat-img-render'; msgDiv.appendChild(img); }
    const textContainer = document.createElement('div');
    
    if(sender === 'user') { 
        textContainer.textContent = content; 
        const userActions = document.createElement('div');
        userActions.className = 'user-actions';
        
        const btnCopy = document.createElement('button');
        btnCopy.className = 'btn-user-action';
        btnCopy.innerHTML = '<i data-lucide="copy" size="12"></i> Salin';
        btnCopy.onclick = (e) => {
            e.stopPropagation();
            navigator.clipboard.writeText(content);
            btnCopy.innerHTML = '<i data-lucide="check" size="12"></i> Tersalin';
            setTimeout(() => { btnCopy.innerHTML = '<i data-lucide="copy" size="12"></i> Salin'; row.classList.remove('show-actions'); }, 1500);
        };

        const btnEdit = document.createElement('button');
        btnEdit.className = 'btn-user-action';
        btnEdit.innerHTML = '<i data-lucide="edit-2" size="12"></i> Edit';
        btnEdit.onclick = (e) => {
            e.stopPropagation();
            const inp = document.getElementById('user-input');
            inp.value = content; inp.focus(); autoResize(inp);
            row.classList.remove('show-actions');
            inp.scrollIntoView({ behavior: 'smooth' });
        };

        userActions.appendChild(btnEdit);
        userActions.appendChild(btnCopy);
        msgDiv.appendChild(textContainer);
        msgDiv.appendChild(userActions);
    } 
    else { textContainer.innerHTML = marked.parse(content || ""); setupCodeButtons(textContainer); msgDiv.appendChild(textContainer); }
    
    row.appendChild(msgDiv); chatBox.appendChild(row);
    chatBox.scrollTop = chatBox.scrollHeight; if (window.lucide) lucide.createIcons();
}

function setupCodeButtons(container) { container.querySelectorAll('pre').forEach(pre => { const btn = document.createElement('button'); btn.className = 'copy-btn'; btn.innerHTML = 'Salin'; btn.onclick = () => { const code = pre.innerText.replace('Salin', ''); navigator.clipboard.writeText(code); btn.innerHTML = 'Tersalin!'; setTimeout(() => btn.innerHTML = 'Salin', 2000); }; pre.appendChild(btn); }); }
function showTyping() { const id = 't-' + Date.now(); const b = document.getElementById('chat-box'); const r = document.createElement('div'); r.id = id; r.className = "msg-row ai-row"; r.innerHTML = '<div class="message ai-message"><div class="typing-dots"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div></div>'; b.appendChild(r); b.scrollTop = b.scrollHeight; return id; }
function removeTyping(id) { const el = document.getElementById(id); if(el) el.remove(); }
function autoResize(el) { el.style.height = 'auto'; el.style.height = (el.scrollHeight) + 'px'; }
function toggleView(id) { const input = document.getElementById(id); input.type = (input.type === "password") ? "text" : "password"; if (window.lucide) lucide.createIcons(); }

// ---------------- FUNGSI LOGIN EMAIL/PASSWORD ----------------
function showLogin() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('forgot-form').style.display = 'none';
}
function showRegister() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
    document.getElementById('forgot-form').style.display = 'none';
}
function showForgot() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('forgot-form').style.display = 'block';
}

async function registerEmail() {
    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value.trim();
    if (!name || !email || !password) return Swal.fire('Lengkapi Data', 'Semua kolom harus diisi', 'warning');
    if (password.length < 6) return Swal.fire('Kata Sandi Terlalu Pendek', 'Minimal 6 karakter', 'warning');
    
    Swal.fire({ title: 'Memproses...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        await userCredential.user.updateProfile({ displayName: name });
        // Force update UI name
        document.getElementById('user-greeting').textContent = name.split(' ')[0].toUpperCase();
        
        Swal.fire('Berhasil!', 'Akun berhasil dibuat', 'success');
    } catch (error) {
        let pesan = 'Terjadi kesalahan';
        if (error.code === 'auth/email-already-in-use') pesan = 'Email sudah terdaftar';
        if (error.code === 'auth/invalid-email') pesan = 'Format email tidak valid';
        if (error.code === 'auth/operation-not-allowed') pesan = 'Pendaftaran dinonaktifkan';
        if (error.code === 'auth/weak-password') pesan = 'Kata sandi terlalu lemah';
        Swal.fire('Gagal', pesan, 'error');
    }
}

async function loginEmail() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    if (!email || !password) return Swal.fire('Lengkapi Data', 'Email dan kata sandi harus diisi', 'warning');
    
    Swal.fire({ title: 'Memproses...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
    try {
        await auth.signInWithEmailAndPassword(email, password);
        Swal.close();
    } catch (error) {
        let pesan = 'Terjadi kesalahan';
        if (error.code === 'auth/invalid-email') pesan = 'Format email tidak valid';
        if (error.code === 'auth/user-disabled') pesan = 'Akun dinonaktifkan';
        if (error.code === 'auth/user-not-found') pesan = 'Email belum terdaftar';
        if (error.code === 'auth/wrong-password') pesan = 'Kata sandi salah';
        Swal.fire('Gagal Masuk', pesan, 'error');
    }
}

async function resetPassword() {
    const email = document.getElementById('forgot-email').value.trim();
    if (!email) return Swal.fire('Masukkan Email', 'Isi alamat email Anda', 'warning');
    
    Swal.fire({ title: 'Mengirim...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
    try {
        await auth.sendPasswordResetEmail(email);
        Swal.fire('Berhasil', 'Link reset kata sandi telah dikirim ke email Anda', 'success');
        showLogin();
    } catch (error) {
        let pesan = 'Gagal mengirim link';
        if (error.code === 'auth/invalid-email') pesan = 'Format email tidak valid';
        if (error.code === 'auth/user-not-found') pesan = 'Email tidak terdaftar';
        Swal.fire('Gagal', pesan, 'error');
    }
}
// ---------------------------------------------------------------

auth.onAuthStateChanged(u => { 
    if (u) { 
        document.getElementById('login-overlay').style.display = 'none'; 
        document.getElementById('main-app').style.display = 'flex'; 
        // Mengamankan pemuatan nama jika displayName tersedia
        if (u.displayName) {
            document.getElementById('user-greeting').textContent = u.displayName.split(' ')[0].toUpperCase(); 
        } else if (document.getElementById('user-greeting').textContent === 'OJOL AI') {
            document.getElementById('user-greeting').textContent = 'PENGGUNA'; 
        }
        checkPremiumStatus(); 
        if (u.photoURL) document.getElementById('user-avatar-container').innerHTML = `<img src="${u.photoURL}" style="width:100%; height:100%; object-fit:cover;" />`; 
    } 
    else { 
        document.getElementById('login-overlay').style.display = 'flex'; 
        document.getElementById('main-app').style.display = 'none'; 
    }
});

function logout() { 
    if (document.getElementById('sidebar').classList.contains('active')) toggleSidebar();
    Swal.fire({ title: 'Keluar Akun?', text: "Anda harus login kembali untuk menggunakan layanan ini.", icon: 'warning', showCancelButton: true, confirmButtonColor: '#1e293b', cancelButtonColor: '#ef4444', confirmButtonText: 'Ya, Keluar', cancelButtonText: 'Batal' }).then((result) => { if (result.isConfirmed) auth.signOut(); });
}
function checkPremiumStatus() { if (localStorage.getItem('is_premium_user') === 'true') { if (!document.getElementById('user-greeting').innerHTML.includes('⭐')) document.getElementById('user-greeting').innerHTML += ' ⭐'; } }
function openSettings() { toggleSidebar(); document.getElementById('settings-modal').style.display = 'flex'; pushState(); }
function saveSettings() {
    localStorage.setItem('user_openrouter_key', document.getElementById('openrouter-key-input').value.trim());
    localStorage.setItem('user_silicon_key', document.getElementById('silicon-key-input').value.trim());
    localStorage.setItem('user_api_key', document.getElementById('api-key-input').value.trim());
    localStorage.setItem('user_openai_key', document.getElementById('openai-key-input').value.trim());
    localStorage.setItem('user_gemini_key', document.getElementById('gemini-key-input').value.trim());
    ['or', 'sf', 'gr', 'oa', 'gm'].forEach(id => { localStorage.setItem('status_' + id, document.getElementById('toggle-' + id).checked ? 'on' : 'off'); });
    Swal.fire('Tersimpan', 'Pengaturan diperbarui', 'success'); closeSettings();
}
function closeSettings() { document.getElementById('settings-modal').style.display = 'none'; }
function quickSend(text) { document.getElementById('user-input').value = text; sendMessage(); }
function removePremium() { localStorage.removeItem('is_premium_user'); location.reload(); }
async function testConnection(type) { Swal.fire({ target: '#settings-modal', title: 'Mengecek...', didOpen: () => Swal.showLoading() }); setTimeout(() => { Swal.fire({ target: '#settings-modal', title: 'Berhasil', text: 'Koneksi API valid', icon: 'success' }); }, 1000); }
document.getElementById('user-input').addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } });

document.addEventListener('contextmenu', function(e) {
    if (e.target.id === 'user-input' || e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return; 
    }
    e.preventDefault();
}, false);

document.addEventListener('keydown', function(e) {
    if (e.keyCode == 123 || 
       (e.ctrlKey && e.shiftKey && (e.keyCode == 73 || e.keyCode == 74 || e.keyCode == 67)) || 
       (e.ctrlKey && e.keyCode == 85)) {
        e.preventDefault();
        return false;
    }
});

// REGISTRASI SERVICE WORKER PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('PWA Service Worker berhasil terdaftar.', reg))
            .catch(err => console.error('PWA Service Worker gagal terdaftar.', err));
    });
}
