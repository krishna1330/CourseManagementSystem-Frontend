import { Component, inject } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { IGetMastersResponse } from '../../models/getMastersResponse';
import { HTTP_INTERCEPTORS, HttpResponse } from '@angular/common/http';
import { authInterceptor } from '../../intercepors/auth.interceptor';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-masters',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: authInterceptor,
      multi: true
    }
  ],
  templateUrl: './masters.component.html',
  styleUrl: './masters.component.scss'
})
export class MastersComponent {

  showModal: boolean = false;

  masters: IGetMastersResponse[] = [];

  masterService = inject(MasterService);

  ngOnInit(): void {
    this.GetMasters();
  }

  GetMasters(): void {
    this.masterService.GetAllMasters().subscribe({
      next: (response: HttpResponse<IGetMastersResponse[]>) => {
        if (response.status === 200) {
          this.masters = response.body || [];
        }
      },
      error: (err) => {
        console.error('Failed to fetch masters', err);
      }
    });
  }

  btnShowModal() {
    this.showModal = true;
    console.log(this.showModal);
  }

}
