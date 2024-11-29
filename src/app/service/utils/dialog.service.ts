import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openDeleteDialog(title: string, content: string, hasError: boolean = false) {
    console.log(content);
    return this.dialog.open(DialogComponent, {
      width: '400px',
      data: { title, content, hasError },
    })
  }
}
