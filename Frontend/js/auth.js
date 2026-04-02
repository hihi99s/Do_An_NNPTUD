// auth.js: Chặn và bảo vệ các luồng truy cập phân quyền

function checkAuthAndRole(requiredRole) {
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');
    
    // Chưa đăng nhập: Sẽ bị đuổi về Login NẾU route có yêu cầu phân quyền
    if (!token || !userString) {
        if (requiredRole) {
            window.location.href = '/login.html';
        }
        return null;
    }
    
    const user = JSON.parse(userString);

    // Nếu kiểm duyệt chặt quyền hạn (Ví dụ URL /admin/.. nhưng user có role PATIENT)
    if (requiredRole && user.role !== requiredRole) {
        alert("Bạn không có quyền truy cập vào khu vực này!");
        // Trả về đúng nhà của nó
        if(user.role === 'ADMIN') window.location.href = '/admin.html';
        else if(user.role === 'DOCTOR') window.location.href = '/doctor.html';
        else window.location.href = '/dashboard.html';
        return null;
    }

    return user;
}

// Cập nhật góc phải Thanh Menu cho các trang Nội Bộ
function renderNavbarUser() {
    const userJson = localStorage.getItem('user');
    const authLinksArea = document.getElementById('auth-links');
    
    if (userJson && authLinksArea) {
        const user = JSON.parse(userJson);
        const dashLink = user.role === 'ADMIN' ? '/admin.html' : (user.role === 'DOCTOR' ? '/doctor.html' : '/dashboard.html');
        authLinksArea.innerHTML = `
            <a href="/index.html" class="text-emerald-300 font-black hover:text-white mr-4 transition">🏠 TRANG CHỦ</a>
            <a href="${dashLink}" class="text-blue-300 font-black hover:text-white mr-4 transition">📋 KHU VỰC CÁ NHÂN</a>
            <span class="text-white font-medium mr-4 border-l-2 border-slate-600 pl-4">Hi, ${user.fullName || user.username}</span>
            <button onclick="logout()" class="text-red-300 font-bold hover:text-red-100 bg-blue-950 px-3 py-1 rounded transition">Đăng Xuất</button>
        `;
    }
}

// Cập nhật góc phải Thanh Menu cho Trang Chủ
function renderNavbarPublic() {
    const userJson = localStorage.getItem('user');
    const authLinksArea = document.getElementById('auth-links');
    if (!authLinksArea) return;
    
    if (userJson) {
        const user = JSON.parse(userJson);
        const dashLink = user.role === 'ADMIN' ? '/admin.html' : (user.role === 'DOCTOR' ? '/doctor.html' : '/dashboard.html');
        authLinksArea.innerHTML = `
            <a href="/index.html" class="text-emerald-300 font-black hover:text-white mr-4 transition">🏠 TRANG CHỦ</a>
            <a href="${dashLink}" class="text-blue-300 font-black hover:text-white mr-4 transition">📋 KHU VỰC CÁ NHÂN</a>
            <span class="text-white font-medium mr-4 border-l-2 border-slate-600 pl-4">Hi, ${user.fullName || user.username}</span>
            <button onclick="logout()" class="text-red-300 font-bold hover:text-red-100 bg-blue-950 px-3 py-1 rounded transition">Đăng Xuất</button>
        `;
    } else {
        authLinksArea.innerHTML = `
            <a href="/login.html" class="text-emerald-300 font-black hover:text-white mr-4 transition">🔑 ĐĂNG NHẬP</a>
            <a href="/register.html" class="bg-blue-600 text-white font-black px-4 py-2 rounded-lg hover:bg-blue-500 transition shadow">ĐĂNG KÝ KHÁM</a>
        `;
    }
}
