const autoScroll = async ({...data})=>{
    const {browser,page} = data
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;
                // scrollHeight
                if(totalHeight >= 5000){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}

module.exports = {autoScroll}