import {Injectable} from '@angular/core';
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  showError(error: any) {
    Swal.fire({
      icon: 'error',
      title: 'Algo salió mal...',
      text: error.message,
    });
  }

  showSuccess(message: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'success',
      title: `${message}`,
    })
  }

  showLoading(message?: string) {
    Swal.fire({
      title: message || 'Cargando...',
      didOpen: () => {
        Swal.showLoading()
      },
    });
  }

  close() {
    Swal.close();
  }

}
