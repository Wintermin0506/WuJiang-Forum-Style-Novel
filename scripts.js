// 移动端菜单切换
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mainNav = document.getElementById('mainNav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
        
        // 点击菜单外区域关闭菜单
        document.addEventListener('click', function(event) {
            if (!mainNav.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
                mainNav.classList.remove('active');
            }
        });
    }
    
    // 登录/注册按钮点击事件
    const loginBtn = document.querySelector('.btn-login');
    const registerBtn = document.querySelector('.btn-register');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            alert('登录功能仅用于展示，本论坛内容均为虚构故事');
        });
    }
    
    if (registerBtn) {
        registerBtn.addEventListener('click', function() {
            alert('注册功能仅用于展示，本论坛内容均为虚构故事');
        });
    }
    
    // 隐藏的管理员帖子彩蛋
    const adminPostLink = document.querySelector('.admin-post-link');
    if (adminPostLink) {
        adminPostLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('系统通知：检测到异常访问模式。论坛部分内容可能包含未经核实的信息，请谨慎对待。');
        });
    }
    
    // 随机在线人数变化（增加真实感）
    const onlineCounters = document.querySelectorAll('.online-counter strong, .stat-number');
    setInterval(() => {
        onlineCounters.forEach(counter => {
            if (counter.textContent.includes(',')) {
                const current = parseInt(counter.textContent.replace(/,/g, ''));
                const change = Math.floor(Math.random() * 21) - 10; // -10 到 +10
                const newValue = Math.max(1, current + change);
                counter.textContent = newValue.toLocaleString();
            }
        });
    }, 30000); // 每30秒更新一次

    // 初始化举报按钮功能
    initializeReportButtons();
    initializeButtonAnimations();
});

// 举报按钮功能
function initializeReportButtons() {
    // 使用事件委托处理举报按钮点击
    document.addEventListener('click', function(e) {
        if (e.target.closest('.action-btn.report') || 
            (e.target.classList.contains('action-btn') && e.target.textContent.includes('举报'))) {
            e.preventDefault();
            
            // 创建确认弹窗
            const confirmReport = confirm('确定要举报此内容吗？');
            
            if (confirmReport) {
                // 显示举报成功消息
                alert('举报已提交，管理员会尽快处理');
                
                // 禁用已举报的按钮
                const reportBtn = e.target.closest('.action-btn') || e.target;
                reportBtn.disabled = true;
                reportBtn.innerHTML = '✅ 已举报';
                reportBtn.style.color = '#95a5a6';
                reportBtn.style.cursor = 'not-allowed';
                
                // 添加动画效果
                addButtonAnimation(reportBtn);
            }
        }
    });
}

// 按钮动画效果
function initializeButtonAnimations() {
    document.addEventListener('click', function(e) {
        const btn = e.target.closest('.action-btn');
        if (!btn) return;
        
        // 跳过已禁用的举报按钮
        if (btn.disabled && (btn.textContent.includes('举报') || btn.textContent.includes('已举报'))) {
            return;
        }
        
        // 为所有按钮添加点击动画
        addButtonAnimation(btn);
        
        // 如果是回复按钮，可以添加额外功能
        const btnText = btn.textContent || btn.innerText;
        if (btnText.includes('回复') || btnText.includes('↩️')) {
            // 这里可以添加回复功能的实现
            // 例如：滚动到回复表单或打开回复编辑器
        }
    });
}

// 通用的按钮动画函数
function addButtonAnimation(button) {
    button.style.transition = 'all 0.3s ease';
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);
}