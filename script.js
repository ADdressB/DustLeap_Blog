document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    const filterTabs = document.querySelectorAll('.filter-tab');
    const articleCards = document.querySelectorAll('.article-card');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            articleCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp 0.5s ease-out';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    const newsletterForm = document.getElementById('newsletterForm');
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        const btn = this.querySelector('button');
        const originalText = btn.textContent;
        btn.textContent = '订阅成功！';
        btn.style.background = '#86efac';
        btn.style.color = '#166534';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.style.color = '';
            this.reset();
        }, 2000);
    });

    const loadMoreBtn = document.getElementById('loadMoreBtn');
    let loadMoreClickCount = 0;
    
    loadMoreBtn.addEventListener('click', function() {
        loadMoreClickCount++;
        
        if (loadMoreClickCount >= 2) {
            this.textContent = '没有更多文章了';
            this.disabled = true;
            this.style.opacity = '0.5';
            this.style.cursor = 'not-allowed';
        } else {
            this.textContent = '加载中...';
            
            setTimeout(() => {
                this.textContent = '加载更多';
            }, 1000);
        }
    });

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
    
    document.querySelectorAll('.featured-card, .article-card, .category-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const cards = document.querySelectorAll('.featured-card, .article-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
        
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    console.log('🌿 绿野随笔 - 欢迎来到我的博客');

    const searchToggle = document.getElementById('searchToggle');
    const searchBox = document.getElementById('searchBox');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    const articlesData = [
        { title: '春日漫步：在樱花树下遇见最美的时光', category: '生活随笔', url: 'article.html', excerpt: '三月的午后，阳光透过樱花的花瓣洒落一地斑驳的光影...' },
        { title: '森林深处的秘密花园', category: '自然探索', url: 'article.html', excerpt: '在那片古老的森林深处，藏着一个鲜为人知的秘密花园...' },
        { title: '一盏清茶，半日闲情', category: '慢生活', url: 'article.html', excerpt: '午后的阳光斜斜地照进窗棂，我泡上一壶龙井...' },
        { title: '晨光中的第一缕温暖', category: '生活随笔', url: 'article.html', excerpt: '清晨的第一缕阳光穿过窗帘的缝隙...' },
        { title: '云端之上的邂逅', category: '旅行日记', url: 'article.html', excerpt: '登上山顶的那一刻，云海在脚下翻涌...' },
        { title: '听雨：一场与自然的对话', category: '自然感悟', url: 'article.html', excerpt: '雨滴敲打着屋檐，奏响一曲自然的乐章...' },
        { title: '书页间的诗意栖居', category: '生活随笔', url: 'article.html', excerpt: '翻开一本旧书，淡淡的墨香扑面而来...' },
        { title: '海边日落：时光的馈赠', category: '旅行日记', url: 'article.html', excerpt: '夕阳西下，海面被染成金色...' },
        { title: '星空下的沉思', category: '自然感悟', url: 'article.html', excerpt: '仰望满天繁星，感受宇宙的浩瀚与神秘...' }
    ];

    if (searchToggle && searchBox && searchInput && searchResults) {
        searchToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            searchBox.classList.toggle('active');
            if (searchBox.classList.contains('active')) {
                searchInput.focus();
            }
        });

        document.addEventListener('click', function(e) {
            if (!searchBox.contains(e.target)) {
                searchBox.classList.remove('active');
                searchResults.classList.remove('active');
            }
        });

        searchInput.addEventListener('input', function() {
            const query = this.value.trim().toLowerCase();
            
            if (query.length === 0) {
                searchResults.classList.remove('active');
                return;
            }

            const results = articlesData.filter(article => 
                article.title.toLowerCase().includes(query) || 
                article.excerpt.toLowerCase().includes(query)
            );

            if (results.length > 0) {
                searchResults.innerHTML = results.map(article => `
                    <div class="search-result-item" onclick="location.href='${article.url}'">
                        <div class="result-title">${article.title}</div>
                        <div class="result-category">${article.category}</div>
                    </div>
                `).join('');
            } else {
                searchResults.innerHTML = '<div class="search-no-results">没有找到相关文章</div>';
            }

            searchResults.classList.add('active');
        });
    }

    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
});
