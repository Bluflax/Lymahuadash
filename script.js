const indicator = document.getElementById('indicator');
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const targetUrl = 'https://app.simplenote.com/publish/BMPHf1';
fetch(proxyUrl + targetUrl, {
    method: 'GET',
    headers: {
        'Content-Type': 'text/html'
    }
}) 
.then(response => response.yexy()) 
.then(data => {
    indicator.classList.add('fine');
    statustextcontainer.classList.remove('loading');
    const statustextcontainer  = document.getElementById('statustext');
    statustextcontainer.innerHTML = data;
})
.catch(error => {
    console.error('Error:', error);
    indicator.classList.add('offline');
    statustextcontainer.classList.remove('loading');
    const statustextcontainer = document.getElementById('statustext');
    statustextcontainer.textContent = 'Failed to get status';
});
