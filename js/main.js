// 방송 시간 카운트다운
function updateCountdown() {
    const countdowns = document.querySelectorAll('.countdown');
    
    countdowns.forEach(countdown => {
        const day = parseInt(countdown.dataset.day);
        const hour = parseInt(countdown.dataset.hour);
        
        // 다음 방송까지 남은 시간 계산
        const now = new Date();
        const next = new Date();
        
        next.setDate(next.getDate() + (day - now.getDay() + 7) % 7);
        next.setHours(hour, 0, 0, 0);
        
        if (now > next) {
            next.setDate(next.getDate() + 7);
        }
        
        const diff = next - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        
        countdown.textContent = `다음 방송까지 ${days}일 ${hours}시간`;
    });
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', () => {
    updateCountdown();
    setInterval(updateCountdown, 60000); // 1분마다 업데이트
});

// 스크롤 애니메이션
const sections = document.querySelectorAll('.section');
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});
