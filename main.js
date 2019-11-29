const cafeList = document.querySelector('#cafe-list')
const form = document.querySelector('#add-cafe-form')

function renderCafe(doc) {
    const li = document.createElement('li')
    const name = document.createElement('span')
    const city = document.createElement('span')
    const cross = document.createElement('div')

    li.setAttribute('data-id', doc.id)
    name.textContent = doc.data().name
    city.textContent = doc.data().city
    cross.textContent = 'x'

    li.appendChild(name)
    li.appendChild(city)
    li.appendChild(cross)

    cafeList.append(li)

    // delete doc
    cross.addEventListener('click', e => {

        const id = e.target.parentElement.getAttribute('data-id')
        db.collection('test').doc(id).delete()
    })
}


// get collection
// db.collection('test').orderBy('name').get().then(snapshot => {
//     snapshot.docs.forEach(doc => {
//         renderCafe(doc)
//     })
// })

// get collection using snapshot
db.collection('test').orderBy('name').onSnapshot(snapshot => {
    const change = snapshot.docChanges()
    change.forEach(change => {
        if (change.type === 'added') {
            renderCafe(change.doc)
        } else if (change.type === 'removed') {
            const li = cafeList.querySelector(`[data-id= ${change.doc.id}]`)
            cafeList.removeChild(li)
        }
    })
})

// post collection
form.addEventListener('submit', e => {
    e.preventDefault()
    db.collection('test').add({
        name: form.name.value,
        city: form.city.value
    })
    // empty the input field
    form.name.value = ''
    form.city.value = ''
})