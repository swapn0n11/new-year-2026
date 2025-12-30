// Check for reduced motion preference to disable animations if needed
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Function to animate elements with fade-in and upward motion
function animateElement(element, delay) {
    if (prefersReducedMotion) return; // Skip animations if user prefers reduced motion
    setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }, delay);
}

// On page load, trigger staggered animations: headline first, then subtext, then button
document.addEventListener('DOMContentLoaded', () => {
    const headline = document.getElementById('headline');
    const subtext = document.getElementById('subtext');
    const cta = document.getElementById('cta');

    // Staggered delays: 0ms for headline, 500ms for subtext, 1000ms for button
    animateElement(headline, 0);
    animateElement(subtext, 500);
    animateElement(cta, 1000);
});

// Optional subtle cursor interaction: A low-opacity blue glow follows the mouse
document.addEventListener('mousemove', (e) => {
    if (prefersReducedMotion) return; // Skip if reduced motion is preferred
    const cursorGlow = document.createElement('div');
    cursorGlow.style.position = 'absolute';
    cursorGlow.style.width = '20px';
    cursorGlow.style.height = '20px';
    cursorGlow.style.background = 'radial-gradient(circle, rgba(0, 191, 255, 0.1) 0%, transparent 70%)';
    cursorGlow.style.borderRadius = '50%';
    cursorGlow.style.pointerEvents = 'none';
    cursorGlow.style.left = `${e.clientX - 10}px`;
    cursorGlow.style.top = `${e.clientY - 10}px`;
    cursorGlow.style.zIndex = '10';
    cursorGlow.style.transition = 'opacity 0.5s ease';
    document.body.appendChild(cursorGlow);

    // Remove the glow after a short time for performance
    setTimeout(() => {
        cursorGlow.style.opacity = '0';
        setTimeout(() => cursorGlow.remove(), 500);
    }, 100);
});
