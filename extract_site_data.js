
(async () => {
    const html = document.documentElement.outerHTML;
    
    const cssLinks = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(el => el.href);
    const jsScripts = Array.from(document.querySelectorAll('script[src]')).map(el => el.src);
    const images = Array.from(document.querySelectorAll('img[src]')).map(el => el.src);
    
    // Check for specific banners or patterns
    const banners = images.filter(src => src.includes('banner') || src.includes('hydroponic tower system'));

    const internalLinks = Array.from(document.querySelectorAll('a[href]'))
        .map(el => el.href)
        .filter(href => href.startsWith(window.location.origin) || href.startsWith('/'));

    const githubLink = Array.from(document.querySelectorAll('a[href*="github.com"]')).map(el => el.href);

    return {
        html,
        assets: {
            css: cssLinks,
            js: jsScripts,
            images: images,
            banners: banners
        },
        links: {
            internal: internalLinks,
            github: githubLink
        }
    };
})()
