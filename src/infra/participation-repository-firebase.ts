import { ParticipationRepository } from '../data/contracts/participation-repository'
import { Participation } from '../data/entities/participation'
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore/lite'
import { database } from '../main/config/database'

const db = getFirestore(database)

export class ParticipationRepositoryFirebase implements ParticipationRepository {
  async getAll (): Promise<Participation[]> {
    const participationCollection = collection(db, 'participation')
    const participationSnapshot = await getDocs(participationCollection)
    const participations = participationSnapshot.docs.map(doc => doc.data())
    const participationsEntities = participations.map((participation, index) => {
      return {
        id: index + 1,
        firstName: participation.firstName,
        lastName: participation.lastName,
        participation: participation.participation
      }
    })
    return participationsEntities
  }

  async create (participation: Participation): Promise<void> {
    const participationCollection = collection(db, 'participation')
    delete participation.id
    await addDoc(participationCollection, participation)
  }
}
