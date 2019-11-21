const app = document.getElementById('root');
const sidebar = document.getElementById('sidebar');

header = document.createElement('h1');
header.textContent = "Homeless Kiwi";
header.style.margin = "1em";
sidebar.appendChild(header);

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);

var request = new XMLHttpRequest();
var data;

request.open('GET', 'https://nathanhollows.com/flats/api/flats/', true);

request.onload = function() {
    data = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400) {
        const header = document.createElement('h1');
        header.textContent = `${data["data"].length} results found`;
        container.appendChild(header);

        data["data"].forEach(listing => {
            const card = document.createElement('div');
            card.setAttribute('class', 'card');

            const img = document.createElement('img');
            img.setAttribute('src', `${listing.image}`);
            img.style.cssFloat = "left";
            img.style.marginRight = "1em";

            const h1 = document.createElement('h1');
            h1.textContent = listing.address;
            h1.style.display = "inline-block";

            const h2 = document.createElement('h2');
            h2.textContent = `$${listing.price} / Week`;

            const p = document.createElement('p');
            p.textContent = `${listing.heroText}`;

            const bedbath = document.createElement('p');
            bedbath.style.fontWeight = "bold";
            bedbath.textContent = `${listing.bedrooms} Bedrooms \t ${listing.bathrooms} Bathrooms`;

            container.appendChild(card);
            card.appendChild(img);
            card.appendChild(h1);
            card.appendChild(h2);
            card.appendChild(p);
            card.appendChild(bedbath);
        });
    } else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = "Gah, it's not working!";
        app.appendChild(errorMessage);
    }
}

request.send();
