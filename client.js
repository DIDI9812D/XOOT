document.getElementById('play-computer').addEventListener('click', () => {
    // Start single player game against computer
});

document.getElementById('play-friends').addEventListener('click', () => {
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('multiplayer-menu').classList.remove('hidden');
});

document.getElementById('create-server').addEventListener('click', () => {
    const serverName = document.getElementById('server-name').value;
    if (serverName) {
        // Create server logic
        console.log(`Creating server: ${serverName}`);
    }
});

// Fetch and display list of servers
function fetchServers() {
    fetch('/servers')
        .then(response => response.json())
        .then(servers => {
            const serverList = document.getElementById('server-list');
            serverList.innerHTML = '';
            servers.forEach(server => {
                const li = document.createElement('li');
                li.textContent = server.name;
                li.addEventListener('click', () => {
                    // Join server logic
                    console.log(`Joining server: ${server.name}`);
                });
                serverList.appendChild(li);
            });
        });
}

// Initial fetch of servers
fetchServers();
setInterval(fetchServers, 5000); // Refresh server list every 5 seconds
