import {Modal} from "./modal";

const cardModal = new Modal('Change',0)

interface Info{
  name: string, 
  country: string,
  image: string, 
  cardId: number | string
}

export class Card{
  info: Info;
  changeButton: HTMLElement | null;
  deleteButton:HTMLElement | null;
  constructor(info: Info) {
      this.info = info
      console.log(info)
      document.querySelector('.row')?.insertAdjacentHTML('beforeend',this.render())
      this.changeButton = document.querySelector('.btn[data-btn="' + this.info.cardId + '"]');
      this.deleteButton = document.querySelector('.btn[data-del="' + this.info.cardId + '"]')
      this.setup()
  }

  private setup(): void{
      this.ChangeCardInfo = this.ChangeCardInfo.bind(this)
      this.DeleteCard = this.DeleteCard.bind(this)
      this.changeButton?.addEventListener('click',this.ChangeCardInfo)
      this.deleteButton?.addEventListener('click',this.DeleteCard)
  }

  ChangeCardInfo(): void{
      cardModal.open(this.info.cardId)
  }

  DeleteCard(): void{
      sessionStorage.removeItem(this.info.cardId.toString())
      location.reload()
  }

  private render(): string{
      const address = 'https://fikiwiki.com/uploads/posts/2022-02/1645054742_19-fikiwiki-com-p-kartinki-ikonki-19.png'
      let imgURL = (this.info.image == '') ? address : this.info.image
      return `
          <div class="col">
                  <div class="card">
                      <img src=${imgURL} class="card-img-top" alt="...">
                      <div class="card-body text-center">
                          <h5 class="card-title">Name:${this.info.name}</h5>
                          <p class="card-text">Country:${this.info.country}</p>
                          <div class="card-body text-center">
                              <button class="btn btn-primary" data-type="rewrite" data-btn="${this.info.cardId}">Change</button>
                              <button class="btn btn-primary" data-type="del" data-del="${this.info.cardId}">Delete</button>
                          </div>
                      </div>
                  </div>
              </div>`
  }
}