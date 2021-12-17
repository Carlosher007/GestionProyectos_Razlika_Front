import React ,{useState} from 'react'
import Imagenes from 'assets/Imagenes';
import 'styles/cards.css';


const Card = (props) => {
  const [estado,setEstado] = useState("card")
  let more = document.querySelectorAll('.more');
  for (let i = 0; i < more.length; i++) {
    more[i].addEventListener('click', function () {
      more[i].parentNode.classList.toggle('activate');
    });
  }

  const toInt = (num) =>{
    parseInt(num, 10);
    return num
  }
  return (
    // <div className="bodyCards">
    //   <div className="container">
    <div className={estado}>
      <div className="icon">
        {
          <img
            src={
              Imagenes[props.num != null ? toInt(props.num) : toInt('21')].img
            }
            alt="Imagen Proyecto"
          />
        }
      </div>
      <div className="content">
        <h3>{props.nombreProyecto}</h3>
        <p>
          Objetivos Generales : {props.objetivosGenerales} <br />
          Objetivos Especificos : {props.objetivosEspecificos} <br />
          Presupuesto :
          {props.presupuesto != null ? toInt(props.presupuesto) : ''} <br />
          Fecha Inicio : {props.fechaInicio} <br />
          Fecha Fin : {props.fechaFin} <br />
          Lider : {props.nombreLider} <br />
          Estado : {props.estado} <br />
          Fase : {props.fase} <br />
        </p>
      </div>
      <button
        onClick={() => {
          if (estado === 'card') {
            setEstado('card activate');
          } else {
            setEstado('card');
          }
        }}
      >
        <a className="more"></a>
      </button>
    </div>
    //   </div>
    // </div>
  );
}

export default Card
