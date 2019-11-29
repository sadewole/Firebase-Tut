// auth loaded
auth.onAuthStateChanged(user => {
    if (user) {
        setupUi(user)
        // load database
        db.collection('guides').get().then(snapshot => {
            setUpGuides(snapshot.docs)
        })
    } else {
        setupUi()
        setUpGuides([])
    }
})

const signUp = document.querySelector('#signup-form')
signUp.addEventListener('submit', e => {
    e.preventDefault()

    const email = signUp['signup-email'].value
    const password = signUp['signup-password'].value

    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        // close modal
        const modal = document.querySelector('#modal-signup')
        M.Modal.getInstance(modal).close()
        // reset signup input
        signUp.reset()
    })
})

// logout user
const logOut = document.querySelector('#logout')
logOut.addEventListener('click', () => {
    auth.signOut()
})

// signin user
const signIn = document.querySelector('#login-form')
signIn.addEventListener('submit', e => {
    e.preventDefault()
    const email = signIn['login-email'].value
    const password = signIn['login-password'].value
    auth.signInWithEmailAndPassword(email, password).then(e => {
        // close modal
        const modal = document.querySelector('#modal-login')
        M.Modal.getInstance(modal).close()
        // reset signup input
        signIn.reset()
    })
})