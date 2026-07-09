import type { listCategoryDTO } from "./listCategoryDTO"

export interface EventCreationDTO {
    clientId: string
    name: string
    quantityPictureChoose: number
    totalPictures: number
    pathToFolder: string
    categories: listCategoryDTO[]
    groom_image: string | null
    bride_image: string | null
    relatives_images: string[]
}