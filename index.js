document.addEventListener('DOMContentLoaded', () => {
    fetchUserProfile();

    document.getElementById('update-profile-form').addEventListener('submit', updateUserProfile);
});

async function fetchUserProfile() {
    try {
        const response = await fetch('http://localhost:7777/users/profile');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const profileData = await response.json();
        document.getElementById('profile-name').textContent = profileData.name;
        document.getElementById('profile-email').textContent = profileData.email;
        document.getElementById('name').value = profileData.name;
        document.getElementById('email').value = profileData.email;
    } catch (error) {
        console.error('Failed to fetch profile:', error);
        document.getElementById('user-profile').innerHTML = '<p>Error loading profile</p>';
    }
}

async function updateUserProfile(event) {
    event.preventDefault();
    try {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        const response = await fetch('http://localhost:7777/users/1', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const updatedData = await response.json();
        alert('Profile updated successfully');
        document.getElementById('profile-name').textContent = updatedData.name;
        document.getElementById('profile-email').textContent = updatedData.email;
    } catch (error) {
        console.error('Failed to update profile:', error);
        alert('Failed to update profile');
    }
}
