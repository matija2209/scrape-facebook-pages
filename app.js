const puppeteer = require('puppeteer');
require('dotenv').config();
const {autoScroll} = require('./helpers')

const spawnChrome = async ()=> {
    const browser = await puppeteer.launch({headless: false} ); //{ headless: false,devtools: true } {args: ['--no-sandbox']}
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080});
    return {browser,page}
    for (let index = 0; index < hotels.length; index++) {
        await page.goto(hotels[index]);
        await delay(1000)
        await page.click('li[data-page="contact"]')
        await page.type('.block__item input#f_name',"Katharina Pilz",{delay:50})
        await page.type('.block__item input#f_email',"kathi.pilz@hotmail.com",{delay:55})
        await page.select('select#f_subject', '9')
        await page.type('.block__item #f_message',"Hi, do you have a private room or studio for a couple available for the dates: 30th of September until 31st of October. What would be the price? Looking forward to hearing from you. Best, Katharina P.S. Do you also offer long stay? If yes, could you send us the offer for stay between 30th of September and 31st of March 22.",{delay:15})
        await page.click("input.form__submit")
        await delay(1000)
        console.log("\t- success - ",hotels[index]);
    }
}

const login = async ({...data}) =>{
    const {browser,page} = data
    await page.goto("https://www.facebook.com/")
    await page.click('button[data-testid="cookie-policy-dialog-accept-button"]')
    await page.type('input#email',process.env.FB_USERNAME,{delay:50})
    await page.type('input#pass',process.env.FB_PASSWORD,{delay:50})
    await Promise.all([
        page.click('button[name="login"]'),
        page.waitForNavigation({waitUntil: 'networkidle2'})
    ]);
}

const searchPage = async ({...data})=>{
    const {browser,page} = data
    await delay(1200)
    await page.type('input[placeholder="Search Facebook"]',"Marketing Agency",{delay:50})
    await Promise.all([
        page.keyboard.press('Enter'),
        page.waitForNavigation({waitUntil: 'networkidle2'})
    ]);
    await delay(1200)
    await Promise.all([
        page.evaluate(() => { document.querySelectorAll('a[href^="/search/pages/"]')[0].click();}),
        page.waitForNavigation({waitUntil: 'networkidle2'})
    ])
}

const extractResults = async ({...data})=>{
    const {browser,page} = data
    await page.evaluate(()=>{
        document.querySelectorAll('div[role="article"] span a')
        debugger
    })
    // await autoScroll(data)
}

const enterLocation = async ({...data})=> {
    const {browser,page} = data
    await delay(1250)
    debugger
    await page.evaluate(() => document.querySelectorAll('div[aria-haspopup="listbox"]')[0].click())
    debugger
    await delay(350)
    await page.type('input[aria-label="Location"]','London, United Kingdom')
    await page.click('ul[aria-label*="suggested searches"] li:first-child')
    // await page.evaluate(() => { document.querySelectorAll('ul[aria-label*="suggested searches"] li:first-child')[0].click()});
    debugger
    
}

const main = async ()=> {
    const driver = await spawnChrome()
    await login(driver)
    await searchPage(driver)
    await enterLocation(driver)
    await extractResults(driver)
    debugger
}

function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }

 main()