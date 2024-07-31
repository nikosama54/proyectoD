import { Component, OnInit } from '@angular/core';
import{MatCardModule}from '@angular/material/card'
import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface Item {
  curso: string;
  estudiantes: string;
  materia: string;
  nota: string;
  profesor: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule,MatButton,CommonModule,ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  items: Item[] = [];
  form: FormGroup;
  editingIndex: number | null = null;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      curso: ['', Validators.required],
      estudiantes: ['', [Validators.required, Validators.min(0)]],
      materia: ['', Validators.required],
      nota: ['', Validators.required],
      profesor: ['', Validators.required]
    });
  }
  ngOnInit() {
    // Carga datos iniciales si es necesario
    this.items = [
      { curso: '10 A', estudiantes: "roza melvis cocho", materia: 'Álgebra', nota: 'A', profesor: 'Juan Pérez' },
      { curso: '6 B', estudiantes: "alma marcela", materia: 'Historia Universal', nota: 'B+', profesor: 'Ana Gómez' }
    ];
  }

  addItem() {
    if (this.form.valid) {
      const newItem: Item = this.form.value;
      if (this.editingIndex !== null) {
        // Editar un ítem existente
        this.items[this.editingIndex] = newItem;
        this.editingIndex = null;
      } else {
        // Agregar un nuevo ítem
        this.items.push(newItem);
      }
      this.form.reset();
    }
  }

  editItem(index: number) {
    this.editingIndex = index;
    this.form.patchValue(this.items[index]);
  }

  deleteItem(index: number) {
    this.items.splice(index, 1);
  }
}
