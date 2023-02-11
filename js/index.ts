import {Card} from './cards.js'
import {Modal} from './modal.js'
import '../css/style.scss'

const modal = new Modal('Save',-1)
document.querySelector('.form__button--add')?.addEventListener('click',(event) =>{
    event.preventDefault()
    modal.open()
})

document.querySelector('.form__button--delete')?.addEventListener('click',(event)=>{
    event.preventDefault()
    sessionStorage.clear()
    location.reload()
})


for (let i = 0; i < sessionStorage.length; i++){
  let key: string | undefined = sessionStorage.key(i)?.toString()
  if (typeof key === "string"){
    const storedItem: string | null= sessionStorage.getItem(key)
    if (typeof storedItem === "string"){
      new Card(JSON.parse(storedItem))
    }
  }
}


