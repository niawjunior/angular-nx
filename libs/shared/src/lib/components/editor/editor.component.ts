import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import Quill from 'quill';

@Component({
  selector: 'recruit-supplier-editor',
  templateUrl: `./editor.component.html`,
  styleUrls: [`./editor.component.scss`],
})
export class EditorComponent {
  @Input() form: FormGroup;
  @Input() controlName = '';
  constructor() {
    const fontSizeStyle = Quill.import('attributors/style/size');
    fontSizeStyle.whitelist = [
      '10px',
      '12px',
      '14px',
      '16px',
      '18px',
      '20px',
      '22px',
      '24px',
      '36px',
    ];
    Quill.register(fontSizeStyle, true);
  }

  quillConfig = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
      [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
      [{ direction: 'rtl' }],
      [
        {
          size: [
            '10px',
            '12px',
            '14px',
            '16px',
            '18px',
            '20px',
            '22px',
            '24px',
            '36px',
          ],
        },
      ], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],
      ['link', 'image'], // link and image, video
    ],
  };
}
