console.log('Hello World!');

const allLinks = document.querySelectorAll('a');

allLinks.forEach(link => {
    link.addEventListener('click', event => {
        // Make sure it's not external.
        if (link.hostname !== window.location.hostname) {
            return;
        }
        // Make sure it's not a hash link.
        if (link.pathname.startsWith('#')) {
            return;
        }
        // Make sure it's not a download link.
        if (link.pathname.endsWith('.*')) {
            return;
        }

        event.preventDefault();
        const href = link.getAttribute('href');
        //console.log(href);

        document.documentElement.classList.add('transitioning-out');

        // Preload the page.
        const prefetch = document.createElement('link');
        prefetch.rel = 'prefetch';
        prefetch.href = href;
        document.head.appendChild(prefetch);

        // Allow link to fire after delay.
        setTimeout(() => {
            window.location.href = href;
        }
        , 200);

        // Set sessionStorage transition to true.
        sessionStorage.setItem('transition', true);
    });
});
