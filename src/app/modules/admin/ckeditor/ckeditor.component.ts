import { Component, OnInit, ViewEncapsulation, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CKEditorComponent, CKEditorModule } from '@ckeditor/ckeditor5-angular';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-ckeditor',
  standalone: true,
  imports: [CommonModule, CKEditorModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './ckeditor.component.html',
  styleUrls: ['./ckeditor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export default class CkeditorComponent implements OnInit {

  @ViewChild('editor') editorComponent: CKEditorComponent;



  template1 = `<h2>Build a dynamite UI from scratch 🧨</h2><p>CKEditor&nbsp;5 comes with a rich, customizable UI that you can easily adapt to your needs. But it’s an option, not a must! If your app requires a completely new look, you can ditch the UI altogether and <strong>use CKEditor&nbsp;5 as a headless editor</strong>.</p><h3>Work with React, Vue, Angular, or any other framework</h3><p>If you take the headless route, the sky is the limit.</p><p>This demo has an interface developed with <a href="https://ckeditor.com/ckeditor-5/react/">React</a>, but that’s just an example. With the headless approach, you can develop your perfect UI in <strong>any framework you want</strong>.</p><h3>Use an existing UI framework or your own design system</h3><p>A headless editor seamlessly blends with your existing design. This ensures a <strong>consistent user experience</strong>, no matter which UI framework you use.</p><p>You can easily integrate CKEditor with any solution, including:</p><ul><li>Bootstrap</li><li>Material UI</li><li>Tailwind CSS</li><li>Or your own design system 💪</li></ul>`;

  template2 = `<h2>The three greatest things you learn from traveling</h2><p>Like all the great things on earth traveling teaches us by example. Here are some of the most precious lessons I’ve learned over the years of traveling.</p><figure class="image image-style-side"><img src="https://ckeditor.com/assets/images/ckdemo/editor-types/volcano.jpg" alt="A lone wanderer looking at Mount Bromo volcano in Indonesia." srcset="https://ckeditor.com/assets/images/ckdemo/editor-types/volcano.jpg, https://ckeditor.com/assets/images/ckdemo/editor-types/volcano_2x.jpg 2x" sizes="100vw" width="600"><figcaption>Leaving your comfort zone might lead you to such beautiful sceneries like this one.</figcaption></figure><h2>Appreciation of diversity</h2><p>Getting used to an entirely different culture can be challenging. While it’s also nice to learn about cultures online or from books, nothing comes close to experiencing cultural diversity in person. You learn to appreciate each and every single one of the differences while you become more culturally fluid.</p><blockquote><p>The real voyage of discovery consists not in seeking new landscapes, but having new eyes.</p><p><strong>Marcel Proust</strong></p></blockquote><h2>Improvisation</h2><p>Life doesn't allow us to execute every single plan perfectly. This especially seems to be the case when you travel. You plan it down to every minute with a big checklist. But when it comes to executing it, something always comes up and you’re left with your improvising skills. You learn to adapt as you go. Here’s how my travel checklist looks now:</p><ul><li>buy the ticket</li><li>start your adventure</li></ul><figure class="image image-style-side"><img src="https://ckeditor.com/assets/images/ckdemo/editor-types/umbrellas.jpg" alt="Three Monks walking on ancient temple." srcset="https://ckeditor.com/assets/images/ckdemo/editor-types/umbrellas.jpg, https://ckeditor.com/assets/images/ckdemo/editor-types/umbrellas_2x.jpg 2x" sizes="100vw" width="600"><figcaption>Leaving your comfort zone might lead you to such beautiful sceneries like this one.</figcaption></figure><h2>Confidence</h2><p>Going to a new place can be quite terrifying. While change and uncertainty make us scared, traveling teaches us how ridiculous it is to be afraid of something before it happens. The moment you face your fear and see there is nothing to be afraid of, is the moment you discover bliss.&nbsp;</p>`

  textSelected = '';
  positionSelection = '';

  // Obtener el texto seleccionado con el mouse
  @HostListener('mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    const selection = window.getSelection();
    console.log(selection.toString());
    this.textSelected = selection.toString();
  }

  // obtener la posicion del donde el usuario desea escribir
  @HostListener('mouseup', ['$event'])
  onMouseUp3(event: MouseEvent) {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);

    // Si esta vacio obtener las coordenas del selection
    // Si no esta vacio obtener el texto del selection
    if (range.startContainer.textContent === '') {
      this.positionSelection = range.startContainer.parentElement.textContent;
      console.log(this.positionSelection);
      return;
    }
    this.positionSelection = range.startContainer.textContent;
    console.log(this.positionSelection);
  }

  changeText() {
    if (this.textSelected === '') return;

    this.dataCtrl.setValue(this.dataCtrl.value.replace(this.textSelected, 'Hola mundo'));
  }
  inserText() {


  }





  dataCtrl = new FormControl('');

  public Editor = ClassicEditor


  public onReady(editor: DecoupledEditor): void {
    // const element = editor.ui.getEditableElement()!;
    // const parent = element.parentElement!;

    // parent.insertBefore(
    //   editor.ui.view.toolbar.element!,
    //   element
    // );
  }

  ngOnInit(): void {

    this.dataCtrl.setValue(this.template2);
    this.dataCtrl.valueChanges.subscribe((value) => {
      console.log(value);
    })
  }
}
