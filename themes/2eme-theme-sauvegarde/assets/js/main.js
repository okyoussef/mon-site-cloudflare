document.addEventListener('DOMContentLoaded', function () {
    const tocToggle = document.getElementById('toc-toggle');
    const tocContainer = document.getElementById('toc');
    const toggleAction = document.querySelector('.toc-toggle-action');

    if (tocToggle && tocContainer) {
        // Initial state: ensure label is correct if we start collapsed
        if (toggleAction) {
            toggleAction.textContent = '[Show]';
        }

        tocToggle.addEventListener('click', function () {
            const isActive = tocContainer.classList.toggle('is-active');
            if (toggleAction) {
                toggleAction.textContent = isActive ? '[Hide]' : '[Show]';
            }
        });
    }
});
