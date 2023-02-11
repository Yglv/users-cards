import {Card} from './cards'

export class Modal{
  mode: string;
  id: number;
  modal: HTMLElement | null;
  changeCardButtonId: number | undefined | string;

  constructor(mode: string, id: number) {
      this.mode = mode
      this.id = id
      this.changeCardButtonId = 0
      document.querySelector('.wrapper')?.insertAdjacentHTML("beforeend",this.render())
      this.modal = document.querySelector('.modal[data-modal="' + this.id + '"]');
      this.setup()
  }

  open (changeCardButtonId?: number | string | undefined): void{
      this.changeCardButtonId = changeCardButtonId
      if (this.modal){
        this.modal.style.display = 'block'
      } 
  }

  close(): void{
    if (this.modal){
      this.modal.style.display = 'none'
    }
  }

  change(id: number | undefined | string): void{
      let name: string = (this.modal?.querySelector('[data-type="name"]') as HTMLInputElement).value
      let country: string = (this.modal?.querySelector('[data-type="country"]') as HTMLInputElement).value
      let image: string = (this.modal?.querySelector('[data-type="img"]') as HTMLInputElement).value
      let cardId: string | undefined = id?.toString()
      if (typeof cardId === "number"){
        sessionStorage.setItem(cardId,JSON.stringify({name, country,image, cardId}))
      }
      location.reload()
  }

  save() : void{
      let name: string = (this.modal?.querySelector('[data-type="name"]') as HTMLInputElement).value
      let country: string=  (this.modal?.querySelector('[data-type="country"]') as HTMLInputElement).value
      let image: string = (this.modal?.querySelector('[data-type="img"]') as HTMLInputElement).value
      let num: number = sessionStorage.length;
      for (let i = 0; i < sessionStorage.length; i++){
          if (sessionStorage.getItem(i.toString()) == null){
              num = i
          }
      }
      let cardId: string = num.toString()
      sessionStorage.setItem(num.toString(),JSON.stringify({name, country,image, cardId}))
      new Card({name, country,image,cardId})
  }

  private setup(): void{
      this.ClickHandler = this.ClickHandler.bind(this)
      window.addEventListener('click',this.ClickHandler)
  }

  ClickHandler(event : any): void{
      let {type} = event.target.dataset
      if (type === "close"){
          this.close()
      }
      if (type === "Save" && this.mode === "Save"){
          this.save()
      }
      if (type === "Change" && this.mode === "Change"){
          this.change(this.changeCardButtonId)
      }
  }

  private render(): string{
      return `
          <div class="modal" data-modal="${this.id}">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Register person</h5>
                  <button type="button" class="btn-close"  data-type="close" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <div class="mb-3">
                      <label for="recipient-name" class="col-form-label">Image</label>
                      <input type="url" data-type="img" class="form-control" id="recipient-name">
                  </>
                  <div class="mb-3">
                      <label for="recipient-name" class="col-form-label">Name</label>
                      <input type="text" data-type="name" class="form-control" id="recipient-name">
                  </div>
                  <div class="mb-3">
                      <label for="recipient-name" class="col-form-label">Country</label>
                      <input type="text" data-type="country" class="form-control" id="recipient-name">
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-primary" data-type="${this.mode}">${this.mode}</button>
                  <button type="button" class="btn btn-danger" data-type="close" tabindex="-1">Close</button>
                </div>
              </div>
            </div>
          </div>
      `
  }
}