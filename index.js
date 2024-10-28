const form = document.querySelector('.form');
const img = document.querySelector('.image');
const nameElement = document.querySelector('.name');
const bioElement = document.querySelector('.bio');
const locationElement = document.querySelector('.location');

document.addEventListener('submit', function(e) {
    e.preventDefault();
    const value = document.querySelector('.value').value;
    console.log(value); // or any other logic you want to perform

    fetch(`https://api.github.com/users/${value}`)
        .then(function(data) {
            return data.json();
        })
        .then(function(jsondata) {
            console.log(jsondata);

            if (jsondata.message === "Not Found") {
                img.style.display = 'none';
                nameElement.textContent = 'User not found';
                bioElement.textContent = '';
                locationElement.textContent = '';
            } else {
                img.src = jsondata.avatar_url;
                img.style.display = 'block';
                nameElement.textContent = jsondata.name || 'No name provided';
                bioElement.textContent = jsondata.bio || 'No bio available';
                locationElement.textContent = jsondata.location || 'No location available';
            }
        })
        .catch(function(error) {
            console.error('Error fetching data:', error);
            img.style.display = 'none';
            nameElement.textContent = 'Error fetching data';
            bioElement.textContent = '';
            locationElement.textContent = '';
        });
});
