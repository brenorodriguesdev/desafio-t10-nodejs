// import { ParticipationRepositoryFirebase } from './participation-repository-firebase'
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore/lite'
import { database } from '../main/config/database'
import { ParticipationRepositoryFirebase } from './participation-repository-firebase'

const makeSut = (): ParticipationRepositoryFirebase => {
  return new ParticipationRepositoryFirebase()
}

const db = getFirestore(database)

describe('ParticipationRepositoryFirebase', () => {
  afterAll(async () => {
    const participationCollection = collection(db, 'participation')
    const participationSnapshot = await getDocs(participationCollection)
    participationSnapshot.docs.map(async participation => await deleteDoc(doc(db, 'participation', participation.id)))
  })

  beforeEach(async () => {
    const participationCollection = collection(db, 'participation')
    const participationSnapshot = await getDocs(participationCollection)
    participationSnapshot.docs.map(async participation => await deleteDoc(doc(db, 'participation', participation.id)))
  })

  test('Garantir que a participation seja criado e retornados', async () => {
    const sut = makeSut()
    await sut.create({
      firstName: 'firstName',
      lastName: 'lastName',
      participation: 10
    })

    const participations = await sut.getAll()
    expect(participations.length).toBe(1)

    const participation = participations[0]
    expect(participation.id).toBe(1)
    expect(participation.firstName).toBe('firstName')
    expect(participation.lastName).toBe('lastName')
    expect(participation.participation).toBe(10)
  })
})
