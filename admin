<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CRYSTAL ADMIN - AI OJOL</title>
    
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">
    <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-database-compat.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <style>
        :root {
            --primary: #0062ff;
            --secondary: #00d4ff;
            --bg-light: #f8fafc;
            --text-main: #1e293b;
            --card-white: rgba(255, 255, 255, 0.98);
            --danger: #ef4444;
            --gray: #64748b;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body { 
            font-family: 'Plus Jakarta Sans', sans-serif; 
            background: var(--bg-light); 
            background-image: radial-gradient(at 0% 0%, rgba(0, 98, 255, 0.05) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(0, 212, 255, 0.05) 0px, transparent 50%);
            color: var(--text-main);
            min-height: 100vh; 
            padding: 20px;
        }

        /* Header & Menu */
        .page-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            max-width: 460px;
            margin: 0 auto 20px;
        }

        .menu-toggle {
            font-size: 24px;
            cursor: pointer;
            padding: 8px;
            color: var(--text-main);
        }

        .menu-dropdown {
            position: absolute;
            top: 60px;
            right: 20px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.15);
            width: 220px;
            z-index: 100;
            display: none;
            overflow: hidden;
        }

        .menu-dropdown a {
            display: block;
            padding: 12px 16px;
            text-decoration: none;
            color: var(--text-main);
            font-size: 14px;
            transition: 0.2s;
        }

        .menu-dropdown a:hover {
            background: #f1f5f9;
        }

        .card, #login-overlay { 
            background: var(--card-white); 
            padding: 30px; 
            border-radius: 24px; 
            width: 100%; 
            max-width: 460px; 
            margin: 0 auto;
            border: 1px solid #e2e8f0; 
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            position: relative;
            z-index: 5;
        }

        .card { display: none; }

        h2 { 
            font-weight: 800; font-size: 20px; text-align: center; margin-bottom: 20px; 
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }

        .status-box { 
            padding: 12px; border-radius: 12px; margin-bottom: 20px; 
            text-align: center; font-size: 11px; font-weight: 700; 
            background: #f1f5f9; color: #64748b;
        }

        .status-online { background: #f0fdf4 !important; color: #16a34a !important; }

        .input-group { margin-bottom: 18px; }
        
        label { display: block; font-size: 10px; font-weight: 800; color: #94a3b8; margin-bottom: 6px; text-transform: uppercase; }

        .input-wrapper { display: flex; gap: 8px; align-items: center; width: 100%; }

        input, select { 
            flex: 1; padding: 12px; background: #ffffff !important;
            border: 2px solid #e2e8f0; border-radius: 12px; 
            font-family: 'JetBrains Mono', monospace; font-size: 13px; 
            pointer-events: auto !important;
        }

        input:focus { border-color: var(--primary); outline: none; }

        .password-container {
            position: relative;
            display: flex;
            align-items: center;
        }
        .toggle-password {
            position: absolute;
            right: 15px;
            cursor: pointer;
            color: #94a3b8;
            font-size: 18px;
            z-index: 10;
            user-select: none;
        }

        .check-btn {
            padding: 12px 15px; background: #f1f5f9; border: none; border-radius: 12px;
            color: var(--primary); font-size: 11px; font-weight: 700; cursor: pointer;
            transition: 0.2s; white-space: nowrap;
        }
        .check-btn:hover { background: #e2e8f0; }

        .switch {
            position: relative; display: inline-block; width: 40px; height: 22px; flex-shrink: 0; cursor: pointer;
        }
        .switch input { opacity: 0; width: 0; height: 0; }
        .slider {
            position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0;
            background-color: #cbd5e1; transition: .4s; border-radius: 24px;
        }
        .slider:before {
            position: absolute; content: ""; height: 16px; width: 16px; left: 3px; bottom: 3px;
            background-color: white; transition: .4s; border-radius: 50%;
        }
        input:checked + .slider { background-color: var(--primary); }
        input:checked + .slider:before { transform: translateX(18px); }

        .save-btn { 
            width: 100%; padding: 16px; margin-top: 10px; border-radius: 14px;
            background: linear-gradient(135deg, var(--primary), var(--secondary)); 
            color: white; border: none; font-weight: 700; cursor: pointer;
        }
        .save-btn:active { transform: scale(0.98); }

        .logout-btn {
            width: 100%; padding: 12px; margin-top: 15px; border-radius: 12px;
            background: transparent; color: var(--danger); border: 2px solid var(--danger);
            font-weight: 700; cursor: pointer; transition: 0.3s;
        }
        .logout-btn:hover { background: var(--danger); color: white; }

        .remember-me {
            display: flex; align-items: center; gap: 8px; margin-top: 10px; font-size: 12px; color: #64748b;
        }
        .remember-me input { flex: none; width: 16px; height: 16px; cursor: pointer; }

        /* SweetAlert2 Custom */
        .swal2-popup {
            border-radius: 24px !important;
            padding: 2em !important;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }
        .swal2-title {
            font-weight: 800 !important;
            color: var(--text-main) !important;
        }
        .swal2-confirm {
            background: linear-gradient(135deg, var(--primary), var(--secondary)) !important;
            border-radius: 12px !important;
            padding: 12px 30px !important;
            font-weight: 700 !important;
        }
        .swal2-styled.swal2-confirm:focus {
            box-shadow: 0 0 0 3px rgba(0, 98, 255, 0.3) !important;
        }

        /* Tabel Riwayat */
        .history-table {
            width: 100%;
            margin-top: 15px;
            border-collapse: collapse;
            font-size: 12px;
        }
        .history-table th, .history-table td {
            padding: 10px;
            text-align: left;
            border-bottom: 1px solid #e2e8f0;
        }
        .history-table th {
            background: #f8fafc;
            font-weight: 700;
        }
        .action-btn {
            padding: 5px 8px;
            border: none;
            border-radius: 6px;
            font-size: 11px;
            cursor: pointer;
            margin: 0 2px;
        }
        .block { background: #f59e0b; color: white; }
        .delete { background: var(--danger); color: white; }
    </style>
</head>
<body>

<!-- Header dengan Menu Garis Tiga -->
<div class="page-header">
    <div></div>
    <div class="menu-toggle" onclick="toggleMenu()">☰</div>
    <div class="menu-dropdown" id="main-menu">
        <a href="#" onclick="openLoginHistory()">📋 Riwayat Login</a>
    </div>
</div>

<!-- LOGIN -->
<div id="login-overlay">
    <h2>FARID ARIS</h2>
    <div class="status-box">Security Protocol Level 1</div>
    <div class="input-group">
        <label>Hanya farid yang tahu passwordnya😎</label>
        <div class="password-container">
            <input id="admin_pass" placeholder="Enter password..." type="password"/>
            <span class="toggle-password" onclick="togglePassword()">👁️</span>
        </div>
    </div>
    <div class="remember-me">
        <input id="remember_pass" type="checkbox"/>
        <label for="remember_pass" style="text-transform: none; color: inherit; font-weight: 600; margin-bottom: 0;">Simpan password di perangkat ini</label>
    </div>
    <button class="save-btn" onclick="checkLogin()">Open Dashboard</button>
</div>

<!-- MAIN CARD -->
<div class="card" id="main-dashboard">
    <h2>Admin Dashboard ( FARID ARIS )</h2>
    <div class="status-box" id="db-status">Connecting to node...</div>
    
    <div class="input-group">
        <label>OpenRouter API</label>
        <div class="input-wrapper">
            <input id="or_key" placeholder="Not Set" type="text"/>
            <button class="check-btn" onclick="testAPI('or')">CHECK</button>
            <label class="switch">
                <input id="or_status" type="checkbox"/>
                <span class="slider"></span>
            </label>
        </div>
    </div>

    <div class="input-group">
        <label>Groq API</label>
        <div class="input-wrapper">
            <input id="gr_key" placeholder="Not Set" type="text"/>
            <button class="check-btn" onclick="testAPI('gr')">CHECK</button>
            <label class="switch">
                <input id="gr_status" type="checkbox"/>
                <span class="slider"></span>
            </label>
        </div>
    </div>

    <div class="input-group">
        <label>Gemini API</label>
        <div class="input-wrapper">
            <input id="gm_key" placeholder="Not Set" type="text"/>
            <button class="check-btn" onclick="testAPI('gm')">CHECK</button>
            <label class="switch">
                <input id="gm_status" type="checkbox"/>
                <span class="slider"></span>
            </label>
        </div>
    </div>

    <div class="input-group">
        <label>Maintenance Control</label>
        <select id="maint_mode">
            <option value="false">🟢 Aktifkan website</option>
            <option value="true">🔴 Maintenance</option>
        </select>
    </div>

    <button class="save-btn" id="update-btn" onclick="updateConfig()">Save Configuration</button>
    <button class="logout-btn" onclick="logout()">Logout System</button>
</div>

<script>
    // Kode asli tetap utuh
    const _0xPR2 = "YWRtaW5vam9sa29sYWth"; 

    window.onload = () => {
        const savedPass = localStorage.getItem('admin_session_key');
        if(savedPass) {
            document.getElementById('admin_pass').value = atob(savedPass);
            document.getElementById('remember_pass').checked = true;
        }
    };

    function togglePassword() {
        const passInput = document.getElementById('admin_pass');
        const icon = document.querySelector('.toggle-password');
        passInput.type = passInput.type === 'password' ? 'text' : 'password';
        icon.innerText = passInput.type === 'password' ? '👁️' : '👀';
    }

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    });

    function checkLogin() {
        const input = document.getElementById('admin_pass').value;
        const remember = document.getElementById('remember_pass').checked;

        if(btoa(input) === _0xPR2) {
            // Simpan riwayat login
            saveLoginHistory({
                waktu: new Date().toLocaleString('id-ID'),
                perangkat: navigator.userAgent.substring(0, 60),
                ip: 'Lokal / Server'
            });

            if(remember) {
                localStorage.setItem('admin_session_key', btoa(input));
            } else {
                localStorage.removeItem('admin_session_key');
            }
            
            document.getElementById('login-overlay').style.display = 'none';
            document.getElementById('main-dashboard').style.display = 'block';
            initFirebase();
            Toast.fire({ icon: 'success', title: 'Akses diterima. Selamat datang!' });
        } else {
            Swal.fire({ 
                icon: 'error', 
                title: 'Akses Ditolak', 
                text: 'Kata sandi tidak valid. Silahkan coba lagi.',
                confirmButtonText: 'Coba Lagi',
                showClass: { popup: 'animate__animated animate__shakeX' }
            });
        }
    }

    function logout() {
        Swal.fire({
            title: 'Logout?',
            text: "Sesi akan diakhiri.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, Keluar',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById('login-overlay').style.display = 'block';
                document.getElementById('main-dashboard').style.display = 'none';
                if(!localStorage.getItem('admin_session_key')) {
                    document.getElementById('admin_pass').value = '';
                }
            }
        });
    }

    document.getElementById('admin_pass').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') checkLogin();
    });

    const firebaseConfig = {
        apiKey: "AIzaSyBj86r9p6TzIc9TmrXAzQX2LRTe8K7Umro",
        authDomain: "ojolai.firebaseapp.com",
        projectId: "ojolai",
        databaseURL: "https://ojolai-default-rtdb.asia-southeast1.firebasedatabase.app",
        storageBucket: "ojolai.firebasestorage.app",
    };

    firebase.initializeApp(firebaseConfig);
    const db = firebase.database();

    function initFirebase() {
        const statusBox = document.getElementById('db-status');
        db.ref('config').on('value', (snap) => {
            const data = snap.val();
            statusBox.innerText = "System Synced & Secured";
            statusBox.classList.add('status-online');

            if(data) {
                document.getElementById('or_key').value = data.openrouter_key || '';
                document.getElementById('gr_key').value = data.groq_key || '';
                document.getElementById('gm_key').value = data.gemini_key || '';
                document.getElementById('or_status').checked = data.or_active || false;
                document.getElementById('gr_status').checked = data.gr_active || false;
                document.getElementById('gm_status').checked = data.gm_active || false;
                document.getElementById('maint_mode').value = String(data.is_maintenance);
            }
        }, (error) => {
            statusBox.innerText = "System Error: " + error.message;
            statusBox.style.color = "#ef4444";
        });
    }

    async function testAPI(type) {
        const key = document.getElementById(type + '_key').value;
        if(!key) return Toast.fire({ icon: 'info', title: 'API Key masih kosong' });

        Swal.fire({ 
            title: 'Memverifikasi...', 
            html: 'Menghubungkan ke server provider',
            allowOutsideClick: false, 
            didOpen: () => { Swal.showLoading(); } 
        });

        try {
            let url, headers;
            if(type === 'gr') {
                url = 'https://api.groq.com/openai/v1/models';
                headers = { 'Authorization': `Bearer ${key}` };
            } else if(type === 'or') {
                url = 'https://openrouter.ai/api/v1/models';
                headers = { 'Authorization': `Bearer ${key}` };
            } else {
                url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;
            }

            const res = await fetch(url, { headers: headers });
            if(res.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Validasi Berhasil',
                    text: 'API Key valid dan siap digunakan!',
                    confirmButtonText: 'Mantap',
                    backdrop: `rgba(0,123,255,0.1)`
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Validasi Gagal',
                    text: 'Key tidak valid atau kuota habis.',
                    confirmButtonText: 'Periksa Kembali'
                });
            }
        } catch (e) {
            Swal.fire('Error', 'Gagal terhubung ke provider API.', 'error');
        }
    }

    function updateConfig() {
        const btn = document.getElementById('update-btn');
        btn.innerText = "Updating...";
        btn.disabled = true;

        const updatedData = {
            openrouter_key: document.getElementById('or_key').value,
            groq_key: document.getElementById('gr_key').value,
            gemini_key: document.getElementById('gm_key').value,
            or_active: document.getElementById('or_status').checked,
            gr_active: document.getElementById('gr_status').checked,
            gm_active: document.getElementById('gm_status').checked,
            is_maintenance: document.getElementById('maint_mode').value === 'true'
        };

        db.ref('config').set(updatedData)
            .then(() => {
                Swal.fire({ 
                    icon: 'success', 
                    title: 'Berhasil Disimpan!', 
                    text: 'Konfigurasi sistem telah diperbarui secara real-time.', 
                    timer: 2000, 
                    showConfirmButton: false,
                    background: '#ffffff',
                    iconColor: '#0062ff'
                });
            })
            .catch((err) => {
                Swal.fire('Error', err.message, 'error');
            })
            .finally(() => {
                btn.innerText = "Save Configuration";
                btn.disabled = false;
            });
    }

    // --- FUNGSI BARU ---
    function toggleMenu() {
        const menu = document.getElementById('main-menu');
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    }

    // Tutup menu jika klik di luar
    document.addEventListener('click', function(e) {
        if(!e.target.matches('.menu-toggle')) {
            document.getElementById('main-menu').style.display = 'none';
        }
    });

    // Simpan riwayat login ke localStorage
    function saveLoginHistory(data) {
        let history = JSON.parse(localStorage.getItem('login_history')) || [];
        history.unshift({ id: Date.now(), ...data, status: 'Aktif' });
        if(history.length > 50) history.pop(); // Simpan maks 50 catatan
        localStorage.setItem('login_history', JSON.stringify(history));
    }

    // Tampilkan riwayat login
    function openLoginHistory() {
        const history = JSON.parse(localStorage.getItem('login_history')) || [];
        let html = '<table class="history-table"><thead><tr><th>Waktu</th><th>Perangkat</th><th>Status</th><th>Aksi</th></tr></thead><tbody>';
        
        if(history.length === 0) {
            html += '<tr><td colspan="4" style="text-align:center;">Belum ada riwayat login</td></tr>';
        } else {
            history.forEach(item => {
                html += `
                <tr>
                    <td>${item.waktu}</td>
                    <td>${item.perangkat}</td>
                    <td>${item.status}</td>
                    <td>
                        <button class="action-btn block" onclick="blockUser(${item.id})">Blokir</button>
                        <button class="action-btn delete" onclick="deleteHistory(${item.id})">Hapus</button>
                    </td>
                </tr>`;
            });
        }
        html += '</tbody></table>';

        Swal.fire({
            title: '📋 Riwayat Login',
            html: html,
            width: '90%',
            confirmButtonText: 'Tutup'
        });
    }

    function blockUser(id) {
        let history = JSON.parse(localStorage.getItem('login_history')) || [];
        history = history.map(item => item.id === id ? {...item, status: 'Diblokir'} : item);
        localStorage.setItem('login_history', JSON.stringify(history));
        Toast.fire({ icon: 'warning', title: 'Pengguna diblokir' });
        openLoginHistory();
    }

    function deleteHistory(id) {
        let history = JSON.parse(localStorage.getItem('login_history')) || [];
        history = history.filter(item => item.id !== id);
        localStorage.setItem('login_history', JSON.stringify(history));
        Toast.fire({ icon: 'success', title: 'Riwayat dihapus' });
        openLoginHistory();
    }
</script>
</body>
</html>
