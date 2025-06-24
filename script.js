// ====================== NAVIGASI HALAMAN ======================
function showPage(pageId) {
    // Sembunyikan semua halaman
    document.querySelectorAll('.content-page').forEach(page => {
        page.style.display = 'none';
    });
    
    // Sembunyikan menu utama
    document.getElementById('main-menu').style.display = 'none';
    
    // Tampilkan halaman yang diminta
    const page = document.getElementById(pageId);
    if (page) page.style.display = 'block';
    
    // Scroll ke atas
    window.scrollTo(0, 0);
}

function showMainMenu() {
    // Sembunyikan semua halaman
    document.querySelectorAll('.content-page').forEach(page => {
        page.style.display = 'none';
    });
    
    // Tampilkan menu utama
    document.getElementById('main-menu').style.display = 'block';
    
    // Scroll ke atas
    window.scrollTo(0, 0);
}

// ====================== MODAL GAMBAR ======================
const modalElements = {
    modal: document.getElementById('imageModal'),
    image: document.getElementById('modalImage'),
    closeBtn: document.getElementById('modalClose'),
    overlay: document.getElementById('copyOverlay'),
    notification: document.getElementById('copyNotification')
};

function initModalState() {
    modalElements.modal.style.display = 'none';
    modalElements.overlay.style.display = 'none';
    modalElements.notification.style.display = 'none';
}

function openModal(imageSrc) {
    modalElements.image.src = imageSrc;
    modalElements.modal.style.display = 'flex';
    modalElements.overlay.style.display = 'block';
    modalElements.notification.style.display = 'none';
}

function closeModal() {
    modalElements.modal.style.display = 'none';
    modalElements.image.src = '';
    modalElements.overlay.style.display = 'none';
    modalElements.notification.style.display = 'none';
}

function setupModalListeners() {
    // Buka modal saat kartu diklik
    document.querySelectorAll('.submenu-card').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            const img = card.querySelector('img');
            if (img) openModal(img.src);
        });
    });

    // Tutup modal dengan tombol close
    modalElements.closeBtn.addEventListener('click', closeModal);

    // Tutup modal saat klik di luar gambar (background modal)
    modalElements.modal.addEventListener('click', e => {
        if (e.target === modalElements.modal) closeModal();
    });

    // Tutup modal dengan tombol ESC
    document.addEventListener('keydown', e => {
        if ((e.key === 'Escape' || e.key === 'Esc') && modalElements.modal.style.display === 'flex') {
            closeModal();
        }
    });
}

// ====================== COPY TO CLIPBOARD ======================
async function copyImageToClipboard() {
    try {
        const response = await fetch(modalElements.image.src);
        const blob = await response.blob();
        const clipboardItem = new ClipboardItem({ [blob.type]: blob });
        await navigator.clipboard.write([clipboardItem]);
        
        // Tampilkan notifikasi berhasil salin
        modalElements.notification.style.display = 'block';

        // Sembunyikan notifikasi setelah 3 detik
        setTimeout(() => {
            modalElements.notification.style.display = 'none';
        }, 3000);
    } catch (error) {
        console.error('Gagal menyalin gambar:', error);
    }
}

// ====================== INITIAL SETUP ======================
window.addEventListener('DOMContentLoaded', () => {
    initModalState();
    setupModalListeners();

    // Tambahkan event copy pada overlay
    modalElements.overlay.addEventListener('click', copyImageToClipboard);
});
