/**
 * Data Structure: Array of Blog Metadata
 */
const blogIndex = [
          {
                    id: "post-riscv",
                    title: "Designing a 32-bit Single-Cycle RISC-V Processor in Verilog",
                    date: "May 17, 2026",
                    readTime: "12 min read",
                    category: "Hardware",
                    excerpt: "Constructing an RV32I processor entirely from scratch. A deep dive into datapath routing, control unit logic, and executing assembly.",
                    url: "pages/RISCV/index.html"
          },
          {
                    id: "post-dsp-filter",
                    title: "Implementing FIR Filters on FPGAs",
                    date: "April 22, 2026",
                    readTime: "8 min read",
                    category: "DSP",
                    excerpt: "An exploration of finite impulse response filters. How to translate mathematical equations into efficient hardware using pipeline registers.",
                    url: "#" // Placeholder
          },
          {
                    id: "post-laplace",
                    title: "Visualizing the Laplace Transform",
                    date: "March 15, 2026",
                    readTime: "6 min read",
                    category: "Mathematics",
                    excerpt: "Moving from the time domain to the complex frequency domain. Understanding poles, zeros, and system stability through interactive graphs.",
                    url: "#" // Placeholder
          }
];

document.addEventListener("DOMContentLoaded", () => {
          const feedContainer = document.getElementById("feed-container");
          const filterBtns = document.querySelectorAll(".filter-btn");

          if (!feedContainer) return;

          // Function to render posts based on category
          function renderPosts(categoryFilter) {
                    // Clear current feed
                    feedContainer.innerHTML = '';

                    // Filter the array
                    const filteredPosts = categoryFilter === 'all'
                              ? blogIndex
                              : blogIndex.filter(post => post.category === categoryFilter);

                    if (filteredPosts.length === 0) {
                              feedContainer.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #64748b;">No articles found in this category.</p>`;
                              return;
                    }

                    // Generate HTML
                    const feedHTML = filteredPosts.map(post => {
                              return `
                <article class="card">
                    <div class="card-header">
                        <span class="card-category">${post.category}</span>
                        <span class="card-read-time"><i class="far fa-clock"></i> ${post.readTime}</span>
                    </div>
                    <h3 class="card-title"><a href="${post.url}">${post.title}</a></h3>
                    <p class="card-excerpt">${post.excerpt}</p>
                    <div class="card-footer">
                        <span class="card-date">${post.date}</span>
                        <a href="${post.url}" class="card-link">Read Post <i class="fas fa-arrow-right" style="font-size: 0.8rem;"></i></a>
                    </div>
                </article>
            `;
                    }).join('');

                    feedContainer.innerHTML = feedHTML;
          }

          // Initial load (show all)
          renderPosts('all');

          // Filter button click logic
          filterBtns.forEach(btn => {
                    btn.addEventListener("click", (e) => {
                              // Remove active class from all buttons
                              filterBtns.forEach(b => b.classList.remove("active"));

                              // Add active class to clicked button
                              e.target.classList.add("active");

                              // Get category and render
                              const selectedCategory = e.target.getAttribute("data-filter");
                              renderPosts(selectedCategory);
                    });
          });
});