const puppeteer = require('puppeteer');
const fs = require('fs');

function log(log_text) {
  log_text = moment().format("YYYY.MM.DD HH:mm:ss") + " ➾ " + log_text;
  console.log(log_text);
  fs.appendFileSync("log.txt", log_text + "\n");
}

log("Program başladı.");
log("Yapımcı: Can");
log("GitHub: https://github.com/fastuptime");
log("Telegram: https://t.me/by.can.i");
log("Ücretli program bot yaptırmak için bana ulaşa bilirsiniz!");

let bio = [
    'Marhaba dünya .d',
    'R10',
    "Can Adam",
];

let sites = [
    "https://r10.net",
    "https://fastuptime.com",
    "https://linkclk.net",
];

let account = {
    username: 'eroglubhayati',
    password: 'XHWSTBA36496',
}

puppeteer.launch({headless: false}).then(async browser => {
    const page = await browser.newPage();
    await page.goto('https://www.instagram.com/accounts/login/');
    await page.waitForSelector('input[name="username"]', {visible: true});
    await page.type('input[name="username"]', account.username);
    log("Kullanıcı adı yazıldı. (" + account.username + ")");
    await page.waitForSelector('input[name="password"]', {visible: true});
    await page.type('input[name="password"]', account.password);
    log("Parola yazıldı. (" + account.password + ")");
    await page.waitForSelector('button[type="submit"]', {visible: true});
    await page.click('button[type="submit"]');
    log("Giriş yapıldı.");
    await page.waitForNavigation();
    await page.goto("https://www.instagram.com/accounts/edit/",
        {waitUntil: 'networkidle2'});
    setTimeout(async () => {
        const filee = await page.$x('/html/body/div[1]/div/div/div/div[1]/div/div/div/div[1]/div[1]/section/main/div/article/form/div[4]/div/textarea');
        let biosu = bio[Math.floor(Math.random() * bio.length)];
        await filee[0].type(biosu);
        log("Bio yazıldı. (" + biosu + ")");
        let site_adresi = sites[Math.floor(Math.random() * sites.length)];
        const change_site = await page.$x('/html/body/div[1]/div/div/div/div[1]/div/div/div/div[1]/div[1]/section/main/div/article/form/div[3]/div/div/input');
        await change_site[0].type(site_adresi);
        log("Site adresi yazıldı. (" + site_adresi + ")");
        let submit_btn = await page.$x('/html/body/div[1]/div/div/div/div[1]/div/div/div/div[1]/div[1]/section/main/div/article/form/div[10]/div/div/button');
        await submit_btn[0].click();
        log("Kaydetme butonuna tıklandı.");
        await page.goto("https://www.instagram.com/" + account.username + "/",
            {waitUntil: 'networkidle2'});
        setTimeout(async () => {
            await page.screenshot({ path: `./gorev_sonu_ss/${account.username}.png` });
            await browser.close();
            log("Görev bitti. (" + account.username + ") SS'i kaydedildi.");
            console.log(`${account.username} isimli hesap başarıyla güncellendi. ${biosu} site: ${site_adresi}`);
            fs.appendFile('./gorev_sonu_ss/gorev_sonu.txt', `${account.username} isimli hesap başarıyla güncellendi. ${biosu} site: ${site_adresi}\n`, (err) => {
                if (err) throw err;
            });
        }, 10000); // 10 saniye bekle
    }, 10000); // 10 saniye bekle
}).catch(err => {
    log(err);
});