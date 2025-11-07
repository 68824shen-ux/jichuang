// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.12)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
    }
});

// 移动端菜单切换
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // 动画效果
        const spans = hamburger.querySelectorAll('span');
        if (hamburger.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(7px, 7px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // 关闭移动端菜单
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
    });
});

// 滚动显示动画
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// 观察所有需要动画的元素
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.business-card, .team-member, .timeline-item');
    animatedElements.forEach(el => {
        el.classList.add('scroll-reveal');
        observer.observe(el);
    });
});

// 语言切换
const languageSwitches = document.querySelectorAll('.language-switch span');
languageSwitches.forEach(span => {
    span.addEventListener('click', function() {
        languageSwitches.forEach(s => s.classList.remove('active'));
        this.classList.add('active');
        
        // 这里可以添加实际的语言切换逻辑
        console.log('切换语言:', this.textContent);
    });
});

// 业务卡片悬停效果增强
const businessCards = document.querySelectorAll('.business-card');
businessCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// 添加页面加载动画
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// 鼠标跟随效果（可选）
let mouseX = 0;
let mouseY = 0;
let ballX = 0;
let ballY = 0;
let speed = 0.1;

function animate() {
    let distX = mouseX - ballX;
    let distY = mouseY - ballY;
    
    ballX += distX * speed;
    ballY += distY * speed;
    
    requestAnimationFrame(animate);
}

document.addEventListener('mousemove', function(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
});

animate();

// 统计数字动画
function animateNumber(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// 返回顶部按钮（可选添加）
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '↑';
backToTopButton.className = 'back-to-top';
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    font-size: 24px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    z-index: 999;
`;

document.body.appendChild(backToTopButton);

window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
        backToTopButton.style.opacity = '1';
        backToTopButton.style.visibility = 'visible';
    } else {
        backToTopButton.style.opacity = '0';
        backToTopButton.style.visibility = 'hidden';
    }
});

backToTopButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

backToTopButton.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1) translateY(-5px)';
});

backToTopButton.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1) translateY(0)';
});

// 打印页面加载信息
console.log('%c欢迎访问我们的网站！', 'color: #0052D9; font-size: 20px; font-weight: bold;');
console.log('%c如有任何问题，请联系我们的客服团队。', 'color: #666; font-size: 14px;');

// 产品幻灯片自动切换
function initProductSlideshow() {
    const slideshows = document.querySelectorAll('.product-slideshow');
    
    slideshows.forEach(slideshow => {
        const images = slideshow.querySelectorAll('.slide-image');
        if (images.length <= 1) return;
        
        let currentIndex = 0;
        
        // 自动切换函数
        function nextSlide() {
            images[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % images.length;
            images[currentIndex].classList.add('active');
        }
        
        // 每3秒自动切换
        setInterval(nextSlide, 3000);
    });
}

// 页面加载完成后初始化幻灯片
document.addEventListener('DOMContentLoaded', initProductSlideshow);

