import { json } from '@remix-run/node'

/**
 * GET /api/recommendations
 */
export function loader() {
  return json([
    {
      id: '8582f6ba-5dc4-4793-9c62-8e4a35e5c4c0',
      slug: 'forrest-gump',
      title: 'Forrest Gump',
      category: 'Romance',
      releasedAt: new Date('1994-07-06'),
      description: `The history of the United States from the 1950s to the '70s unfolds from the perspective of an Alabama man with an IQ of 75, who yearns to be reunited with his childhood sweetheart.`,
      imageUrl:
        'https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UY809_.jpg',
    },
    {
      id: '57c7501d-f08e-4a20-8f1a-ac2517c793d6',
      slug: 'interstellar',
      title: 'Interstellar',
      category: 'Sci-Fi',
      releasedAt: new Date('2014-11-07'),
      description: `When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.`,
      imageUrl:
        'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UY720_.jpg',
    },
    {
      id: 'd734baad-081a-4176-9c0b-960d0f57ea69',
      slug: 'goodfellas',
      title: 'Goodfellas',
      category: 'Crime',
      releasedAt: new Date('1990-09-19'),
      description: `The story of Henry Hill and his life in the mafia, covering his relationship with his wife Karen and his mob partners Jimmy Conway and Tommy DeVito.`,
      imageUrl:
        'https://m.media-amazon.com/images/M/MV5BY2NkZjEzMDgtN2RjYy00YzM1LWI4ZmQtMjIwYjFjNmI3ZGEwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UY479_.jpg',
    },
  ])
}
