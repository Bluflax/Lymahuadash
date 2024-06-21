const indicator = document.getElementById('indicator');
const statustextcontainer = document.getElementById('statustext');
const statusprovider = document.getElementById('statusprovider');
const customprovider = document.getElementById('showcustom');
const cos1 = document.getElementById('cos1');
const cos2 = document.getElementById('cos2');
const recheck = document.getElementById('recheck');
//const theurl = 'https://www.google.com/';
//const theurl = 'https://twitter.com';
//const theurl = 'https://zhere.next';
const theurl = 'https://app.simplenote.com/publish/ttcS9n';



function jsmain() {

newuxtimeout = setTimeout(() => {
    statusprovider.style.opacity = '0.5';
}, 1000);

async function fetchContent(url) {
    try {
        const proxyUrl = 'https://api.allorigins.win/get?url=';
        const response = await fetch(proxyUrl + encodeURIComponent(url), {
            method: 'GET',
            cache: 'no-store'
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const htmlString = data.contents;

        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');

        const textContent = doc.body.textContent || doc.body.innerText;

        clearTimeout(newuxtimeout);
        indicator.classList.remove('onboarding');
        statusprovider.classList.remove('loading');
        statusprovider.style.opacity = '0.9';
        recheck.classList.remove('hidden');

        if (textContent.includes('status=s1')) {
            statustextcontainer.innerText = 'Working fine';
            indicator.classList.add('fine');
        } else if (textContent.includes('status=s0')) {
            statustextcontainer.innerText = 'Issued';
            indicator.classList.add('issue');
        } else if (textContent.includes('status=s99')) {
            statustextcontainer.innerText = 'Malfunctioned';
            indicator.classList.add('offline');
        } else if (textContent.includes('status==')) {
            const regexmain = /status==([\s\S]*?)@/;
            const matchmain = textContent.match(regexmain);
            let customcontentmain = 'Customized';
            if (matchmain && matchmain[1]) {
            customcontentmain = matchmain[1].trim();
            }
            statustextcontainer.innerText = customcontentmain;
            indicator.classList.add('customized');
        } else {
            indicator.style.display = 'none';
            statustextcontainer.innerText = 'Cannot show status';
        }

        if (textContent.includes('customization=yes=')) {
            const regex = /customization=yes=([\s\S]*?)@/;
            const match = textContent.match(regex);
            let customcontent = '';
            if (match && match[1]) {
            customcontent = match[1].trim();
            }
            cos1.classList.remove('hidden');
            cos1.innerText = customcontent;
            if (textContent.includes('customizationtype=data')) {
                customprovider.classList.remove('hidden');
                customprovider.style.opacity = '0.7';
                customprovider.classList.add('data');
                
            } else if (textContent.includes('customizationtype=state')) {
                customprovider.classList.remove('hidden');
                customprovider.style.opacity = '0.7';
                customprovider.classList.add('state');
            } else {
                cos1.innerText = 'Cannot show message';
            }
        }
    } catch (error) {
        console.error('Fetch error:', error);
        statustextcontainer.innerText = 'Failed to get status';
        indicator.style.display = 'none';
        statusprovider.classList.remove('loading');
        clearTimeout(newuxtimeout);
        statusprovider.style.opacity = '0.9';
        statustextcontainer.classList.add('failed');
    }
}


fetchContent(theurl);

recheck.style.display = 'flex';

}

jsmain();

function refresh() {
    statusprovider.style.opacity = '0';
    statusprovider.style.transition = 'opacity 0.12s ease-in';
    customprovider.style.opacity = '0';
    recheck.style.opacity = '1';
    setTimeout(() => {
    //window.location.reload(true);
    statusprovider.style.transition = 'opacity 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)';
    recheck.style.opacity = '0.6';
    jsmain();
    }, 120);
}