function searchAnime() {
        const searchInput = document.getElementById('searchInput').value;
        const resultList = document.getElementById('resultList');
        resultList.innerHTML = '<p class="text-center">Searching...</p>';

        fetch(`https://api.jikan.moe/v4/anime?q=${searchInput}&limit=10`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                resultList.innerHTML = '';
                if (data.data.length === 0) {
                    resultList.innerHTML = '<p class="text-center">No results found.</p>';
                } else {
                    data.data.forEach(anime => {
                        const div = document.createElement('div');
                        div.classList.add('media', 'my-4');

                        const img = document.createElement('img');
                        img.classList.add('mr-3');
                        img.src = anime.images.jpg.image_url;
                        img.alt = anime.titles.en;
                        img.style.width = '100px';
                        img.style.height = 'auto';
                        img.onerror = function () {
                            this.onerror = null;
                            this.src = 'https://via.placeholder.com/100x150.png?text=No+Image';
                        };
                        div.appendChild(img);

                        const divBody = document.createElement('div');
                        divBody.classList.add('media-body');

                        const h5 = document.createElement('h5');
                        h5.classList.add('mt-0');
                        h5.textContent = anime.titles.en;
                        divBody.appendChild(h5);

                        const p = document.createElement('p');
                        p.textContent = anime.synopsis;
                        divBody.appendChild(p);

                        div.appendChild(divBody);
                        resultList.appendChild(div);
                    });
                }
            })
            .catch(error => {
                resultList.innerHTML = '<p class="text-center">An error occurred while searching.</p>';
            });
    }