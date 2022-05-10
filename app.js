const puppeteer = require('puppeteer');

const configs = require('./configs.js');
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));

const indeedPosterScreenshots = async () => {
  const browser = await puppeteer.launch({
    // executablePath:"/usr/bin/chromium-browser",
    args: ['--no-sandbox',
  
    ],
    headless: false,
    slowMo: 100
  });
  try{
    //Handles loading indeed.com
    const page = await browser.newPage();
    await page.goto('https://www.indeed.com/');
    await waitForPageLoadWithScreenshots('welcome', page);
    await waitForPageLoadWithScreenshots('welcome', page);
    page.waitForNavigation();
    await page.click('.eac13zx0');
    await waitForPageLoadWithScreenshots('login', page);
    await waitForPageLoadWithScreenshots('login', page);
    await page.click('#googleContainer');
    await waitForPageLoadWithScreenshots('login', page);
    await waitForPageLoadWithScreenshots('login', page);
    const pages = await browser.pages(); // get all open pages by the browser
    const popup = pages[pages.length - 1];

    //Handles the google Oauth login
    await waitForPageLoadWithScreenshots('login', popup);
    await waitForPageLoadWithScreenshots('login', popup);
    await popup.type("#identifierId", configs.email);
    await popup.keyboard.press('Enter');
    await waitForPageLoadWithScreenshots('login', popup);
    await waitForPageLoadWithScreenshots('login', popup);
    await popup.type('input[type="password"]', configs.password);
    await popup.keyboard.press('Enter');
    await waitForPageLoadWithScreenshots('login', popup);
    await waitForPageLoadWithScreenshots('login', popup);
    await popup.click('.VfPpkd-vQzf8d');
    const gcode = await prompt('What is your Gcode? ');
    await waitForPageLoadWithScreenshots('login', popup);
    await waitForPageLoadWithScreenshots('login', popup);
    await popup.type("#idvPin", gcode);
    await popup.click('.VfPpkd-LgbsSe-OWXEXe-k8QpJ');

    //Handles getting to post employer Job Post
    await waitForPageLoadWithScreenshots('login', page);
    await waitForPageLoadWithScreenshots('login', page);
    await waitForPageLoadWithScreenshots('login', page);
    await page.click('.icl-TextPromo-linkText');
    await waitForPageLoadWithScreenshots('createAJobPost', page);
    await page.click('.postJobCta');
    await waitForPageLoadWithScreenshots('createAJobPost', page);
    await waitForPageLoadWithScreenshots('createAJobPost', page);
    await waitForPageLoadWithScreenshots('createAJobPost', page);
    await page.click('[type="submit"]');
    await waitForPageLoadWithScreenshots('createAJobPost', page);
    await waitForPageLoadWithScreenshots('createAJobPost', page);
    await waitForPageLoadWithScreenshots('createAJobPost', page);
    await page.type('[name="remote.draftJobPosts.title"]', configs.jobTitle);

    //Handles filling out the Job post page One
    await waitForPageLoadWithScreenshots('createAJobPost', page);
    await page.click('[for="ipl-RadioBarFormField-18-1"]');
    await waitForPageLoadWithScreenshots('createAJobPost', page);
    await page.click('[for="ipl-RadioBarFormField-18-1"]');
    await clickAwayForLoadPageOne(page);
    await waitForPageLoadWithScreenshots('createAJobPost', page);
    await page.click('[data-testid="OneCity"]');
    await clickAwayForLoadPageOne(page);
    await waitForPageLoadWithScreenshots('createAJobPost', page);
    await page.type('#advertiserLocationsInput_oneCity', configs.city)
    await page.click('[type="submit"]');
    await waitForPageLoadWithScreenshots('createAJobPost', page);
    await page.click('[type="submit"]');

    //Handles filling out the Job post page Two
    await waitForPageLoadWithScreenshots('secondJobPostPage', page);
    await page.click(configs.fullOrPartTime[1]);
    await waitForPageLoadWithScreenshots('secondJobPostPage', page);
    await page.click('#downshift-0-toggle-button');
    await waitForPageLoadWithScreenshots('secondJobPostPage', page);
    await page.click(configs.schedule[7]);
    await waitForPageLoadWithScreenshots('secondJobPostPage', page);
    await page.select('#remote.draftJobPosts.attributes.intHiresNeeded', configs.howManyToHire[1]);
    await waitForPageLoadWithScreenshots('secondJobPostPage', page);
    await page.select('#remote.draftJobPosts.attributes.expectedHireDate', configs.howQuicklyToHire[0]);
    await page.click('[type="submit"]');

    //Handles filling out the Job post page Three
    await waitForPageLoadWithScreenshots('thirdJobPostPage', page);
    await page.$eval('#local.temp-salary.minimum', el => el.value = configs.minimumPay);
    await page.$eval('#local.temp-salary.maximum', el => el.value = configs.maximumPay);
    await page.click('#downshift-256-toggle-button');
    await page.click(configs.supplementalPay[3]);
    // await page.click('#downshift-447-toggle-button');
    // await page.click(configs.benefits);
    await page.click('[type="submit"]');

    //Handles filling out the Job post page Four
    await waitForPageLoadWithScreenshots('fourthJobPostPage', page);
    await page.type('#JobDescription-editor-editor-content', configs.jobDescription);
    await page.type('#ifl-TextAreaFormField-3470', configs.covidPrecautions);
    await page.click('[type="submit"]');

    //Handles filling out the Job post page Five
    await waitForPageLoadWithScreenshots('fifthJobPostPage', page);
    await page.click('span[text="By checking this box, you instruct Indeed to notify candidates that you have declined their application if you have not interacted with them on Indeed during your chosen time frame, per the "]')
    await page.click('[type="submit"]');

    //Handles filling out the Job post page six
    await waitForPageLoadWithScreenshots('sixthJobPostPage', page);
    await page.click('button[aria-label="Remove Application question: What percentage of the time are you willing to travel for work?"]');
    await page.click('[type="submit"]');

    //Handles filling out the Job post page final
    await waitForPageLoadWithScreenshots('finalJobPostPage', page);
    await page.click('[type="submit"]');

    //Handles filling out the sponsor Job post page one
    await waitForPageLoadWithScreenshots('finalJobPostPage', page);
    await page.click('button[data-dd-action-name="FTP-button"]');
    await page.click('[type="submit"]');

    await page.waitForNavigation();
    await browser.close();
  }catch(err){
    await browser.close();
    console.log(err);
  }
}

async function clickAwayForLoadPageOne(page){
  await waitForPageLoadWithScreenshots('multiLocation', page);
  await page.click('[name="remote.draftJobPosts.title"]');
}

async function waitForPageLoadWithScreenshots(filename, page){
  await page.screenshot({
    path: `${filename}.png`
  });
  await page.screenshot({
    path: `${filename}.png`
  });
  await page.screenshot({
    path: `${filename}.png`
  });
  await page.screenshot({
    path: `${filename}.png`
  });
  await page.screenshot({
    path: `${filename}.png`
  });
  await page.screenshot({
    path: `${filename}.png`
  });
}

indeedPosterScreenshots();