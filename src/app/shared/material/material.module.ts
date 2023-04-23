import { NgModule } from '@angular/core';

import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  imports: [
    MatMomentDateModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatDividerModule,
    MatIconModule,
    MatExpansionModule,
    MatCardModule,
    MatChipsModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatSlideToggleModule,
  ],
  exports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatDividerModule,
    MatIconModule,
    MatExpansionModule,
    MatCardModule,
    MatChipsModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatSlideToggleModule,
  ],
})
export class MaterialModule {}
