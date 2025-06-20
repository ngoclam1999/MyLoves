document.addEventListener('DOMContentLoaded', () => {
    // Lấy các phần tử từ DOM
    const enterScreen = document.getElementById('enter-screen');
    const enterButton = document.getElementById('enter-button');
    const mainContent = document.getElementById('main-content');
    const music = document.getElementById('background-music');
    const musicToggle = document.getElementById('music-toggle');
    const openModalButton = document.getElementById('open-modal-button');
    const modal = document.getElementById('letter-modal');
    const closeModalButton = document.getElementById('close-modal-button');

    // --- Xử lý màn hình chờ ---
    enterButton.addEventListener('click', () => {
        enterScreen.classList.add('hidden');
        mainContent.classList.remove('hidden');
        
        music.play().catch(error => console.log("Autoplay bị chặn"));
        
        createHearts();
        setupSlideshow(); // Khởi tạo slideshow khi vào
    });

    // --- Điều khiển nhạc ---
    let isMusicPlaying = true;
    musicToggle.addEventListener('click', () => {
        if (isMusicPlaying) {
            music.pause();
            musicToggle.textContent = '🎵';
        } else {
            music.play();
            musicToggle.textContent = '🔇';
        }
        isMusicPlaying = !isMusicPlaying;
    });

    // --- Điều khiển cửa sổ lời chúc (Modal) ---
    openModalButton.addEventListener('click', () => modal.classList.add('visible'));
    closeModalButton.addEventListener('click', () => modal.classList.remove('visible'));
    modal.addEventListener('click', (event) => {
        if (event.target === modal) modal.classList.remove('visible');
    });

    // --- Tạo hiệu ứng trái tim bay ---
    function createHearts() {
        const container = document.querySelector('.hearts-container');
        if (container.children.length > 0) return;
        const heartCount = 20;
        for (let i = 0; i < heartCount; i++) {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.style.left = `${Math.random() * 100}vw`;
            heart.style.animationDuration = `${Math.random() * 5 + 5}s`;
            heart.style.animationDelay = `${Math.random() * 5}s`;
            heart.style.opacity = Math.random() * 0.5 + 0.2;
            heart.style.fontSize = `${Math.random() * 1.5 + 1}rem`;
            container.appendChild(heart);
        }
    }

    // --- LOGIC CHO SLIDESHOW ẢNH ---
    const TOTAL_PHOTOS = 24;
    let currentSlide = 0;
    let slides = [];

    function setupSlideshow() {
        const slidesWrapper = document.getElementById('slides-wrapper');
        const prevButton = document.querySelector('.prev');
        const nextButton = document.querySelector('.next');
        
        // Tạo các thẻ img
        for (let i = 1; i <= TOTAL_PHOTOS; i++) {
            const img = document.createElement('img');
            img.src = `assets/photos/${i}.jpg`;
            img.classList.add('slide');
            slidesWrapper.appendChild(img);
        }
        
        slides = document.querySelectorAll('.slide');
        
        // Thêm sự kiện cho nút
        prevButton.addEventListener('click', () => changeSlide(-1));
        nextButton.addEventListener('click', () => changeSlide(1));

        // Hiển thị slide đầu tiên
        showSlide(currentSlide);
    }

    function changeSlide(direction) {
        currentSlide += direction;
        if (currentSlide >= TOTAL_PHOTOS) {
            currentSlide = 0; // Quay lại ảnh đầu
        }
        if (currentSlide < 0) {
            currentSlide = TOTAL_PHOTOS - 1; // Về ảnh cuối
        }
        showSlide(currentSlide);
    }

    function showSlide(index) {
        const counter = document.getElementById('slide-counter');
        
        // Ẩn tất cả các slide
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Hiển thị slide được chọn
        if (slides[index]) {
            slides[index].classList.add('active');
        }
        
        // Cập nhật bộ đếm
        counter.textContent = `${index + 1} / ${TOTAL_PHOTOS}`;
    }
});