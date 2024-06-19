const indicator = document.getElementById('indicator');
const statustextcontainer = document.getElementById('statustext');
const statusprovider = document.getElementById('statusprovider');
const customprovider = document.getElementById('showcustom');
const cos1 = document.getElementById('cos1');
const cos2 = document.getElementById('cos2');
const recheck = document.getElementById('recheck');
//const theurl = 'https://account.google.com./';
const theurl = 'https://app.simplenote.com/publish/ttcS9n';

function refresh() {
    window.location.reload(true);
}


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

        if (textContent.includes('status=s1')) {
            statustextcontainer.innerText = 'Working fine';
            indicator.classList.add('fine');
        } else if (textContent.includes('status=s0')) {
            statustextcontainer.innerText = 'Issued';
            indicator.classList.add('issue');
        } else if (textContent.includes('status=s99')) {
            statustextcontainer.innerText = 'Malfunctioned';
            indicator.classList.add('offline');
        } else if (textContent.includes('status=c')) {
            const regexmain = /c!!([\s\S]*?)&&&/;
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

        if (textContent.includes('customization=yes')) {
            const regex = /info1--([\s\S]*?)&&/;
            const match = textContent.match(regex);
            let customcontent = '';
            if (match && match[1]) {
            customcontent = match[1].trim();
            }
            cos1.classList.remove('hidden');
            cos1.innerText = customcontent;
            if (textContent.includes('customization=yes&type=data')) {
                customprovider.classList.remove('hidden');
                customprovider.classList.add('data');
                
            } else if (textContent.includes('customization=yes&type=state')) {
                customprovider.classList.remove('hidden');
                customprovider.classList.add('state');
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

