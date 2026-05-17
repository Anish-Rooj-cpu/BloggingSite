// --- Blog Data ---
// In the future, this could be fetched from a JSON file or an API
const posts = [
    {
        title: "Designing a Single-Cycle RISC-V Processor",
        date: "May 10, 2026",
        category: "risc-v",
        excerpt: "A deep dive into constructing a single-cycle RISC-V processor from scratch using Verilog HDL. We explore instruction decoding, datapath construction, and memory interfacing.",
        link: "#"
    },
    {
        title: "Interactive Visualization of Z-Transforms",
        date: "April 28, 2026",
        category: "dsp",
        excerpt: "Understanding digital signal processing requires strong intuition. Here is how visualizing the Z-plane poles and zeros can clarify system stability.",
        link: "#"
    },
    {
        title: "Optimizing RTL for FPGA Implementation",
        date: "April 15, 2026",
        category: "rtl",
        excerpt: "Writing Verilog is one thing; writing synthesis-friendly RTL is another. Tips on reducing logic delay and managing clock domains on standard FPGA boards.",
        link: "#"
    }
];

// --- DOM Elements ---
const postContainer = document.getElementById('post-container');
const tags = document.querySelectorAll('.tag');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// --- Render Posts Function ---
function renderPosts(filter = 'all') {
    postContainer.innerHTML = ''; // Clear current posts
    
    const filteredPosts = filter === 'all' 
        ? posts 
        : posts.filter(post => post.category === filter);

    if (filteredPosts.length === 0) {
        postContainer.innerHTML = '<p>No posts found for this category.</p>';
        return;
    }

    filteredPosts.forEach(post => {
        const postElement = document.createElement('article');
        postElement.classList.add('post-card');
        
        postElement.innerHTML = `
            <div class="post-meta">
                <i class="far fa-calendar-alt"></i> ${post.date} &nbsp;|&nbsp; 
                <i class="fas fa-tag"></i> ${post.category.toUpperCase()}
            </div>
            <h2 class="post-title"><a href="${post.link}">${post.title}</a></h2>
            <p class="post-excerpt">${post.excerpt}</p>
            <a href="${post.link}" class="read-more">Read Article <i class="fas fa-arrow-right"></i></a>
        `;
        postContainer.appendChild(postElement);
    });
}

// --- Filtering Logic ---
tags.forEach(tag => {
    tag.addEventListener('click', (e) => {
        // Remove active class from all tags
        tags.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tag
        e.target.classList.add('active');
        
        // Render filtered posts
        const filterValue = e.target.getAttribute('data-filter');
        renderPosts(filterValue);
    });
});

// --- Dark Mode Toggle ---
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', targetTheme);
    localStorage.setItem('theme', targetTheme);
    
    // Update Icon
    if (targetTheme === 'dark') {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }
}

// Check for saved user preference
const savedTheme = localStorage.getItem('theme') || 
                   (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', toggleTheme);

// --- Initial Render ---
renderPosts();