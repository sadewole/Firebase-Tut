// add admin to cloud function
const adminForm = document.querySelector('.admin-actions')
adminForm.addEventListener('submit', e => {
    e.preventDefault()
    const adminEmail = document.querySelector('#admin-email').value
    const addAdminRole = functions.httpsCallable('addAdminRole')
    addAdminRole({
        email: adminEmail
    }).then(result => {
        console.log(result)
    })
})

// auth loaded
auth.onAuthStateChanged(user => {
    if (user) {
        user.getIdTokenResult().then(idTokenResult => {
            user.admin = idTokenResult.claims.admin
            setupUi(user)
        })
        // load database
        db.collection('guides').onSnapshot(snapshot => {
            setUpGuides(snapshot.docs)
        }, err => {
            console.log(err.message)
        })
    } else {
        setupUi()
        setUpGuides([])
    }
})

// add guide
const createForm = document.querySelector('#create-form')
createForm.addEventListener('submit', e => {
    e.preventDefault()

    db.collection('guides').add({
        title: createForm['title'].value,
        content: createForm['content'].value
    }).then(() => {
        // close modal
        const modal = document.querySelector('#modal-create')
        M.Modal.getInstance(modal).close()
        // reset signup input
        createForm.reset()
    }).catch(err => {
        console.log(err.message)
    })
})

// create new user
const signUp = document.querySelector('#signup-form')
signUp.addEventListener('submit', e => {
    e.preventDefault()

    const email = signUp['signup-email'].value
    const password = signUp['signup-password'].value

    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        return db.collection('user').doc(cred.user.uid).set({
            bio: signUp['signup-bio'].value
        })
    }).then(() => {
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