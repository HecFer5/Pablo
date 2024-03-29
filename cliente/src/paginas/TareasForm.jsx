import { useEffect, useState } from 'react'
import { Formik, Form } from 'formik'
import { useTareas } from '../componentes/context/hooks'
import { useParams, useNavigate } from 'react-router-dom'

const TareasForm = () => {

  const { crearRegistro, editarRegisto, modificaRegistro } = useTareas()
  const [task, setTask] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    calle: "",
    numero: 0,
    patologia: "",
    patasoc: "",
    fechacirugia: "",
  })

  const params = useParams()

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefalut()
  }

  useEffect(() => {
    const traerTarea = async () => {
      if (params.idpaciente) {
        const task = await editarRegisto(params.idpaciente)
        setTask({
          nombre: task.nombre,
          apellido: task.apellido,
          telefono: task.telefono,
          imagen: task.imagen,
          calle: task.calle,
          numero: task.numero,
          patologia: task.patologia,
          patasoc: task.patasoc,
          fechacirugia: task.fechacirugia,
        })
      }
    }
    traerTarea()
  }, [])

  return (
    <div>

      <h1 className="text-xl font-bold uppercase text-center">{params.idpaciente ? 'Editar un Registro' : 'Ingresar un nuevo registro'}</h1>
      <Formik
        initialValues={task}
        enableReinitialize={true}
        onSubmit={async (values, actions) => {
          console.log(values)
          if (params.idpaciente) {
            await modificaRegistro(params.idpaciente, values)
            navigate('/tabla')
          } else {
            navigate('/otroReg')
            await crearRegistro(values)
          }
          setTask({
            nombre: "",
            apellido: "",
            telefono: "",
            calle: "",
            numero: 0,
            patologia: "",
            patasoc: "",
            fechacirugia: values.fechacirugia,
          })
        }}
      >

        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <Form onSubmit={handleSubmit} className="bg-slate-300 max-w-xl rounded-md p-4 mx-auto mt-10">
            <label className="block">Nombre</label>
            <input className="px-2 py-1 rounded-sm w-full" type="text"
              name='nombre'
              onChange={handleChange}
              placeholder='Campo obligatorio'
              value={values.nombre} />
            <label className="block">Apellido</label>
            <input className="px-2 py-1 rounded-sm w-full" type="text"
              name='apellido'
              onChange={handleChange}
              placeholder='Obligatorio'
              value={values.apellido} />
            <label className="block">Teléfono</label>
            <input className="px-2 py-1 rounded-sm w-full" type="text"
              name='telefono'
              onChange={handleChange}
              value={values.telefono} placeholder='Opcional' />

            <label className="block">Calle</label>
            <input className="px-2 py-1 rounded-sm w-full" type="text"
              name='calle'
              onChange={handleChange}
              value={values.calle} placeholder='Opcional' />
            <label className="block">Número</label>
            <input className="px-2 py-1 rounded-sm w-full" type="text"
              name='numero'
              onChange={handleChange}
              value={values.numero} placeholder='Opcional' />
            <label className="block">Patologías</label>
            <input className="px-2 py-1 rounded-sm w-full" type="text"
              name='patologia'
              onChange={handleChange}
              value={values.patologia} placeholder='Opcional' />
            <label className="block">Patologías asociadas</label>
            <input className="px-2 py-1 rounded-sm w-full" type="text"
              name='patasoc'
              onChange={handleChange}
              value={values.patasoc} placeholder='Opcional' />
            <label className="block">Fecha de cirugía</label>
            <input className="px-2 py-1 rounded-sm w-full" type="date"
              name='fechacirugia'
              onChange={handleChange}
              value={values.fechacirugia} placeholder='Opcional' onClick={console.log(values.fechacirugia)} />

            <button type='submit' disabled={isSubmitting} className="block bg-indigo-500 px-2 py-1 text-white w-full rounded-md">
              {isSubmitting ? "Guardando" : "Guardar"}</button>
          </Form>
        )}
      </Formik>
    </div>

  )
}

export default TareasForm