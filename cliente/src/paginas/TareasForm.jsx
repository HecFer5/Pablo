import { useEffect, useState } from 'react'
import { Formik, Form } from 'formik'
import { useTareas } from '../componentes/context/hooks'
import { useParams, useNavigate } from 'react-router-dom'

const TareasForm = () => {

  const { crearRegistro, editarRegisto, modificaRegistro } = useTareas()
  const [task, setTask] = useState({
    nombre: "",
    apellido: "",
    telefono: ""
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
          telefono: task.telefono
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
            nombre: '',
            apellido: '',
            telefono: ''
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
            <textarea className="px-2 py-1 rounded-sm w-full" type="text"
              name='telefono'
              onChange={handleChange}
              value={values.telefono} placeholder='Opcional' />

            <button type='submit' disabled={isSubmitting} className="block bg-indigo-500 px-2 py-1 text-white w-full rounded-md">
              {isSubmitting ? "Guardando" : "Guardar"}</button>
          </Form>
        )}
      </Formik>
    </div>

  )
}

export default TareasForm