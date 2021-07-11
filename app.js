const image_slider = document.querySelector('.image-slider')
let activeSlide = 0
let direction = 'right'
let forward,backward
let timer
const fetchImg = (url) => {
    return fetch(url).then(res => res.blob()).then(blob => {
        return URL.createObjectURL(blob)
    })
}
const Images = async () => {
    const img1 = await fetchImg(`./Images/india.jpg`)
    const img2 = await fetchImg(`./Images/london.jpg`)
    const img3 = await fetchImg(`./Images/switzerland.jpg`)
    const img4 = await fetchImg(`./Images/greenland.jpg`)
    const img5 = await fetchImg(`./Images/canada.jpg`)
    return [img1,img2,img3,img4,img5]
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
        img.alt = "Image Slider"
        div.appendChild(img)
        imgObject[i] = img
        i++ 
    })
}).then(() => {
    forward = document.querySelector('.ion-ios-arrow-forward')
    backward = document.querySelector('.ion-ios-arrow-back')
    forward.addEventListener('click' , () => {
        clearInterval(timer)
        timer = setInterval(() => {
            changeSlide()
        },5000)
        direction = 'right'
        changeSlide()
    })
    backward.addEventListener('click' , () => {
        clearInterval(timer)
        timer = setInterval(() => {
            changeSlide()
        },5000)
        direction = 'left'
        changeSlide()
    })
    applyStyles()
    timer = setInterval(() => {
        changeSlide()
    },5000)
})

const changeSlide = () => {
    if(activeSlide === imgObject.length-1){
        activeSlide--
        direction = 'left'
        applyStyles()
    } else if(activeSlide === 0){
        activeSlide++
        direction = 'right'
        applyStyles()
    } else if(activeSlide > 0 && direction === 'right'){
        activeSlide++
        applyStyles()
    } else if(activeSlide < imgObject.length && direction === 'left'){
        activeSlide--
        applyStyles()
    }
}

const applyStyles = () => {
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
