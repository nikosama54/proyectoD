import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CursoService } from '../services/curso.service';
import { EstudianteService } from '../services/estudiante.service';

interface Item {
  nombre: string;
  apellido: string;
  curso: string;
  estudiantes: string;
  materia: string;
  nota: string;
  profesor: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCardModule,
    MatButton,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  items: Item[] = [];
  //variables form
  form: FormGroup;
  formProfesor: FormGroup;
  formCurso: FormGroup;
  formEstudiante: FormGroup;
  formMateria: FormGroup;
  //variables data
  dataProfesor: any = {};
  dataCurso: any = {};
  dataEstudiante: any = {};
  dataMateria: any = {};
  //fin variables data
  editingIndex: number | null = null;
  activeForm: boolean = false;
  activeProfesor: boolean = false;
  activeCurso: boolean = false;
  activeEstudiante: boolean = false;
  activeMateria: boolean = false;
  activeNotas: boolean = false;

  constructor(
    private fb: FormBuilder,
    private cursoService: CursoService,
    private estudianteService: EstudianteService
  ) {
    this.form = this.fb.group({
      curso: ['', Validators.required],
      estudiantes: ['', [Validators.required, Validators.min(0)]],
      materia: ['', Validators.required],
      nota: ['', Validators.required],
      profesor: ['', Validators.required],
    });

    this.formProfesor = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', [Validators.required]],
    });
    this.formCurso = this.fb.group({
      nombre: ['', Validators.required],
      año: ['', [Validators.required]],
    });
    this.formEstudiante = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', [Validators.required]],
      curso: ['', [Validators.required]],
    });
    this.formMateria = this.fb.group({
      curso: ['', Validators.required],
      profesor: ['', [Validators.required]],
    });
  }

  cursos: any[] = [];
  estudiantes: any[] = [];
  ngOnInit() {
    this.items = [
      {
        nombre: 'Roza',
        apellido: 'Melvis',
        curso: '10 A',
        estudiantes: 'roza melvis cocho',
        materia: 'Álgebra',
        nota: 'A',
        profesor: 'Juan Pérez',
      },
      {
        nombre: 'Alma',
        apellido: 'Marcela',
        curso: '6 B',
        estudiantes: 'alma marcela',
        materia: 'Historia Universal',
        nota: 'B+',
        profesor: 'Ana Gómez',
      },
    ];
    this.cursoService.getCursos().subscribe((data) => {
      this.cursos = data;
      console.log(this.cursos);
    });
    this.estudianteService.getEstudiantes().subscribe((data) => {
      this.estudiantes = data;
      console.log(this.cursos);
    });
  }
  activeFormButton(type: string) {
    switch (type) {
      case 'profesor':
        if (this.activeProfesor == true) {
          this.activeProfesor = false;
        } else {
          this.activeProfesor = true;
          this.activeCurso = false;
          this.activeEstudiante = false;
          this.activeNotas = false;
          this.activeMateria = false;
        }

        // Aquí puedes agregar la lógica específica para "profesor"
        break;
      case 'estudiante':
        if (this.activeEstudiante === true) {
          this.activeEstudiante = false;
        } else {
          this.activeProfesor = false;
          this.activeCurso = false;
          this.activeEstudiante = true;
          this.activeNotas = false;
          this.activeMateria = false;
        }

        // Aquí puedes agregar la lógica específica para "estudiante"
        break;
      case 'curso':
        if (this.activeCurso === true) {
          this.activeCurso = false;
        } else {
          this.activeProfesor = false;
          this.activeCurso = true;
          this.activeEstudiante = false;
          this.activeNotas = false;
          this.activeMateria = false;
        }

        // Aquí puedes agregar la lógica específica para "curso"
        break;
      case 'materia':
        if (this.activeMateria === true) {
          this.activeMateria = false;
        } else {
          this.activeProfesor = false;
          this.activeCurso = false;
          this.activeEstudiante = false;
          this.activeNotas = false;
          this.activeMateria = true;
        }

        // Aquí puedes agregar la lógica específica para "materia"
        break;
      default:
        console.log('Campo no reconocido');
        // Aquí puedes manejar cualquier valor inesperado
        break;
    }
  }
  addItem(type: string) {
    switch (type) {
      case 'profesor':
        if (this.formProfesor.valid) {
          this.dataProfesor = this.formProfesor.value;
          const newItem: Item = this.formProfesor.value;
          if (this.editingIndex !== null) {
            // Editar un ítem existente
            this.items[this.editingIndex] = newItem;
            this.editingIndex = null;
          } else {
            // Agregar un nuevo ítem
            this.items.push(newItem);
          }
          this.formProfesor.reset();
        }

        // Aquí puedes agregar la lógica específica para "profesor"
        break;
      case 'estudiante':
        if (this.formEstudiante.valid) {
          this.dataEstudiante = this.formEstudiante.value;
          const newItem: Item = this.formEstudiante.value;
          if (this.editingIndex !== null) {
            // Editar un ítem existente
            this.items[this.editingIndex] = newItem;
            this.editingIndex = null;
          } else {
            // Agregar un nuevo ítem
            this.items.push(newItem);
          }
          this.formEstudiante.reset();
        }

        // Aquí puedes agregar la lógica específica para "estudiante"
        break;
      case 'curso':
        if (this.formCurso.valid) {
          this.dataCurso = this.formCurso.value;
          const newItem: Item = this.formCurso.value;
          if (this.editingIndex !== null) {
            // Editar un ítem existente
            this.items[this.editingIndex] = newItem;
            this.editingIndex = null;
          } else {
            // Agregar un nuevo ítem
            this.items.push(newItem);
          }
          this.formCurso.reset();
        }

        // Aquí puedes agregar la lógica específica para "curso"
        break;
      case 'materia':
        if (this.formMateria.valid) {
          this.dataMateria = this.formMateria.value;
          const newItem: Item = this.formMateria.value;
          if (this.editingIndex !== null) {
            // Editar un ítem existente
            this.items[this.editingIndex] = newItem;
            this.editingIndex = null;
          } else {
            // Agregar un nuevo ítem
            this.items.push(newItem);
          }
          this.formMateria.reset();
        }

        // Aquí puedes agregar la lógica específica para "materia"
        break;
      default:
        console.log('Campo no reconocido');
        // Aquí puedes manejar cualquier valor inesperado
        break;
    }
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
