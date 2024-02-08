import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';

const sweetAlert = (msg, icon = 'error') => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
  return Toast.fire({
    icon,
    title: msg
  });
};

export default sweetAlert;
