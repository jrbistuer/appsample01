import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IVacanca } from 'src/app/models/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { VacancesService } from 'src/app/services/vacances.service';

@Component({
  selector: 'app-new-vacanca',
  templateUrl: './new-vacanca.page.html',
  styleUrls: ['./new-vacanca.page.scss'],
})
export class NewVacancaPage implements OnInit {

  vacancaForm!: FormGroup;

  vacanca: IVacanca = {} as IVacanca;
  
  vacancaSelected: IVacanca = {} as IVacanca;

  vacances: IVacanca[] = [];

  title = 'Home'

  constructor(private formBuilder: FormBuilder,
              private vacancesService: VacancesService,
              private authService: AuthService) {}

  get nom() {
    return this.vacancaForm.get('nom');
  }

  get preu() {
    return this.vacancaForm.get('preu');
  }

  get pais() {
    return this.vacancaForm.get('pais');
  }

  get descripcio() {
    return this.vacancaForm.get('descripcio');
  }
            
  ngOnInit(): void {
    this.setView();
    this.createForm();
  }

  setView() {
    this.vacancesService.getVacances().subscribe((res) => {
      this.vacances = res;
    });
  }

  createForm() {
    this.vacancaForm = this.formBuilder.group({
      'nom': new FormControl({value: null, disabled: false}, [Validators.required, Validators.minLength(3)]),
      'preu': new FormControl({value: null, disabled: false}, []),
      'pais': new FormControl({value: null, disabled: false}, []),
      'descripcio': new FormControl({value: null, disabled: false}, [])
    });
  }

  addVacanca() {
    console.log('Form', this.vacancaForm); 
    this.vacancaForm.markAsDirty();
    if (this.vacancaForm.valid) {
      console.log('add');
      this.vacanca = {
        nom: this.vacancaForm.get('nom')?.value,
        pais: this.vacancaForm.get('pais')?.value,
        preu: this.vacancaForm.get('preu')?.value,
        descripcio: this.vacancaForm.get('preu')?.value,
        user: this.authService.getUserId()
      };
      console.log(this.vacanca);
      this.vacancesService.addVacanca(this.vacanca);
      this.createForm();
    }   
  }

}