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
import { ProfesorService } from '../services/profesor.service';
import { MateriaService } from '../services/materia.service';
import { NotasService } from '../services/notas.service';

interface Item {
  id: number;
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
    private estudianteService: EstudianteService,
    private profesorService: ProfesorService,
    private materiaService: MateriaService,
    private notasService: NotasService
  ) {
    this.form = this.fb.group({
      curso: [''],
      estudiantes: [''],
      materia: [''],
      nota: ['', Validators.required],
      profesor: [''],
    });

    this.formProfesor = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', [Validators.required]],
    });
    this.formCurso = this.fb.group({
      nombre: ['', Validators.required],
      anio: ['', [Validators.required]],
    });
    this.formEstudiante = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', [Validators.required]],
      curso_id: [null, [Validators.required]],
    });
    this.formMateria = this.fb.group({
      nombre: ['', Validators.required],
      curso_id: ['', Validators.required],
      profesor_id: ['', [Validators.required]],
    });
  }

  cursos: any[] = [];
  estudiantes: any[] = [];
  profesores: any[] = [];
  materias: any[] = [];
  ngOnInit() {
    this.cursoService.getCursos().subscribe((data) => {
      this.cursos = data;
    });
    this.estudianteService.getEstudiantes().subscribe((data) => {
      this.estudiantes = data;
    });
    this.profesorService.getProfesores().subscribe((data) => {
      this.profesores = data;
    });
    this.materiaService.getMaterias().subscribe((data) => {
      this.materias = data;
    });
    this.notasService.getNotas().subscribe((data) => {
      this.refactorItem(data);
    });
  }

  refactorItem(data: any) {
    const items: Item[] = [];
    data.forEach((item: any) => {
      items.push({
        id: item.id,
        curso: item.materia.curso.nombre,
        estudiantes: item.estudiante.nombre + ' ' + item.estudiante.apellido,
        materia: item.materia.nombre,
        nota: item.nota,
        profesor:
          item.materia.profesor.nombre + ' ' + item.materia.profesor.apellido,
      });
    });
    this.items = items;
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

  handlerCreateCurso() {
    if (this.formCurso.valid) {
      this.cursoService.createCurso(this.formCurso.value).subscribe((data) => {
        this.cursos = data;
      });
    }
  }

  handlerCreateProfesor() {
    if (this.formProfesor.valid) {
      this.profesorService
        .createProfesor(this.formProfesor.value)
        .subscribe((data) => {
          this.profesores = data;
        });
    }
  }

  handlerCreateEstudiante() {
    if (this.formEstudiante.valid) {
      const formValue = this.formEstudiante.value;
      formValue.curso_id = +formValue.curso;

      this.estudianteService.createEstudiante(formValue).subscribe((data) => {
        this.estudiantes = data;
      });
    }
  }

  handlerCreateMateria() {
    if (this.formMateria.valid) {
      const formValue = this.formMateria.value;
      formValue.curso_id = +formValue.curso_id;
      formValue.profesor_id = +formValue.profesor_id;
      this.materiaService.createMateria(formValue).subscribe((data) => {
        this.materias = data;
      });
    }
  }

  handlerCreateNotas() {
    if (this.form.valid) {
      if (this.editingIndex !== null) {
        this.notasService
          .updateNotas(this.editingIndex, this.form.value)
          .subscribe((data) => {
            this.refactorItem(data);
          });
      } else {
        const formValue = this.form.value;
        formValue.curso_id = +formValue.curso;
        formValue.profesor_id = +formValue.profesor;
        formValue.estudiante_id = +formValue.estudiantes;
        formValue.materia_id = +formValue.materia;
        this.notasService.createNotas(formValue).subscribe((data) => {
          this.refactorItem(data);
        });
      }
    }
  }

  editItem(index: number) {
    this.editingIndex = index;
    this.form.patchValue(this.items[index]);
  }

  deleteItem(index: number) {
    this.notasService.deleteNotas(index).subscribe((data) => {
      this.refactorItem(data);
    });
  }
}
