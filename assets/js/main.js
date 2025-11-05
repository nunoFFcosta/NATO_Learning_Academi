/**
 * NATO Learning Academy - Main JavaScript File
 * ============================================
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Initialize application
    init();
});

/**
 * Initialize the application
 */
function init() {
    console.log('NATO Learning Academy initialized');
    
    // Initialize components
    initNavbar();
    initTooltips();
    initOtherComponents();
}

/**
 * Initialize navbar functionality
 */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    // Add scroll effect to navbar (optional)
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/**
 * Initialize Bootstrap tooltips
 */
function initTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

/**
 * Initialize other Bootstrap components (popovers, etc.)
 */
function initOtherComponents() {
    // Initialize popovers if needed
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
}

/**
 * Utility function to handle smooth scrolling
 */
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

/**
 * Utility function to debounce function calls
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export functions for use in other scripts (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        smoothScroll,
        debounce
    };
}

