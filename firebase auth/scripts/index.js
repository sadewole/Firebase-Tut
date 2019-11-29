const guideList = document.querySelector('.guides')
const loggedInLinks = document.querySelectorAll('.logged-in')
const loggedOutLinks = document.querySelectorAll('.logged-out')


// change navbar when auth changes
const setupUi = user => {
    if (user) {
        // toggle UI elements
        loggedInLinks.forEach(item => item.style.display = 'block')
        loggedOutLinks.forEach(item => item.style.display = 'none')
    } else {
        // toggle UI elements
        loggedInLinks.forEach(item => item.style.display = 'none')
        loggedOutLinks.forEach(item => item.style.display = 'block')
    }
}

// setup guides
const setUpGuides = data => {
    if (data.length > 1) {
        let html = ''
        data.forEach(doc => {
            const guide = doc.data()
            const li = `
        <li>
            <div class="collapsible-header grey lighten-4">${guide.title}</div>
            <div class="collapsible-body white">${guide.content}</div>
        </li>
        `
            html += li
        })

        guideList.innerHTML = html
    } else {
        guideList.innerHTML = '<h5 class="center">Login to view guide(s)</h5>'
    }
}

// setup materialize components
document.addEventListener('DOMContentLoaded', function () {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

});