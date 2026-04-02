const API_URL = 'http://localhost:3000';

// Hàm Fetch API gắn kèm Token Xóa/Sửa/Thêm
async function authFetch(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };
    
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers
    });
    
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || data.error || 'Có lỗi xảy ra từ Hệ thống');
    }
    return data;
}

// Upload file rác (định dạng form-data)
async function uploadFileAPI(file) {
    const formData = new FormData();
    formData.append('file', file);

    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData
    });
    
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Lỗi tải ảnh');
    }
    return data; // Trả về { url: '...' }
}

function formatVND(amount) {
    return amount.toLocaleString('vi-VN', {style : 'currency', currency : 'VND'});
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login.html'; // Đưa rễ về trang login
}
