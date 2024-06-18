const indicator = document.getElementById('indicator');
const statustextcontainer = document.getElementById('statustext');
const bottominfo = document.getElementById('bottominfo');
const theurl = 'https://app.simplenote.com/publish/BMPHf1';

function refresh() {
    location.reload(true);
}

async function fetchContent(url) {
    try {
        const proxyUrl = 'https://api.allorigins.win/get?url=';
        const response = await fetch(proxyUrl + encodeURIComponent(url), {
            method: 'GET'
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const htmlString = data.contents;

        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');

        const textContent = doc.body.textContent || doc.body.innerText;
        indicator.classList.remove('onboarding');
        statustextcontainer.classList.remove('loading');

        if (textContent.includes('fantasy1')) {
            statustextcontainer.innerText = 'Working fine';
            indicator.classList.add('fine');
        } else if (textContent.includes('fantasy0')) {
            statustextcontainer.innerText = 'Issued';
            indicator.classList.add('issue');
        } else if (textContent.includes('fantasyx')) {
            statustextcontainer.innerText = 'Malfunctioned';
            indicator.classList.add('offline');
        } else {
            indicator.style.display = 'none';
            statustextcontainer.innerText = 'Cannot check status';
        }
    } catch (error) {
        console.error('Fetch error:', error);
        indicator.style.display = 'none';
        statustextcontainer.classList.remove('loading');
        statustextcontainer.classList.add('failed');
        statustextcontainer.innerText = 'Failed to get status';
    }
}


fetchContent(theurl);

bottominfo.style.display = 'block';


