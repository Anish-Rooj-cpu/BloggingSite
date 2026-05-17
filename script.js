/**
 * Data Structure: Array of Blog Metadata
 * Each object maps to a distinct HTML file in the /pages directory.
 */
const blogIndex = [
          {
                    id: "post-riscv",
                    title: "Building a Single-Cycle RISC-V Processor",
                    date: "2026-05-17",
                    excerpt: "Constructing a 32-bit RV32I single-cycle RISC-V processor entirely in Verilog HDL.",
                    url: "pages/RISCV/index.html" // <-- This is the updated path matching your folder structure
          }
];

document.addEventListener("DOMContentLoaded", () => {
          const feedContainer = document.getElementById("feed-container");
          if (!feedContainer) return;

          const feedHTML = blogIndex.map(post => {
                    return `
          <article class="card">
          <span class="card-date">${post.date}</span>
          <h3 class="card-title">${post.title}</h3>
          <p class="card-excerpt">${post.excerpt}</p>
          <a href="${post.url}" class="card-link">Read Full Post</a>
          </article>
`;
          }).join('');

          feedContainer.innerHTML = feedHTML;
});