const images = document.querySelectorAll('img')
const image_slider = document.querySelector('.image-slider')
let activeSlide = 0
let direction = 'right'
let forward
let backward
const fetchImg = (url) => {
    return fetch(url).then(res => res.blob()).then(image => {
        src = URL.createObjectURL(image)
        return src
    })
}
const Images = async () => {
    const img1 = await fetchImg(`./images/hosur.jpg`)
    const img2 = await fetchImg(`./images/ooty.jpg`)
    const img3 = await fetchImg(`./images/vellore.jpg`)
    const img4 = await fetchImg(`./images/trichy.jpg`)
    const img5 = await fetchImg(`./images/villupuram.jpg`)
    const img6 = await fetchImg(`./images/madurai.jpg`)
    const img7 = await fetchImg(`./images/krishnagiri.jpg`)
    return [img1,img2,img3,img4,img5,img6,img7]
}
const imgObject = []
Images().then(data => {
    var i = 0
    data.forEach(data => {
        const div = document.createElement('div')
        div.classList.add('image')
        image_slider.appendChild(div)
        const img = document.createElement('img')
        img.src = data
        img.alt = data
        div.appendChild(img)
        imgObject[i] = img
        i++ 
    })
}).then(() => {
    backward = document.querySelector('.ion-ios-arrow-back')
    forward = document.querySelector('.ion-ios-arrow-forward')
    moveSlides(activeSlide)
    forward.addEventListener('click' , () => {
        direction = 'right'
        click_to_move()
    })
    backward.addEventListener('click' , () => {
        direction = 'left'
        click_to_move()
    })
    setInterval(() => {
        moveSlides(activeSlide)
        click_to_move()
    },5000)
})

const click_to_move = () => {
    if(activeSlide === imgObject.length-1){
        activeSlide--
        direction = 'left'
        moveSlides(activeSlide)
    } else if(activeSlide === 0){
        activeSlide++
        direction = 'right'
        moveSlides(activeSlide)
    } else if(activeSlide > 0 && direction === 'right'){
        activeSlide++
        moveSlides(activeSlide)
    } else if(activeSlide < imgObject.length && direction === 'left'){
        activeSlide--
        moveSlides(activeSlide)
    }
}
const moveSlides = (activeSlide) => {
    if(activeSlide === 0){
        backward.style.display = 'none'
    } else if(activeSlide === imgObject.length-1){
        forward.style.display = 'none'
    } else {
        backward.style.display = 'block'
        forward.style.display = 'block'
    }
    imgObject.forEach((data,index) => {
        if(activeSlide === index){
            data.classList.remove('left')
            data.classList.remove('right')
            data.classList.add('active')
        } else if(activeSlide < index){
            data.classList.remove('left')
            data.classList.remove('active')
            data.classList.add('right')
        } else if(activeSlide > index){
            data.classList.remove('active')
            data.classList.remove('right')
            data.classList.add('left')
        }
    })
}
