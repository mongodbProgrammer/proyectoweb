const responsive = () => {
    const width = window.innerWidth < 800 ? window.innerWidth*1.25 : window.innerWidth
    const height = window.innerWidth < 600 ? window.innerHeight*1.1 : window.innerHeight

    const fontsize = height / 125 + width / 400;

    document.documentElement.style.fontSize = fontsize + 'px';
    window.addEventListener('resize', () => {
        const width = window.innerWidth < 800 ? window.innerWidth*1.25 : window.innerWidth
        const height = window.innerWidth  < 600 ? window.innerHeight*1.1 : window.innerHeight

        const fontsize = height / 100 + width / 450;
        document.documentElement.style.fontSize = fontsize + 'px';
    });
}

responsive();