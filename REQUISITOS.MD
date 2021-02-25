## ENTIDADES 

# USERS
  id
  name
  image

# COURSES
  id

# LESSON
  id
  name
  duration
  course_id
  description
  video_id


POST "/courses" // Cria um novo curso
PUT "/courses/:id" // Atualiza um curso existente

POST "/lessons" // Cria uma nova aula em um curso
PUT "/lessons/:id" // Atualiza uma aula existente

GET "/courses" // Exibe todos os cursos cadastrados no banco de dados

GET "/courses/:id/lessons" // Exibe todas as aulas de um curso específico
