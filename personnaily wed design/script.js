// 导航栏菜单切换
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// 照片轮播
const carousel = document.querySelector('.carousel-container');
const slides = document.querySelectorAll('.carousel-slide');
const dotsContainer = document.querySelector('.carousel-dots');

// 创建轮播点
slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

let currentSlide = 0;
const dots = document.querySelectorAll('.dot');

function goToSlide(n) {
    carousel.style.transform = `translateX(-${n * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[n].classList.add('active');
    currentSlide = n;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    goToSlide(currentSlide);
}

// 自动轮播
setInterval(nextSlide, 5000);

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// AI助手聊天功能
const chatToggle = document.querySelector('.chat-toggle');
const chatContainer = document.querySelector('.chat-container');
const closeChat = document.querySelector('.close-chat');
const messageInput = document.getElementById('messageInput');
const sendMessage = document.querySelector('.send-message');
const chatMessages = document.querySelector('.chat-messages');

// 切换聊天窗口
chatToggle.addEventListener('click', () => {
    chatContainer.classList.add('active');
});

closeChat.addEventListener('click', () => {
    chatContainer.classList.remove('active');
});

// 发送消息
function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(isUser ? 'user' : 'bot');
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 模拟AI响应
function getBotResponse(message) {
    const responses = [
        "我明白你的问题，让我想想...",
        "这是个很好的问题！",
        "需要更多信息吗？",
        "我很乐意帮助你解决这个问题。",
        "让我为你详细解释一下。"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

function handleMessage() {
    const message = messageInput.value.trim();
    if (message) {
        addMessage(message, true);
        messageInput.value = '';
        
        // 模拟AI延迟响应
        setTimeout(() => {
            const response = getBotResponse(message);
            addMessage(response);
        }, 1000);
    }
}

sendMessage.addEventListener('click', handleMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleMessage();
    }
}); 