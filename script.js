// 스크롤 시 네비게이션 바 스타일 변경
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// 스무스 스크롤링
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// 폼 제출 처리
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 폼 데이터 수집
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // 버튼 로딩 상태
        const submitButton = this.querySelector('button[type="submit"]');
        const originalContent = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 전송 중...';
        submitButton.disabled = true;
        
        // 시뮬레이션된 API 호출
        setTimeout(() => {
            alert('문의가 접수되었습니다. 빠른 시일 내에 답변 드리겠습니다.');
            this.reset();
            submitButton.innerHTML = originalContent;
            submitButton.disabled = false;
        }, 1500);
    });
}

// CTA 버튼 클릭 이벤트
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', function() {
        document.querySelector('#pricing').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
}

// 스크롤 애니메이션
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .step, .pricing-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// 텍스트 변경 애니메이션
const texts = [
    "AI로 더 스마트하게",
    "데이터를 전략적으로",
    "성과를 분석 가능하게"
];

const changingText = document.querySelector('.changing-text');
let currentIndex = 0;
let isTyping = false;

function typeText(text) {
    if (isTyping) return;
    isTyping = true;
    
    let index = 0;
    changingText.textContent = '';
    changingText.style.opacity = '1';
    
    function type() {
        if (index < text.length) {
            changingText.textContent += text.charAt(index);
            index++;
            // 한글과 영문의 타이핑 속도 차이 조정
            const delay = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(text.charAt(index - 1)) ? 120 : 80;
            setTimeout(type, delay);
        } else {
            isTyping = false;
        }
    }
    
    type();
}

function changeText() {
    if (isTyping) return;
    
    changingText.classList.add('changing');
    changingText.style.opacity = '0';
    
    setTimeout(() => {
        currentIndex = (currentIndex + 1) % texts.length;
        changingText.classList.remove('changing');
        typeText(texts[currentIndex]);
    }, 500);
}

if (changingText) {
    typeText(texts[0]);
    setInterval(changeText, 8000); // 전체 주기를 8초로 늘림
}

// 마우스 움직임에 따른 3D 효과
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.feature-card, .pricing-card, .testimonial-card');
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const cardX = rect.left + rect.width / 2;
        const cardY = rect.top + rect.height / 2;
        
        const angleX = (mouseY - cardY) / 30;
        const angleY = (mouseX - cardX) / 30;
        
        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    });
});

// 마우스가 카드에서 벗어날 때 원래 위치로 복귀
document.querySelectorAll('.feature-card, .pricing-card, .testimonial-card').forEach(card => {
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'none';
    });
}); 