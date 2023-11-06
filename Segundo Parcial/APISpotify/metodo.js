// Función para obtener el token de acceso usando el flujo de autorización de OAuth 2.0
async function obtenerTokenDeAcceso() {
    const clientId = "5c4b1dfabf064b9a98e45f7f87474127";
    const clientSecret = "72d5824767a944148ff4c1518c095ea9";
    const tokenUrl = "https://accounts.spotify.com/api/token";

    const response = await fetch(tokenUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Basic ${btoa(`${clientId}:${clientSecret}`)}`
        },
        body: "grant_type=client_credentials"
    });

    const data = await response.json();
    return data.access_token;
}

// Función para obtener el ID del álbum desde el enlace de Spotify
function obtenerAlbumId(albumLink) {
    const regex = /\/album\/([a-zA-Z0-9]+)/;
    const match = albumLink.match(regex);
    return match ? match[1] : null;
}

// Función para obtener y mostrar la información del álbum
async function obtenerInformacionDelAlbum() {
    const albumLink = document.getElementById("album-link").value;
    const albumId = obtenerAlbumId(albumLink);

    if (albumId) {
        try {
            const accessToken = await obtenerTokenDeAcceso();
            const url = `https://api.spotify.com/v1/albums/${albumId}`;

            const response = await fetch(url, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                mostrarInformacionDelAlbum(data);
                const iframe = document.getElementById("spotify-iframe");
                iframe.src = `https://open.spotify.com/embed/album/${albumId}`;
            } else {
                console.error("Error al obtener la información del álbum:", response.status);
            }
        } catch (error) {
            console.error("Error de red:", error);
        }
    } else {
        console.error("URL del álbum no válida.");
    }
}

// Función para mostrar la información del álbum
function mostrarInformacionDelAlbum(albumData) {
    const albumInfoDiv = document.getElementById("album-info");
    const imageUrl = albumData.images[0].url;
    albumInfoDiv.innerHTML = `
        <h2>${albumData.name}</h2>
        <p>Artista: ${albumData.artists[0].name}</p>
        <p>Fecha de Lanzamiento: ${albumData.release_date}</p>
        <p>Popularidad: ${albumData.popularity}</p>
        <p>Número de Pistas: ${albumData.tracks.items.length}</p>
    `;
}
