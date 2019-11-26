const app = document.getElementById('root');
const sidebar = document.getElementById('sidebar');
const api = 'https://nathanhollows.com/flats/api/flats/';
var filter = false;

createSidebar();

const container = document.createElement('div');
container.setAttribute('class', 'container');
app.appendChild(container);

const containerHeader = document.createElement('h1');
containerHeader.textContent = "Finding Flats...";
container.appendChild(containerHeader);

var request = new XMLHttpRequest();
var data;

// Get all listings
queryAPI();

function createSidebar() {
    // Title
    title = document.createElement('h1');
    title.textContent = "Homeless Kiwi";
    title.style.marginTop = "0.4em";
    sidebar.appendChild(title);

    // Search
    searchLabel = document.createElement('label');
    searchLabel.textContent = 'Search'
    searchLabel.setAttribute('for', 'searchInput');
    searchLabel.style.fontWeight = 'bold';

    searchInput = document.createElement('input');
    searchInput.id = 'searchInput';
    searchInput.setAttribute('placeholder', 'Search...');
    searchInput.type = 'text';

    searchInput.addEventListener('input', function(evt) {
        if (searchInput.value != "") {
            filter  = true;
            queryAPI();
        }
    })

    sidebar.appendChild(searchLabel);
    sidebar.appendChild(searchInput);

    // Price
    priceLabel = document.createElement('label');
    priceLabel.textContent = 'Price'
    priceLabel.setAttribute('for', 'priceFrom');
    priceLabel.style.fontWeight = 'bold';

    priceFrom = document.createElement('input');
    priceFrom.id = 'priceFrom';
    priceFrom.setAttribute('placeholder', 'From');
    priceFrom.type = 'text';

    priceTo = document.createElement('input');
    priceTo.id = 'priceTo';
    priceTo.setAttribute('placeholder', 'To');
    priceTo.type = 'text';
    sidebar.appendChild(priceLabel);
    sidebar.appendChild(priceFrom);
    sidebar.appendChild(priceTo);

    // Bedrooms
    bedroomsLabel = document.createElement('label');
    bedroomsLabel.textContent = 'Bedrooms'
    bedroomsLabel.setAttribute('for', 'bedroomsFrom');
    bedroomsLabel.style.fontWeight = 'bold';

    bedroomsFrom = document.createElement('input');
    bedroomsFrom.id = 'bedroomsFrom';
    bedroomsFrom.setAttribute('placeholder', 'From');
    bedroomsFrom.type = 'text';

    bedroomsTo = document.createElement('input');
    bedroomsTo.id = 'bedroomsTo';
    bedroomsTo.setAttribute('placeholder', 'To');
    bedroomsTo.type = 'text';
    sidebar.appendChild(bedroomsLabel);
    sidebar.appendChild(bedroomsFrom);
    sidebar.appendChild(bedroomsTo);
}

function queryAPI() {
    let search = '?search=' + searchInput.value;

    containerHeader.textContent = "Finding Flats...";
    while (container.childNodes.length > 1) {
        container.removeChild(container.lastChild);
    }

    request.abort();
    request.open('GET', api + search, true);


    request.onload = function() {
        data = JSON.parse(this.response);

        if (request.status >= 200 && request.status < 400) {
            containerHeader.textContent = `${data["data"].length} results found`;

            data["data"].forEach(listing => {
                const card = document.createElement('div');
                card.setAttribute('class', 'card');

                const cardText = document.createElement('div');
                const cardImg = document.createElement('div');
                cardText.style.width = "100%";

                const img = document.createElement('img');
                img.setAttribute('src', `${listing.image}`);
                img.style.width = "200px";
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

                card.appendChild(cardImg);
                cardImg.appendChild(img);

                card.appendChild(cardText);
                cardText.appendChild(h1);
                cardText.appendChild(h2);
                cardText.appendChild(p);
                cardText.appendChild(bedbath);

                if (listing.url != null) {
                    const button = document.createElement('a');
                    button.href = listing.url;
                    switch (String(listing.agent)) {
                        case "hooker":
                            button.textContent = "LJ Hooker";
                        case "mana":
                            button.textContent = "Mana Property";
                        case "darling":
                            button.textContent = "Darling Realty";
                        default:
                            button.textContent = "Website";
                    }
                    button.setAttribute('class', 'button pull-right');
                    bedbath.appendChild(button);
                }

            });
        } else {
            const errorMessage = document.createElement('marquee');
            errorMessage.textContent = "Gah, it's not working!";
            app.appendChild(errorMessage);
        }
    }

    request.send();
}
