async function getRecommendations() {
    const ingredients = document.getElementById('ingredients').value;
    if (!ingredients) {
        alert('Please enter some ingredients');
        return;
    }

    const response = await fetch('/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients })
    });

    if (response.ok) {
        const recommendations = await response.json();
        displayRecommendations(recommendations);
    } else {
        alert('Failed to get recommendations. Please try again.');
    }
}

function displayRecommendations(recommendations) {
    const recommendationsList = document.getElementById('recommendations');
    recommendationsList.innerHTML = '';

    if (recommendations.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'No recipes found for the given ingredients.';
        recommendationsList.appendChild(li);
    } else {
        recommendations.forEach(recipe => {
            const li = document.createElement('li');
            li.textContent = recipe;
            recommendationsList.appendChild(li);
        });
    }
}