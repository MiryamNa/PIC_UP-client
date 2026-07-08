import type { listCategoryDTO } from "./listCategoryDTO"

export interface EventCreationDTO {
    clientId: string
    name: string
    quantityPictureChoose: number
    totalPictures: number
    pathToFolder: string
    quantityForCategory: listCategoryDTO[]
    groom: string
    bride: string
    family: string[]
}